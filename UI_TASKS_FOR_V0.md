# UI & FRONTEND TASKS - For V0 Team

**Last Updated:** January 6, 2026  
**Priority:** High - These are blocking user experience

> ⚠️ **IMPORTANT:** These are UI/Frontend issues only. Backend/API logic has been fixed separately.

---

## 🎨 CRITICAL UI FIXES

### 1. **Login Page (`/login`)** - BLOCKER

**Issue:** Google OAuth button missing

**Requirements:**
- [ ] Add "Continue with Google" button above email/password form
- [ ] Style: Yellow (#f0ff5f) primary button with Google logo
- [ ] Position: Above OR between email/password fields
- [ ] Text: "Continue with Google" or "Sign in with Google"
- [ ] Action: Redirect to `/api/auth/signin?provider=google`

**Design:**
```tsx
<button onClick={() => signIn('google', { callbackUrl: '/generate' })}>
  <GoogleIcon /> Continue with Google
</button>

{/* OR divider */}
<div>
  <span>or</span>
</div>

{/* Email/password form */}
```

**References:**
- Google Sign-In guidelines: https://developers.google.com/identity/branding-guidelines
- Use official Google button styles

---

### 2. **Navigation - Logo Redirect Behavior**

**Issue:** When logged in, clicking logo goes to `/generate` instead of `/`

**Requirements:**
- [ ] Logo click should ALWAYS go to `/` (landing page)
- [ ] Maintain current behavior: Show appropriate nav based on auth status
- [ ] If user is on `/` and logged in, show "Dashboard" or "Generate" button

**Code Change Needed:**
```tsx
// components/app-navigation.tsx or components/navigation.tsx
<Link href="/" className="logo">  {/* NOT href="/generate" */}
  <Logo />
</Link>
```

---

### 3. **Landing Page - Auth State Issues**

**Issue:** Desktop version shows authenticated pages even when not logged in

**Requirements:**
- [ ] Check auth status: `const session = await auth()`
- [ ] If NOT logged in: Show "Login" and "Sign Up" buttons
- [ ] If logged in: Show "Dashboard" and profile avatar
- [ ] Hide protected route links (Generate, Reply, Thread) when logged out
- [ ] Test: Open in incognito → Should not see authenticated nav

**Pseudo Code:**
```tsx
// app/page.tsx
import { auth } from "@/lib/auth"

export default async function LandingPage() {
  const session = await auth()
  
  return (
    <div>
      <Navigation session={session} />
      {/* Rest of landing page */}
    </div>
  )
}

// components/navigation.tsx
export function Navigation({ session }) {
  if (session) {
    return <AuthenticatedNav user={session.user} />
  }
  return <UnauthenticatedNav />
}
```

---

### 4. **Usage Credits Widget - Repositioning**

**Issue:** Credits section too prominent, should be in profile avatar

**Requirements:**
- [ ] Remove standalone credits widget from pages
- [ ] Create profile avatar dropdown in top-right navbar
- [ ] Inside dropdown: Show credits, settings link, logout
- [ ] Credits display: "45 / 100 credits used this month"
- [ ] Progress bar inside dropdown (subtle)

**Design:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar>
      <AvatarImage src={user.image} />
      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent>
    {/* User info */}
    <div className="p-2">
      <p className="font-medium">{user.name}</p>
      <p className="text-sm text-muted">{user.email}</p>
    </div>
    
    {/* Credits */}
    <div className="p-2 border-t">
      <p className="text-sm">Credits this month</p>
      <Progress value={45} max={100} />
      <p className="text-xs text-muted">45 / 100 used</p>
    </div>
    
    {/* Menu items */}
    <DropdownMenuItem>
      <Link href="/settings">Settings</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href="/history">History</Link>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => signOut()}>
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 5. **Settings Page - Remove API Configuration**

**Issue:** "API Configuration Optional: Use your own API keys" section shouldn't be visible

