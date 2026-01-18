# Backend Tasks Required

## Critical Issues (Fix Immediately)

### 1. Credits Not Being Deducted on Failed Generations
**Issue:** When API calls fail (400 errors), user credits are still being deducted.
**Fix Required:** Only deduct credits AFTER successful generation response.
```typescript
// In /api/generate, /api/reply, /api/thread endpoints:
// BEFORE deducting credits:
const generationResult = await generateWithAI(...)
if (!generationResult.success) {
  return error response // Don't deduct credits
}
// AFTER success:
await deductUserCredits(userId, 1)
```

### 2. User Profile Data Not Fetching
**Issue:** Dashboard sidebar shows "User" and "user@example.com" instead of actual signup data.
**Fix Required:**
- `/api/auth/me` endpoint must return: `{ name, email, plan, image, creditsUsed, creditsLimit }`
- Verify database query is fetching from users table correctly
- Check session/JWT includes user ID to query database

### 3. Generation History Not Saving/Displaying
**Issue:** /dashboard/history page is empty - generations aren't being recorded.
**Fix Required:**
- After successful generation in `/api/generate`, `/api/reply`, `/api/thread`:
```sql
INSERT INTO generations (user_id, type, platform, tone, topic, content, created_at)
VALUES ($1, $2, $3, $4, $5, $6, NOW())
```
- `/api/history` endpoint must query and return user's generations

### 4. Contact Form Submission
**Issue:** Form submits but doesn't send email or save to database.
**Fix Required:**
- `/api/contact` endpoint needs to:
  1. Save to database: `INSERT INTO contact_submissions (name, email, subject, message, created_at)`
  2. Send confirmation email to user
  3. Send notification email to support@postcontent.io
  4. Redirect to success page: `/contact/success`

### 5. Feedback Modal Submission (400 Error)
**Issue:** `/api/feedback` returns 400 when submitting feedback.
**Fix Required:**
- Verify request body schema matches what frontend sends: `{ feedback: string, userId: string }`
- Save to database: `INSERT INTO feedback (user_id, message, created_at)`
- Send notification to team
- Return success response

### 6. Credits Real-Time Update
**Issue:** Credits counter doesn't update immediately after generation.
**Fix Required:**
- After deducting credit, return updated credits in API response
- Frontend refetches user data after successful generation
- Or use Server-Sent Events for real-time updates

## Generation Errors to Fix

### /api/generate
- Returns 400 error
- Debug: Check request body schema, AI model API key, prompt template

### /api/reply
- Returns 400 error  
- Debug: Verify original post context is being passed correctly

### /api/thread
- Returns 405 error (Method Not Allowed)
- Fix: Ensure POST method is allowed
- Also getting React error about returning objects - ensure API returns `{ threads: string[] }` not raw objects

### /api/train
- Returns 405 error
- Note: This feature should be disabled for now (frontend already hidden)

## Email Verification Flow

**Current Issue:** After verifying email, redirects to login instead of showing success message.

**Recommended Flow:**
1. User clicks "Verify Email" button in email
2. GET `/api/verify-email?token=xxx`
3. Backend validates token, marks email as verified
4. Redirect to `/verify-success` page with message
5. Show "Email Verified! Redirecting to dashboard..." 
6. Auto-redirect to /dashboard after 3 seconds

**Alternative (Better UX):**
Skip email verification entirely - just send welcome email after signup and let them log in immediately.

## Password Reset Confirmation

**Missing:** After successful password reset, no confirmation email is sent.

**Fix:** In `/api/reset-password` after password update:
- Send email: "Your password was successfully changed"
- Include: timestamp, IP address, "If this wasn't you, contact support immediately"

## Authentication Issues

### Google OAuth Duplicate Accounts
**Issue:** Signing up with Google when email already exists creates duplicate or fails silently.

**Fix in OAuth callback:**
```typescript
const existingUser = await findUserByEmail(googleProfile.email)
if (existingUser) {
  // Link Google OAuth to existing account
  await updateUser(existingUser.id, { googleId: googleProfile.id })
  // Log them in
  return createSession(existingUser)
} else {
  // Create new user
  const newUser = await createUser({...googleProfile, emailVerified: true})
  return createSession(newUser)
}
```

### Mock User on /success Page
**Issue:** Shows "User" profile in dropdown even when not logged in.

**Fix:** `/success` page should not show user dropdown at all, or check auth status first.

## Checkout & Payments

### Pro Plan Checkout (Works but opens in same tab)
**Frontend Fixed:** Now opens in new tab
**Backend:** No changes needed

### Enterprise Plan Checkout (Unresponsive)
**Frontend Fixed:** Now opens mailto link
**Backend:** Consider adding form at `/enterprise` that sends inquiry email instead of just mailto

## Database Schema Verification

Ensure these tables exist:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  password_hash VARCHAR, -- for email/password signup
  google_id VARCHAR, -- for OAuth
  plan VARCHAR DEFAULT 'free',
  credits_used INT DEFAULT 0,
  credits_limit INT DEFAULT 10,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generations
CREATE TABLE generations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR, -- 'post', 'reply', 'thread', 'video-script'
  platform VARCHAR, -- 'twitter', 'linkedin'
  tone VARCHAR,
  topic TEXT,
  content JSONB, -- Store all variants
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  subject VARCHAR,
  message TEXT,
  status VARCHAR DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Progress Bar Enhancement

**Current:** Fake simulated progress bar
**User Request:** Real-time progress from Claude API

**Implementation Options:**

