# PostContent

**AI-powered content generator that helps you create engaging X/Twitter posts in seconds.**

## 🎯 What It Does

- **Generate Posts**: Create 3 variations instantly with tone presets (Sarcastic, Raw Builder, Self-Roast)
- **Train Your Voice**: Analyze your writing style from existing posts
- **Smart Replies**: Generate context-aware replies to others' tweets
- **Thread Creator**: Build 5-7 tweet threads on any topic
- **History Management**: Save, filter, export, and manage all generated content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repo
cd content-generator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - the app works with mock data by default!

### Optional: Connect Real AI

For production AI features, add environment variables:

```bash
# .env.local
XAI_API_KEY=xai-...
DATABASE_URL=postgresql://...
```

**Without these variables**: App uses mock data for testing/development.

## 🏗️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (Atome-inspired design system)
- **Animations**: Framer Motion
- **AI**: Grok API (xAI) via OpenAI SDK
- **Database**: Neon Serverless Postgres (optional)
- **Hosting**: Vercel-ready

## 📁 Project Structure

```
app/
├── page.tsx              # Generate page (main dashboard)
├── train/page.tsx        # Voice training analyzer
├── reply/page.tsx        # Reply generator
├── thread/page.tsx       # Thread creator
├── history/page.tsx      # Post history manager
├── settings/page.tsx     # User preferences
└── api/
    ├── generate/route.ts # Post generation endpoint
    ├── train/route.ts    # Voice analysis endpoint
    ├── reply/route.ts    # Reply generation endpoint
    └── thread/route.ts   # Thread generation endpoint

components/
├── Navigation.tsx        # Top nav + mobile bottom bar
├── PostGenerator.tsx     # Input form with tone presets
├── GeneratedPosts.tsx    # Post display with actions
├── LoadingState.tsx      # Reusable loading component
└── Footer.tsx            # Enhanced footer

lib/
├── grok.ts              # Grok API client
├── db.ts                # Neon database client
└── prompts.ts           # Centralized prompt management
```

## 🎨 Design System

**Inspired by [Atome.ph](https://www.atome.ph)** - Bold, modern, high-contrast design.

- **Primary Color**: #f0ff5f (neon yellow)
- **Theme**: Light mode with white cards on gray backgrounds
- **Border Radius**: Pill-shaped buttons (100px), rounded cards (20-30px)
- **Typography**: Responsive scaling (mobile → desktop)
- **Mobile**: Touch-optimized (44-52px targets), iOS safe areas

See [design-system.md](design-system.md) for complete documentation.

## 📱 Features

### Post Generation
- 3 tone presets with distinct personalities
- Real-time character counter (280 limit)
- Copy to clipboard
- Save to history
- Regenerate variations

### Voice Training
- Analyze 5+ existing posts
- Extract writing patterns
- Save voice profile
- 3-step guided flow

### Reply Generator
- Context-aware AI replies
- 3 variations per request
- Feedback system (too spicy/mild)
- Individual copy actions

### Thread Creator
- Generate 5-7 tweet threads
- Topic-based creation
- Edit individual tweets
- Reorder and delete tweets
- Copy full thread

### History & Settings
- Filter by tone
- Mark as used
- Export to JSON
- Preference management
- Data export/clear

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard:
- `XAI_API_KEY` (optional)
- `DATABASE_URL` (optional)

### Docker

```bash
# Build
docker build -t voiceforge .

# Run
docker run -p 3000:3000 voiceforge
```

## 🔧 Development

```bash
npm run dev      # Start dev server
npm run build    # Production build (works without env vars)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Status

- ✅ **Weeks 1-3**: Complete (UI, pages, API integration)
- ✅ **Design Overhaul**: Atome-inspired system implemented
- ✅ **Mobile Optimization**: Touch-friendly, iOS safe areas
- ⏳ **Week 4**: Thread generator complete, webhooks pending
- ⏳ **Week 5**: Auth & launch prep (next milestone)

See [STATUS.md](STATUS.md) for detailed progress.

## 🎯 Target Audience

- Indie hackers building in public
- Developer advocates
- Tech founders on X/Twitter
- Open source maintainers
- Anyone who codes more than they copywrite

## 📝 License

MIT

## 🙏 Acknowledgments

- Design inspired by [Atome.ph](https://www.atome.ph)
- AI powered by [Grok (xAI)](https://x.ai)
- Built with [Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)

---

**Built by someone who hates writing but loves shipping.**
