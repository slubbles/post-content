import { NextRequest, NextResponse } from 'next/server';
import { generatePosts, generatePostsWithDetection } from '@/lib/claude';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';
import { prisma } from '@/lib/db';
import { validateGenerateInput, validateTone, validatePlatform } from '@/lib/validation';
import { handleCorsPrelight, getCorsHeaders } from '@/lib/cors';
import { verifyCsrfToken } from '@/lib/csrf';
import type { HumannessLevel } from '@/types/api';

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
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'generate');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { input, tone, platform, humanness, multiHumanness } = await request.json();

    // Validate and sanitize input
    const inputValidation = validateGenerateInput(input);
    if (!inputValidation.valid) {
      return NextResponse.json({ error: inputValidation.error }, { status: 400 });
    }

    // Validate platform
    const platformValidation = validatePlatform(platform);
    if (!platformValidation.valid) {
      return NextResponse.json({ error: platformValidation.error }, { status: 400 });
    }

    // Validate tone
    const toneValidation = validateTone(tone);
    if (!toneValidation.valid) {
      return NextResponse.json({ error: toneValidation.error }, { status: 400 });
    }

    // Validate humanness if provided
    if (humanness) {
      const validHumanness = ['corporate_polished', 'professional_authentic', 'casual_authentic', 'texting_friend'];
      if (!validHumanness.includes(humanness)) {
        return NextResponse.json({ 
          error: `Invalid humanness level. Must be one of: ${validHumanness.join(', ')}` 
        }, { status: 400 });
      }
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

    // Get user voice profile from database if exists
    const voiceProfile = await prisma.voiceProfile.findUnique({
      where: { userId: session.user.id },
    });
    
    const userVoice = voiceProfile ? {
      sarcasmLevel: voiceProfile.sarcasmLevel,
      tiredLevel: voiceProfile.tiredLevel,
      favoriteWords: voiceProfile.favoriteWords,
      avgLength: voiceProfile.avgLength,
    } : undefined;

    // Generate posts - check if detection mode is requested
    const withDetection = humanness || multiHumanness;
    
    if (withDetection) {
      const results = await generatePostsWithDetection({ 
        input: inputValidation.sanitized!, 
        tone: toneValidation.value!, 
        platform: platformValidation.value!,
        humanness: humanness as HumannessLevel,
        multiHumanness,
        userVoice 
      });
      
      // Track usage
      await trackPostGeneration(session.user.id, 'generate');
      
      return NextResponse.json({
        variations: results,
        metadata: {
          timestamp: new Date().toISOString(),
          platform: platformValidation.value,
          tone: toneValidation.value,
          humanness: humanness || (multiHumanness ? 'multi' : 'default'),
          withDetection: true
        }
      }, { status: 200, headers: corsHeaders });
    }
    
    // Standard generation without detection
    const posts = await generatePosts({ 
      input: inputValidation.sanitized!, 
      tone: toneValidation.value!, 
      platform: platformValidation.value!, 
      userVoice 
    });

    // Only track post generation if generation succeeded
    await trackPostGeneration(session.user.id, posts[0], 'generate');

    return NextResponse.json({ posts }, { headers: corsHeaders });
  } catch (error) {
    console.error('Generate posts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate posts' },
      { status: 500, headers: corsHeaders }
    );
  }
}
