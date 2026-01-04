import { NextRequest, NextResponse } from 'next/server';
import { generateReplies } from '@/lib/grok';

export async function POST(request: NextRequest) {
  try {
    const { postToReply, context } = await request.json();

    if (!postToReply) {
      return NextResponse.json(
        { error: 'Missing required field: postToReply' },
        { status: 400 }
      );
    }

    const replies = await generateReplies(postToReply, context);

    return NextResponse.json({ replies });
  } catch (error) {
    console.error('Reply generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate replies' },
      { status: 500 }
    );
  }
}
