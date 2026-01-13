# Development Workflow & Current Context

**Last Updated:** January 13, 2026  
**Project:** PostContent - AI Content Generator for Social Media  
**Repository:** https://github.com/slubbles/post-content

---

## The Development Process ("The Drill")

### How We Work with v0

This project uses a **dual-agent workflow** where v0 handles frontend/UI and GitHub Copilot handles backend/API logic.

#### Repository Structure
- **Main Repo:** `slubbles/post-content` (both frontend + backend)
- **v0 UI Repo:** `slubbles/v0-post-content-UI` (frontend only)
- **Working Directory:** `/workspaces/idea-dump/content-generator/`

#### The Workflow

```
1. User gives feedback/requirements
   ↓
2. Separate tasks:
   - Frontend/UI → for v0
   - Backend/API/Logic → for GitHub Copilot
   ↓
3. User gives v0 the frontend tasks in separate chat
   ↓
4. v0 works in their repo: slubbles/v0-post-content-UI
   ↓
5. User says "repull" when v0 is done
   ↓
6. GitHub Copilot executes "The Drill":
   - git fetch v0
   - git merge v0/main --no-edit
   - npm run build (verify)
   - git push origin main
   ↓
7. GitHub Copilot completes backend tasks
   ↓
8. Repeat
```

#### Git Remotes Configuration
```bash
origin      https://github.com/slubbles/post-content.git (main repo)
v0          https://github.com/slubbles/v0-post-content-UI.git (UI repo)
v0-frontend https://github.com/slubbles/v0-post-content-UI.git (duplicate)
```

#### Why This Works
- ✅ v0 focuses on UI/UX without touching APIs
- ✅ Copilot focuses on backend without breaking frontend
- ✅ Clean separation = minimal conflicts
- ✅ User orchestrates both sides
- ✅ Merge conflicts are rare due to separation of concerns

#### Commands for "Repull"
```bash
cd /workspaces/idea-dump/content-generator
git fetch v0
git log --oneline v0/main  # Check what changed
git merge v0/main --no-edit
npm run build  # Verify
git push origin main
```

---

## Current Project State

### Tech Stack
- **Framework:** Next.js 16.1.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Auth:** NextAuth v5 (Google OAuth, Twitter OAuth)
- **AI:** Grok-4-Fast-Reasoning via XAI API
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel (planned)

### Recent Completed Work

#### ✅ Authentication System (100% Complete)
- Forgot password flow (email reset, 1-hour token expiry)
- X/Twitter OAuth provider (code complete, needs API keys)
- Auto-logout after 1 hour inactivity
- Verify-first signup (PendingUser table, no account until verified)
- Email verification enforcement (middleware protection)
- Database migrations: PasswordResetToken, PendingUser tables
- Commits: `abfe805`, `e7a6ad9`

#### ✅ V0 UI Merges
- **Latest merge:** `4f75a5c` (Jan 12, 2026)
- Hero headline update: "A week of posts ready before you finish scrolling 'for inspiration.'"
- Updated navigation, sidebar, login/signup pages
- Added new logo.svg
- Previous merge: `dcb2316` (time-saving angle messaging)

### Build Status
- **Routes:** 47 total
- **Compilation:** ✅ Successful
- **TypeScript Errors:** 0
- **Last Build:** Jan 12, 2026

---

## 🔴 CRITICAL ISSUE: Backend-Frontend Misalignment

### The Problem (Identified by v0)

**Backend (`lib/prompts.ts`) does NOT match Frontend UI expectations**

#### What Backend Currently Has:
```typescript
// 3 TONES (WRONG)
TONE_CONFIGS = {
  sarcastic: 'Sarcastic Underdog',
  raw: 'Raw Builder', 
  selfRoast: 'Self-Roast Master'
}

// 1 PLATFORM (WRONG)
Platform Rules:
- Maximum 280 characters per post  // Twitter only, hardcoded
```

#### What Frontend Expects (per v0 feedback):
```typescript
// 5 TONES (CORRECT)
professional: 'Corporate, polished, authoritative'
casual: 'Friendly, conversational, relatable'
humorous: 'Witty, playful, entertaining'
inspirational: 'Motivating, uplifting, action-oriented'
educational: 'Clear, informative, teaching-focused'

// 5 PLATFORMS (CORRECT)
twitter: 280 chars max
linkedin: 3000 chars max (500-1000 word posts)
instagram: 2200 chars max
facebook: 5000 chars max
threads: 500 chars max
```

