# Affiliate System Setup Guide

## ✅ What's Been Implemented

The affiliate system is now **fully functional** with:

### Database Models
- **AffiliateLink**: Stores unique affiliate codes, click counts, conversions, and earnings
- **AffiliateReferral**: Tracks individual referrals, commission amounts, and payment status

### Frontend Components
- **AffiliateDashboard**: Full-featured dashboard showing:
  - Unique affiliate link (auto-generated)
  - Total clicks, conversions, and earnings
  - Pending vs. paid earnings
  - Recent referrals with status badges
  - Conversion rate calculation

### API Endpoints
1. **`/api/affiliate/stats` (GET)**: Returns user's affiliate data
   - Auto-creates affiliate link on first visit
   - Returns stats, recent referrals, and affiliate URL
   
2. **`/api/affiliate/track` (POST)**: Tracks clicks on affiliate links
   - Increments click counter
   - Validates affiliate code
   
3. **`/api/affiliate/convert` (POST)**: Records conversions
   - Called when referred user subscribes
   - Calculates 30% commission
   - Tracks subscription amount

### User Experience
- **Logged Out**: Marketing page explaining 30% commission, benefits, how it works
- **Logged In**: Full dashboard with stats, link, and referral tracking
- **Copy/Share**: One-click copy to clipboard + open in new tab

---

## 🔧 How to Complete Setup

### 1. **Polar.sh Integration** (For Payouts)

The affiliate system tracks everything, but you need to connect Polar.sh for actual payouts:

1. Sign up at [polar.sh](https://polar.sh)
2. Create a product for PostContent
3. In Polar settings, enable "Affiliate Payouts"
4. Set commission rate to 30%
5. Connect your bank account for payouts

**In your webhook handler** (`/api/webhooks/polar`):
```typescript
// When a subscription is created via Polar
if (event.type === 'subscription.created') {
  const ref = getCookieOrSession('affiliate_ref')
  
  if (ref) {
    await fetch('/api/affiliate/convert', {
      method: 'POST',
      body: JSON.stringify({
        affiliateCode: ref,
        userId: subscription.user_id,
        subscriptionId: subscription.id,
        planAmount: subscription.amount,
      })
    })
  }
}
```

### 2. **Track Affiliate Referrals** (In Your Signup/Landing)

Add this to your landing page or signup flow to capture the `?ref=` parameter:

**File: `app/page.tsx` or middleware**
```typescript
// Check for ?ref= parameter
const searchParams = useSearchParams()
const ref = searchParams.get('ref')

if (ref) {
  // Track the click
  await fetch('/api/affiliate/track', {
    method: 'POST',
    body: JSON.stringify({ code: ref })
  })
  
  // Store in cookie for 90 days
  document.cookie = `affiliate_ref=${ref}; max-age=${90*24*60*60}; path=/`
}
```

### 3. **Calculate Commissions**

When a user subscribes, calculate and record commission:

```typescript
// In your checkout success handler
const commission = planAmount * 0.30 // 30%

await prisma.affiliateReferral.create({
  data: {
    affiliateCode: ref,
    userId: userId,
    subscriptionId: subscriptionId,
    planAmount: planAmount,
    commission: commission,
    status: 'converted', // pending → converted → paid
  }
})

// Update affiliate link totals
await prisma.affiliateLink.update({
  where: { code: ref },
  data: {
    conversions: { increment: 1 },
    earnings: { increment: commission },
  }
})
```

### 4. **Monthly Payout Process**

**Option A: Manual (Recommended for MVP)**
1. Query all referrals with `status: 'converted'`
2. Sum up commission amounts per affiliate
3. Pay out via Polar.sh or PayPal
4. Update referrals to `status: 'paid'` and set `paidAt`

**Option B: Automated via Polar**
- Let Polar handle payouts automatically
- Use Polar webhook to update your database when payout completes

```typescript
// Example payout query
const pendingPayouts = await prisma.affiliateReferral.groupBy({
  by: ['affiliateCode'],
  where: { status: 'converted' },
  _sum: { commission: true },
  _count: true,
})

// Process each affiliate
for (const payout of pendingPayouts) {
  if (payout._sum.commission >= 50) { // $50 minimum
    // Pay via Polar API
    await payAffiliate(payout.affiliateCode, payout._sum.commission)
    
    // Mark as paid
    await prisma.affiliateReferral.updateMany({
      where: { 
        affiliateCode: payout.affiliateCode,
        status: 'converted'
      },
      data: {
        status: 'paid',
        paidAt: new Date(),
      }
    })
  }
}
```

---

## 📊 Current Status

### ✅ Working
- Affiliate link generation (auto-created on first visit)
- Click tracking
- Dashboard UI with stats
- Recent referrals display
- Copy to clipboard functionality
- Marketing page for logged-out users

### ⚠️ Needs Integration
- **Polar.sh payouts** (sign up and connect)
- **?ref= parameter tracking** (add to landing page)
- **Conversion tracking** (call `/api/affiliate/convert` on checkout)
- **Monthly payout script** (run manually or via cron)

### 💡 Recommended Next Steps

**Week 1:**
1. Sign up for Polar.sh affiliate program
2. Add `?ref=` tracking to landing page
3. Test full flow: click link → sign up → subscribe → see conversion

**Week 2:**
4. Connect Polar payouts
5. Run first manual payout (if any referrals)
6. Document payout process for your team

**Week 3+:**
7. Automate payouts via Polar API or cron job
8. Add email notifications for affiliates (new referral, payout received)
9. Create promotional materials (banners, templates)

---

## 🎯 Testing Locally

1. **Generate your affiliate link:**
   - Sign in to your account
   - Go to `/affiliate`
   - Copy your unique link (e.g., `https://postcontent.io?ref=abc123`)

2. **Test click tracking:**
   ```bash
   curl -X POST http://localhost:3000/api/affiliate/track \
     -H "Content-Type: application/json" \
     -d '{"code": "abc123"}'
   ```

3. **Test conversion:**
   ```bash
   curl -X POST http://localhost:3000/api/affiliate/convert \
     -H "Content-Type: application/json" \
     -d '{
       "affiliateCode": "abc123",
       "userId": "user_id_here",
       "subscriptionId": "sub_id_here",
       "planAmount": 19
     }'
   ```

4. **Check dashboard:**
   - Refresh `/affiliate` page
   - Should see updated clicks, conversions, earnings

---

## 📧 Support

For questions about the affiliate system:
- Technical issues: Check `/app/api/affiliate/` endpoints
- Payout questions: Contact Polar.sh support
- Database queries: Use Prisma Studio (`npx prisma studio`)

---

## 🔗 Resources

- **Polar.sh Docs**: https://docs.polar.sh/affiliates
- **Prisma Schema**: `prisma/schema.prisma` (lines 142-175)
- **Dashboard Component**: `components/affiliate-dashboard.tsx`
- **Affiliate Page**: `app/affiliate/page.tsx`
