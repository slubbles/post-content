# Post Content Design System

Complete documentation of the frontend UI design system applied to postcontent.io

## Brand Identity

### Product Name
**Post Content** - AI Social Media Content Generator

### Brand Personality
- Human-centered, not corporate
- Encouraging without being pushy
- Smart without being complicated
- Friendly but professional

### Target Audience
- Content creators
- Social media marketers
- Entrepreneurs
- Small business owners
- Anyone who needs to post regularly but struggles with writer's block

---

## Color System

### Brand Colors

**Primary Color: Atome Yellow (Spriteburst)**
- Hex: `#f0ff5f`
- Usage: CTAs, brand accents, primary buttons, active states
- Psychology: Energy, progress, positivity, brilliance
- Inspired by: Atome.ph brand color

**Neutrals: Wise-Inspired Palette**
- Background layers: 950, 900, 800 (darkest to lighter dark grays)
- Text: Foreground with 70% opacity variants
- Borders: Subtle gray borders
- Muted: Secondary text, disabled states

### Semantic Color Tokens

Defined in `app/globals.css`:

```css
--background: 0 0% 7%;           /* #121212 - Main background */
--foreground: 0 0% 98%;          /* #fafafa - Main text */
--card: 0 0% 9%;                 /* #171717 - Card backgrounds */
--card-foreground: 0 0% 98%;     /* Card text */
--muted: 0 0% 20%;               /* #333333 - Muted backgrounds */
--muted-foreground: 0 0% 60%;    /* #999999 - Muted text */
--border: 0 0% 15%;              /* #262626 - Borders */
--input: 0 0% 15%;               /* Input backgrounds */
--ring: 0 0% 83.1%;              /* Focus rings */
--primary: 67 100% 68%;          /* #f0ff5f - Atome yellow */
--primary-foreground: 0 0% 0%;   /* Black text on yellow */
```

### Light Mode Colors
```css
--background: 0 0% 100%;         /* White */
--foreground: 0 0% 3.9%;         /* Near black */
--card: 0 0% 100%;               /* White cards */
--muted: 0 0% 96.1%;             /* Light gray */
--border: 0 0% 89.8%;            /* Light borders */
```

### Color Usage Guidelines

1. **Never use more than 5 colors total** across any page
2. **Primary yellow is reserved for:**
   - Call-to-action buttons
   - Active navigation states
   - Important interactive elements
   - Brand logo background
3. **Neutrals handle everything else:**
   - Backgrounds (layered: background → card → muted)
   - Text (foreground → muted-foreground)
   - Borders and dividers
4. **Gradients are minimal:**
   - Only on hero headlines (primary to primary/70)
   - Subtle card backgrounds (from-card to-card/50)

---

## Typography

### Font Families

**Primary Font: Manrope**
- Source: Google Fonts
- Usage: All body text, headings, UI elements
- Characteristics: Clean, modern, friendly sans-serif
- Why: Balances professionalism with approachability

**Monospace Font: Geist Mono**
- Usage: Code snippets, technical elements (rare)
- Fallback: System monospace fonts

### Font Configuration

```typescript
// app/layout.tsx
import { Manrope } from "next/font/google"

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
})
```

```css
/* app/globals.css */
@theme inline {
  --font-sans: 'Manrope', 'Manrope Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
}
```

### Typography Scale

**Headings:**
- H1 (Hero): `text-4xl sm:text-5xl lg:text-7xl` (36px → 48px → 72px)
- H1 (Page): `text-3xl sm:text-4xl lg:text-5xl` (30px → 36px → 48px)
- H2 (Section): `text-2xl sm:text-3xl lg:text-4xl` (24px → 30px → 36px)
- H3 (Card): `text-xl` (20px)

**Body Text:**
- Large: `text-lg sm:text-xl` (18px → 20px)
- Base: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

**Line Height:**
- Body text: `leading-relaxed` (1.625)
- Pretty text: `text-pretty` (optimized line breaks)
- Balanced headlines: `text-balance` (balanced wrapping)

**Font Weight:**
- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

### Typography Best Practices

1. **Always wrap headlines in `text-balance`** for optimal line breaks
2. **Use `text-pretty` on subheadlines** and longer paragraphs
3. **Leading-relaxed on all body text** for readability
4. **Never use decorative fonts** or fonts under 14px
5. **Maximum 2 font families** (currently using Manrope only)

---

## Layout System

### Layout Method Priority

1. **Flexbox (90% of layouts)**
   ```css
   flex items-center justify-between
   flex-col gap-4 md:flex-row
   ```

