# Comprehensive Testing Guide - PostContent.io

**Last Updated:** January 6, 2026  
**App URL:** https://www.postcontent.io  
**Purpose:** Complete testing checklist for all features, UI, error handling, and backend functionality

---

## 🧪 Testing Methodology

### Test Types:
1. **Manual Testing** - User flows and UI interactions
2. **Automated Testing** - API endpoints and backend logic
3. **Error Scenarios** - Edge cases and failure modes
4. **Performance Testing** - Loading states and responsiveness
5. **Security Testing** - Authentication and authorization

---

## 📋 1. AUTHENTICATION TESTING

### A. Email/Password Login (Manual)
- [ ] Open `/login` page
- [ ] Leave email empty, click "Let's go" → Should show "Please enter a valid email address"
- [ ] Enter invalid email (e.g., "test@"), click submit → Should show validation error
- [ ] Enter valid email but short password (< 8 chars) → Should show "Password must be at least 8 characters"
- [ ] Enter wrong credentials → Should show red toast: "Invalid email or password"
- [ ] Enter correct credentials → Should show green toast: "Welcome back!"
- [ ] Verify redirect to `/generate` page
- [ ] Check that navigation shows profile avatar (logged in state)
- [ ] Verify session persists after page refresh

**Expected Behaviors:**
- Loading spinner appears on button during submission
- Button is disabled while loading
- Toast notifications appear for all outcomes
- Errors are inline (red text) for validation
- Form clears password on error
- Session cookie is set after successful login

### B. Google OAuth Login (Manual)
- [ ] Open `/login` page in incognito mode
- [ ] Click "Continue with Google" button
- [ ] Verify Google OAuth consent screen appears
- [ ] Approve OAuth permissions
- [ ] Should redirect to `/generate` page
- [ ] Verify profile avatar shows in navigation
- [ ] Check database: `node check-db.js` → Should show new account with provider: "google"
- [ ] Logout and try logging in again with Google → Should work immediately (no signup)

**Expected Behaviors:**
- Button shows loading state during OAuth
- Redirects to Google's official OAuth page
- Creates both User and Account records in database
- Email from Google is auto-linked to account
- Session is immediately available after redirect

### C. Signup Flow (Manual)
- [ ] Open `/signup` page
- [ ] Try submitting with empty fields → Should show validation errors
- [ ] Enter email that already exists → Should show "User already exists"
- [ ] Enter mismatched passwords → Should show "Passwords don't match"
- [ ] Enter weak password (< 8 chars) → Should show password strength error
- [ ] Successfully signup with valid data → Should auto-login and redirect to `/generate`
- [ ] Verify new user in database: `node check-db.js`

**Expected Behaviors:**
- Password confirmation field must match
- Password is hashed (bcrypt) before storing
- User is automatically logged in after signup
- Welcome toast appears
- Database shows new user with `createdAt` timestamp

### D. Logout (Manual)
- [ ] Login successfully
- [ ] Click profile avatar → Dropdown shows
- [ ] Click "Logout" option
- [ ] Should redirect to landing page `/`
- [ ] Verify navigation shows "Login" and "Sign Up" buttons (logged out state)
- [ ] Try accessing `/generate` directly → Should redirect to `/login`

**Expected Behaviors:**
- Session is cleared from cookies
- Protected routes redirect to login
- No errors in console during logout

### E. Session Persistence (Manual)
- [ ] Login successfully
- [ ] Close browser tab
- [ ] Reopen site → Should still be logged in
- [ ] Wait 30 days → Session should expire
- [ ] Try accessing after expiry → Should redirect to login

---

## 🤖 2. AI GENERATION TESTING

### A. Single Post Generation (Manual)
- [ ] Login and navigate to `/generate`
- [ ] Enter a topic (e.g., "React Server Components")
- [ ] Click "Generate" button
- [ ] Verify loading state appears with funny message
- [ ] Wait for generation to complete (should take 2-5 seconds)
- [ ] Verify 5 post variants appear
- [ ] Check each variant is different
- [ ] Verify copy button works for each variant
- [ ] Check that credits counter decreases by 1
- [ ] Verify post is saved to database: `node check-db.js`

