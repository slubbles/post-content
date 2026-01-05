/**
 * Shared TypeScript types for PostContent API
 * Use these in both your backend and v0 frontend
 */

// ==================== USER & AUTH ====================

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  subscribed?: boolean;
  subscriptionStatus?: string;
}

export interface Session {
  user: User;
  expires: string;
}

// ==================== CONTENT GENERATION ====================

export type TonePreset = 'sarcastic' | 'raw' | 'roast';

export interface GenerateRequest {
  input: string;
  tone: TonePreset;
}

export interface GenerateResponse {
  posts: string[];
}

// ==================== REPLY GENERATION ====================

export interface ReplyRequest {
  postToReply: string;
  context?: string;
}

export type ReplyTag = 'Funny' | 'Insightful' | 'Spicy';

export interface Reply {
  text: string;
  tag: ReplyTag;
}

export interface ReplyResponse {
  replies: Reply[];
}

// ==================== THREAD GENERATION ====================

export interface ThreadRequest {
  topic: string;
  numberOfTweets?: number; // Default: 5
}

export interface Tweet {
  id: string;
  text: string;
}

export interface ThreadResponse {
  thread: Tweet[];
}

// ==================== VOICE TRAINING ====================

export interface TrainRequest {
  samples: string[];
}

export interface TrainResponse {
  success: boolean;
  message?: string;
}

// ==================== USAGE TRACKING ====================

export interface UsageResponse {
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
}

// ==================== ERROR HANDLING ====================

export interface APIError {
  error: string;
  code?: string;
  details?: any;
}

// ==================== HISTORY ====================

export interface SavedPost {
  id: string;
  text: string;
  tone: TonePreset;
  timestamp: string;
  used: boolean;
}

// ==================== SETTINGS ====================

export interface UserSettings {
  autoSave: boolean;
  showCharCount: boolean;
  defaultTone: TonePreset;
}