2. **CSS Grid (10% - complex 2D layouts)**
   ```css
   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
   ```

3. **Avoid:** Floats, absolute positioning (unless necessary)

### Spacing System

**Tailwind Spacing Scale (0.25rem = 4px increments):**
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

**Prefer `gap` over `margin`:**
```css
/* Good */
<div className="flex gap-4">

/* Avoid */
<div className="flex">
  <div className="mr-4">
```

### Container Widths

- Max width: `max-w-7xl` (1280px)
- Content width: `max-w-5xl` (1024px)
- Text width: `max-w-2xl` (672px)

### Mobile-Safe Padding

Custom utility class for mobile devices:
```css
.mobile-safe-padding {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .mobile-safe-padding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

**Usage:** Apply to all top-level containers for consistent edge spacing

---

## Components

### Navigation

**Desktop Navigation**
- Fixed top bar with logo, main nav items, and actions
- Height: 64px (`h-16`)
- Logo: 36px square with primary background
- Active state: Secondary background with shadow
- Theme toggle integrated in top right

**Mobile Bottom Navigation**
- Fixed bottom bar (Wise pattern)
- 5 icon tabs: Generate, Reply, History, Train, Settings
- Height: 88px with safe padding
- Active state: Primary color accent with scale effect
- Global padding-bottom on body: 88px

### Buttons

**Variants:**
1. **Primary** - Yellow background, black text
2. **Secondary** - Gray background
3. **Outline** - Transparent with border
4. **Ghost** - Transparent, hover effect

**Sizes:**
- Default: `h-10 px-4`
- Small: `h-9 px-3`
- Large: `h-11 px-8`

**Style:**
- Border radius: `rounded-full` for primary CTAs
- Hover: `hover:scale-105` with transition
- Focus: Ring with primary color

### Cards

**Style:**
```tsx
<Card className="border-border hover:shadow-lg">
  <CardContent className="p-6">
```

**Hover Effects:**
- Lift: `hover:-translate-y-1`
- Shadow: `hover:shadow-lg`
- Transition: `transition-all duration-300`

### Input Fields

**Base Style:**
```tsx
<Input 
  className="border-input bg-background focus:ring-primary"
