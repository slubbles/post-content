# API Documentation

Complete reference for all PostContent API endpoints.

## 📋 Table of Contents

- [Authentication](#authentication)
- [Content Generation](#content-generation)
- [History Management](#history-management)
- [Subscription & Billing](#subscription--billing)
- [User Management](#user-management)
- [File Uploads](#file-uploads)
- [Webhooks](#webhooks)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

All authenticated endpoints require a valid session cookie. Use NextAuth for authentication.

### POST `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure-password"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` - Invalid input
- `409` - Email already exists

---

### POST `/api/auth/signin`

Sign in with email and password (handled by NextAuth).

---

### GET `/api/auth/signout`

Sign out current user (handled by NextAuth).

---

### GET `/api/auth/me`

Get current authenticated user.

**Response (200):**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://blob.vercel-storage.com/...",
  "subscribed": true,
  "subscriptionStatus": "active",
  "plan": "pro"
}
```

**Errors:**
- `401` - Not authenticated

---

## ✨ Content Generation

### POST `/api/generate`

Generate post variations based on input.

**Authentication:** Required  
**Rate Limit:** 10 requests/minute

**Request Body:**
```json
{
  "content": "Your post idea here",
  "platform": "twitter",
  "tone": "sarcastic",
  "examples": ["example1", "example2"]
}
```

**Parameters:**
- `content` (string, required): Post idea or topic
- `platform` (string, required): `"twitter"` or `"linkedin"`
- `tone` (string, required): `"sarcastic"`, `"raw_builder"`, `"self_roast"`, `"professional"`, `"enthusiastic"`, `"storytelling"`, `"controversial"`
- `examples` (array, optional): Training examples for voice learning

**Response (200):**
```json
{
  "variations": [
    "Generated post variation 1",
    "Generated post variation 2",
    "Generated post variation 3"
  ],
  "postId": "post_123"
}
```

**Errors:**
- `400` - Invalid input
- `401` - Not authenticated
- `402` - Insufficient credits
- `429` - Rate limit exceeded
- `500` - Generation failed

---

### POST `/api/generate/thread`

Generate a multi-tweet thread.

**Authentication:** Required  
**Rate Limit:** 10 requests/minute

**Request Body:**
```json
{
  "topic": "How to build a SaaS product",
  "platform": "twitter",
  "tone": "professional",
  "tweetCount": 5
}
```

**Response (200):**
```json
{
  "thread": [
    "Tweet 1 content",
    "Tweet 2 content",
    "Tweet 3 content",
    "Tweet 4 content",
    "Tweet 5 content"
  ],
  "postId": "post_456"
}
```

**Errors:**
- Same as `/api/generate`

---

### POST `/api/generate/reply`

Generate a reply to another post.

**Authentication:** Required  
**Rate Limit:** 10 requests/minute

**Request Body:**
```json
{
  "originalPost": "The original post content",
  "context": "Additional context if needed",
  "tone": "professional"
}
```

**Response (200):**
```json
{
  "replies": [
    "Reply variation 1",
    "Reply variation 2",
    "Reply variation 3"
  ],
  "postId": "post_789"
}
```

---

## 📚 History Management

### GET `/api/history`

Fetch user's generation history.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20, max: 100)
- `platform` (string, optional): Filter by platform
- `tone` (string, optional): Filter by tone
- `search` (string, optional): Search in content

**Response (200):**
```json
{
  "posts": [
    {
      "id": "post_123",
      "content": "Generated post content",
      "platform": "twitter",
      "tone": "sarcastic",
      "createdAt": "2026-01-24T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

### DELETE `/api/history/:id`

Delete a post from history.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Response (200):**
```json
{
  "success": true,
  "message": "Post deleted"
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not authorized to delete this post
- `404` - Post not found

---

## 💳 Subscription & Billing

### POST `/api/checkout`

Create a Polar.sh checkout session.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Request Body:**
```json
{
  "plan": "pro_monthly",
  "billingCycle": "monthly"
}
```

**Parameters:**
- `plan` (string, required): `"pro_monthly"`, `"pro_annual"`, `"enterprise"`
- `billingCycle` (string, optional): `"monthly"` or `"annual"`

**Response (200):**
```json
{
  "checkoutUrl": "https://polar.sh/checkout/...",
  "sessionId": "session_123"
}
```

**Errors:**
- `400` - Invalid plan
- `401` - Not authenticated
- `409` - Already subscribed

---

### POST `/api/subscription/cancel`

Cancel active subscription.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Response (200):**
```json
{
  "success": true,
  "message": "Subscription cancelled",
  "endsAt": "2026-02-24T10:00:00Z"
}
```

**Errors:**
- `401` - Not authenticated
- `404` - No active subscription
- `500` - Failed to cancel with payment provider

---

### POST `/api/webhooks/polar`

Handle Polar.sh webhook events (subscription updates).

**Authentication:** HMAC signature verification  
**Rate Limit:** 60 requests/minute

**Headers:**
- `x-polar-signature` (required): HMAC-SHA256 signature

**Request Body:**
```json
{
  "event": "subscription.created",
  "data": {
    "subscription": {
      "id": "sub_123",
      "status": "active",
      "userId": "user_123"
    }
  }
}
```

**Response (200):**
```json
{
  "success": true
}
```

**Errors:**
- `401` - Invalid signature
- `400` - Invalid payload

---

## 👤 User Management

### GET `/api/usage`

Get user's usage statistics.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Response (200):**
```json
{
  "creditsUsed": 45,
  "creditsRemaining": 155,
  "totalCredits": 200,
  "resetDate": "2026-02-01T00:00:00Z",
  "plan": "pro",
  "isPro": true
}
```

---

### PATCH `/api/user/profile`

Update user profile.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute

**Request Body:**
```json
{
  "name": "New Name",
  "bio": "Updated bio"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "New Name",
    "bio": "Updated bio"
  }
}
```

---

## 📁 File Uploads

### POST `/api/upload/photo`

Upload profile photo to Vercel Blob.

**Authentication:** Required  
**Rate Limit:** 60 requests/minute  
**Max Size:** 2MB  
**Allowed Types:** JPEG, PNG, GIF, WebP

**Request:**
```
Content-Type: multipart/form-data

photo: [File]
```

**Response (200):**
```json
{
  "url": "https://blob.vercel-storage.com/avatars/user_123-1234567890.jpg",
  "message": "Photo uploaded successfully"
}
```

**Errors:**
- `400` - No file provided / Invalid file type / File too large
- `401` - Not authenticated
- `429` - Rate limit exceeded
- `500` - Upload failed

---

## 🔔 Webhooks

### Webhook Events

PostContent sends webhooks for important events.

#### subscription.updated
Sent when a subscription status changes.

```json
{
  "event": "subscription.updated",
  "userId": "user_123",
  "subscription": {
    "status": "active",
    "plan": "pro",
    "periodEnd": "2026-02-24T10:00:00Z"
  }
}
```

#### generation.completed
Sent when content generation completes.

```json
{
  "event": "generation.completed",
  "userId": "user_123",
  "postId": "post_123",
  "creditsUsed": 1
}
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Authentication required |
| 402 | Payment Required | Insufficient credits |
| 403 | Forbidden | Not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Error Codes

- `AUTH_REQUIRED` - Authentication needed
- `INVALID_INPUT` - Request validation failed
- `INSUFFICIENT_CREDITS` - Not enough credits
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `GENERATION_FAILED` - AI generation error
- `SUBSCRIPTION_REQUIRED` - Feature requires subscription

---

## 🚦 Rate Limiting

### Limits by Endpoint Category

| Category | Limit | Window |
|----------|-------|--------|
| AI Generation | 10 requests | 1 minute |
| General API | 60 requests | 1 minute |
| Webhooks | 60 requests | 1 minute |

### Rate Limit Headers

Responses include rate limit information:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1737715200
```

### Rate Limit Exceeded Response

```json
{
  "error": "Too many requests",
  "retryAfter": 45
}
```

**Headers:**
```
Retry-After: 45
```

---

## 🔧 Request/Response Examples

### Example: Generate a Post

```bash
curl -X POST https://postcontent.io/api/generate \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "content": "Tips for building a successful SaaS",
    "platform": "twitter",
    "tone": "professional"
  }'
```

**Response:**
```json
{
  "variations": [
    "Building a successful SaaS? Focus on solving real problems, not features.",
    "SaaS success starts with understanding your customer's pain points deeply.",
    "The best SaaS products are built for users, not for investors."
  ],
  "postId": "post_abc123"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All request bodies must be valid JSON
- Authentication uses HTTP-only cookies (NextAuth)
- CORS is configured for same-origin requests only
- API is versioned at the path level (future: `/api/v2/...`)

---

## 🔗 Related Resources

- [Main Documentation](./README.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Polar.sh Webhook Docs](https://docs.polar.sh/webhooks)
- [NextAuth Documentation](https://authjs.dev/)

---

**Last Updated:** January 24, 2026  
**API Version:** 1.0.0
