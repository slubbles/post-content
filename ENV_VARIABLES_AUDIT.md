# Environment Variables Audit & Configuration Guide

**Project**: PostContent SaaS  
**Date**: January 14, 2026  
**Status**: Needs 2 additional variables for new backend features

---

## ✅ Currently Configured in Vercel (17 variables)

### Core Application
| Variable | Status | Used By | Notes |
|----------|--------|---------|-------|
| `NEXTAUTH_URL` | ✅ Set | Auth, Email templates, Affiliate links | Base URL for the app |
| `NEXTAUTH_SECRET` | ✅ Set | NextAuth session encryption | Critical for auth |
| `ANTHROPIC_API_KEY` | ✅ Set | AI content generation (Claude) | Recently added (3h ago) |

### Email Service (Resend)
| Variable | Status | Used By | Notes |
|----------|--------|---------|-------|
| `RESEND_API_KEY` | ✅ Set | Signup, verification, password reset, feedback | All email functionality |
| `DEVELOPER_EMAIL` | ✅ Set | Feedback notifications | Fallback: idderfsalem98@gmail.com |

### OAuth Providers
| Variable | Status | Used By | Notes |
|----------|--------|---------|-------|
| `GOOGLE_CLIENT_ID` | ✅ Set | Google OAuth login | lib/auth.ts |
| `GOOGLE_CLIENT_SECRET` | ✅ Set | Google OAuth login | lib/auth.ts |

### Payment System (Polar.sh)
| Variable | Status | Used By | Notes |
|----------|--------|---------|-------|
| `POLAR_ACCESS_TOKEN` | ✅ Set | Polar API calls | Not currently used in code |
| `POLAR_SUCCESS_URL` | ✅ Set | Post-checkout redirect | Not currently used in code |
| `POLAR_PRO_MONTHLY_URL` | ✅ Set | /api/checkout | Pro plan monthly subscription |
| `POLAR_PRO_ANNUAL_URL` | ✅ Set | /api/checkout | Pro plan annual subscription |
| `POLAR_ENTERPRISE_URL` | ✅ Set | /api/checkout | Enterprise plan subscription |

### Database (Neon - Auto-configured)
| Variable | Status | Used By | Notes |
|----------|--------|---------|-------|
| `DATABASE_URL` | ✅ Set | Prisma ORM | All database operations |
| `PGHOST` | ✅ Set | Direct Postgres connections | Neon managed |
| `POSTGRES_USER` | ✅ Set | Direct Postgres connections | Neon managed |
| `POSTGRES_PASSWORD` | ✅ Set | Direct Postgres connections | Neon managed |
| `POSTGRES_DATABASE` | ✅ Set | Direct Postgres connections | Neon managed |

---

## ⚠️ MISSING - Required for New Backend Features (2 variables)

### 1. POLAR_CREDITS_CHECKOUT_URL
**Status**: ❌ **NOT SET**  
**Used By**: `/api/credits/purchase`  
**Purpose**: One-time credit purchase checkout  
**Format**: `https://polar.sh/slubbles/products/[PRODUCT_ID]/checkout`

**Setup Instructions**:
1. Go to Polar.sh dashboard
2. Create 3 products (one-time purchases):
   - **25 Credits** - $5
   - **55 Credits** - $10 (+10% bonus)
   - **120 Credits** - $20 (+20% bonus)
3. Get checkout URL for one product OR create separate URLs:
   - Option A: Single URL + query params (recommended)
   - Option B: Three separate URLs (POLAR_CREDITS_5_URL, POLAR_CREDITS_10_URL, POLAR_CREDITS_20_URL)
4. Add to Vercel: Production environment

**Current Code Behavior**:
```typescript
// app/api/credits/purchase/route.ts line 44
const checkoutUrl = `${process.env.POLAR_CREDITS_CHECKOUT_URL}?amount=${amount}&purchase_id=${purchase.id}`
```

**Example Value**:
```
POLAR_CREDITS_CHECKOUT_URL=https://polar.sh/slubbles/products/postcontent-credits/checkout
```

### 2. POLAR_WEBHOOK_SECRET
**Status**: ❌ **NOT SET**  
**Used By**: `/api/webhooks/polar` (currently commented out)  
**Purpose**: Verify webhook signatures from Polar.sh  
**Critical**: Security - prevents webhook spoofing

**Setup Instructions**:
1. Go to Polar.sh dashboard → Webhooks
2. Create webhook endpoint: `https://postcontent.io/api/webhooks/polar`
3. Select events:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.active`
   - `checkout.completed` (for credit purchases)
4. Copy the webhook secret
5. Add to Vercel: Production environment

**Current Code**:
```typescript
// app/api/webhooks/polar/route.ts line 11-13 (TODO)
const headersList = await headers()
const signature = headersList.get("polar-signature")
// TODO: Verify signature with POLAR_WEBHOOK_SECRET
```

**Example Value**:
```
POLAR_WEBHOOK_SECRET=whsec_1234567890abcdef
```

---

## ⏸️ OPTIONAL - Not Blocking Launch (1 variable)

### BLOB_READ_WRITE_TOKEN
**Status**: ⏸️ **Optional**  
**Used By**: `/api/upload/photo` (currently returns 501)  
**Purpose**: Profile photo uploads  
**Provider Options**: Vercel Blob, AWS S3, or Cloudflare R2

**Current Code Behavior**:
```typescript
// app/api/upload/photo/route.ts line 26
return NextResponse.json(
  { error: "Photo upload not configured yet. Add BLOB_READ_WRITE_TOKEN..." },
  { status: 501 }
)
```

**Setup Options**:

**Option A: Vercel Blob Storage** (Recommended - easiest)
```bash
# Install package
npm install @vercel/blob

