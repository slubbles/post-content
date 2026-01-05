import { NextRequest, NextResponse } from 'next/server';
import { generateReplies } from '@/lib/grok';
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

    const { postToReply, context } = await request.json();

    if (!postToReply) {
      return NextResponse.json(
        { error: 'Missing required field: postToReply' },
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

    const replies = await generateReplies(postToReply, context);

    // Track reply generation for usage limits
    await trackPostGeneration(session.user.id, replies[0], 'reply');

    return NextResponse.json({ replies });
  } catch (error) {
    console.error('Reply generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate replies' },
      { status: 500 }
    );
  }
}
