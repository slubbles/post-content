# V0.dev Frontend Tasks - PostContent.io

**Date:** January 6, 2026  
**Context:** Backend/API fixes are complete. These are UI-only tasks.

---

## 🎯 CRITICAL TASKS (Must Fix First)

### 1. **Add Google OAuth Button to Login Page**
- **Page:** `/login`
- **Issue:** "Continue with Google" button is missing
- **Task:** Add Google sign-in button above or between the email/password form
- **Design:** Use official Google button styling, yellow primary color scheme
- **Action:** Should call NextAuth Google provider sign-in

---

### 2. **Fix Landing Page Auth State**
- **Page:** `/` (landing page)
- **Issue:** Desktop version shows authenticated navigation even when not logged in
- **Task:** 
  - Show "Login" and "Sign Up" buttons when logged out
  - Show "Dashboard" and profile avatar when logged in
  - Hide protected route links (Generate, Reply, Thread) when user is logged out
- **Test:** Open in incognito mode - should only see public navigation

---

### 3. **Move Credits to Profile Avatar**
- **Current:** Credits widget is too prominent/standalone on pages
- **New Location:** Inside profile avatar dropdown menu in navbar
- **Task:**
  - Remove standalone credits widget from all pages
  - Create profile avatar component in top-right navbar
  - Add dropdown menu with: user info, credits progress bar, settings link, logout
  - Credits should show: "45 / 100 used this month" with small progress bar

---

### 4. **Create Profile Avatar in Navbar**
- **Condition:** Only show when user is logged in
- **Content:** User's image or first letter of name as fallback
- **Dropdown should include:**
  - User name and email
  - Credits usage (with progress bar)
  - Link to Settings
  - Link to History
  - Logout button

---

### 5. **Fix Logo Redirect Behavior**
- **Issue:** When logged in, clicking logo redirects to `/generate` instead of `/`
- **Fix:** Logo should ALWAYS redirect to `/` (landing page) regardless of auth state
- **Keep:** Authenticated vs unauthenticated navigation remains different

---

### 6. **Update Hero Section Subheadline**
- **Page:** `/` (landing page)
- **Current:** Generic "Skip the blank page stress..." copy
- **New:** More specific about what the tool does and who it's for
- **Target:** Emphasize speed, authenticity, developer-focused
- **Suggested themes:**
  - "Generate X/Twitter posts that sound like you, not ChatGPT"
  - "Built for developers who code more than they copywrite"
  - "10x your social presence without burning out"

---

### 7. **Remove API Configuration Section**
- **Page:** `/settings`
- **Issue:** "API Configuration Optional: Use your own API keys" section is visible
- **Task:** Remove entire API configuration card/section
- **Keep:** Name, email, preferences, data export/delete buttons

---

## 🎨 STYLING FIXES

### 8. **Fix Dark Mode Button Hover**
- **Issue:** Button text turns black on hover in dark mode, becomes invisible
- **Task:** Ensure button text stays white/readable on hover in dark mode
- **Test:** All button variants (primary, secondary, outline) in dark mode

---

### 9. **Add Loading States**
- **Issue:** No loading animations visible during API calls
- **Task:** Add loading indicators for:
  - Post generation: Spinner with funny loading message
  - Page loads: Skeleton screens with shimmer effect
  - Button submits: Disabled state with spinner
  - Data fetching: Loading cards
- **Messages:** "Cooking up some fire content...", "Teaching AI to be funny...", etc.

---

### 10. **Style Error Messages**
- **Issue:** Some errors have no visual UI response, only console logs
- **Task:** Add styled error states:
  - Auth errors: Toast notification at top (red)
  - Form validation: Red text below input fields
  - API errors: Error state component with retry button
  - Use destructive variant for error toasts

---

## 📱 RESPONSIVE FIXES

### 11. **Prevent Horizontal Scroll**
- **Issue:** Layout overflows causing left-right scroll on mobile
- **Task:** 
  - Add overflow-x: hidden to main containers
  - Check all pages for elements exceeding viewport width
  - Test on 375px width (iPhone SE)
  - Ensure no components are out of bounds

---