# Add to Vercel
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
```

**Option B: AWS S3**
```bash
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=postcontent-uploads
AWS_REGION=us-east-1
```

**Option C: Cloudflare R2**
```bash
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_ACCESS_KEY_ID=xxx
CLOUDFLARE_SECRET_ACCESS_KEY=xxx
CLOUDFLARE_R2_BUCKET=postcontent-uploads
```

---

## 🔧 Code Updates Needed

### 1. Implement Webhook Signature Verification

**File**: `app/api/webhooks/polar/route.ts`

**Current Code** (line 11-13):
```typescript
const headersList = await headers()
const signature = headersList.get("polar-signature")
// TODO: Verify signature with POLAR_WEBHOOK_SECRET
```

**Needs Update To**:
```typescript
const headersList = await headers()
const signature = headersList.get("polar-signature")
const webhookSecret = process.env.POLAR_WEBHOOK_SECRET

if (!signature || !webhookSecret) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

// Verify signature (Polar.sh specific implementation)
const body = await request.text()
const isValid = verifyPolarSignature(body, signature, webhookSecret)

if (!isValid) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
}

const data = JSON.parse(body)
```

### 2. Dynamic Credit Package URLs (Optional Enhancement)

**Current Approach**: Single base URL + query params (works fine)

**Alternative Approach**: Separate URLs per package (more flexible)
```typescript
const packages = {
  5: { 
    credits: 25, 
    price: 5,
    checkoutUrl: process.env.POLAR_CREDITS_5_URL 
  },
  10: { 
    credits: 55, 
    price: 10,
    checkoutUrl: process.env.POLAR_CREDITS_10_URL 
  },
  20: { 
    credits: 120, 
    price: 20,
    checkoutUrl: process.env.POLAR_CREDITS_20_URL 
  },
}
```

---

## 📋 Setup Checklist

### Immediate (Required for Full Functionality)
- [ ] Create Polar.sh credit products ($5, $10, $20)
- [ ] Add `POLAR_CREDITS_CHECKOUT_URL` to Vercel Production
- [ ] Configure Polar.sh webhook endpoint
- [ ] Add `POLAR_WEBHOOK_SECRET` to Vercel Production
- [ ] Update webhook handler to verify signatures
- [ ] Test credit purchase flow end-to-end
- [ ] Test webhook delivery and signature verification

### Soon (Enhanced Features)
- [ ] Choose storage provider (Vercel Blob/S3/R2)
- [ ] Add storage credentials to Vercel
- [ ] Implement photo upload handler
- [ ] Test photo upload from profile settings

### Nice-to-Have (Optional Providers)
- [ ] Twitter/X OAuth (TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET)
- [ ] Additional AI providers (XAI_API_KEY for Grok)

---

## 🎯 Environment Variable Summary

| Status | Count | Impact |
|--------|-------|--------|
| ✅ Configured | 17 | Core app fully functional |
| ⚠️ Missing | 2 | Credit purchases + webhook security |
| ⏸️ Optional | 1 | Photo uploads (non-critical) |

**Total**: 17/20 variables configured (85%)

---

## 🚀 Quick Setup Commands

### Add Missing Variables to Vercel

**Via Vercel Dashboard**:
1. Go to: https://vercel.com/slubbles/post-content/settings/environment-variables
2. Click "Add New"
3. Add each variable:
   - Name: `POLAR_CREDITS_CHECKOUT_URL`
   - Value: `https://polar.sh/slubbles/products/[YOUR_PRODUCT_ID]/checkout`
   - Environment: Production
4. Repeat for `POLAR_WEBHOOK_SECRET`

**Via Vercel CLI**:
```bash
# Add credit checkout URL
vercel env add POLAR_CREDITS_CHECKOUT_URL production

# Add webhook secret
vercel env add POLAR_WEBHOOK_SECRET production
```

### Redeploy After Adding Variables
```bash
vercel --prod
```

Or trigger redeploy from Vercel dashboard.

---

## 🔍 Verification After Setup

### Test Credit Purchase Flow
```bash
curl -X POST https://postcontent.io/api/credits/purchase \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"amount": 10}'

# Should return:
{
  "checkoutUrl": "https://polar.sh/...",
  "package": { "credits": 55, "price": 10 },
  "purchaseId": "..."
}
```

### Test Webhook Endpoint
```bash
# From Polar.sh dashboard, trigger test webhook
# Check Vercel logs for successful processing
```

### Verify All Services
```bash
# Email
✓ RESEND_API_KEY working

# AI
✓ ANTHROPIC_API_KEY working

# Database
✓ DATABASE_URL working

# Auth
✓ NEXTAUTH_URL, NEXTAUTH_SECRET working
✓ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET working

# Payments
✓ Subscriptions working (POLAR_PRO_MONTHLY_URL, etc.)
⚠ Credits need POLAR_CREDITS_CHECKOUT_URL
⚠ Webhooks need POLAR_WEBHOOK_SECRET

# Uploads
⏸ Photos need BLOB_READ_WRITE_TOKEN (optional)
```

---

## 📞 Next Steps

1. **Create Polar credit products** (5-10 minutes)
2. **Add 2 missing environment variables** (2 minutes)
3. **Update webhook signature verification** (5 minutes coding)
4. **Test end-to-end** (10 minutes)
5. **Launch** 🚀

**Total Time**: ~25-30 minutes to full production readiness
