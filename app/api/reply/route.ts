import { NextRequest, NextResponse } from 'next/server';
import { generateReplies } from '@/lib/grok';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'reply');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { postToReply, context } = await request.json();

    // Validate and sanitize input
    if (!postToReply || typeof postToReply !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: postToReply' },
        { status: 400 }
      );
    }

    const sanitizedPost = sanitizeInput(postToReply);
    if (sanitizedPost.length === 0 || sanitizedPost.length > 2000) {
      return NextResponse.json(
        { error: 'Post must be between 1 and 2000 characters' },
        { status: 400 }
      );
    }

    const sanitizedContext = context ? sanitizeInput(context) : undefined;
    if (sanitizedContext && sanitizedContext.length > 500) {
      return NextResponse.json(
        { error: 'Context cannot exceed 500 characters' },
        { status: 400 }
      );
    }

    // Check usage limits
    const canGenerate = await canUserGeneratePost(session.user.id);
    if (!canGenerate) {
      return NextResponse.json(
        { 
          error: 'Monthly limit reached. Upgrade to Pro for unlimited posts.',
          upgradeUrl: '/pricing'
        },
        { status: 403 }
      );
    }

    const replies = await generateReplies(sanitizedPost, sanitizedContext);

    // Track reply generation for usage limits
    await trackPostGeneration(session.user.id, replies[0], 'reply');

    return NextResponse.json({ replies });
  } catch (error) {
    console.error('Reply generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate replies' },
      { status: 500 }
    );
  }
}
