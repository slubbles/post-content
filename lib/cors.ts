/**
 * CORS configuration for API routes
 * Allows cross-origin requests from trusted domains
 */

const ALLOWED_ORIGINS = [
  'https://www.postcontent.io',
  'https://postcontent.io',
  'https://post-content-lilac.vercel.app',
  process.env.NEXTAUTH_URL || 'http://localhost:3000',
];

export function getCorsHeaders(origin?: string | null): HeadersInit {
  // Check if origin is allowed
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);
  
  if (isAllowed) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    };
  }
  
  // For same-origin requests or during development
  return {};
}

export function handleCorsPrelight(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }
  return null;
}
