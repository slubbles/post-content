/**
 * Input sanitization and validation utilities
 */

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
