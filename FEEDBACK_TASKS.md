# PostContent.io - Feedback Task Separation

**Date:** January 9, 2026

---

## 🔧 BACKEND/FUNCTIONALITY TASKS (GitHub Copilot)

### Authentication & Database
- [x] **Email verification flow** - Add email verification after signup
  - ⚠️ **PENDING**: Requires email service setup (Resend/NodeMailer)
  - Create verification token system
  - Send verification email
  - Add email verification check before accessing dashboard
  
- [x] **Verify database recording** - Check if signup actually saves users to DB
  - ✅ **VERIFIED**: Users being saved correctly
  - Tested with test-db.mjs: 2 users (1 credentials, 1 OAuth)
  
- [x] **OAuth-first checkout flow** - Redirect unauthenticated users to OAuth before checkout
  - ✅ **COMPLETED**: SessionStorage stores plan selection
  - ✅ Redirects to /login?redirect=checkout
  - ✅ CheckoutRedirectHandler processes after auth

### Routing & Structure
- [x] **New dashboard routes** - Change URL structure to `/dashboard/*`
  - ✅ `/dashboard/generate`
  - ✅ `/dashboard/reply`
  - ✅ `/dashboard/thread`
  - ✅ `/dashboard/train`
  - ✅ `/dashboard/account` (formerly /settings)
  - ✅ All old routes redirected
  
- [x] **Remove /history page** - Delete history route
  - ✅ **COMPLETED**: History route deleted
  - ✅ History will be integrated into feature pages by v0

### Checkout & Payments
- [x] **Fix 400 error on checkout** - Debug `/api/checkout` endpoint
  - ✅ **FIXED**: Plan name case mismatch resolved
  - ✅ Added plan name normalization
  - ✅ Added missing POLAR_*_URL environment variables
  
- [x] **Store plan selection** - Save selected plan before OAuth redirect
  - ✅ **COMPLETED**: Uses sessionStorage
  - ✅ Retrieves after auth and redirects to checkout

### Dark Mode
- [x] **Set dark mode as default** - Update theme configuration
  - ✅ **COMPLETED**: Dark mode forced in layout
  - ✅ Removed light mode toggle from all pages
  - ✅ Updated theme provider to always use dark

### Data Architecture
- [x] **Integrate history into features** - Backend logic to fetch history per feature type
  - ✅ **COMPLETED**: History API supports ?type=generate|reply|thread
  - ✅ Created endpoint: `GET /api/history?type={type}&limit={limit}`
  - ✅ Returns filtered posts by type

### Sales Funnel Architecture
- [ ] **Lead magnet funnel structure** - Plan hook generator as lead magnet
  - ⚠️ **NEXT PHASE**: Requires new route and UI
  - Create `/hook-generator` route (free, no auth)
  - Soft upsell to full content generation
  - Email capture integration
  - Analytics tracking for funnel

---

## 🎨 FRONTEND/UI TASKS (v0.app)

### Landing Page
- [ ] Change browser tab tagline/meta title
- [ ] Update headline/subheadline to explain what PostContent does clearly
- [ ] Improve CTA copy and design
- [ ] Apply Hook, Story, Offer framework to landing page
- [ ] Better value proposition messaging

### Authentication Pages
- [ ] `/signup` - Change logo to HD version
- [ ] Email verification UI/flow after signup

### Dashboard Layout (Like polar.sh)
- [ ] **Complete redesign** - Sidebar navigation instead of top navbar
  - Sidebar with: Generate, Reply, Thread, Train, Account
  - Credits section in sidebar
  - Remove top navbar
  - Remove plus sign action button
  
### Feature Pages
- [ ] **Integrate history into pages**
  - Show history below main feature UI on:
    - `/dashboard/generate`
    - `/dashboard/reply`
    - `/dashboard/thread`
  - Delete standalone `/history` page

### Footer
- [ ] Restructure footer sections:
  - Features (not "Product")
  - Resources
  - Company
  - Support (not "Legal")

### Pricing Page
- [ ] Change headline to "Plans and Pricing"
- [ ] Change CTA buttons to "Select Plan" (Pro/Enterprise) and "Start Free" (Free tier)
- [ ] Remove yearly/monthly toggle - show monthly only
- [ ] Update button states for unauthenticated users

### Global UI
- [ ] Apply Hook, Story, Offer framework to all pages with content
- [ ] Optimize for all devices (mobile, tablet, desktop)
- [ ] Ensure all changes work consistently across breakpoints

---

## 📋 INTEGRATION WORKFLOW

1. **v0 creates UI changes** in their repo
2. **GitHub Copilot pulls** v0's changes
3. **GitHub Copilot integrates** backend functionality
4. **Test integration** - verify UI + backend work together
5. **Deploy** to production

---

## 💡 SALES FUNNEL NOTES

### Lead Magnet Funnel Structure
1. **Hook Generator** (Free, No Auth) - Lead magnet
   - User enters topic → generates irresistible hooks
   - Email capture: "Get 10 more hooks + full access"
   
2. **Soft Upsell** - Content Generation Suite
   - X/Twitter threads
   - Video scripts
   - Long-form content
   - Content calendar
   
3. **Value Ladder**
   - Free: Hook generator (limited)
   - Starter: 50 posts/month ($10)
   - Pro: Unlimited + team features ($29)
   - Enterprise: White-label + API ($99+)

4. **Retargeting & Email**
   - Build email list from hook generator
   - Email sequences for conversion
   - Retargeting ads on social media

### Implementation Phases
- **Phase 1:** Create `/hook-generator` as standalone lead magnet
- **Phase 2:** Email capture + verification
- **Phase 3:** Soft upsell flow after hook generation
- **Phase 4:** Email sequences + retargeting pixels
- **Phase 5:** Content factory expansion (video scripts, etc.)

---

## ✅ NEXT STEPS

**Immediate priorities:**
1. Fix 400 checkout error
2. Add email verification
3. Implement new dashboard routing
4. Set dark mode as default
5. v0 starts on sidebar dashboard redesign
