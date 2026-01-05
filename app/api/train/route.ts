import { NextRequest, NextResponse } from 'next/server';
import { analyzeVoice } from '@/lib/grok';
import { auth } from '@/lib/auth';

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

    const { posts } = await request.json();

    if (!posts || !Array.isArray(posts) || posts.length < 5) {
      return NextResponse.json(
        { error: 'Need at least 5 posts for voice analysis' },
        { status: 400 }
      );
    }

    const analysis = await analyzeVoice(posts);

    // TODO: Save voice profile to database
    // For now, return analysis to be stored in localStorage

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Voice analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze voice' },
      { status: 500 }
    );
  }
}