**Expected Behaviors:**
- Button is disabled during generation
- Loading message rotates (e.g., "Cooking up some fire content...")
- Spinner animation shows
- Generated posts appear in cards
- Copy button shows "Copied!" feedback
- Post is stored with type: "single", userId, content, timestamp

### B. Thread Generation (Manual)
- [ ] Navigate to `/thread`
- [ ] Enter topic and select thread length (3-10 posts)
- [ ] Generate thread
- [ ] Verify all posts in thread are connected/coherent
- [ ] Verify thread numbering (1/5, 2/5, etc.)
- [ ] Check copy all button copies entire thread
- [ ] Verify credits decrease by 1 (not by thread length)

**Expected Behaviors:**
- Thread maintains context across posts
- Each post is under 280 characters
- Thread has clear beginning, middle, end structure
- Can be copied as formatted thread

### C. Reply Generation (Manual)
- [ ] Navigate to `/reply`
- [ ] Paste an original tweet
- [ ] Generate reply
- [ ] Verify reply is contextually relevant
- [ ] Check reply tone matches settings (if applicable)
- [ ] Verify reply length is appropriate

### D. Custom Training (Manual)
- [ ] Navigate to `/train`
- [ ] Upload 5-10 example tweets
- [ ] Save training data
- [ ] Generate new post
- [ ] Verify style matches examples
- [ ] Check database stores training preferences

---

## 💳 3. CHECKOUT & PAYMENT TESTING

### A. Pricing Page (Manual)
- [ ] Navigate to `/pricing` (logged out)
- [ ] Verify 3 plans visible: Free, Pro ($19/mo), Enterprise ($99/mo)
- [ ] Check annual toggle shows discounted price
- [ ] Free plan: Click "Get Started" → Should redirect to `/signup`
- [ ] Pro plan: Click "Upgrade to Pro" → Should redirect to Polar.sh
- [ ] Enterprise plan: Click "Contact Sales" → Should open email client

**Expected Behaviors:**
- Toggle switches between monthly and annual
- Annual shows "Save 20%" badge
- Prices update correctly when toggling
- Most Popular badge on Pro plan
- All features listed per plan

### B. Polar.sh Checkout (Manual)
- [ ] Login first
- [ ] Navigate to `/pricing`
- [ ] Click "Upgrade to Pro" (monthly)
- [ ] Verify redirect to Polar.sh checkout page
- [ ] Check URL contains: `https://buy.polar.sh/polar_cl_...`
- [ ] Verify email is pre-filled in checkout form
- [ ] Verify product shows: "PostContent Pro - Monthly" at $19
- [ ] Test discount code input (if applicable)
- [ ] **DO NOT COMPLETE PAYMENT** (unless testing webhooks)

**Expected Behaviors:**
- User email is passed as query param
- Checkout page shows correct product
- Price matches what's on pricing page
- Success URL includes checkout_id parameter

### C. Webhook Handling (Automated - If implemented)
- [ ] Trigger test webhook from Polar.sh dashboard
- [ ] Verify `/api/webhooks/polar` receives event
- [ ] Check webhook signature validation
- [ ] Verify user subscription is updated in database
- [ ] Check credits are reset to plan limits

---

## ⚙️ 4. SETTINGS TESTING

### A. Profile Update (Manual)
- [ ] Navigate to `/settings`
- [ ] Change name → Click save → Verify toast confirmation
- [ ] Refresh page → Name should persist
- [ ] Change email → Verify validation
- [ ] Update preferences → Should save immediately

**Expected Behaviors:**
- Loading state on save button
- Success toast after save
- Changes persist in database
- Email validation prevents invalid emails

