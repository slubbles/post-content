# PostContent - Complete UI Generation Prompt for v0.dev

## Project Overview
Build a modern social media content generation SaaS application with xAI Grok integration. The UI combines **Wise.com's functional design patterns** with **Atome.ph's vibrant color palette**.

---

## Design System

### Colors
```typescript
// Primary Colors (from Atome.ph)
primary: '#f0ff5f'        // Vibrant yellow - CTAs, highlights, active states
primaryDark: '#e0ef4f'    // Hover state for primary
primaryLight: '#f5ff8f'   // Light accents

// Neutral Colors (from Wise.com)
background: '#fafafa'     // Main background
cardBg: '#ffffff'         // Card backgrounds
border: '#e5e5e5'         // Borders and dividers
textPrimary: '#000000'    // Headings, primary text
textSecondary: '#666666'  // Secondary text, labels
textMuted: '#999999'      // Disabled, placeholders

// Semantic Colors
success: '#00d632'        // Success states
error: '#ff0000'          // Error states
warning: '#ff9500'        // Warning states
```

### Typography
```typescript
// Font Family
fontFamily: 'Manrope, system-ui, -apple-system, sans-serif'

// Font Sizes
fontSize: {
  xs: '0.75rem',      // 12px - tiny labels
  sm: '0.875rem',     // 14px - body text, inputs
  base: '1rem',       // 16px - default body
  lg: '1.125rem',     // 18px - large body
  xl: '1.25rem',      // 20px - small headings
  '2xl': '1.5rem',    // 24px - section headings
  '3xl': '2rem',      // 32px - page headings
  '4xl': '2.5rem',    // 40px - hero headings
}

// Font Weights
fontWeight: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}
```

### Spacing Scale
```typescript
// Base 4px scale (from Wise.com)
spacing: {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
}
```

### Border Radius
```typescript
borderRadius: {
  none: '0',
  sm: '4px',          // Small elements
  DEFAULT: '8px',     // Cards, inputs
  md: '12px',         // Medium cards
  lg: '16px',         // Large cards
  full: '9999px',     // Pill buttons (Wise.com pattern)
}
```

### Shadows
```typescript
boxShadow: {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  none: 'none',
}
```

### Button Styles (Wise.com Pattern)
```typescript
// Primary Button
className: "bg-[#f0ff5f] text-black px-8 py-5 rounded-full font-semibold text-base hover:bg-[#e0ef4f] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"

// Secondary Button
className: "bg-white text-black px-8 py-5 rounded-full font-semibold text-base border border-[#e5e5e5] hover:border-black transition-all duration-200 active:scale-[0.98]"

// Disabled Button
className: "bg-[#f5f5f5] text-[#999999] px-8 py-5 rounded-full font-semibold text-base cursor-not-allowed"

// Small Button (Tone Presets)
className: "bg-white px-3 py-2 rounded-full text-sm font-medium border border-[#e5e5e5] hover:border-black hover:bg-[#f0ff5f] transition-all duration-200"
```

### Input Styles
```typescript
// Text Input
className: "w-full px-4 py-3 rounded-lg border border-[#e5e5e5] focus:border-black focus:ring-2 focus:ring-[#f0ff5f] focus:ring-opacity-20 transition-all duration-200 bg-white"

// Textarea
className: "w-full px-4 py-3 rounded-lg border border-[#e5e5e5] focus:border-black focus:ring-2 focus:ring-[#f0ff5f] focus:ring-opacity-20 transition-all duration-200 bg-white resize-none"

// Select
className: "w-full px-4 py-3 rounded-lg border border-[#e5e5e5] focus:border-black focus:ring-2 focus:ring-[#f0ff5f] focus:ring-opacity-20 transition-all duration-200 bg-white"
```

### Card Styles
```typescript
// Default Card
className: "bg-white rounded-lg p-6 shadow-sm border border-[#e5e5e5]"

// Hover Card
className: "bg-white rounded-lg p-6 shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow duration-200 cursor-pointer"

// Hero Card
className: "bg-white rounded-xl p-8 shadow-md border border-[#e5e5e5]"
```

