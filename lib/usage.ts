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
  return await prisma.post.create({
    data: {
      userId,
      content,
      type,
    },
  });
}

export async function getUserUsage(userId: string) {
  const count = await getUserPostCount(userId);
  
  return {
    used: count,
    limit: FREE_TIER_LIMIT,
    remaining: Math.max(0, FREE_TIER_LIMIT - count),
    percentage: Math.min(100, (count / FREE_TIER_LIMIT) * 100),
  };
}

export async function canUserGeneratePost(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  // If user has no subscription, check free tier limit
  const count = await getUserPostCount(userId);
  return count < FREE_TIER_LIMIT;
}
