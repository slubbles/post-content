# Vercel Environment Variables Setup for Checkout Fix

## 🚨 CRITICAL: Add These to Vercel

The checkout 401 error is caused by missing NextAuth v5 environment variables in production.

### Required Variables in Vercel Dashboard

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables (select **Production**, **Preview**, and **Development** environments):

```env
# NextAuth v5 Configuration (REQUIRED)
AUTH_SECRET=your-secret-here-minimum-32-characters
AUTH_URL=https://www.postcontent.io

# Keep existing variables or add if missing:
NEXTAUTH_SECRET=your-secret-here-minimum-32-characters
NEXTAUTH_URL=https://www.postcontent.io
```

### Generate AUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

**Important:** Use the SAME value for both `AUTH_SECRET` and `NEXTAUTH_SECRET` for backward compatibility.

### Quick Setup via Vercel CLI

If you have Vercel CLI installed:

```bash
# Generate a secret
SECRET=$(openssl rand -base64 32)

# Add to Vercel
vercel env add AUTH_SECRET production
# Paste the $SECRET value when prompted

vercel env add AUTH_URL production  
# Enter: https://www.postcontent.io
```

### After Adding Variables

1. **Redeploy** the application (or trigger a new deployment)
2. Variables will be available on next deployment
3. Test the checkout flow again

### Verify in Logs

After deployment, check Vercel logs for the checkout endpoint. You should see:

```
[Checkout] Session check: {
  hasSession: true,
  hasUser: true,
  hasEmail: true,
  email: 'user@example.com',
  hasCookies: true,
  hasSessionToken: true,
  authSecret: true
}
```

If `authSecret: false`, the environment variable is not set correctly.

### Troubleshooting

If checkout still fails after adding variables:

1. **Clear Vercel cache**: `vercel --prod --force`
2. **Check environment scope**: Ensure variables are set for "Production" environment
3. **Verify deployment**: Check that the latest code is deployed (commit 3af1579 or later)
4. **Check user login**: User must be logged in before attempting checkout
