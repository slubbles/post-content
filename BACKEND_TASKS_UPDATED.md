# Backend Tasks - Updated with All Issues

## FRONTEND WORK ALREADY COMPLETE

The following frontend UI work has been finished and is ready for backend integration:

### Pages & Content Rewritten
- `/about` - Rewritten with hook-story-offer framework
- `/how-it-works` - Rewritten with emotional-logic-urgency format
- `/faq` - Updated with accurate refund policy and platform support (Twitter/X and LinkedIn only)
- `/contact` - Added copy button for email, form submits to `/api/contact` and redirects to `/contact/success`
- `/pricing` - Smart CTAs based on auth status, shows "Current Plan" badge, opens checkout in new tab
- `/success` - Plan-specific content based on query param (e.g. `/success?plan=pro`)
- Blog posts - Full content created for 3 SEO posts with proper metadata
- Docs - Comprehensive documentation for all features

### New Dashboard Features Built
1. **Video Script Generator** (`/dashboard/video-script`)
   - Hook-Story-Offer input fields with character limits
   - Calls `/api/video-script` endpoint (needs backend)
   
2. **Caption Generator** (`/dashboard/caption`)
   - Facebook & LinkedIn captions only
   - Hook-Story-Offer format
   - Calls `/api/caption` endpoint (needs backend)

3. **Generation History** (`/dashboard/history`)
   - UI ready to display past generations
   - Needs `/api/history` endpoint to fetch data

### Dashboard Updates Complete
- Train AI page disabled with "Coming Soon" card
- New logo (yellow/black icon) throughout dashboard
- Sidebar navigation updated with Caption and Video Script options
- Instagram, Facebook, Threads removed from platform selection
- `/dashboard/account` consolidated (removed `/dashboard/account/general` redirect)
- Settings page reorganized: Save button on top, Export Data in Danger Zone section
- Feedback modal exists but needs `/api/feedback` endpoint

### Smart Pricing Features
- Fetches user's current plan via `/api/auth/me`
- Disables button and shows "Current Plan" badge for active subscription
- Changes CTA text based on auth status ("Start Free" vs "Upgrade" vs "Current Plan")
- All checkout links open in new tabs

### Mobile Optimization Complete
- All dashboard pages responsive
- Touch-friendly buttons and forms
- Proper text sizing across screen sizes
- Sidebar collapse on mobile

### What Frontend Expects from Backend

