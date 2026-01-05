# V0 Frontend Integration Guide

## Architecture: Separate UI from Backend Logic

Your current PostContent app becomes a **headless API**, while v0 builds the **frontend UI** with extracted design patterns.

---

## Step 1: Enable CORS in Current App

### Install CORS package
```bash
cd /workspaces/idea-dump/content-generator
npm install cors
```

### Update next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Enable CORS for v0 frontend
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },
};

export default nextConfig;
```

---

## Step 2: Document Your API Endpoints

### Authentication
```typescript
// POST /api/auth/signin
{
  "provider": "google" | "credentials",
  "email": "user@example.com",
  "password": "optional"
}

// GET /api/auth/session
Response: { user: { id, email, name, image }, expires }
```

### Content Generation
```typescript
// POST /api/generate
{
  "input": "Built a feature that works",
  "tone": "sarcastic" | "raw" | "roast"
}
Response: { posts: string[] }

// POST /api/reply
{
  "postToReply": "Original post text",
  "context": "Optional context"
}
Response: { replies: Array<{ text, tag }> }

// POST /api/thread
{
  "topic": "Thread topic",
  "numberOfTweets": 5
}
Response: { thread: Array<{ id, text }> }

// POST /api/train
{
  "samples": string[]
}
Response: { success: boolean }
```

### Usage & Billing
```typescript
// GET /api/usage
Response: { used: 5, limit: 10, remaining: 5, percentage: 50 }
```

---

## Step 3: Create v0 Frontend Project

### In v0.dev:
1. **Describe your UI** using the extracted design:
```
Create a social media post generator with:
- Wise.com pill buttons (9999px radius, #f0ff5f yellow)
- Atome.ph color scheme (vibrant yellow primary)
- Clean white cards with 34px border radius
- Sticky navigation with pill-shaped nav items
- Mobile-first responsive design
```

2. **Generate components** for each page:
   - Landing/Generate page
   - Reply generator
   - Thread builder
   - Voice training
   - History
   - Pricing
   - Settings

3. **Connect to API**:
```typescript
// v0 frontend - lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function generatePost(input: string, tone: string) {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // For auth cookies
    body: JSON.stringify({ input, tone }),
  });
  return res.json();
}
```

---

## Step 4: Environment Variables

### Current App (.env.local)
```bash
# Keep existing vars
DATABASE_URL=...
NEXTAUTH_SECRET=...
GROK_API_KEY=...

# Add frontend URL for CORS
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001
```

### v0 Frontend (.env.local)
```bash
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Direct auth
NEXTAUTH_URL=http://localhost:3001
```

---

## Step 5: What Stays in Current App?

### ✅ Keep (Backend Logic)
- `/api/*` - All API routes
- `/lib/auth.ts` - Authentication logic
- `/lib/db.ts` - Database connection
- `/lib/grok.ts` - AI integration
- `/lib/usage.ts` - Usage tracking
- `/lib/prompts.ts` - Prompt templates
- `prisma/` - Database schema
- `.env.local` - Secrets & config

### ❌ Remove (Move to v0)
- `/app/page.tsx` - UI pages
- `/components/*` - React components
- `/app/globals.css` - Styles (except API-related)
- `tailwind.config.ts` - UI config (if not needed for API)

---

## Step 6: Testing the Integration

### Terminal 1: Run API Server
```bash
cd /workspaces/idea-dump/content-generator
npm run dev
# Runs on http://localhost:3000
```

### Terminal 2: Run v0 Frontend
```bash
cd /path/to/v0-frontend
npm run dev
# Runs on http://localhost:3001
```

### Test API Access
```bash
# From v0 frontend browser console
fetch('http://localhost:3000/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ input: 'test', tone: 'sarcastic' })
})
.then(r => r.json())
.then(console.log)
```

---

## Step 7: Deployment Strategy

### API Backend (Vercel)
```bash
# Keep current deployment
# postcontent.io → API only
vercel --prod
```

### v0 Frontend (Vercel)
```bash
# Deploy v0 project
# app.postcontent.io → UI
cd v0-frontend
vercel --prod
```

### Environment Variables (Production)
```bash
# API Backend
NEXT_PUBLIC_FRONTEND_URL=https://app.postcontent.io

# v0 Frontend
NEXT_PUBLIC_API_URL=https://postcontent.io
```

---

## Design Extraction for v0

### Give v0 these exact specifications:

#### Colors
```
Primary: #f0ff5f (Atome yellow)
Background: #fafafa (light gray)
Card: #ffffff (white)
Text: #000000 (black)
Border: #e5e5e5 (light gray)
```

#### Buttons (Wise-style)
```
Border Radius: 9999px (perfect pill)
Padding: 20px vertical, 32px horizontal
Font Weight: 700 (bold)
Hover: box-shadow: 0 4px 16px rgba(240, 255, 95, 0.3)
```

#### Cards (Atome-style)
```
Border Radius: 34px
Padding: 32px
Shadow: rgba(0, 0, 0, 0.15) 0px 5px 12px
Border: 1px solid #e5e5e5
```

#### Typography
```
Font: Manrope (Google Fonts)
H1: 48px, bold (900)
H2: 36px, bold (800)
Body: 16px, regular (400)
```

---

## Advantages of This Approach

✅ **Separation of Concerns**: UI logic separate from business logic
✅ **v0 Expertise**: Let v0 handle design implementation perfectly
✅ **Keep Your Backend**: Proven logic, database, auth stays intact
✅ **Easier Updates**: Change UI without touching backend
✅ **Type Safety**: Share TypeScript types between projects
✅ **Independent Deployment**: Deploy UI and API separately

---

## Alternative: Monorepo (Advanced)

If you want everything in one repo:

```bash
# Install Turborepo
npx create-turbo@latest

# Structure
post-content/
├── apps/
│   ├── api/         # Current app (renamed)
│   └── web/         # v0 frontend
├── packages/
│   ├── types/       # Shared TypeScript types
│   ├── config/      # Shared configs
│   └── ui/          # Shared components (optional)
└── turbo.json       # Monorepo config
```

---

## Next Steps

1. **Enable CORS** in current app (next.config.ts)
2. **Generate UI in v0** with extracted design specs
3. **Connect v0 to your API** using fetch/axios
4. **Test locally** (API on :3000, v0 on :3001)
5. **Deploy separately** (API + Frontend on Vercel)

---

## Need Help With:

- [ ] Setting up CORS?
- [ ] Creating API client library?
- [ ] Sharing TypeScript types?
- [ ] Monorepo setup?
- [ ] v0 prompt engineering?

Let me know which part to tackle first!