### 12. **Ensure Touch Targets**
- **Issue:** Some buttons/links may be too small on mobile
- **Task:**
  - All buttons minimum 44px height
  - All clickable elements 44px × 44px touch area
  - Test on actual devices (not just DevTools)

---

### 13. **Verify Responsive Layout**
- **Task:** Test all pages on:
  - Mobile portrait (375px - 430px)
  - Mobile landscape (667px - 844px)
  - Tablet portrait (768px)
  - Tablet landscape (1024px)
  - Desktop (1280px+)
- **Check:** No overflow, readable text, accessible buttons

---

## 🎬 ANIMATIONS

### 14. **Add Page Transitions**
- **Issue:** Page changes feel jarring
- **Task:** Add smooth transitions:
  - Fade-in animation on page load
  - Slide-up for modals
  - Smooth scroll behavior
  - Use Framer Motion for complex transitions

---

## 🔗 INTEGRATION TASKS

### 15. **Update Polar.sh Checkout Button**
- **Page:** `/pricing`
- **Task:** Ensure "Upgrade to Pro" button calls `/api/checkout` endpoint
- **Flow:** Button click → POST to /api/checkout → Redirect to returned checkoutUrl
- **Note:** Backend endpoint is now created and working

---

### 16. **Update Settings Page API Calls**
- **Page:** `/settings`
- **Task:** Remove any references to API key configuration
- **Keep:** User preferences, name, email updates

---

## 📋 TESTING REQUIREMENTS

After implementing fixes, test:

### Desktop
- [ ] Login with email/password works
- [ ] Login with Google works (button visible)
- [ ] Navigate between pages using logo
- [ ] Profile avatar shows when logged in
- [ ] Credits visible in avatar dropdown
- [ ] All buttons readable in dark mode
- [ ] Loading states show during API calls
- [ ] Error messages display properly

### Mobile
- [ ] No horizontal scroll on any page
- [ ] All buttons easily tappable (44px min)
- [ ] Profile avatar accessible
- [ ] Forms work without keyboard covering inputs
- [ ] Loading states visible
- [ ] Page transitions smooth

---

## 📦 DELIVERABLES

When complete, v0 team should:

1. **Test all changes** in preview environment
2. **Document any** component structure changes
3. **Create pull request** with changes
4. **Include screenshots** of before/after for visual changes
5. **Note any dependencies** added or removed
6. **Verify responsive** on multiple devices
7. **Check accessibility** (keyboard navigation, screen readers)

---

## 🚨 IMPORTANT NOTES

**DO NOT MODIFY:**
- Any API endpoints (in `/app/api/`)
- Database queries (in `/lib/`)
- Authentication logic (in `/lib/auth.ts`)
- Prisma schema
- Environment variables

**ONLY MODIFY:**
- Component files (in `/components/`)
- Page files (in `/app/`)
- Styles (CSS, Tailwind classes)
- Client-side logic (useState, useEffect, etc.)
- UI/UX elements

**BACKEND IS READY:**
- Google OAuth provider configured
- Checkout API endpoint created
- Session management fixed
- All API routes working

Just need frontend to call them properly and display states correctly.

---

## ✅ PRIORITY ORDER

**Must fix before launch:**
1. Google OAuth button (BLOCKER)
2. Landing page auth state
3. Logo redirect behavior
4. Horizontal scroll prevention
5. Dark mode button contrast

**Should fix soon:**
6. Credits in profile dropdown
7. Remove API config from settings
8. Loading states
9. Error message UI
10. Hero subheadline

**Nice to have:**
11. Page transitions
12. Touch target optimization

---

## 📞 QUESTIONS?

If anything is unclear about these tasks:
- Review `BACKEND_FIXES.md` for context on what was fixed on backend
- Check `MOBILE_TEST.md` for detailed testing requirements
- See `SEO_CHECKLIST.md` for any SEO-related UI needs
- Reference existing components for design patterns

**Contact backend team** if you encounter API issues or need endpoint changes.

---

**Total Tasks:** 16 UI/Frontend tasks  
**Estimated Effort:** Medium to High  
**Backend Status:** ✅ Complete and ready for frontend integration
