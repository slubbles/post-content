import { NextRequest, NextResponse } from 'next/server';
import { generateThread } from '@/lib/claude';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/validation';
import { handleCorsPrelight, getCorsHeaders } from '@/lib/cors';
import { verifyCsrfToken } from '@/lib/csrf';

export async function OPTIONS(request: NextRequest) {
  const response = handleCorsPrelight(request);
  return response || new Response(null, { status: 405 });
}

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Verify CSRF token
  if (!verifyCsrfToken(request)) {
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403, headers: corsHeaders }
    );
  }
  
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
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'thread');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { topic, keyPoints, threadLength } = await request.json();

    // Validate and sanitize topic
    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const sanitizedTopic = sanitizeInput(topic);
    if (sanitizedTopic.length === 0 || sanitizedTopic.length > 500) {
      return NextResponse.json(
        { error: 'Topic must be between 1 and 500 characters' },
        { status: 400 }
      );
    }

    // Validate and sanitize key points
    const sanitizedKeyPoints = keyPoints ? sanitizeInput(keyPoints) : undefined;
    if (sanitizedKeyPoints && sanitizedKeyPoints.length > 800) {
      return NextResponse.json(
        { error: 'Key points cannot exceed 800 characters' },
        { status: 400 }
      );
    }

    // Validate thread length
    const validThreadLength = typeof threadLength === 'number' && threadLength >= 3 && threadLength <= 15 
      ? threadLength 
      : 5;

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

    // Generate thread using Grok API with sanitized parameters
    const tweets = await generateThread(sanitizedTopic, sanitizedKeyPoints, validThreadLength);

    // Track thread generation for usage limits (count as 1 post, not per tweet)
    await trackPostGeneration(session.user.id, sanitizedTopic, 'thread');

    return NextResponse.json({ thread: tweets, tweets });
  } catch (error) {
    console.error('Thread generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate thread' },
      { status: 500 }
    );
  }
}