---

## Pages to Create

### 1. Generate Page (`/`)
**Purpose:** Main content generation interface with xAI Grok integration

**Layout:**
- Full-width hero section with gradient background
- Centered content card (max-width: 640px)
- Mobile-responsive with bottom navigation

**Components:**
1. **Hero Section**
   - Heading: "Generate Engaging Social Media Posts"
   - Subheading: "Powered by xAI Grok"
   - Gradient background: `bg-gradient-to-br from-[#fafafa] to-[#f0ff5f]/10`

2. **Input Form**
   - Topic input (textarea, 3 rows)
     - Placeholder: "What do you want to post about? (e.g., 'AI trends in 2026')"
     - Auto-resize on focus
   - Platform selector (dropdown)
     - Options: Twitter, LinkedIn, Instagram, Facebook
     - Icon for each platform
   - Tone preset buttons (horizontal scroll on mobile)
     - Presets: Professional, Casual, Humorous, Inspiring, Educational
     - Small pill buttons with hover states
   - Character count indicator
     - Show: "0/280 characters" for Twitter
     - Change color when near limit

3. **Generate Button**
   - Full-width primary button
   - Text: "Generate Post"
   - Loading state with spinner
   - Disabled state when input empty

4. **Generated Posts Display**
   - Card grid (1-3 posts)
   - Each post card shows:
     - Generated content
     - Copy button (pill button, top-right)
     - Regenerate button (pill button)
     - Like/Save icons (bottom-right)
   - Empty state: "Your generated posts will appear here"

5. **Usage Indicator** (Top-right corner)
   - Shows: "5/10 posts used"
   - Progress bar with yellow fill
   - Upgrade button when near limit

**Interactions:**
- Auto-save drafts to localStorage
- Real-time character counter
- Copy to clipboard with toast notification
- Loading skeleton while generating

---

### 2. Reply Page (`/reply`)
**Purpose:** Generate contextual replies to social media posts

**Layout:**
- Two-column layout (desktop)
- Single column (mobile)

**Components:**
1. **Page Header**
   - Heading: "Generate Smart Replies"
   - Subheading: "Reply to posts with AI-powered context"

2. **Original Post Input** (Left column)
   - Label: "Original Post"
   - Textarea (5 rows)
   - Placeholder: "Paste the post you want to reply to..."
   - Character count

3. **Reply Options** (Left column)
   - Tone selector (same presets as Generate)
   - Reply length: Short (1-2 lines), Medium (3-4 lines), Long (paragraph)
   - Platform context (Twitter, LinkedIn, etc.)

4. **Generate Reply Button**
   - Primary button
   - Text: "Generate Reply"

5. **Generated Replies** (Right column)
   - List of 3 reply options
   - Each with:
     - Reply text
     - Copy button
     - "Use this" button (primary)
   - Empty state illustration

**Interactions:**
- Toggle between reply lengths
- Copy reply with one click
- Save favorite replies

---

### 3. Thread Page (`/thread`)
**Purpose:** Generate multi-post threads for Twitter/LinkedIn

**Layout:**
- Vertical timeline layout
- Connected thread visualization

**Components:**
1. **Page Header**
   - Heading: "Create Engaging Threads"
   - Subheading: "Tell a story across multiple posts"

2. **Thread Topic Input**
   - Large textarea
   - Placeholder: "What's your thread about?"
   - Key points input (bullet list)

3. **Thread Settings**
   - Number of posts (slider: 3-10)
   - Platform (Twitter/LinkedIn)
   - Tone preset

4. **Generate Thread Button**
   - Full-width primary button

5. **Thread Preview**
   - Vertical list of connected posts
   - Each post shows:
     - Post number badge (1/5, 2/5, etc.)
     - Post content
     - Character count per post
     - Edit button
     - Connector line to next post
   - Copy entire thread button (bottom)