**Option 1: Server-Sent Events (SSE)**
```typescript
// Backend
export async function POST(req: Request) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("data: {\"progress\": 10}\n\n"))
      
      // Call Claude API with streaming
      const result = await claude.generate({...})
      
      controller.enqueue(encoder.encode("data: {\"progress\": 100, \"result\": ...}\n\n"))
      controller.close()
    }
  })
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" }
  })
}

// Frontend
const eventSource = new EventSource('/api/generate')
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  setProgress(data.progress)
}
```

**Option 2: WebSockets**
More complex, better for real-time bidirectional communication.

**Recommendation:** Start with SSE for progress updates.

---

## Answers to Your Questions

### 1. Should we apply Hook-Story-Offer format to all core features?

**My Recommendation: NO - Use Different Frameworks Per Feature**

Hook-Story-Offer is perfect for VIDEO SCRIPTS, but not ideal for everything.

**Post Generator:** Use **Problem-Solution-CTA** format
- Hook: Identify pain point
- Body: Provide value/insight
- CTA: Engagement question

**Reply Generator:** Use **Acknowledge-Add Value-Engage** format
- Acknowledge original point
- Add your perspective/insight
- Ask follow-up question or invite discussion

**Thread Generator:** Use **Hook-Develop-Conclude** format
- Tweet 1: Contrarian hook
- Tweets 2-N: Develop argument with examples
- Final tweet: Conclusion + CTA

**Video Script:** Use **Hook-Story-Offer** (already implemented)

**Caption Generator (new feature):** Use **Hook-Story-Offer** for Facebook/LinkedIn captions

**Bottom Line:** Match the format to the medium and purpose. Don't force one framework everywhere.

### 2. Do we need Redis here?

**YES - But Not Critical for Launch**

**What Redis is:**
A blazing-fast in-memory database for caching and temporary data.

**Use Cases for Your SaaS:**

**Priority 1: Rate Limiting**
```typescript
// Prevent abuse
const userKey = `ratelimit:${userId}`
const attempts = await redis.incr(userKey)
if (attempts > 10) {
  return error("Too many requests")
}
await redis.expire(userKey, 60) // Reset after 1 minute
```

**Priority 2: Cache AI Responses**
```typescript
// If same prompt is generated multiple times, serve from cache
const cacheKey = `generation:${hash(topic + platform + tone)}`
const cached = await redis.get(cacheKey)
if (cached) return cached
// Otherwise generate and cache for 1 hour
await redis.setex(cacheKey, 3600, result)
```

**Priority 3: Session Storage**
Faster than database queries for session lookups.

**Do You Need It Now?**
- Launch without it: Use PostgreSQL for everything
- Add after 500+ users: When performance becomes an issue

**Alternative:** Upstash Redis (serverless, free tier exists)

### 3. Do we need some sort of cache here?

**YES - Multiple Types of Caching**

**1. Browser Cache (Already Free)**
- Static assets (images, CSS, JS) already cached by Next.js
- No work needed

**2. API Response Caching**
```typescript
// Cache frequently accessed data
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const data = await fetchExpensiveData()
  return Response.json(data)
}
```

**3. Database Query Caching**
- Use Redis or Next.js `unstable_cache`
- Cache user profiles, plan details, credit counts

**4. AI Generation Caching**
- Cache common prompts (saves AI costs)
- If someone generates "How to grow on LinkedIn" - cache it
- Serve from cache if exact same prompt comes in

**Priority:** 
1. Add API response caching now (built into Next.js)
2. Add Redis caching after 500+ users
3. Add AI response caching when costs become significant

### 4. What do you think we should do here? Any suggestions so far?

**Phase 1: Fix Critical Bugs (This Week)**
1. User profile data fetching
2. Credits deduction on failure bug
3. Generation history saving
4. API endpoint 400/405 errors
5. Contact form and feedback submission

**Phase 2: Polish UX (Next Week)**
1. Real-time credits updates
2. Email confirmation flows
3. Better error messages
4. Loading states improvements

**Phase 3: New Features (After Launch)**
1. Caption Generator (/dashboard/caption)
2. Video Script Generator (separate from threads)
3. Real-time progress bars (SSE)
4. Voice training (complex - save for later)

**Phase 4: Scale (After 100+ Paying Users)**
1. Add Redis for caching
2. Implement rate limiting
3. Add analytics dashboard
4. API access for Enterprise users

**Strategic Advice:**

**Don't:**
- Build voice training yet (too complex, not validated)
- Add Redis/caching yet (premature optimization)
- Perfect every feature (ship fast, iterate)

**Do:**
- Fix all generation bugs FIRST
- Make sure payments work flawlessly
- Get 10 paying users before adding features
- Talk to users - ask what they actually need

**Your Biggest Risk:** Building features nobody uses. Validate with real users first.

**Your Best Opportunity:** You have solid pricing ($19/month is perfect), good UI, clear value prop. Just need to fix bugs and ship.

---

## Priority Order (What Backend Should Work On)

**Week 1 (Critical Path to Launch):**
1. Fix user profile data fetching ⭐️⭐️⭐️
2. Fix generation API endpoints (400/405 errors) ⭐️⭐️⭐️
3. Fix credits deduction bug ⭐️⭐️⭐️
4. Implement generation history saving ⭐️⭐️
5. Fix contact form submission ⭐️⭐️

**Week 2 (Polish):**
6. Real-time credits updates ⭐️⭐️
7. Email verification flow improvements ⭐️
8. Password reset confirmation email ⭐️
9. Google OAuth duplicate handling ⭐️

**Week 3 (New Features):**
10. Caption Generator backend
11. Separate video script from threads
12. Real-time progress (SSE)

**Can Wait:**
- Redis/caching (after 500 users)
- Voice training (after validation)
- API access (after Enterprise customers)
- Team collaboration (after demand)

---

**Remember:** Perfect is the enemy of shipped. Fix the critical bugs, launch, get users, iterate based on real feedback.