### Impact
- ⚠️ **Production Risk:** 🔴 HIGH
- API will fail when users select "Professional" tone
- API will fail when users select "LinkedIn" platform
- Generated content will be wrong length for non-Twitter platforms
- Frontend dropdowns won't work with backend

### V0's Assessment
> "NOT production-ready. Risk if deployed as-is: 🔴 HIGH"

---

## 🚧 What Needs To Be Done Next

### Priority 1: Fix Backend Prompts (BLOCKING)

**File:** `lib/prompts.ts`

#### Task A: Replace 3 Tones with 5 New Tones
Delete: `sarcastic`, `raw`, `selfRoast`

Add with proper configs:
```typescript
professional: {
  name: 'Professional',
  systemPrompt: // Corporate, polished, data-driven
  examples: [
    "Our analysis of 50,000 startups reveals...",
    "3 key metrics that predict product success..."
  ],
  temperature: 0.6
}

casual: {
  name: 'Casual',
  systemPrompt: // Friendly, conversational
  examples: [
    "Here's what I learned after 3 years building...",
    "Just shipped a feature that took way longer than expected..."
  ],
  temperature: 0.7
}

humorous: {
  name: 'Humorous',
  systemPrompt: // Witty, relatable, entertaining
  examples: [
    "Me: 'I'll just fix this one bug' *6 hours later*",
    "My code at 2am hits different..."
  ],
  temperature: 0.8
}

inspirational: {
  name: 'Inspirational',
  systemPrompt: // Motivating, uplifting
  examples: [
    "Every expert was once a beginner who refused to quit",
    "Your first version doesn't have to be perfect..."
  ],
  temperature: 0.7
}

educational: {
  name: 'Educational',
  systemPrompt: // Clear, teaching-focused
  examples: [
    "Here's how JWT authentication works in 3 steps...",
    "Understanding the difference between..."
  ],
  temperature: 0.6
}
```

#### Task B: Add Platform Configuration System
```typescript
export interface PlatformConfig {
  maxChars: number;
  style: string;
  format: string;
}

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  twitter: {
    maxChars: 280,
    style: 'punchy, quotable, thread-friendly',
    format: 'concise one-liners or short threads'
  },
  linkedin: {
    maxChars: 3000,
    style: 'thought leadership, professional insights',
    format: 'long-form 500-1000 words, paragraph breaks'
  },
  instagram: {
    maxChars: 2200,
    style: 'visual-first, storytelling',
    format: 'engaging narrative with line breaks'
  },
  facebook: {
    maxChars: 5000,
    style: 'conversational, community-focused',
    format: 'casual long-form, discussion-starting'
  },
  threads: {
    maxChars: 500,
    style: 'authentic, unpolished, real-time',
    format: 'casual thoughts, multiple short posts'
  }
}
```

#### Task C: Update Function Signatures
```typescript
// OLD (WRONG)
function getGenerationPrompt(tone: string, userVoice?: {...}): string

// NEW (CORRECT)
function getGenerationPrompt(
  tone: 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational',
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'threads',
  userVoice?: VoiceProfile
): string

// OLD (WRONG)
function validateContent(text: string): {...}

// NEW (CORRECT)
function validateContent(text: string, platform: string): {
  valid: boolean;
  warnings: string[];
  charCount: number;
  charLimit: number;
}
```

#### Task D: Update BASE_SYSTEM_PROMPT
Remove Twitter-specific hardcoded rules, make platform-aware:
```typescript
export const BASE_SYSTEM_PROMPT = `You are PostContent, an AI content generator designed to help creators generate engaging social posts.

Core Principles:
- Sound human, not AI-generated
- Be authentic and relatable
- Keep posts platform-native and format-appropriate
- Avoid corporate speak and generic platitudes
- Match the user's natural voice and tone
- Never use unnecessary hashtags or emoji spam

You help creators who are better at building than copywriting.`;
```

#### Task E: Update API Routes (if needed)
Check `app/api/generate/route.ts`:
- Ensure it accepts `platform` parameter
- Pass platform to `getGenerationPrompt()`
- Use platform-specific validation

### Priority 2: Testing
- Generate 25 test posts (5 tones × 5 platforms)
- Verify character limits respected
- Confirm tones are distinct
- Check LinkedIn posts are 500-1000 words, not 280 chars
- Validate no AI-tell phrases

### Priority 3: Documentation
- Update API documentation
- Add examples for each tone × platform combination
- Document platform-specific best practices

---

## Important Files Reference

### Backend Core
- `lib/prompts.ts` - **⚠️ NEEDS REFACTOR** (tone/platform configs)
- `lib/grok.ts` - Grok API integration
- `lib/auth.ts` - NextAuth configuration
- `lib/db.ts` - Prisma database client
- `lib/schema.sql` - Database schema