**Interactions:**
- Drag to reorder posts
- Edit individual posts inline
- Copy full thread with proper formatting

---

### 4. Train Page (`/train`)
**Purpose:** Train AI on user's writing style and brand voice

**Layout:**
- Step-by-step wizard layout
- Progress indicator at top

**Components:**
1. **Progress Steps**
   - Steps: 1. Upload Content → 2. Review Style → 3. Train AI
   - Visual progress bar

2. **Upload Section** (Step 1)
   - Drag-and-drop zone
   - "Upload your past posts (CSV, TXT)"
   - Example content textarea (fallback)
   - File list with remove buttons

3. **Style Analysis** (Step 2)
   - Detected patterns card:
     - Average post length
     - Common words/phrases
     - Detected tone
     - Emoji usage
   - Editable style preferences
   - Vocabulary examples

4. **Training Confirmation** (Step 3)
   - Summary of training data
   - "Train AI" primary button
   - Training progress (animated)
   - Success confirmation

**Interactions:**
- File validation (size, format)
- Real-time style analysis preview
- Training progress animation
- Redirect to Generate page on success

---

### 5. History Page (`/history`)
**Purpose:** View and manage previously generated content

**Layout:**
- Data table with filters
- Card grid (mobile)

**Components:**
1. **Page Header**
   - Heading: "Your Content History"
   - Search bar (right side)
   - Filter buttons: All, Twitter, LinkedIn, Instagram

2. **History Table** (Desktop)
   - Columns:
     - Content preview (truncated)
     - Platform (with icon)
     - Tone badge
     - Created date (relative)
     - Actions (Copy, Delete)
   - Pagination (bottom)
   - Empty state: "No content yet. Start generating!"

3. **History Cards** (Mobile)
   - Each card shows:
     - Content preview
     - Platform badge
     - Date
     - Action buttons row

4. **Bulk Actions**
   - Select multiple checkbox
   - Delete selected button
   - Export selected button

**Interactions:**
- Search filters table in real-time
- Sort by date/platform
- Infinite scroll or pagination
- Delete with confirmation modal

---

### 6. Pricing Page (`/pricing`)
**Purpose:** Display subscription plans with Polar.sh integration

**Layout:**
- Three-column pricing cards (desktop)
- Vertical stack (mobile)
- Centered hero section

**Components:**
1. **Hero Section**
   - Heading: "Choose Your Plan"
   - Subheading: "Start free, upgrade anytime"
   - Toggle: Monthly / Yearly (with "Save 20%" badge)

2. **Pricing Cards** (3 plans)
   - **Free Plan:**
     - Price: $0/month
     - Features:
       - 10 posts/month
       - Basic tones
       - Community support
     - Button: "Current Plan" (disabled) or "Get Started"
   
   - **Pro Plan:** (Highlighted with border)
     - Price: $19/month ($15/month yearly)
     - Badge: "Most Popular"
     - Features:
       - 100 posts/month
       - All tones
       - Thread generation
       - Reply generation
       - Priority support
     - Button: "Upgrade to Pro" (primary)
   
   - **Enterprise Plan:**
     - Price: Custom pricing
     - Features:
       - Unlimited posts
       - Custom AI training
       - API access
       - Dedicated support
       - White-label option
     - Button: "Contact Sales"

3. **Feature Comparison Table** (Below cards)
   - Detailed feature matrix
   - Checkmarks for included features
   - Sticky header on scroll

4. **FAQ Section**
   - Accordion with common questions
   - Payment, cancellation, refund info

**Interactions:**
- Monthly/yearly toggle updates prices
- Highlight current user's plan
- Smooth scroll to comparison table
- Polar.sh checkout integration

---

### 7. Settings Page (`/settings`)
**Purpose:** User preferences and account management

**Layout:**
- Sidebar navigation (desktop)
- Tab navigation (mobile)
- Form sections

**Components:**
1. **Settings Navigation** (Sidebar)
   - Sections: Profile, Preferences, AI Training, Subscription, API

