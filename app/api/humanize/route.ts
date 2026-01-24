import { NextResponse } from 'next/server';
import { humanizeContent } from '@/lib/claude';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { content, tone, platform } = body;

    if (!content || !tone || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: content, tone, platform' },
        { status: 400 }
      );
    }

    if (content.length < 10) {
      return NextResponse.json(
        { error: 'Content too short to humanize' },
        { status: 400 }
      );
    }

    if (content.length > 10000) {
      return NextResponse.json(
        { error: 'Content too long (max 10,000 characters)' },
        { status: 400 }
      );
    }

    // Get voice profile for better humanization
    const voiceProfile = await prisma.voiceProfile.findUnique({
      where: { userId }
    });

    // Humanize the content
    const result = await humanizeContent(
      content,
      tone,
      platform,
      voiceProfile
    );

    return NextResponse.json({
      success: true,
      original: content,
      humanized: result.humanized,
      before: result.before,
      after: result.after,
      improvements: result.improvements,
      riskReduction: result.before.riskScore - result.after.riskScore
    });
    
  } catch (error) {
    console.error('Humanize error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: `Failed to humanize content: ${errorMessage}` },
      { status: 500 }
    );
  }
}
