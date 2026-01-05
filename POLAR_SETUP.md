# Polar.sh Payment Setup Guide

## 🎯 Why Polar.sh?

- **Lower fees** than Stripe (5% vs 7.5%)
- **Built for creators** - made by developers, for developers
- **Open source** - transparent and community-driven
- **Simple integration** - just redirect to hosted checkout
- **No complex webhooks** - straightforward subscription management

## 📦 Setup Steps

### 1. Create Polar.sh Account

1. Go to [https://polar.sh](https://polar.sh)
2. Sign up with GitHub (easiest) or email
3. Verify your email

### 2. Create Your Product

1. Go to **Products** in the Polar dashboard
2. Click **Create Product**
3. Fill in details:
   - **Name**: PostContent Pro
   - **Description**: Unlimited AI-powered social posts
   - **Price**: $12/month (or $120/year for annual)
   - **Type**: Subscription
   - **Recurring**: Monthly

4. Click **Create**

### 3. Get Your Polar Link

After creating the product, Polar will give you a checkout link like:

```
https://polar.sh/slubbles/subscriptions
```

This link is **already added** to the pricing page! No integration needed - users click "Upgrade to Pro" and get redirected to Polar's hosted checkout.

### 4. Configure Webhooks (Optional)

If you want automatic access control:

1. In Polar dashboard, go to **Settings** → **Webhooks**
2. Add webhook URL: `https://postcontent.io/api/webhooks/polar`
3. Select events:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`

4. Get the **Webhook Secret** and add to `.env.local`:
   ```env
   POLAR_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

### 5. Add Polar Access Token (Optional)

For programmatic access to subscriptions:

1. Go to **Settings** → **API Keys**
2. Create new key with `subscriptions:read` scope
3. Add to `.env.local`:
   ```env
   POLAR_ACCESS_TOKEN=polar_xxxxxxxxxxxxx
   ```

## 🔗 How It Works

### User Flow:
1. User reaches 10 post limit (or visits `/pricing`)
2. Clicks "Upgrade to Pro" button
3. Redirected to Polar.sh hosted checkout
4. Completes payment with Polar
5. Polar sends webhook to your app (optional)
6. Your app updates user's subscription status

### Simple Implementation (No Webhooks):

The pricing page already has the Polar link:
```tsx
<a href="https://polar.sh/slubbles/subscriptions">
  Upgrade to Pro
</a>
```

Users subscribe via Polar → You manually verify via Polar dashboard → Grant access

### Advanced Implementation (With Webhooks):

Create `/api/webhooks/polar/route.ts`:
```typescript
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const payload = await req.json();
  const signature = req.headers.get('polar-signature');
  
  // Verify webhook signature
  // Update user subscription in database
  
  if (payload.type === 'subscription.created') {
    await prisma.user.update({
      where: { email: payload.data.customer_email },
      data: { subscribed: true },
    });
  }
  
  return Response.json({ received: true });
}
```

## 📊 Subscription Status

### Check if user is subscribed:

```typescript
// lib/subscription.ts
export async function isUserSubscribed(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  
  return user?.subscribed === true;
}

// In your API routes:
const isSubscribed = await isUserSubscribed(session.user.id);
if (!isSubscribed) {
  const canGenerate = await canUserGeneratePost(session.user.id);
  if (!canGenerate) {
    return Response.json({ error: 'Limit reached' }, { status: 403 });
  }
}
```

## 🎨 Current Setup

✅ **Already done:**
- Pricing page created (`/pricing`)
- "Upgrade to Pro" button with Polar link
- Usage tracking system
- Free tier limit (10 posts/month)
- Usage indicator component

📝 **TODO:**
1. Update your Polar organization to `slubbles` (or your preferred name)
2. Create the "PostContent Pro" product on Polar
3. Replace `https://polar.sh/slubbles/subscriptions` with your actual link
4. (Optional) Set up webhooks for automatic access control
5. (Optional) Add `subscribed` field to User model in Prisma

## 🔐 Security Best Practices

1. **Always verify webhooks** - Check the signature
2. **Use environment variables** - Never hardcode keys
3. **Rate limit webhook endpoints** - Prevent abuse
4. **Log all subscription changes** - For debugging and auditing
5. **Handle edge cases** - Payment failures, cancellations, etc.

## 🆘 Testing

### Test Mode (Local):
1. User signs up
2. Manually set `subscribed: true` in database:
   ```sql
   UPDATE "User" SET subscribed = true WHERE email = 'test@example.com';
   ```
3. Verify unlimited access

### Production Mode:
1. Create a Polar account
2. Subscribe to your own product
3. Verify webhook fires (check logs)
4. Verify database updates
5. Verify unlimited access granted

## 💰 Pricing Strategy

**Current:**
- Free: 10 posts/month
- Pro: $12/month unlimited

**Alternatives to consider:**
- **Freemium**: Free: 5 posts, Pro: $9/month
- **Usage-based**: $0.10 per post (pay as you go)
- **Tiered**: Starter ($5 - 25 posts), Pro ($12 - unlimited)
- **Annual discount**: $120/year (2 months free)

**Recommended:** Start with current pricing, adjust based on usage data.

## 📈 Analytics

Track key metrics:
- Free tier conversion rate
- Time to first upgrade
- Churn rate
- Average posts per user
- Most used features (upgrade drivers)

---

**🎉 You're all set!** The payment infrastructure is ready. Just create your Polar product and update the link.
