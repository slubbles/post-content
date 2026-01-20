# Subscription Sync Guide

## 🔧 CRITICAL FIX NEEDED IN VERCEL

The checkout is failing because NextAuth v5 requires specific environment variables in production.

### Required Vercel Environment Variables:

Add these in **Vercel Dashboard → Settings → Environment Variables**:

```env
# NextAuth v5 Configuration (CRITICAL)
AUTH_SECRET=your-secret-here-minimum-32-characters
AUTH_URL=https://www.postcontent.io

# Polar.sh Checkout Links
POLAR_PRO_MONTHLY_URL=https://buy.polar.sh/polar_cl_YOUR_PRO_MONTHLY_LINK
POLAR_PRO_ANNUAL_URL=https://buy.polar.sh/polar_cl_YOUR_PRO_ANNUAL_LINK  
POLAR_ENTERPRISE_URL=https://buy.polar.sh/polar_cl_YOUR_ENTERPRISE_LINK

# Polar.sh Webhook (for automatic subscription sync)
POLAR_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### Generate AUTH_SECRET:

```bash
openssl rand -base64 32
```

Copy the output and use it as `AUTH_SECRET` in Vercel.

---

## 📊 How Subscription Sync Works

### Current Flow (What Happens Now):

1. **User clicks "Upgrade to Pro"**
   - Frontend: `pricing-cards.tsx` calls `POST /api/checkout`
   - Backend: `/api/checkout/route.ts` gets user email from session
   - Returns: Polar.sh checkout URL with pre-filled email
   
2. **User completes payment on Polar.sh**
   - Polar.sh processes payment
   - User sees confirmation on Polar
   - Redirected back to postcontent.io (if configured)

3. **Subscription activation happens via WEBHOOK**
   - Polar.sh sends webhook to `/api/webhooks/polar`
   - Webhook updates database:
     ```typescript
     await prisma.user.update({
       where: { email: customer_email },
       data: {
         subscribed: true,
         subscriptionStatus: "active",
         subscriptionId: subscription_id,
         subscriptionEndsAt: current_period_end
       }
     })
     ```
   - User's plan is now Pro!

### How Users Verify Their Subscription:

After payment completion, users can verify their upgrade by:

#### ✅ **Automatic Verification (Recommended)**

1. **Wait 1-2 seconds** after payment
2. **Refresh the dashboard** (or any page)
3. User data automatically updates:
   - Credits show "Pro Plan" badge
   - Credit limit changes from 10 → 200
   - All Pro features unlocked

**How it works:**
- Polar webhook fires immediately after payment
- Updates `user.subscribed = true` in database
- Next page load fetches updated user data
- Session refreshes automatically (see `lib/auth.ts` line 141-158)

#### 🔍 **Manual Verification (Fallback)**

If webhook doesn't fire or user wants to check:

1. **Check Polar.sh Dashboard**
   - User email: [their-email@example.com]
   - Status: "Active"
   - Next payment: [date]

2. **Contact Support**
   - Email: support@postcontent.io
   - Provide: Payment confirmation email
   - Manual activation within 24 hours

---

## 🔗 Complete Payment Flow

### Step-by-Step User Journey:

```
User Dashboard (Free Plan - 9/10 credits used)
        ↓
    Clicks "Upgrade to Pro"
        ↓
    Frontend: pricing-cards.tsx → handleSubscribe()
        ↓
    POST /api/checkout { plan: "pro", billingCycle: "monthly" }
        ↓
    Backend: Checks session, gets user email
        ↓
    Returns: { checkoutUrl: "https://buy.polar.sh/...?email=user@example.com" }
        ↓
    Frontend: Opens Polar.sh checkout in new tab
        ↓
    User enters payment details on Polar.sh
        ↓
    Polar processes payment successfully
        ↓
    Polar.sh sends webhook: POST /api/webhooks/polar
        ↓
    Webhook handler updates database:
    - user.subscribed = true
    - user.subscriptionStatus = "active"
    - user.subscriptionId = "polar_sub_xxx"
    - Tracks affiliate conversion (if referred)
        ↓
    User returns to postcontent.io
        ↓
    Next page refresh: Session callback fetches fresh user data
        ↓
    User sees: "Pro Plan" badge, 200 credits, all features unlocked ✅
```

---

## 🛠️ Webhook Configuration (Required for Auto-Sync)

### Setup Polar.sh Webhook:

1. **Go to Polar.sh Dashboard**
   - Navigate to **Settings → Webhooks**

2. **Add New Webhook**
   - **URL**: `https://www.postcontent.io/api/webhooks/polar`
   - **Events to subscribe**:
     - ✅ `subscription.created`
     - ✅ `subscription.updated`
     - ✅ `subscription.active`
     - ✅ `subscription.canceled`

3. **Copy Webhook Secret**
   - Polar shows: `whsec_xxxxxxxxxxxxx`
   - Add to Vercel: `POLAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx`

