import { NextRequest, NextResponse } from 'next/server';
import { analyzeVoice } from '@/lib/claude';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/lib/rate-limit';

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
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'train');
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.generate);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      );
    }

    const { posts } = await request.json();

    if (!posts || !Array.isArray(posts) || posts.length < 5) {
      return NextResponse.json(
        { error: 'Need at least 5 posts for voice analysis' },
        { status: 400 }
      );
    }

    const analysis = await analyzeVoice(posts);

    // Save voice profile to database
    await prisma.voiceProfile.upsert({
      where: { userId: session.user.id },
      update: {
        sarcasmLevel: analysis.sarcasmLevel || 50,
        tiredLevel: analysis.tiredLevel || 30,
        favoriteWords: analysis.favoriteWords || [],
        avgLength: analysis.avgLength || 15,
        examples: posts.slice(0, 10), // Store first 10 posts as examples
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        sarcasmLevel: analysis.sarcasmLevel || 50,
        tiredLevel: analysis.tiredLevel || 30,
        favoriteWords: analysis.favoriteWords || [],
        avgLength: analysis.avgLength || 15,
        examples: posts.slice(0, 10),
      },
    });

    return NextResponse.json({ analysis, saved: true });
  } catch (error) {
    console.error('Voice analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze voice' },
      { status: 500 }
    );
  }
}
