// Analytics and tracking utilities for PostContent

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: string;
}

export interface UsageStats {
  totalPosts: number;
  totalThreads: number;
  totalReplies: number;
  totalVoiceTrainings: number;
  mostUsedTone: string;
  copyRate: number; // percentage of posts that were copied
  avgGenerationTime: number; // in seconds
  lastUsed: string;
}

/**
 * Track an analytics event to localStorage
 */
export function trackEvent(name: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };

  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(event);
    
    // Keep only last 1000 events
    const recentEvents = events.slice(-1000);
    localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Get usage statistics from localStorage
 */
export function getUsageStats(): UsageStats {
  if (typeof window === 'undefined') {
    return {
      totalPosts: 0,
      totalThreads: 0,
      totalReplies: 0,
      totalVoiceTrainings: 0,
      mostUsedTone: 'sarcastic',
      copyRate: 0,
      avgGenerationTime: 0,
      lastUsed: new Date().toISOString(),
    };
  }

  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');

    // Calculate stats
    const postGeneratedEvents = events.filter((e: AnalyticsEvent) => e.name === 'post_generated');
    const threadGeneratedEvents = events.filter((e: AnalyticsEvent) => e.name === 'thread_generated');
    const replyGeneratedEvents = events.filter((e: AnalyticsEvent) => e.name === 'reply_generated');
    const voiceTrainedEvents = events.filter((e: AnalyticsEvent) => e.name === 'voice_trained');
    const copiedEvents = events.filter((e: AnalyticsEvent) => e.name === 'post_copied');

    // Most used tone
    const tones: Record<string, number> = {};
    postGeneratedEvents.forEach((e: AnalyticsEvent) => {
      const tone = e.properties?.tone || 'sarcastic';
      tones[tone] = (tones[tone] || 0) + 1;
    });
    const mostUsedTone = Object.entries(tones).sort((a, b) => b[1] - a[1])[0]?.[0] || 'sarcastic';

    // Copy rate
    const totalGenerated = postGeneratedEvents.length;
    const totalCopied = copiedEvents.length;
    const copyRate = totalGenerated > 0 ? Math.round((totalCopied / totalGenerated) * 100) : 0;

    // Average generation time
    const generationTimes = postGeneratedEvents
      .map((e: AnalyticsEvent) => e.properties?.duration || 0)
      .filter((d: number) => d > 0);
    const avgGenerationTime = generationTimes.length > 0
      ? Math.round(generationTimes.reduce((a: number, b: number) => a + b, 0) / generationTimes.length / 1000)
      : 3;

    // Last used
    const lastEvent = events[events.length - 1];
    const lastUsed = lastEvent?.timestamp || new Date().toISOString();

    return {
      totalPosts: savedPosts.length,
      totalThreads: threadGeneratedEvents.length,
      totalReplies: replyGeneratedEvents.length,
      totalVoiceTrainings: voiceTrainedEvents.length,
      mostUsedTone,
      copyRate,
      avgGenerationTime,
      lastUsed,
    };
  } catch (error) {
    console.error('Failed to get usage stats:', error);
    return {
      totalPosts: 0,
      totalThreads: 0,
      totalReplies: 0,
      totalVoiceTrainings: 0,
      mostUsedTone: 'sarcastic',
      copyRate: 0,
      avgGenerationTime: 0,
      lastUsed: new Date().toISOString(),
    };
  }
}

/**
 * Calculate time saved estimate
 * Assumes: Writing a good post manually takes ~10 minutes
 */
export function getTimeSaved(): { hours: number; minutes: number } {
  const stats = getUsageStats();
  const totalContent = stats.totalPosts + stats.totalThreads + stats.totalReplies;
  const minutesSaved = totalContent * 10; // 10 minutes per post/thread/reply
  
  return {
    hours: Math.floor(minutesSaved / 60),
    minutes: minutesSaved % 60,
  };
}

/**
 * Export all analytics data as JSON
 */
export function exportAnalytics(): string {
  if (typeof window === 'undefined') return '{}';

  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const stats = getUsageStats();

    return JSON.stringify({
      stats,
      events,
      exportedAt: new Date().toISOString(),
    }, null, 2);
  } catch (error) {
    console.error('Failed to export analytics:', error);
    return '{}';
  }
}

/**
 * Clear all analytics data
 */
export function clearAnalytics(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('analytics_events');
  } catch (error) {
    console.error('Failed to clear analytics:', error);
  }
}
