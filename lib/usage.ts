import { prisma } from './db';

export const FREE_TIER_LIMIT = 10; // 10 posts per month

export async function getUserPostCount(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const count = await prisma.post.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });
  
  return count;
}

export async function trackPostGeneration(userId: string, content: string, type: string = 'generate') {
  // Create post record for history
  const post = await prisma.post.create({
    data: {
      userId,
      content,
      type,
    },
  });

  return post;
}

export async function getUserUsage(userId: string) {
  const count = await getUserPostCount(userId);
  
  // Check if user is Pro
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscribed: true, subscriptionStatus: true },
  });
  
  const isPro = user?.subscribed && user?.subscriptionStatus === 'active';
  const limit = isPro ? 200 : FREE_TIER_LIMIT; // Pro: 200, Free: 10
  
  return {
    used: count,
    limit: limit,
    remaining: isPro ? Math.max(0, limit - count) : Math.max(0, limit - count),
    percentage: Math.min(100, (count / limit) * 100),
  };
}

export async function canUserGeneratePost(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscribed: true, subscriptionStatus: true },
  });
  
  // Pro users have unlimited access
  if (user?.subscribed && user?.subscriptionStatus === 'active') {
    return true;
  }
  
  // Free users: check monthly limit
  const count = await getUserPostCount(userId);
  return count < FREE_TIER_LIMIT;
}