### API Routes
- `app/api/generate/route.ts` - Post generation endpoint
- `app/api/reply/route.ts` - Reply generation endpoint
- `app/api/thread/route.ts` - Thread generation endpoint
- `app/api/train/route.ts` - Voice training endpoint
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `app/api/auth/signup/route.ts` - Signup endpoint
- `app/api/auth/verify/route.ts` - Email verification
- `app/api/auth/forgot-password/route.ts` - Password reset
- `app/api/auth/reset-password/route.ts` - Password reset confirmation

### Frontend Pages
- `app/page.tsx` - Landing page (v0 managed)
- `app/login/page.tsx` - Login page (v0 managed)
- `app/signup/page.tsx` - Signup page (v0 managed)
- `app/generate/page.tsx` - Post generator
- `app/reply/page.tsx` - Reply generator
- `app/thread/page.tsx` - Thread generator
- `app/train/page.tsx` - Voice training

### Components
- `components/app-navigation.tsx` - Top nav (v0 managed, has auth logic)
- `components/dashboard-sidebar.tsx` - Sidebar (v0 managed)
- `components/post-generator.tsx` - Main generation UI
- `components/footer.tsx` - Footer (v0 managed)
- `components/AuthProvider.tsx` - NextAuth session provider

### Database Schema (Prisma)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  plan          String    @default("free")
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
}

model PendingUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

---

## Environment Variables Required

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
TWITTER_CLIENT_ID="..."  # Needs to be added
TWITTER_CLIENT_SECRET="..."  # Needs to be added

# AI (Grok)
XAI_API_KEY="..."

# Email (Resend)
RESEND_API_KEY="..."
EMAIL_FROM="noreply@postcontent.app"
```

---

## Session Context Summary

### Conversation Timeline
1. **Completed Auth Improvements** - Forgot password, Twitter OAuth (code), inactivity logout, verify-first signup, email enforcement
2. **Asked "What's Next?"** - Discussed validation, monitoring, analytics, testing
3. **V0 Shared Critical Feedback** - Identified backend-frontend misalignment in prompts.ts
4. **Clarified Workflow** - Understood dual-repo setup, v0 does UI, Copilot does backend
5. **Executed Repull** - Merged v0's latest UI changes (hero headline update)
6. **Pushed Successfully** - After auth troubleshooting, changes pushed to origin/main

### Key Decisions Made
- Using Grok-4-Fast-Reasoning ($0.20/M input, $0.50/M output)
- Verify-first signup flow (no account until email verified)
- 1-hour inactivity logout
- Twitter OAuth code ready, needs API keys from user
- Platform should support 5 platforms (not just Twitter)
- Need 5 professional tones (not builder-focused tones)

### Current Blockers
1. **Backend prompts.ts** - Must be refactored before production (CRITICAL)
2. **Twitter OAuth keys** - Code ready, user needs to add keys to .env
3. **Testing** - Need comprehensive testing of tone × platform matrix

---

## Quick Reference Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint check
```

### Database
```bash
npx prisma migrate dev    # Create migration
npx prisma db push        # Push schema changes
npx prisma studio         # Open database GUI
```

### Git Workflow
```bash
# Fetch v0's latest
git fetch v0
git log --oneline v0/main

# Merge v0's changes
git merge v0/main --no-edit

# Build & push
npm run build
git push origin main
```

### Testing
```bash
# Check environment
npm run check-env

# Check database
npm run check-db

# Run tests (when added)
npm test
```

---

## Notes for Next Session

1. **Start with backend refactor** - prompts.ts is blocking production
2. **Test thoroughly** - 5 tones × 5 platforms = 25 combinations
3. **Check API routes** - May need updates after prompts.ts changes
4. **Consider TypeScript updates** - Ensure types match new tone/platform options
5. **Update frontend if needed** - Verify dropdowns match backend options
6. **Add monitoring** - Track which tone/platform combos are most used
7. **Performance testing** - Ensure Grok API responds fast for all platforms

---

## Contact & Resources

- **Main Repo:** https://github.com/slubbles/post-content
- **V0 UI Repo:** https://github.com/slubbles/v0-post-content-UI
- **Grok API Docs:** https://docs.x.ai/
- **NextAuth Docs:** https://authjs.dev/
- **Prisma Docs:** https://www.prisma.io/docs

---

**Remember:** Always run "The Drill" when user says "repull" - fetch, merge, build, push. Backend stays out of UI files, v0 stays out of API files. This keeps conflicts minimal and development smooth.
