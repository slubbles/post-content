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
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'caption');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { context, platform } = await request.json();

    // Validate inputs
    if (!context || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: context' },
        { status: 400 }
      );
    }

    if (!platform || !['facebook', 'linkedin'].includes(platform)) {
      return NextResponse.json(
        { error: 'Platform must be either facebook or linkedin' },
        { status: 400 }
      );
    }

    const sanitizedContext = sanitizeInput(context);

    if (sanitizedContext.length === 0 || sanitizedContext.length > 800) {
      return NextResponse.json(
        { error: 'Context must be between 1 and 800 characters' },
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

    // Generate captions using Claude with Hook-Story-Offer framework
    const platformName = platform === 'facebook' ? 'Facebook' : 'LinkedIn';
    const systemPrompt = `You are an expert social media caption writer specializing in ${platformName}.

Create engaging captions using the Hook-Story-Offer framework:
1. HOOK: Start with attention-grabbing opening (question, bold statement, or surprising fact)
2. STORY: Build interest with value, insight, or relatable content
3. OFFER: End with clear call-to-action (comment, share, follow, visit link)

${platform === 'linkedin' ? `
LinkedIn-specific guidelines:
- Professional but personable tone
- Use line breaks for readability
- Include relevant hashtags (3-5)
- Encourage professional engagement
` : `
Facebook-specific guidelines:
- Conversational and friendly tone
- Use emojis strategically
- Include relevant hashtags (2-4)
- Encourage reactions and shares
`}

Generate 3 unique caption variations.`;

    const userPrompt = `Create 3 ${platformName} captions about: "${sanitizedContext}"

Each caption should follow Hook-Story-Offer and be unique in approach.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
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

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse captions from response
    const captions = response
      .split(/\n\n+/)
      .map(caption => caption.replace(/^[0-9]+[:.\/)\]]\s*/, '').trim())
      .filter(caption => caption.length > 20)
      .slice(0, 3);

    if (captions.length === 0) {
      throw new Error('Failed to generate captions');
    }

    // Track generation for usage limits
    await trackPostGeneration(session.user.id, captions[0], 'caption');

    return NextResponse.json({ captions }, { headers: corsHeaders });
  } catch (error) {
    console.error('Caption generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate captions' },
      { status: 500, headers: corsHeaders }
    );
  }
}
