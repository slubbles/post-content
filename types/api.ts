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

export type TonePreset = 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational';
export type PlatformType = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'threads';

export type HumannessLevel = 
  | 'corporate_polished' 
  | 'professional_authentic' 
  | 'casual_authentic' 
  | 'texting_friend';

export interface GenerateRequest {
  input: string;
  tone: TonePreset;
  platform: PlatformType;
  humanness?: HumannessLevel;
  multiHumanness?: boolean;
}

export interface AIDetectionResult {
  riskScore: number;              // 0-100
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH';
  flags: string[];                // What triggered detection
  recommendations: string[];       // How to fix
  passed: boolean;                 // Score < 40
  metrics: {
    avgSentenceLength: number;
    hasPersonalPronouns: boolean;
    hasContractions: boolean;
    aiBuzzwordCount: number;
    complexPunctuation: boolean;
  };
}

export interface GenerationResult {
  content: string;
  humanness?: string;
  aiDetection: AIDetectionResult;
}

export interface GenerateResponse {
  posts: string[];
  variations?: GenerationResult[];
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