**1. `/api/auth/me` should return:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "plan": "free",
  "credits": 10,
  "creditsUsed": 0
}
```

**2. Generation endpoints should return:**
```json
{
  "success": true,
  "variants": ["variant 1", "variant 2", "variant 3"],
  "creditsRemaining": 7,
  "generationId": "gen-123"
}
```

**3. History endpoint (`/api/history`) should return:**
```json
{
  "generations": [
    {
      "id": "gen-123",
      "type": "post",
      "platform": "twitter",
      "prompt": "AI replacing jobs",
      "variants": ["..."],
      "createdAt": "2024-01-18T10:00:00Z"
    }
  ]
}
```

**4. All endpoints expecting:**
- POST method (not GET)
- JSON request body
- Authorization header with user token
- Return helpful error messages (not generic 400)

---

## CRITICAL - Must Fix Before Launch

### 1. User Data Not Being Fetched/Displayed
**Issue:** After signup, dashboard shows "User" and "user@example.com" instead of actual user data
**Location:** Dashboard sidebar, /dashboard/account page
**What's broken:**
- `/api/auth/me` not returning user's actual name and email
- User data from signup not being stored or retrieved properly

**Fix:**
```typescript
// /api/auth/me should return:
{
  id: "user-id",
  email: "actual-email@example.com",
  name: "Actual User Name",
  plan: "free", // or "pro" or "enterprise"
  credits: 10,
  creditsUsed: 0
}
```

### 2. Credits Not Being Deducted on Failed Generations
**Issue:** When generation fails (400 error), user still loses credits
**Location:** All generation features (/api/generate, /api/reply, /api/thread)
**Impact:** Users lose money when API fails

**Fix:**
- Only deduct credits AFTER successful generation
- Rollback credit deduction if generation fails
- Add transaction wrapper around: check credits → generate → deduct credits

### 3. Credits Not Updating in Real-Time on Frontend
**Issue:** Credit count on sidebar and feature pages doesn't update immediately after generation
**Location:** Dashboard sidebar, lightning icon on feature pages
**Fix:**
- After successful generation, return updated credit count in API response
- Frontend should update local state immediately
- Add WebSocket or polling for real-time updates (optional)

### 4. Generation History Not Saving
**Issue:** Generated content not appearing in /dashboard/history
**Location:** `/api/generate`, `/api/reply`, `/api/thread`, `/api/video-script`
**Fix:**
- After each successful generation, save to database:
  - type (post, reply, thread, video-script, caption)
  - platform
  - tone
  - original prompt
  - generated variants
  - timestamp
  - user_id

### 5. API Generation Endpoints Returning 400 Errors
**Endpoints broken:**
- `/api/generate` - working
- `/api/reply` - 400 error
- `/api/thread` - 405 error (Method Not Allowed)
- `/api/train` - 405 error
- `/api/feedback` - 400 error

**Fix each endpoint:**
- Check request body validation
- Ensure proper HTTP methods (POST)
- Return helpful error messages
- Log errors for debugging

### 6. Contact Form Not Sending Emails
**Issue:** After form submission, no email sent to user or to support
**Location:** `/api/contact` (doesn't exist yet)
**Fix:**
- Create `/api/contact` endpoint
- Send two emails:
  1. To support@postcontent.io with user's message
  2. To user's email confirming we received their message
- Use Resend or similar email service

### 7. Email Verification Flow Issues
**Issues:**
- After clicking "Verify Email", redirects to login instead of success page
- No feedback that email was verified successfully
- OTP vs email link unclear

**Recommended approach:**
- Keep email link verification (simpler UX)
- After verification, redirect to `/verified` page showing success
- Then auto-redirect to login after 3 seconds
- Send welcome email after verification

### 8. Password Reset Confirmation Missing
**Issue:** After resetting password, no confirmation email sent
**Fix:** Send "Your password was changed" email for security

### 9. Google OAuth Duplicate Account Issue
**Issue:** Signing up with Google when email already exists creates confusion
**Fix:** (Already documented in previous BACKEND_TASKS.md)

### 10. Affiliate Program Backend
**Issue:** Affiliate page exists but no tracking mechanism
**Fix:**
- Create affiliate tracking system
- Generate unique referral codes
- Track clicks, signups, conversions
- Calculate commissions
- Partner with affiliate platform (Rewardful, FirstPromoter) or build custom

## MEDIUM PRIORITY - Fix After Launch

### 11. Voice Training Backend
**Issue:** Train AI feature calls `/api/train` which returns 405
**Status:** Frontend disabled with "Coming Soon" - good for now
**Fix later:**
- Implement voice analysis endpoint
- Store voice profiles per user
- Apply voice profile to generation prompts

### 12. Real-Time Progress Bar for Generations
**Issue:** Loading bar is simulated, not showing actual AI progress
**Impact:** Poor UX, users don't know if it's working
**Fix:**
- Use Server-Sent Events (SSE) or WebSockets
- Stream progress updates from Claude API
- Show real-time status: "Analyzing prompt..." → "Generating variant 1..." → "Done"

### 13. Checkout Flow Error Handling
**Issue:** If Polar.sh checkout fails, user sees generic error
**Fix:**
- Better error messages
- Handle edge cases (card declined, etc.)
- Redirect back to pricing with error message

### 14. Plan-Specific Features Not Enforced
**Issue:** Nothing stops free user from trying to generate 200 posts
**Fix:**
- Check user's plan before each generation
- Return error if they exceeded limits
- Show upgrade prompt on frontend

## LOW PRIORITY - Nice to Have

### 15. API Rate Limiting
**Issue:** No rate limiting on endpoints
**Fix:** Add rate limiting to prevent abuse

### 16. Error Logging/Monitoring
**Issue:** No visibility into production errors
**Fix:** Add Sentry or similar error tracking

### 17. Analytics
**Issue:** No tracking of user behavior
**Fix:** Add PostHog or Plausible for product analytics

---

## Answers to Your Questions

### 1. Should we apply hook-story-offer format on all core features?

**Answer: NO - use different formats for different features.**

Here's the strategy:

**For Post Generator (/dashboard/generate):**
- Use **strategic variety** system (contrarian, story-based, data-driven)
- This is what you're doing now - it works

**For Caption Generator (/dashboard/caption):**
- Use **hook-story-offer** format
- Perfect for longer-form Facebook/LinkedIn captions
- User inputs hook, story, offer separately

**For Video Scripts (/dashboard/video-script):**
- Use **hook-story-offer** format
- This is exactly what video scripts need (already implemented in frontend)

**For Reply Generator (/dashboard/reply):**
- Use **match-tone** system
- Analyze original post's tone
- Generate reply that matches it

**For Thread Generator (/dashboard/thread):**
- Use **narrative arc** system
- Hook → Build tension → Resolution → CTA
- Different from hook-story-offer

**Why different formats?**
- Each content type has different goals
- Posts need variety (multiple angles)
- Captions need story structure
- Replies need tone matching
- Threads need narrative flow

**System prompt example for Caption Generator:**

```typescript
const captionPrompt = `
Generate a ${platform} caption using this structure:

HOOK (first 1-2 lines):
${userHook}
Make it attention-grabbing. Make people stop scrolling.

STORY (middle section):
${userStory}
Build connection. Share the journey, problem, or insight.

OFFER (final lines):
${userOffer}
Clear call-to-action. What should they do next?

Platform: ${platform}
Tone: ${tone}
Character limit: ${platform === 'facebook' ? 5000 : 3000}

Write naturally. Sound human, not AI.
`
```

### 2. Do we need Redis here?

**Answer: Not initially, but YES after you hit ~100 users.**

**What Redis is good for:**
- Caching frequently accessed data (user profiles, plan limits)
- Rate limiting (track API calls per user per minute)
- Session storage (faster than database)
- Queue management (handle generation requests in queue)

**When to add Redis:**
- You're seeing slow database queries (>100ms)
- You need rate limiting to prevent abuse
- You want to queue generations instead of processing instantly
- You have 100+ concurrent users

**How to use it:**

```typescript
// Cache user data
const userData = await redis.get(`user:${userId}`)
if (!userData) {
  const user = await db.getUserById(userId)
  await redis.set(`user:${userId}`, JSON.stringify(user), 'EX', 300) // Cache for 5 minutes
}

