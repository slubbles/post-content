import { NextRequest, NextResponse } from 'next/server';
import { generateThread } from '@/lib/grok';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Generate thread using Grok API
    const tweets = await generateThread(topic);

    return NextResponse.json({ tweets });
  } catch (error) {
    console.error('Thread generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate thread' },
      { status: 500 }
    );
  }
}
