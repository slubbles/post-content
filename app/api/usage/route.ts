import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserUsage } from '@/lib/usage';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const usage = await getUserUsage(session.user.id);
    
    // Get user's subscription status
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscribed: true, subscriptionStatus: true },
    });
    
    return NextResponse.json({
      ...usage,
      isPro: user?.subscribed && user?.subscriptionStatus === 'active',
    });
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}
