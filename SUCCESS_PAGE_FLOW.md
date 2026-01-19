# Success Page User Flow Documentation

## When is the /success page triggered?

The `/success` page is shown **after a user completes a subscription purchase** through the checkout flow.

## Complete User Journey

### 1. User Initiates Purchase
**Entry Points:**
- `/pricing` page - User clicks "Select Plan" button on Pro or Enterprise card
- Any page with pricing CTAs - User clicks upgrade links

**Code Location:** `components/pricing-cards.tsx`
```typescript
const handleSubscribe = async (planName: string) => {
  // ... auth checks ...
  const response = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ plan: planName.toLowerCase() }),
  })
  const data = await response.json()
  window.open(data.checkoutUrl, "_blank")  // Opens checkout in new tab
}
```

### 2. Checkout API Creates Session
**API Route:** `/api/checkout/route.ts`

The API:
1. Receives the selected plan (pro, enterprise)
2. Creates a checkout session (currently demo mode, will integrate with Stripe)
3. Returns a success URL with query parameters

**Code:**
```typescript
const checkoutUrl = "/success?plan=" + plan + "&billing=" + (isAnnual ? "annual" : "monthly")
return NextResponse.json({ checkoutUrl })
```

### 3. Payment Processor Redirects
In production with Stripe integration:
1. User enters payment details on Stripe checkout page
2. Stripe processes payment
3. Stripe redirects to `/success?plan=pro&billing=monthly` (or annual)
4. Webhook updates user's subscription in database

### 4. Success Page Displays Confirmation
**Page:** `/app/success/page.tsx`

Uses `<SuccessContent>` component which:
- Reads `plan` query parameter from URL
- Shows plan-specific congratulations message
- Displays what features they unlocked
- Provides next steps (access dashboard, learn features)
- Shows confirmation details

**Query Parameters:**
- `plan` - Which plan they subscribed to (pro, enterprise)
- `billing` - Billing cycle (monthly, annual)

Example URLs:
- `/success?plan=pro&billing=monthly` - Monthly Pro subscription
- `/success?plan=enterprise&billing=annual` - Annual Enterprise subscription

## User Actions After Success Page

From the success page, users can:
1. **Go to Dashboard** - Start using their new plan features immediately
2. **View Documentation** - Learn how to use advanced features
3. **Close Tab** - If opened in new window, close and return to main tab

## Backend Integration Points

When Stripe integration is complete:

1. **Webhook Handler** (`/api/webhooks/stripe`)
   - Receives `checkout.session.completed` event
   - Updates user record in database with new plan
   - Sets subscription status to active
   - Records transaction details

2. **Success Page Data Fetching**
   - Optionally fetch updated user data to confirm upgrade
   - Show personalized message based on user account
   - Display receipt/invoice number

## Database Changes

After successful checkout:
```sql
UPDATE users SET 
  plan = 'pro',
  credits = 200,
  subscription_status = 'active',
  subscription_id = '<stripe_subscription_id>',
  updated_at = NOW()
WHERE id = '<user_id>'
```

## Error Handling

If user lands on `/success` without query params:
- Show generic success message
- Provide link to dashboard
- Suggest contacting support if issues

If webhook fails:
- User still sees success page (payment went through)
- Backend retries webhook processing
- Support team receives alert for manual verification

## Testing the Flow

1. **Demo Mode (Current):**
   - Click "Select Plan" on pricing page
   - Immediately redirected to success page
   - No actual payment processed

2. **Production Mode (With Stripe):**
   - Click "Select Plan"
   - Redirect to Stripe Checkout
   - Enter test card: 4242 4242 4242 4242
   - Complete checkout
   - Redirect to success page
   - Webhook fires and updates database

## Summary

**Trigger:** After successful subscription purchase via `/api/checkout`
**URL Pattern:** `/success?plan={plan_name}&billing={cycle}`
**Purpose:** Confirm purchase, provide next steps, ensure user knows upgrade is complete
**Next Action:** User continues to dashboard to start using their new plan features