2. **Profile Section**
   - Avatar upload (circular)
   - Name input
   - Email (read-only, show verified badge)
   - Save changes button

3. **Preferences Section**
   - Default platform dropdown
   - Default tone dropdown
   - Auto-save drafts toggle
   - Dark mode toggle (future)
   - Language selector

4. **AI Training Section**
   - Current training status card
   - "Retrain AI" button
   - Delete training data button (danger)

5. **Subscription Section**
   - Current plan card
   - Usage this month (progress bar)
   - Next billing date
   - "Manage Subscription" button (Polar.sh)
   - "Cancel Subscription" link (danger)

6. **API Section** (Pro/Enterprise only)
   - API key display (masked)
   - "Show"/"Hide" toggle
   - "Regenerate" button
   - API documentation link
   - Usage stats

**Interactions:**
- Form validation
- Success/error toast notifications
- Confirmation modals for dangerous actions
- Auto-save preferences on change

---

### 8. Login Page (`/login`)
**Purpose:** Authentication with NextAuth

**Layout:**
- Centered card (max-width: 400px)
- Minimal, clean design

**Components:**
1. **Logo/Brand** (Top center)
   - App logo
   - "PostContent" text

2. **Login Card**
   - Heading: "Welcome Back"
   - Subheading: "Sign in to continue"
   
3. **Social Login Buttons** (Primary method)
   - "Continue with Google" (white button with Google logo)
   - "Continue with GitHub" (black button with GitHub logo)
   - Each button: full-width, pill-shaped

4. **Divider**
   - "or" text with horizontal lines

5. **Email Login Form** (Fallback)
   - Email input
   - Password input (with show/hide toggle)
   - "Forgot password?" link
   - "Sign In" primary button

6. **Sign Up Link** (Bottom)
   - "Don't have an account? Sign up"

**Interactions:**
- NextAuth OAuth flow
- Form validation
- Loading states on buttons
- Redirect to previous page after login
- Error messages below form

---

### 9. Success Page (`/success`)
**Purpose:** Subscription success confirmation (after Polar.sh checkout)

**Layout:**
- Centered content
- Celebration animation

**Components:**
1. **Success Animation**
   - Checkmark icon (animated)
   - Confetti animation (optional)

2. **Success Message**
   - Heading: "Welcome to Pro! 🎉"
   - Subheading: "Your subscription is now active"

3. **Next Steps Card**
   - "What's next?"
   - Bullet list:
     - Generate unlimited posts
     - Try advanced features
     - Train AI on your style
   - "Get Started" primary button (goes to Generate)

4. **Receipt Info**
   - "Receipt sent to: email@example.com"
   - "View invoice" link (Polar.sh)

**Interactions:**
- Auto-redirect to Generate after 5 seconds
- Confetti animation on load
- Track conversion event

---

### 10. Navigation Component
**Purpose:** Main app navigation (responsive)

**Desktop Navigation:**
- Top horizontal bar (sticky)
- Logo (left)
- Navigation links (center):
  - Generate
  - Reply
  - Thread
  - Train
  - History
- Right side:
  - Usage indicator (compact)
  - Settings icon
  - User avatar dropdown

**Mobile Navigation:**
- Bottom navigation bar (fixed)
- 5 icons:
  - Home (Generate)
  - Reply
  - History
  - Settings
  - More (dropdown for Train, Thread)
- Active state: Yellow background
- Icons with labels

**User Dropdown Menu:**
- User info (name, email, avatar)
- Divider
- Settings link
- Subscription link
- Divider
- Sign out button

---

## Component Specifications

### Shared Components

**LoadingSpinner:**
```typescript
// Rotating yellow circle
className: "w-5 h-5 border-2 border-[#f0ff5f] border-t-transparent rounded-full animate-spin"
```

