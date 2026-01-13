import { NextRequest, NextResponse } from 'next/server';
import { generatePosts } from '@/lib/grok';
import { auth } from '@/lib/auth';
import { canUserGeneratePost, trackPostGeneration } from '@/lib/usage';

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

    const { input, tone, platform } = await request.json();

    if (!input || !tone || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: input, tone, and platform' },
        { status: 400 }
      );
    }

    // Validate platform
    const validPlatforms = ['twitter', 'linkedin', 'instagram', 'facebook', 'threads'];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate tone
    const validTones = ['professional', 'casual', 'humorous', 'inspirational', 'educational'];
    if (!validTones.includes(tone)) {
      return NextResponse.json(
        { error: `Invalid tone. Must be one of: ${validTones.join(', ')}` },
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

    // TODO: Get user voice profile from database if exists
    const userVoice = undefined;

    const posts = await generatePosts({ input, tone, platform, userVoice });

    // Track post generation for usage limits
    await trackPostGeneration(session.user.id, posts[0], 'generate');

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Generate posts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate posts' },
      { status: 500 }
    );
  }
}