**Requirements:**
- [ ] Remove entire "API Configuration" section
- [ ] Keep: Name, Email, Preferences
- [ ] Keep: Data export/delete buttons
- [ ] This is NOT a user-configurable setting

**Remove:**
```tsx
// Remove this entire section
<Card>
  <CardHeader>
    <CardTitle>API Configuration</CardTitle>
    <CardDescription>Optional: Use your own API keys...</CardDescription>
  </CardHeader>
  {/* ... */}
</Card>
```

---

### 6. **Hero Section - Subheadline Copy**

**Issue:** Needs better copy targeting actual use case

**Current:**
> "Skip the blank page stress. Get ready-to-post content for all your social channels, fast."

**Suggested:**
> "Generate X/Twitter posts, threads, and replies that sound like you—not ChatGPT. Built for developers who code more than they copywrite."

**Alternative:**
> "Stop staring at the blank tweet box. Get 3 post variations in seconds with AI that matches your voice."

**Or:**
> "10x your social media presence without burning out. AI-powered posts, threads, and replies that actually sound human."

**Requirements:**
- [ ] Update subheadline text in `app/page.tsx`
- [ ] Emphasize: Speed, authenticity, developer-focused
- [ ] Avoid: Generic "content creation" language

---

## 🎨 STYLING FIXES

### 7. **Dark Mode Button Hover - Text Contrast**

**Issue:** Button text turns black on hover in dark mode, becomes invisible

**Requirements:**
- [ ] In dark mode: Button text should ALWAYS be white or light color
- [ ] On hover: Background changes, text stays readable
- [ ] Test all button variants: primary, secondary, outline

**CSS Fix:**
```css
/* In globals.css or button component */
.dark button:hover {
  color: white !important; /* or hsl(var(--primary-foreground)) */
}

/* Or in Tailwind */
className="dark:hover:text-white"
```

---

### 8. **Loading States - Add Animations**

**Issue:** No loading animations visible during API calls

**Requirements:**
- [ ] Post generation: Spinner with funny message
- [ ] Page loads: Skeleton screens (shimmer effect)
- [ ] Button submits: Disabled state + spinner
- [ ] Data fetching: Loading cards

**Examples:**
```tsx
{/* Post generation loading */}
{isLoading && (
  <div className="flex flex-col items-center gap-4">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">
      {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
    </p>
  </div>
)}

{/* Skeleton for history */}
{isLoading ? (
  <div className="space-y-4">
    {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
  </div>
) : (
  <HistoryList posts={posts} />
)}
```

**Loading Messages:**
- "Cooking up some fire content..."
- "Teaching AI to be funny..."
- "Making it sound less boring..."
- "Channeling your inner influencer..."

---

### 9. **Error Messages - Styled UI**

**Issue:** Some errors have no UI response, just console logs

**Requirements:**
- [ ] Auth errors: Red toast notification at top
- [ ] Form validation: Red text below input field
- [ ] API errors: Error state with retry button
- [ ] 404: Custom error page (already exists)

**Design:**
```tsx
{/* Toast for errors */}
import { useToast } from "@/hooks/use-toast"

const { toast } = useToast()

toast({
  title: "Error",
  description: "Failed to generate posts. Please try again.",
  variant: "destructive",
})

{/* Inline error */}
{error && (
  <p className="text-sm text-destructive mt-1">
    {error.message}
  </p>
)}

{/* Error state with retry */}
{error && (
  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
    <p className="text-destructive font-medium">Something went wrong</p>
    <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
    <Button onClick={retry} variant="outline" size="sm" className="mt-2">
      Try Again
    </Button>
  </div>
)}
```

---

## 📱 RESPONSIVE LAYOUT FIXES

### 10. **Prevent Horizontal Scroll**

**Issue:** Layout overflows causing left-right scroll on mobile

**Requirements:**
- [ ] Add `overflow-x: hidden` to body/main container
- [ ] Check all pages for elements exceeding viewport width
- [ ] Fix any `min-width` that's too large
- [ ] Test on 375px width (iPhone SE)

