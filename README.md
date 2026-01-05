# Post Content - Frontend UI

An AI-powered social media content generation platform with Wise-inspired emotional design and Atome yellow branding.

## Overview

This is the **frontend UI only** - designed to be transferred to your main repository with backend logic/APIs. All components are production-ready with mock data placeholders for easy integration.

## Design Philosophy

Inspired by **Wise.com** emotional design patterns and **Atome.ph** bold yellow branding:
- Conversational, human microcopy throughout
- Smooth micro-interactions and animations
- Wise-style bottom mobile navigation
- Atome's Spriteburst yellow (#f0ff5f) as primary accent
- Manrope font for friendly, modern typography

## Features

### Content Creation
- **Generate Page** (`/generate`): Main post generator with platform/tone selectors
- **Reply Generator** (`/reply`): Context-aware reply creation
- **Thread Builder** (`/thread`): Multi-post thread narratives
- **AI Training** (`/train`): 3-step wizard for voice personalization

### User Management
- **History** (`/history`): Searchable content archive with delete confirmations
- **Settings** (`/settings`): AI preferences and account management
- **Auth Pages**: Login/signup with friendly copy

### Marketing
- **Landing Page** (`/`): Public homepage with features showcase
- **Pricing** (`/pricing`): 3-tier subscription display
- **Success** (`/success`): Post-checkout confirmation

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Typography**: Manrope (primary), Geist Mono (code)
- **Components**: shadcn/ui with custom enhancements
- **Icons**: Lucide React
- **Animations**: Custom CSS animations + tw-animate

## Design System

### Color Palette
\`\`\`css
Primary:    #f0ff5f (Atome yellow/Spriteburst)
Background: oklch(0.99 0 0) (near white)
Foreground: oklch(0.15 0 0) (dark gray/black)
Muted:      oklch(0.96 0 0) (light gray)
Border:     oklch(0.9 0 0) (subtle gray)
\`\`\`

### Typography
- **Headings**: Manrope Bold (text-balance for optimal line breaks)
- **Body**: Manrope Regular (leading-relaxed for readability)
- **Code**: Geist Mono

### Component Patterns
- Rounded-full buttons for primary actions
- Hover scale (hover:scale-105) on interactive elements
- Smooth transitions (transition-all duration-200)
- Toast notifications for user feedback
- Confirmation modals for destructive actions

## Project Structure

\`\`\`
app/
├── page.tsx                 # Landing page (public)
├── generate/                # Post generation (auth required)
├── reply/                   # Reply generator
├── thread/                  # Thread builder
├── train/                   # AI training wizard
├── history/                 # Content history
├── pricing/                 # Subscription plans
├── settings/                # User settings
├── login/                   # Authentication
├── signup/                  # Registration
├── success/                 # Post-checkout
├── loading.tsx             # Route loading states
├── error.tsx               # Error boundary
└── not-found.tsx           # 404 page

components/
├── ui/                     # shadcn/ui base components
├── app-navigation.tsx      # Main nav + mobile bottom bar
├── footer.tsx              # Site footer
├── confirmation-modal.tsx  # Delete/action confirmations
├── empty-state.tsx         # Reusable empty state component
├── post-generator.tsx      # Post creation form
├── generated-posts.tsx     # Results display with copy
├── reply-generator.tsx     # Reply creation form
├── thread-generator.tsx    # Thread creation form
├── generated-thread.tsx    # Thread results display
├── training-wizard.tsx     # 3-step training flow
├── history-list.tsx        # History with search/delete
├── usage-indicator.tsx     # Credit usage display
├── pricing-cards.tsx       # Subscription tier cards
├── settings-form.tsx       # Settings management
├── login-form.tsx          # Login UI
└── signup-form.tsx         # Signup UI

lib/
├── utils.ts                # cn() helper
├── auth.ts                 # Auth utilities (mock)
└── ai-config.ts            # AI config (mock)
\`\`\`

## Key UI Components

### Navigation
- Desktop: Left sidebar with icon + label
- Mobile: Fixed bottom navigation bar (5 icons)
- Active state: Highlighted with primary color
- User menu with logout option

### Forms
- Character counters on textareas
- Platform/tone selectors with visual feedback
- Variant sliders with real-time updates
- Submit buttons with loading states

### Generated Content
- Copy-to-clipboard with toast confirmation
- Like/dislike feedback buttons
- Character count per post
- Platform-specific styling hints

### Micro-interactions
- Button hover scale effects
- Card hover lift animations
- Toast notifications for actions
- Smooth page transitions (fadeIn)
- Confirmation modals for destructive actions

## Mock Data

The following components use mock data (replace with real API calls):
- `history-list.tsx`: mockHistory array
- `usage-indicator.tsx`: Static credit count
- All API routes in `app/api/`: Return mock responses

## Integration Guide

### Connecting to Your Backend

1. **Authentication**
   - Replace `lib/auth.ts` with your real auth system
   - Update cookie management in API routes
   - Connect `login-form.tsx` and `signup-form.tsx` to your auth endpoints

2. **API Routes**
   - Keep the UI structure, replace API logic
   - Update `/app/api/generate/route.ts` with your AI integration
   - Connect history to your database
   - Implement training data persistence

3. **Environment Variables**
   - `XAI_API_KEY` or your AI provider key
   - `DATABASE_URL` for data persistence
   - `POLAR_API_KEY` for payments (optional)
   - `NEXT_PUBLIC_APP_URL` for redirects

4. **Data Flow**
   - Forms submit to `/api/*` endpoints
   - Replace mock data with real database queries
   - Update state management if needed
   - Connect toast notifications to actual API responses

### Files to Update with Backend Logic

\`\`\`
app/api/generate/route.ts    → Your AI generation logic
app/api/reply/route.ts        → Reply generation logic
app/api/thread/route.ts       → Thread generation logic
app/api/train/route.ts        → Training data storage
app/api/history/route.ts      → History CRUD operations
app/api/settings/route.ts     → User settings storage
app/api/auth/*                → Real authentication system
app/api/checkout/route.ts     → Payment processing

lib/auth.ts                   → Replace with real auth
lib/ai-config.ts              → Connect to AI provider

components/history-list.tsx   → Remove mockHistory, fetch from API
components/usage-indicator.tsx → Fetch real credit count
\`\`\`

## Mobile Responsiveness

- Bottom navigation fixed on mobile (<768px)
- Single-column layouts on mobile
- Touch-friendly button sizes (min 44px)
- Responsive font scaling
- Collapsible sections on small screens

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Focus rings on all inputs
- Screen reader text where needed
- Keyboard navigation support
- Color contrast AAA compliant

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- CSS custom properties (design tokens)

## Next Steps

1. Clone this frontend into your main repo
2. Replace mock API logic with real backend
3. Connect to your database
4. Add authentication provider
5. Set up payment processing
6. Deploy to Vercel

## Design Decisions

### Why Wise-inspired?
- Emotional design reduces friction
- Micro-interactions build trust
- Conversational copy feels human
- Smooth animations delight users

### Why Atome yellow?
- Bold, energetic, attention-grabbing
- Stands out in social media space
- Associated with creativity and optimism
- Balances with neutral grays perfectly

### Why Manrope?
- Modern geometric sans-serif
- Excellent readability at all sizes
- Friendly without being too casual
- Variable font for performance

## License

MIT

---

**Ready to integrate?** All UI is complete and production-ready. Just connect your backend logic and deploy!
