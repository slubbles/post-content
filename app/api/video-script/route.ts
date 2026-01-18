import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/validation';
import { handleCorsPrelight, getCorsHeaders } from '@/lib/cors';
import { verifyCsrfToken } from '@/lib/csrf';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

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

    // Check API configuration
    if (!anthropic) {
      return NextResponse.json(
        { error: 'API not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'video-script');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { hook, story, offer } = await request.json();

    // Validate inputs
    if (!hook || typeof hook !== 'string' || !story || typeof story !== 'string' || !offer || typeof offer !== 'string') {
      return NextResponse.json(
        { error: 'Missing required fields: hook, story, and offer' },
        { status: 400 }
      );
    }

    const sanitizedHook = sanitizeInput(hook);
    const sanitizedStory = sanitizeInput(story);
    const sanitizedOffer = sanitizeInput(offer);

    if (sanitizedHook.length === 0 || sanitizedHook.length > 200) {
      return NextResponse.json(
        { error: 'Hook must be between 1 and 200 characters' },
        { status: 400 }
      );
    }

    if (sanitizedStory.length === 0 || sanitizedStory.length > 800) {
      return NextResponse.json(
        { error: 'Story must be between 1 and 800 characters' },
        { status: 400 }
      );
    }

    if (sanitizedOffer.length === 0 || sanitizedOffer.length > 400) {
      return NextResponse.json(
        { error: 'Offer must be between 1 and 400 characters' },
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

    // Generate video script using Claude
    const systemPrompt = `You are an expert video script writer specializing in short-form content for platforms like TikTok, Instagram Reels, and YouTube Shorts.

Create an engaging video script following the Hook-Story-Offer framework:
- Start with an attention-grabbing hook
- Build interest with a compelling story or value
- Close with a clear call-to-action or offer

The script should be:
- Natural and conversational
- Optimized for 30-90 second videos
- Include brief stage directions in [brackets] where helpful
- Written in a way that's easy to read/perform
- Engaging and actionable`;

    const userPrompt = `Create a video script using this framework:

HOOK: ${sanitizedHook}
STORY: ${sanitizedStory}
OFFER: ${sanitizedOffer}

Generate a cohesive, engaging video script that flows naturally from hook to story to offer.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      temperature: 0.8,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' as const }
        }
      ],
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const script = message.content[0].type === 'text' ? message.content[0].text : '';

    if (!script || script.length === 0) {
      throw new Error('Failed to generate script');
    }

    // Track generation for usage limits
    await trackPostGeneration(session.user.id, script, 'video-script');

    return NextResponse.json({ script }, { headers: corsHeaders });
  } catch (error) {
    console.error('Video script generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate video script' },
      { status: 500, headers: corsHeaders }
    );
  }
}