// Rate limiting
const requests = await redis.incr(`ratelimit:${userId}:${minute}`)
if (requests > 10) {
  return res.status(429).json({ error: "Too many requests" })
}
await redis.expire(`ratelimit:${userId}:${minute}`, 60)
```

**Recommendation:**
- Launch without Redis
- Add it when you see performance issues
- Use Upstash Redis (serverless, works with Vercel)

### 3. Do we need some sort of cache here?

**Answer: YES - but keep it simple.**

**What to cache:**

1. **User data** - cache for 5 minutes
   - Prevents database hit on every API call
   - Update cache when user changes plan/credits

2. **Plan limits** - cache forever (rarely changes)
   ```typescript
   const PLAN_LIMITS = {
     free: { credits: 10, variants: 3 },
     pro: { credits: 200, variants: 5 },
     enterprise: { credits: 999999, variants: 999 }
   }
   ```

3. **Generated content** - cache for 1 hour
   - If user regenerates same prompt within 1 hour, return cached result
   - Saves API costs

**What NOT to cache:**
- Credit counts (needs to be real-time)
- Generation history (needs to be real-time)
- User authentication state (security risk)

**Simple caching without Redis:**

```typescript
// In-memory cache (good enough for now)
const cache = new Map()

function getCached(key: string) {
  const item = cache.get(key)
  if (!item) return null
  if (Date.now() > item.expiry) {
    cache.delete(key)
    return null
  }
  return item.value
}

function setCache(key: string, value: any, ttl: number) {
  cache.set(key, {
    value,
    expiry: Date.now() + (ttl * 1000)
  })
}
```

### 4. What do you think we should do here? Any suggestions so far?

**Strategic Recommendations:**

**1. Focus on Core Quality First**
- Fix the 5 critical backend issues before adding features
- Quality of generations > quantity of features
- Users will forgive missing features, not broken core functionality

**2. Pricing Strategy Adjustment**
- Free plan: 10 credits is too few for testing
- Recommend: 20-30 free credits (lets users try each feature 3-5 times)
- Or: 10 credits that reset weekly (better for retention)

**3. Content Quality Over Speed**
- Don't worry about real-time progress bars yet
- Focus on making generated content actually good
- Iterate on prompts based on user feedback

**4. Launch Strategy**
- Launch with: Post Generator + Reply Generator only
- Mark rest as "Coming Soon"
- Better to have 2 features that work perfectly than 6 that are buggy

**5. Differentiation Strategy**

Your competitors (Copy.ai, Jasper, Rytr):
- Generic AI voice
- Single-platform focus
- No strategic variety

Your competitive advantages:
- Multi-platform optimization (one idea → 5 adapted posts)
- Strategic variants (not random rewrites)
- Voice training (sounds like user, not AI)

**Double down on these 3 things.** Everything else is secondary.

**6. User Onboarding**
- After signup, show 30-second tutorial
- "Here's how to generate your first post"
- Most users bounce because they don't know where to start

**7. Feedback Loop**
- Add "Was this generation helpful?" thumbs up/down on each variant
- Track which tones/platforms users prefer
- Use this data to improve prompts

**8. Growth Strategy (Post-Launch)**
- Focus on organic content (not paid ads yet)
- Post about building in public on X/LinkedIn
- Show real examples of generated content
- "Here's what I built with PostContent vs raw ChatGPT" comparisons

**9. Technical Debt to Avoid**
- Don't build custom auth (use Supabase Auth or similar)
- Don't build custom payment processing (use Polar.sh/Stripe)
- Don't build custom email service (use Resend)
- Focus your time on core AI prompting quality

**10. Metrics That Actually Matter**
- Free → Pro conversion rate (should be 3-5%)
- Churn rate (should be <5% monthly)
- Generations per user per week (should be 10+)
- Time from signup to first generation (should be <2 minutes)

Ignore vanity metrics like total signups. Focus on paying customers and retention.

---

## Priority Order (What to Fix First)

**Week 1:**
1. User data fetching/display
2. Credits not deducting on failed generations
3. Fix /api/reply and /api/thread endpoints
4. Generation history saving

**Week 2:**
5. Contact form email sending
6. Email verification flow improvements
7. Password reset confirmation
8. Credits real-time updating

**Week 3:**
9. Google OAuth duplicate handling
10. Plan enforcement (limits)
11. Better error messages throughout

**Later:**
- Voice training backend
- Real-time progress bars
- Affiliate tracking
- Redis caching
- Rate limiting

---

This is everything you need to know. Focus on Week 1 priorities before launch. Everything else can wait.