### B. Data Export (Manual)
- [ ] Click "Export Data" button
- [ ] Verify loading state appears
- [ ] Check JSON file downloads
- [ ] Open JSON → Should contain user data, posts, settings
- [ ] Verify sensitive data (password hash) is NOT included

**Expected Behaviors:**
- Downloads as `postcontent-data-YYYY-MM-DD.json`
- Contains: user info, generated posts, preferences
- Excludes: password, tokens, session data

### C. Account Deletion (Manual)
- [ ] Click "Delete Account" button
- [ ] Verify confirmation modal appears
- [ ] Cancel deletion → Nothing happens
- [ ] Confirm deletion → Account is deleted
- [ ] Verify redirect to landing page
- [ ] Try logging in again → Should fail
- [ ] Check database: User and all related data deleted

**Expected Behaviors:**
- Modal warns about permanent deletion
- Requires confirmation (button or text input)
- Cascades delete to posts, sessions, accounts
- Cannot undo deletion

---

## 🎨 5. UI/UX TESTING

### A. Responsive Design (Manual)
Test on these viewports:
- [ ] **Mobile Portrait** (375px - iPhone SE)
  - No horizontal scroll
  - All buttons minimum 44px tall
  - Navigation collapses to hamburger menu
  - Forms fit within viewport
  - Text is readable (16px minimum)

- [ ] **Mobile Landscape** (667px - 844px)
  - Layout adjusts appropriately
  - Navigation accessible
  - No overlapping elements

- [ ] **Tablet** (768px - 1024px)
  - Multi-column layouts work
  - Cards display in grid
  - Sidebar navigation visible

- [ ] **Desktop** (1280px+)
  - Full navigation visible
  - Content centered with max-width
  - No wasted whitespace
  - Hover states work

### B. Dark Mode (Manual)
- [ ] Toggle dark mode in navigation
- [ ] Check all pages render correctly
- [ ] Verify text is readable (contrast ratio > 4.5:1)
- [ ] Test button hover states → Text should stay visible
- [ ] Check form inputs have visible borders
- [ ] Verify cards have proper shadows/borders

**Expected Behaviors:**
- Smooth transition between modes
- Preference saves to localStorage
- All colors follow design system
- No black text on dark backgrounds

### C. Loading States (Manual)
Check every action that triggers loading:
- [ ] Login button → Spinner appears
- [ ] Generate post → Funny loading message + spinner
- [ ] Save settings → Button shows "Saving..." text
- [ ] Fetch history → Skeleton cards appear
- [ ] Checkout redirect → Button disabled with loading

**Expected Behaviors:**
- User cannot double-click during loading
- Clear visual feedback that action is in progress
- Loading states don't flash (minimum 300ms)
- Spinner animations are smooth

### D. Error States (Manual)
Test error UI for:
- [ ] **Network error** → Disconnect WiFi, try generating post
  - Should show: "Unable to connect. Check your internet."
  - Retry button appears
  
- [ ] **API error** → Trigger 500 error (invalid API key)
  - Should show: "Something went wrong. Please try again."
  - Error persists in UI until dismissed

- [ ] **Validation errors** → Enter invalid form data
  - Should show: Inline red text below field
  - Multiple errors show simultaneously

**Expected Behaviors:**
- Error messages are user-friendly (no technical jargon)
- Errors are dismissible
- Retry buttons work
- Form fields highlight on error

### E. Animations (Manual)
- [ ] Page transitions are smooth (fade-in)
- [ ] Modal opens with slide-up animation
- [ ] Toast notifications slide in from top
- [ ] Hover effects are subtle (scale 1.02)
- [ ] Button clicks have active state (scale 0.98)

---

## 🔒 6. SECURITY TESTING

### A. Authentication Security (Manual)
- [ ] Try accessing `/generate` while logged out → Should redirect to `/login`
- [ ] Try accessing `/settings` without session → Should redirect
- [ ] Check session cookie is `HttpOnly` and `Secure`
- [ ] Verify CSRF protection on forms
- [ ] Test logout invalidates session immediately

