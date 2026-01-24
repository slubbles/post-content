/**
 * Input sanitization and validation utilities
 */

import type { AIDetectionResult } from '@/types/api';

/**
 * Sanitize text input by removing potentially dangerous content
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Limit consecutive whitespace
    .replace(/\s{10,}/g, '          ')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Validate and sanitize generation input
 */
export function validateGenerateInput(input: unknown): { 
  valid: boolean; 
  error?: string; 
  sanitized?: string;
} {
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' };
  }
  
  const sanitized = sanitizeInput(input);
  
  if (sanitized.length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  if (sanitized.length < 3) {
    return { valid: false, error: 'Input must be at least 3 characters' };
  }
  
  if (sanitized.length > 5000) {
    return { valid: false, error: 'Input cannot exceed 5000 characters' };
  }
  
  return { valid: true, sanitized };
}

/**
 * Validate tone parameter
 */
export function validateTone(tone: unknown): { 
  valid: boolean; 
  error?: string; 
  value?: string;
} {
  const validTones = ['professional', 'casual', 'humorous', 'inspirational', 'educational'];
  
  if (typeof tone !== 'string') {
    return { valid: false, error: 'Tone must be a string' };
  }
  
  const normalized = tone.toLowerCase().trim();
  
  if (!validTones.includes(normalized)) {
    return { valid: false, error: `Invalid tone. Must be one of: ${validTones.join(', ')}` };
  }
  
  return { valid: true, value: normalized };
}

/**
 * Validate platform parameter
 */