/>
```

**Textarea with Character Counter:**
- Dynamic color: Green → Amber → Red
- Inline validation hints
- Minimum requirements shown

### Loading States (Skeletons)

**Shimmer Effect:**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

**Usage:** Applied to placeholder elements while content loads

---

## Micro-interactions

### Confetti Celebration

Triggers on successful post generation:
```typescript
<ConfettiCelebration trigger={success} />
```
- 50 particles
- Random colors from primary palette
- Falls from top with physics
- Auto-cleanup after 3s

### Hover Animations

**Scale Up:**
```css
hover:scale-105 transition-transform
```

**Lift Up:**
```css
hover:-translate-y-1 transition-all duration-300
```

**Ripple Button:**
- Click-position-based ripple
- Expands from click point
- Fades out over 600ms

### Toast Notifications

**Types:**
- Success: Checkmark icon
- Error: X icon
- Info: Default

**Duration:** 3 seconds
**Position:** Bottom right on desktop, bottom center on mobile

---

## Responsive Design

### Breakpoints (Tailwind defaults)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile-First Approach

Always write mobile styles first, then enhance:
```tsx
<div className="text-base sm:text-lg lg:text-xl">
```

### Touch Targets

Minimum touch target: 44x44px (iOS guideline)
```tsx
<Button className="h-16 w-full"> {/* Mobile */}
<Button className="h-10"> {/* Desktop */}
```

---

## Accessibility

### Focus States

All interactive elements have visible focus rings:
```css
focus:ring-2 focus:ring-ring focus:ring-offset-2
```

### Color Contrast

- Primary on white: 3.2:1 (passes WCAG AA for large text)
- Foreground on background: 14:1 (passes AAA)
- Muted foreground: 4.5:1 (passes AA)

### Screen Reader Support

- Semantic HTML (`<main>`, `<nav>`, `<section>`)
- ARIA labels on icon-only buttons
- Focus management in modals
- Keyboard navigation support

### Keyboard Shortcuts

- `?` - Show keyboard shortcuts modal
- `Escape` - Close modals/drawers
- Tab navigation through all interactive elements

---

## Animation System

### Page Transitions

Smooth fade on route changes:
```tsx
<PageTransition>{children}</PageTransition>
```
- Opacity: 0 → 1 over 200ms
- Applied to all page content

### Keyframe Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Shimmer (Loading):**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

**Confetti:**
```css
@keyframes confettiFall {
  to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
```

### Transition Timing

- Fast: `duration-200` (200ms)
- Normal: `duration-300` (300ms)
- Slow: `duration-500` (500ms)

---

## Microcopy & Voice

### Brand Voice Principles

1. **Human, not corporate**
   - "Stop overthinking. Start posting." vs. "Optimize your content workflow"
   - "Your thoughts deserve to be heard" vs. "Enterprise content solutions"

2. **Encouraging, not pushy**
   - "Ready when you are" vs. "Sign up now!"
   - "Give it a try" vs. "Don't miss out"

3. **Simple, not complicated**
   - "Create better posts in half the time" vs. "Leverage AI-powered content generation"
   - "No more blank screens" vs. "Eliminate ideation friction"

### Microcopy Examples

**Empty States:**
- "Nothing here yet. Ready to create your first post?"
- "Your history is empty. Start generating to see your posts here."

**Success Messages:**
- "Copied! Ready to paste and post."
- "Post created! What's next?"

**Loading States:**
- "Cooking up some content..."
- "Almost there..."
- "Crafting your post..."

**Error Messages:**
- "Oops! Something went wrong. Give it another try?"
- "Couldn't load that. Want to refresh?"

---

## Dark Mode

### Implementation

Theme toggle with system preference detection:
```typescript
<ThemeToggle />
```

### Color Adjustments

Automatically switches between light/dark palettes:
- Background: White (light) → #121212 (dark)
- Text: Near black (light) → White (dark)
- Primary stays consistent: #f0ff5f (works in both)

### Smooth Transitions

All theme changes animated:
```css
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

---

## Technical Implementation

### Framework
- **Next.js 16** with App Router
- **React 19.2** with canary features
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom theme

### Component Library
- **shadcn/ui** - Base components
- **Lucide React** - Icons
- **Radix UI** - Headless primitives

### File Structure
```
app/
  ├── (routes)/        # Page routes
  ├── api/             # API routes (placeholder)
  ├── globals.css      # Global styles + theme
  └── layout.tsx       # Root layout
components/
  ├── ui/              # shadcn components
  ├── app-navigation.tsx
  ├── post-generator.tsx
  └── ...
```

---

## Design Inspiration Sources

### Primary Inspiration: Wise.com
- Emotional design through micro-interactions
- Human-centered microcopy
- Smooth animations and transitions
- Conversational tone
- Clean, minimal interface

### Color Inspiration: Atome.ph
- Spriteburst yellow (#f0ff5f)
- Energy and positivity
- Bold accent color
- Modern fintech aesthetic

---

## Quality Checklist

Before shipping any new UI:

**Design:**
- [ ] Uses 3-5 colors maximum
- [ ] Manrope font applied consistently
- [ ] Mobile-first responsive
- [ ] Touch targets 44x44px minimum

**Interactions:**
- [ ] Hover states on all interactive elements
- [ ] Focus rings visible
- [ ] Loading states for async actions
- [ ] Success feedback (toast/confetti)

**Content:**
- [ ] Microcopy is human and encouraging
- [ ] No jargon or complicated words
- [ ] Empty states have personality
- [ ] Error messages are helpful

**Accessibility:**
- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader tested

**Performance:**
- [ ] Images optimized
- [ ] Animations don't cause jank
- [ ] Mobile load time under 3s
- [ ] No layout shift (CLS)

---

## Maintenance Notes

### Adding New Colors
1. Must justify the addition (is it absolutely necessary?)
2. Add to semantic tokens in `globals.css`
3. Document usage in this file
4. Test in both light and dark modes

### Adding New Fonts
1. Maximum 2 font families (already at limit)
2. Must be Google Fonts or self-hosted
3. Configure in `app/layout.tsx`
4. Add CSS variables to `globals.css`

### Modifying Components
1. Always read existing component first
2. Use comments for unchanged code
3. Add Change Comments for clarity
4. Test on mobile and desktop
5. Update this documentation

---

## Contact & Credits

**Design System Created For:** postcontent.io
**Version:** 1.0
**Last Updated:** January 2026
**Framework:** Next.js 16 + React 19 + Tailwind CSS v4

**Inspirations:**
- Wise.com (emotional design, micro-interactions)
- Atome.ph (brand color palette)
- Vercel (clean UI patterns)
- Linear (command palette, keyboard shortcuts)

---

**End of Design System Documentation**