### B. API Security (Automated)
Test each protected endpoint:

```bash
# Test without auth token
curl https://www.postcontent.io/api/generate -X POST
# Expected: 401 Unauthorized

# Test with invalid token
curl https://www.postcontent.io/api/generate \
  -H "Authorization: Bearer fake-token" -X POST
# Expected: 401 Unauthorized

# Test rate limiting (if implemented)
for i in {1..100}; do
  curl https://www.postcontent.io/api/generate -X POST
done
# Expected: 429 Too Many Requests after threshold
```

### C. Input Validation (Manual)
- [ ] Try SQL injection in email field: `admin'--`
- [ ] Try XSS in topic field: `<script>alert('xss')</script>`
- [ ] Try extremely long input (10,000 chars)
- [ ] Try special characters: `!@#$%^&*()`

**Expected Behaviors:**
- All inputs are sanitized
- SQL injection attempts fail safely
- XSS is escaped in output
- Length limits enforced
- Special chars handled correctly

---

## 📊 7. DATABASE TESTING

### A. Data Integrity (Automated)

```bash
# Check database script
cd /workspaces/idea-dump/content-generator
node check-db.js
```

**Verify:**
- [ ] Users have unique emails
- [ ] Posts are linked to correct user
- [ ] Sessions have valid expiry dates
- [ ] Accounts reference valid users
- [ ] No orphaned records

### B. Query Performance (Manual)
- [ ] Generate 100+ posts (stress test)
- [ ] Load history page → Should load in < 2 seconds
- [ ] Check database indexes exist on userId, createdAt
- [ ] Verify pagination works with large datasets

### C. Migrations (Manual)
```bash
# Check migration status
npx prisma migrate status

# Verify all migrations applied
npx prisma migrate resolve --applied
```

---

## 🚀 8. PERFORMANCE TESTING

### A. Page Load Speed (Manual)
Use Chrome DevTools > Performance tab:
- [ ] Landing page loads in < 2 seconds
- [ ] Generate page loads in < 1.5 seconds
- [ ] Time to First Contentful Paint (FCP) < 1.8s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s

### B. API Response Times (Automated)

```bash
# Test API performance
time curl https://www.postcontent.io/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Test", "type": "single"}' \
  -X POST

# Should complete in < 5 seconds
```

### C. Bundle Size (Manual)
```bash
# Check bundle size
npm run build

# Verify:
# - Main bundle < 200KB gzipped
# - No duplicate dependencies
# - Tree shaking working
```

---

## 🐛 9. ERROR HANDLING TESTING

### A. Network Failures (Manual)
1. **Offline Mode:**
   - [ ] Disconnect internet
   - [ ] Try generating post → Should show network error
   - [ ] Reconnect → Retry button should work

2. **Slow Connection:**
   - [ ] Chrome DevTools > Network > Throttle to "Slow 3G"
   - [ ] Generate post → Loading should persist
   - [ ] Verify timeout after 30 seconds

3. **Server Error:**
   - [ ] Temporarily break API (invalid env var)
   - [ ] Try generating → Should show "Server error"
   - [ ] Check Vercel logs for error details

### B. Edge Cases (Manual)
- [ ] Generate with empty topic → Should show validation
- [ ] Generate with very long topic (1000 chars) → Should truncate or reject
- [ ] Upload 0 training examples → Should show minimum requirement
- [ ] Try to generate without credits → Should show upgrade prompt
- [ ] Rapid clicking generate button → Should not create duplicate requests

### C. Browser Compatibility (Manual)
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🔄 10. USER FLOW TESTING (End-to-End)

### Flow 1: New User Onboarding
1. [ ] Visit landing page
2. [ ] Click "Sign Up"
3. [ ] Complete signup form
4. [ ] Auto-login to `/generate`
5. [ ] See onboarding tooltip/checklist
6. [ ] Generate first post (with example topic)
7. [ ] Copy post to clipboard
8. [ ] Check history page
9. [ ] View pricing page
10. [ ] (Optional) Upgrade account