4. **Test Webhook**
   - Send test event from Polar dashboard
   - Check Vercel logs: Should see `[Polar webhook] subscription.created`

### Webhook Handler Code (Already Implemented):

File: `app/api/webhooks/polar/route.ts`

```typescript
// Handles these events:
- subscription.created  → Sets subscribed=true
- subscription.updated  → Updates subscription data
- subscription.active   → Confirms active status + tracks affiliate
- subscription.canceled → Sets status="cancelled"
```

---

## 🧪 Testing Subscription Flow

### Local Testing:

1. **Start local server**: `npm run dev`
2. **Login with Google** (or test account)
3. **Click "Upgrade to Pro"** on pricing page
4. **Should redirect** to Polar.sh checkout (with email pre-filled)
5. **Use Polar test mode** to complete payment
6. **Manually trigger webhook** using Polar dashboard
7. **Verify database** updated:
   ```bash
   npx prisma studio
   # Check User table → subscribed column = true
   ```

### Production Testing:

1. **Deploy latest code** to Vercel
2. **Verify environment variables** are set
3. **Test with real payment** or Polar test mode
4. **Check Vercel logs** for webhook delivery
5. **User refreshes dashboard** → Should see Pro plan

---

## 🚨 Troubleshooting

### Issue: "Unauthorized. Please sign in" on checkout

**Cause**: Session not found in `/api/checkout`

**Fixes Applied**:
1. ✅ Added explicit cookie configuration in `lib/auth.ts`
2. ✅ Added `credentials: "include"` to fetch call
3. ✅ Added logging to track session state

**Vercel Setup Required**:
- Set `AUTH_SECRET` environment variable
- Set `AUTH_URL=https://www.postcontent.io`

### Issue: Subscription not activating after payment

**Possible causes**:
1. Webhook not configured in Polar.sh
2. Webhook secret mismatch
3. User email in Polar doesn't match database email

**Debug**:
```bash
# Check Vercel logs
vercel logs --follow

# Look for:
[Polar webhook] subscription.created
Updating user: user@example.com
```

### Issue: User still shows as Free after payment

**Solutions**:
1. **Hard refresh**: Ctrl+Shift+R (clears cache)
2. **Logout/Login**: Forces session refresh
3. **Check database directly**:
   ```sql
   SELECT email, subscribed, subscriptionStatus 
   FROM User 
   WHERE email = 'user@example.com';
   ```
4. **Manual update** (if webhook failed):
   ```sql
   UPDATE User 
   SET subscribed = true, subscriptionStatus = 'active'
   WHERE email = 'user@example.com';
   ```

---

## 📋 Checklist for Subscription System

### Backend (Already Complete ✅):
- [x] `/api/checkout` endpoint returns Polar URLs
- [x] `/api/webhooks/polar` handles subscription events
- [x] Database schema has subscription fields
- [x] Usage limits respect Pro plan (200 vs 10 credits)
- [x] Session callback refreshes user data on every request
- [x] Affiliate tracking on successful subscription

### Frontend (Already Complete ✅):
- [x] Pricing page with Pro/Enterprise plans
- [x] "Upgrade" button calls checkout API
- [x] Dashboard shows plan badge
- [x] Credits counter shows correct limits
- [x] Usage warnings for free users

### Production Setup (NEEDS CONFIGURATION ⚠️):
- [ ] Add `AUTH_SECRET` to Vercel environment variables
- [ ] Add `AUTH_URL` to Vercel environment variables
- [ ] Add Polar checkout URLs to Vercel
- [ ] Configure webhook in Polar.sh dashboard
- [ ] Add `POLAR_WEBHOOK_SECRET` to Vercel
- [ ] Test end-to-end payment flow
- [ ] Monitor webhook deliveries

---

## 🎯 Next Steps

### Immediate Actions:

1. **Fix Auth Configuration**:
   ```bash
   # In Vercel Dashboard → post-content → Settings → Environment Variables
   # Add:
   AUTH_SECRET=<generate with: openssl rand -base64 32>
   AUTH_URL=https://www.postcontent.io
   ```

2. **Deploy Fix**:
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

3. **Test Checkout**:
   - Login to production
   - Click "Upgrade to Pro"
   - Should redirect to Polar (not 401 error)

4. **Configure Webhook**:
   - Setup webhook in Polar dashboard
   - Test with dummy subscription
   - Verify database updates

### Future Enhancements:

- [ ] Add subscription management page (cancel, update payment)
- [ ] Email notifications on subscription events
- [ ] Grace period after subscription ends
- [ ] Proration for plan upgrades
- [ ] Annual plan discount automation

---

## 📞 Support Contacts

- **Polar.sh Support**: support@polar.sh
- **NextAuth Docs**: https://next-auth.js.org/
- **Vercel Support**: vercel.com/support