**Global Fix:**
```css
/* app/globals.css */
html, body {
  overflow-x: hidden;
  width: 100%;
}

main {
  max-width: 100vw;
  overflow-x: hidden;
}
```

**Component Fixes:**
```tsx
{/* Ensure containers don't overflow */}
<div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

---

### 11. **Mobile Touch Targets**

**Issue:** Some buttons/links are too small on mobile

**Requirements:**
- [ ] All buttons: Minimum 44px height
- [ ] All clickable elements: 44px × 44px touch area
- [ ] Add padding if visual button is smaller
- [ ] Test on actual devices (not just DevTools)

**Fix:**
```tsx
{/* Small icon button - add invisible padding */}
<button className="p-3 min-h-[44px] min-w-[44px]">
  <Icon className="h-5 w-5" />
</button>
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### 12. **Page Transitions**

**Issue:** Instant page changes feel jarring

**Requirements:**
- [ ] Add fade-in animation on page load
- [ ] Add slide-up animation for modals
- [ ] Add smooth scroll behavior
- [ ] Use Framer Motion for complex transitions

**Example:**
```tsx
// app/layout.tsx or page-transition component
import { motion } from "framer-motion"

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 🧪 TESTING REQUIREMENTS

After implementing these fixes, test:

### Desktop (Chrome, Firefox, Safari)
- [ ] Login with email/password
- [ ] Login with Google
- [ ] Navigate between pages (logo, nav links)
- [ ] Credits shown in avatar dropdown
- [ ] Settings page (no API section)
- [ ] Hover all buttons in dark mode
- [ ] Generate post → see loading → see results
- [ ] Trigger error → see error UI

### Mobile (iOS Safari, Android Chrome)
- [ ] No horizontal scroll on any page
- [ ] All buttons tappable (44px min)
- [ ] Profile avatar accessible
- [ ] Forms work without keyboard issues
- [ ] Loading states visible
- [ ] Page transitions smooth

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces errors
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible

---

## 📊 PRIORITY ORDER

**Must Fix Before Launch:**
1. ✅ Google OAuth button (login page) - BLOCKER
2. ✅ Landing page auth state
3. ✅ Logo redirect behavior
4. ✅ Horizontal scroll prevention
5. ✅ Dark mode button contrast

**Should Fix Soon:**
6. ✅ Credits in profile dropdown
7. ✅ Remove API config from settings
8. ✅ Loading states
9. ✅ Error message UI
10. ✅ Hero subheadline

**Nice to Have:**
11. ✅ Page transitions
12. ✅ Mobile touch target optimization

---

## 🔗 HANDOFF CHECKLIST

For v0.dev team:
- [ ] Review this document
- [ ] Confirm component structure (where to make changes)
- [ ] Identify any missing information
- [ ] Estimate time for each fix
- [ ] Prioritize based on user impact
- [ ] Create staging branch for testing
- [ ] Deploy to preview URL
- [ ] Test against checklist above
- [ ] Merge to main when approved

---

## 📝 NOTES

**Session Management:**
- Use `const session = await auth()` in Server Components
- Use `useSession()` hook in Client Components
- Session data includes: `user.id`, `user.email`, `user.name`, `user.image`

**Auth Functions:**
```tsx
import { signIn, signOut } from "next-auth/react"

// Login
await signIn("google", { callbackUrl: "/generate" })
await signIn("credentials", { email, password })

// Logout
await signOut({ callbackUrl: "/" })
```

**Polar.sh Checkout:**
- Backend API now handles redirect
- Frontend just needs to call `/api/checkout` and redirect to returned URL
- No Polar.sh SDK needed on frontend

---

## ✅ DONE CRITERIA

UI fixes are complete when:
- [ ] All 12 issues above are addressed
- [ ] Tested on desktop + mobile
- [ ] No console errors
- [ ] Auth flow works end-to-end
- [ ] User feedback received and incorporated
