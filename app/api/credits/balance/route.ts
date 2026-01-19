import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getUserPostCount } from '@/lib/usage';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { 
        subscribed: true,
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get current month's post count (this is the "credits used")
    const creditsUsed = await getUserPostCount(session.user.id);
    
    // Calculate remaining credits based on plan
    const isPro = user.subscribed && user.subscriptionStatus === 'active';
    const totalCredits = isPro ? 200 : 10; // Pro: 200, Free: 10
    const remainingCredits = Math.max(0, totalCredits - creditsUsed);

    return NextResponse.json({
      creditsUsed,
      creditsRemaining: remainingCredits,
      totalCredits,
      isPro,
      plan: isPro ? 'pro' : 'free',
    });
  } catch (error) {
    console.error('Credit balance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credit balance' },
      { status: 500 }
    );
  }
}