**Time:** Should take < 3 minutes

### Flow 2: Returning User Experience
1. [ ] Login with email/password
2. [ ] Dashboard shows recent posts
3. [ ] Generate new post quickly
4. [ ] Check credits remaining
5. [ ] Update profile settings
6. [ ] Logout

**Time:** Should take < 1 minute

### Flow 3: Pro User Upgrade Flow
1. [ ] Login as free user
2. [ ] Generate until credits run out
3. [ ] See "Upgrade" prompt
4. [ ] Navigate to pricing
5. [ ] Click "Upgrade to Pro"
6. [ ] Complete Polar.sh checkout
7. [ ] Return to site
8. [ ] Verify Pro status and credits reset

**Time:** Should take 2-3 minutes

---

## 📱 11. MOBILE-SPECIFIC TESTING

### A. Touch Interactions
- [ ] All buttons are tappable (44px minimum)
- [ ] Swipe gestures work (if implemented)
- [ ] Pinch to zoom disabled on forms
- [ ] Double-tap zoom disabled
- [ ] Keyboard doesn't cover input fields

### B. Mobile Safari Specific
- [ ] Forms work correctly
- [ ] Autofill works for email/password
- [ ] Copy button works
- [ ] Share button appears (if implemented)

### C. Android Chrome Specific
- [ ] Material design elements render correctly
- [ ] Pull-to-refresh doesn't conflict with app
- [ ] Back button navigation works

---

## 🧪 12. AUTOMATED TESTING (To Implement)

### A. Unit Tests (Jest)

```bash
# Run unit tests
npm run test

# Test individual utilities
npm run test -- lib/utils.test.ts
```

**Test Coverage Targets:**
- [ ] `lib/utils.ts` - 100%
- [ ] `lib/prompts.ts` - 90%
- [ ] `lib/usage.ts` - 90%

### B. API Tests (Postman/Newman)

Create a Postman collection with:
- [ ] All API endpoints
- [ ] Authentication tests
- [ ] Error scenarios
- [ ] Response validation

```bash
# Run API tests
newman run postcontent-api-tests.json \
  --environment prod.json
```

### C. E2E Tests (Playwright)

```bash
# Install Playwright
npm install -D @playwright/test

# Run E2E tests
npx playwright test
```

**Test scenarios:**
- Complete signup flow
- Login and generate post
- Checkout process
- Settings update

---

## ✅ TESTING CHECKLIST SUMMARY

### Pre-Launch Must-Test:
- [ ] Authentication (email + Google OAuth)
- [ ] Post generation (all types)
- [ ] Checkout flow (Polar.sh redirect)
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Session persistence

### Nice-to-Have Testing:
- [ ] Performance benchmarks
- [ ] Automated E2E tests
- [ ] Cross-browser compatibility
- [ ] Accessibility (screen readers)

### Production Monitoring:
- [ ] Vercel logs for errors
- [ ] Polar.sh webhook logs
- [ ] Database query performance
- [ ] User signup/churn metrics

---

## 🚨 KNOWN ISSUES & LIMITATIONS

*(Update this section as you discover bugs)*

### Current Known Issues:
1. None yet - pending comprehensive testing

### Limitations:
1. Free tier limited to 10 posts/month
2. Grok API can be slow (2-5 seconds)
3. No offline mode
4. Session expires after 30 days

---

## 📞 TESTING SUPPORT

**For Issues Found:**
1. Check Vercel logs at https://vercel.com/slubbles/post-content/logs
2. Run database check: `node check-db.js`
3. Check browser console for client errors
4. Review `BACKEND_FIXES.md` for implementation details

**Reporting Bugs:**
Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and device info
- Screenshots/screen recordings
- Console logs and network tab

---

**Last Tested:** Pending comprehensive test run  
**Test Status:** Ready for execution  
**Next Steps:** Run through all manual tests, implement automated tests
