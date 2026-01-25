import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/validation';
import { handleCorsPrelight, getCorsHeaders } from '@/lib/cors';
import { verifyCsrfToken } from '@/lib/csrf';
import { checkAIDetectionRisk } from '@/lib/validation';
import { HUMANNESS_LEVELS, type HumannessLevel } from '@/lib/prompts';
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

    const { context, format, humanness, multiHumanness } = await request.json();

    // Validate inputs
    if (!context || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'Context is required' },
        { status: 400 }
      );
    }

    // Validate humanness if provided
    if (humanness) {
      const validHumanness = ['corporate_polished', 'professional_authentic', 'casual_authentic', 'texting_friend'];
      if (!validHumanness.includes(humanness)) {
        return NextResponse.json(
          { error: 'Invalid humanness level' },
          { status: 400 }
        );
      }
    }

    const sanitizedContext = sanitizeInput(context);

    if (sanitizedContext.length === 0 || sanitizedContext.length > 1500) {
      return NextResponse.json(
        { error: 'Context must be between 1 and 1500 characters' },
        { status: 400 }
      );
    }

    // Validate format (optional)
    const validFormats = ['hook-story-offer', 'provide-value', 'emotion-logic-urgency'];
    const scriptFormat = format && validFormats.includes(format) ? format : 'hook-story-offer';

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
    const formatDescriptions = {
      'hook-story-offer': 'Hook-Story-Offer (Pattern interrupt → empathy building → transformation CTA)',
      'provide-value': 'Provide Value (Educational content that builds authority and trust)',
      'emotion-logic-urgency': 'Emotion-Logic-Urgency (Emotional hook → logical reasoning → scarcity/urgency close)'
    };

    const formatDescription = formatDescriptions[scriptFormat as keyof typeof formatDescriptions];

    let systemPrompt = `You are an expert video script writer specializing in short-form content for platforms like TikTok, Instagram Reels, and YouTube Shorts.

Create an engaging video script using the ${formatDescription} framework.

The script should be:
- Natural and conversational
- Optimized for 30-90 second videos
- Include brief stage directions in [brackets] where helpful
- Written in a way that's easy to read/perform
- Engaging and actionable
- Follow the ${scriptFormat} structure`;

    // Add humanness layer if specified
    if (humanness && HUMANNESS_LEVELS[humanness as HumannessLevel]) {
      const humannessConfig = HUMANNESS_LEVELS[humanness as HumannessLevel];
      systemPrompt += `\n\n## HUMANNESS LEVEL: ${humannessConfig.description}\n${humannessConfig.instructions}`;
    }

    // Determine temperature
    const temperature = humanness && HUMANNESS_LEVELS[humanness as HumannessLevel]
      ? HUMANNESS_LEVELS[humanness as HumannessLevel].temperature
      : 0.8;

    const userPrompt = `Create a video script about: ${sanitizedContext}

Use the ${formatDescription} format to structure the content.

Generate a cohesive, engaging video script that is ready to perform.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      temperature,
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