**Toast Notifications:**
```typescript
// Success toast
className: "fixed top-4 right-4 bg-white border-l-4 border-[#00d632] p-4 rounded-lg shadow-lg"

// Error toast
className: "fixed top-4 right-4 bg-white border-l-4 border-[#ff0000] p-4 rounded-lg shadow-lg"
```

**Modal:**
```typescript
// Overlay
className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40"

// Modal content
className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-2xl z-50 max-w-md w-full"
```

**Empty State:**
```typescript
// Container
className: "flex flex-col items-center justify-center py-12 text-center"

// Icon (large, muted)
className: "w-16 h-16 text-[#e5e5e5] mb-4"

// Text
className: "text-[#999999] text-sm"
```

---

## Responsive Breakpoints
```typescript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

**Mobile-First Patterns:**
- Stack columns vertically on mobile
- Bottom navigation instead of sidebar
- Full-width buttons
- Larger touch targets (min 44px)
- Reduce padding on small screens
- Hide secondary content

---

## Animations & Transitions

**Button Hover:**
```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
hover:scale-[1.02]
active:scale-[0.98]
```

**Card Hover:**
```css
transition: shadow 200ms ease;
hover:shadow-md
```

**Page Transitions:**
```css
/* Fade in on load */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease;
```

**Loading Skeletons:**
```css
/* Shimmer effect */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
background: linear-gradient(90deg, #f5f5f5 25%, #e5e5e5 50%, #f5f5f5 75%);
background-size: 1000px 100%;
animation: shimmer 2s infinite;
```

---

## API Integration Notes

**Base URL:** `http://localhost:3000/api`

**Authentication:**
- Use NextAuth session
- Include credentials in fetch requests
- Handle 401 by redirecting to login

**Endpoints:**
- `POST /api/generate` - Generate post
- `POST /api/reply` - Generate reply
- `POST /api/thread` - Generate thread
- `POST /api/train` - Train AI model
- `GET /api/usage` - Get usage stats

**Error Handling:**
- Show toast notification on error
- Graceful degradation
- Retry failed requests (max 3 times)

---

## Accessibility Requirements

- Semantic HTML (header, nav, main, footer)
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus visible styles (yellow ring)
- Alt text for all images
- Color contrast ratio: WCAG AA minimum
- Screen reader announcements for dynamic content

---

## Implementation Notes

1. **Use Next.js 15+ App Router patterns**
2. **Prefer server components where possible**
3. **Use client components only for interactivity**
4. **Implement loading.tsx and error.tsx for each route**
5. **Use Suspense boundaries for async content**
6. **Optimize images with next/image**
7. **Add metadata for SEO**
8. **Use environment variables for API URLs**

---

## File Structure
```
app/
├── layout.tsx (root layout with Navigation)
├── page.tsx (Generate page)
├── reply/page.tsx
├── thread/page.tsx
├── train/page.tsx
├── history/page.tsx
├── pricing/page.tsx
├── settings/page.tsx
├── login/page.tsx
├── success/page.tsx
├── loading.tsx (global loading)
├── error.tsx (global error)
└── not-found.tsx (404 page)

components/
├── Navigation.tsx
├── PostGenerator.tsx
├── GeneratedPosts.tsx
├── UsageIndicator.tsx
├── EmptyState.tsx
├── LoadingState.tsx
├── Footer.tsx
└── AuthProvider.tsx
```

---

## Final Notes

**Design Philosophy:**
- Wise.com's functional clarity + Atome.ph's energetic vibrancy
- Pill buttons (9999px) for all primary actions
- Yellow (#f0ff5f) as the hero color
- Clean, minimal, fast
- Mobile-first, touch-friendly
- Subtle animations, no distraction

**Key Differentiators:**
- Ultra-rounded pill buttons (9999px) everywhere
- Vibrant yellow CTAs that demand attention
- Consistent spacing (4px base scale)
- High contrast for readability
- Fast interactions, instant feedback

**Brand Personality:**
- Professional yet friendly
- Modern and energetic
- Trustworthy (Wise) + Exciting (Atome)
- AI-powered but human-centered
