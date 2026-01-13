/**
 * CSRF protection for API routes
 * Validates requests come from trusted origins
 */

const TRUSTED_ORIGINS = [
  'https://www.postcontent.io',
  'https://postcontent.io',
  'https://post-content-lilac.vercel.app',
];

/**
 * Verify CSRF token by checking origin and referer headers
 * For same-origin requests in production
 */
export function verifyCsrfToken(request: Request): boolean {
  // In development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Check if request comes from trusted origin
  if (origin && TRUSTED_ORIGINS.includes(origin)) {
    return true;
  }
  
  // Check if referer matches trusted domain
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
      if (TRUSTED_ORIGINS.includes(refererOrigin)) {
        return true;
      }
    } catch {
      // Invalid referer URL
    }
  }
  
  // For localhost during development
  if (origin?.includes('localhost') || referer?.includes('localhost')) {
    return true;
  }
  
  return false;
}
