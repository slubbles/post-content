import { NextRequest, NextResponse } from 'next/server';
import { generatePosts } from '@/lib/grok';

export async function POST(request: NextRequest) {
  try {
    const { input, tone } = await request.json();

    if (!input || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: input and tone' },
        { status: 400 }
      );
    }

    // TODO: Get user voice profile from database if exists
    const userVoice = undefined; // Will implement after auth

    const posts = await generatePosts({ input, tone, userVoice });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Generate posts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate posts' },
      { status: 500 }
    );
  }
}