export function validatePlatform(platform: unknown): { 
  valid: boolean; 
  error?: string; 
  value?: string;
} {
  const validPlatforms = ['twitter', 'linkedin', 'instagram', 'facebook', 'threads'];
  
  if (typeof platform !== 'string') {
    return { valid: false, error: 'Platform must be a string' };
  }
  
  const normalized = platform.toLowerCase().trim();
  
  if (!validPlatforms.includes(normalized)) {
    return { valid: false, error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}` };
  }
  
  return { valid: true, value: normalized };
}

/**
 * Validate email format
 */
export function validateEmail(email: unknown): { 
  valid: boolean; 
  error?: string; 
  value?: string;
} {
  if (typeof email !== 'string') {
    return { valid: false, error: 'Email must be a string' };
  }
  
  const trimmed = email.trim().toLowerCase();
  
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email too long' };
  }
  
  return { valid: true, value: trimmed };
}

/**
 * Validate password strength
 */
export function validatePassword(password: unknown): { 
  valid: boolean; 
  error?: string;
} {
  if (typeof password !== 'string') {
    return { valid: false, error: 'Password must be a string' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Password too long' };
  }
  
  return { valid: true };
}

/**
 * Validate array of strings (e.g., posts for voice training)
 */
export function validateStringArray(
  arr: unknown, 
  minLength: number = 1, 
  maxLength: number = 100,
  maxItemLength: number = 5000
): { 
  valid: boolean; 
  error?: string; 
  sanitized?: string[];
} {
  if (!Array.isArray(arr)) {
    return { valid: false, error: 'Must be an array' };
  }
  
  if (arr.length < minLength) {
    return { valid: false, error: `Array must have at least ${minLength} items` };
  }
  
  if (arr.length > maxLength) {
    return { valid: false, error: `Array cannot have more than ${maxLength} items` };
  }
  
  const sanitized: string[] = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      return { valid: false, error: `Item at index ${i} must be a string` };
    }
    
    const item = sanitizeInput(arr[i]);
    
    if (item.length > maxItemLength) {
      return { valid: false, error: `Item at index ${i} exceeds ${maxItemLength} characters` };
    }
    
    if (item.length > 0) {
      sanitized.push(item);
    }
  }
  
  if (sanitized.length < minLength) {
    return { valid: false, error: `Need at least ${minLength} non-empty items` };
  }
  
  return { valid: true, sanitized };
}

/**
 * Check content for AI detection risk
 * Analyzes 8 metrics to score how likely content will be flagged as AI-generated
 */
export function checkAIDetectionRisk(content: string): AIDetectionResult {
  let riskScore = 0;
  const flags: string[] = [];
  const recommendations: string[] = [];
  
  // METRIC 1: AI Buzzwords (15 points each)
  const aiBuzzwords = [
    'delve', 'tapestry', 'leverage', 'dive deep', 'unpack', 
    'landscape', 'paradigm', 'synergy', 'robust', 'comprehensive',
    'innovative', 'cutting-edge', 'revolutionary', 'game-changer',
    'unlock', 'harness', 'seamless', 'elevate', 'transform',
    'optimize', 'streamline', 'empower', 'dynamic'
  ];
  
  let buzzwordCount = 0;
  aiBuzzwords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      buzzwordCount += matches.length;
      riskScore += 15 * matches.length;
      flags.push(`❌ AI buzzword: "${word}" (${matches.length}x)`);
      recommendations.push(`Replace "${word}" with simpler alternative`);
    }
  });
  
  // METRIC 2: Sentence Length (20 points if too long)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.length > 0 
    ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length 
    : 0;
  
  if (avgLength > 25) {
    riskScore += 20;
    flags.push(`⚠️ Long sentences (avg ${avgLength.toFixed(1)} words)`);
    recommendations.push('Break up long sentences into shorter ones');
  } else if (avgLength > 20) {
    riskScore += 10;
    flags.push(`⚠️ Slightly long sentences (avg ${avgLength.toFixed(1)} words)`);
  }
  
  // METRIC 3: Personal Pronouns (15 points if missing - reduced from 25)
  const personalWords = ['I', "I'm", "I've", "I'll", 'my', 'me', 'we', "we're", 'our'];
  const hasPersonal = personalWords.some(word => 
    new RegExp(`\\b${word}\\b`, 'i').test(content)
  );
  
  if (!hasPersonal && content.length > 50) {  // Only penalize longer content
    riskScore += 15;
    flags.push('❌ No personal pronouns (sounds robotic)');
    recommendations.push("Add 'I', 'my', 'we', or personal experiences");
  }
  
  // METRIC 4: Contractions (15 points if missing)
  const contractions = ["'m", "'re", "'ve", "'ll", "n't", "'d"];
  const hasContractions = contractions.some(c => content.includes(c));
  
  if (!hasContractions) {
    riskScore += 15;
    flags.push('❌ No contractions (too formal)');
    recommendations.push("Use I'm, you're, it's, don't, can't");
  }
  
  // METRIC 5: Complex Punctuation (10 points)
  const hasComplexPunctuation = content.includes('—') || 
                                 content.includes(';') || 
                                 (content.includes(':') && content.split(':').length > 2);
  
  if (hasComplexPunctuation) {
    riskScore += 10;
    flags.push('⚠️ Overly formal punctuation (em-dashes, semicolons)');
    recommendations.push('Use simple periods, commas, and occasional dashes');
  }
  
  // METRIC 6: Perfect Parallel Structure (AI tell - 15 points)
  const bulletPoints = content.match(/^[-•*]\s/gm);
  if (bulletPoints && bulletPoints.length >= 3) {
    const lines = content.split('\n').filter(l => l.match(/^[-•*]\s/));
    const allSameLength = lines.every(l => Math.abs(l.length - lines[0].length) < 10);
    
    if (allSameLength) {
      riskScore += 15;
      flags.push('⚠️ Perfect parallel structure (AI pattern)');
      recommendations.push('Vary bullet point length and structure');
    }
  }
  
  // METRIC 7: Opening/Closing Patterns (5-10 points)
  const strongWeakOpenings = [
    'Here are', 'Let me', 'Today I want', 'In this post',
    'Welcome to', "I'm excited to", 'Join me'
  ];
  
  const humanOpenings = [
    'Quick tip', 'Pro tip', 'Hot take', 'Unpopular opinion'
  ];
  
  // Strong AI indicators (10 points)
  strongWeakOpenings.forEach(opening => {
    if (content.toLowerCase().startsWith(opening.toLowerCase())) {
      riskScore += 10;
      flags.push(`⚠️ Generic AI opening: "${opening}"`);
      recommendations.push('Start with a hook, question, or bold statement');
    }
  });
  
  // Weak AI indicators (5 points) - humans use these too
  humanOpenings.forEach(opening => {
    if (content.toLowerCase().startsWith(opening.toLowerCase())) {
      riskScore += 5;
      flags.push(`⚠️ Generic opening: "${opening}"`);
    }
  });
  
  // METRIC 8: Overly Enthusiastic (AI tell - 5 points)
  const exclamationCount = (content.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    riskScore += 5;
    flags.push('⚠️ Excessive exclamation marks');
    recommendations.push('Use exclamation marks sparingly');
  }
  
  // POSITIVE SIGNAL 1: Emojis (-5 points)
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
  if (emojiRegex.test(content)) {
    riskScore = Math.max(0, riskScore - 5);
    flags.push('✅ Has emojis (more human-like)');
  }
  
  // POSITIVE SIGNAL 2: Sentence fragments (-5 points)
  const fragmentPatterns = [
    /^[A-Z][a-z]+\.$/m,  // Single word sentences like "Exactly."
    /\.\.\./,             // Trailing off thoughts
    /^(lol|idk|ngl|tbh|honestly|basically)\b/im  // Casual starts
  ];
  
  let fragmentCount = 0;
  fragmentPatterns.forEach(pattern => {
    if (pattern.test(content)) fragmentCount++;
  });
  
  if (fragmentCount > 0) {
    riskScore = Math.max(0, riskScore - (fragmentCount * 3));
    flags.push(`✅ Has sentence fragments (${fragmentCount}) - human-like`);
  }
  
  // Calculate risk level
  let riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH';
  if (riskScore >= 60) riskLevel = 'HIGH';
  else if (riskScore >= 40) riskLevel = 'MEDIUM';
  else if (riskScore >= 20) riskLevel = 'LOW';
  else riskLevel = 'MINIMAL';
  
  return {
    riskScore: Math.min(riskScore, 100), // Cap at 100
    riskLevel,
    flags,
    recommendations: [...new Set(recommendations)], // Remove duplicates
    passed: riskScore < 40,
    metrics: {
      avgSentenceLength: parseFloat(avgLength.toFixed(1)),
      hasPersonalPronouns: hasPersonal,
      hasContractions: hasContractions,
      aiBuzzwordCount: buzzwordCount,
      complexPunctuation: hasComplexPunctuation
    }
  };
}

/**
 * Get risk badge emoji for UI display
 */
export function getRiskBadge(riskLevel: string): string {
  const badges: Record<string, string> = {
    'MINIMAL': '🟢',
    'LOW': '🟢',
    'MEDIUM': '🟡',
    'HIGH': '🔴'
  };
  return badges[riskLevel] || '⚪';
}

/**
 * Get risk color for UI styling
 */
export function getRiskColor(riskLevel: string): string {
  const colors: Record<string, string> = {
    'MINIMAL': 'green',
    'LOW': 'green',
    'MEDIUM': 'yellow',
    'HIGH': 'red'
  };
  return colors[riskLevel] || 'gray';
}
