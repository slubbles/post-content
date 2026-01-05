# PostContent - Deployment Checklist

**Last Updated:** January 5, 2026  
**Status:** Ready for Production Deploy

---

## ✅ Pre-Deployment Checklist

### 1. Code & Build ✅ COMPLETE
- [x] All features implemented
- [x] Build passes (`npm run build`)
- [x] No TypeScript errors
- [x] All tests passing (if applicable)
- [x] Git commits pushed to main branch

**Latest Commits:**
```
192b502 - feat: Add usage widget and success page
f3d519b - feat: Add usage enforcement and subscription support
1d42971 - Add NextAuth + Prisma + Polar.sh payment system
```

---

## 🔧 Environment Variables for Vercel

Add these to your Vercel project settings:

### Authentication
```bash
NEXTAUTH_URL=https://postcontent.io
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### Google OAuth
```bash
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret-here
```

### Database (Neon Postgres)
```bash
DATABASE_URL=postgresql://your-neon-connection-string-here
```

### AI (xAI Grok)
```bash
XAI_API_KEY=your-xai-key-here
```

### Payments (Polar.sh)
```bash
POLAR_ACCESS_TOKEN=polar_oat_your-polar-access-token-here
POLAR_SUCCESS_URL=https://postcontent.io/success?checkout_id={CHECKOUT_ID}
```

### How to Add Variables in Vercel:
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add each variable (Name + Value)
4. Select "Production", "Preview", and "Development"
5. Click "Save"
6. Redeploy if already deployed

---

## 💳 Polar.sh Setup

### Create Product on Polar.sh:

1. **Go to:** https://polar.sh/slubbles/products
2. **Click:** "Create Product"
3. **Fill in:**
   - Name: `PostContent Pro`
   - Description: `Unlimited AI-powered social media content generation`
   - Price: `$12/month` (recurring)
   - Billing: Monthly
4. **Click:** "Create"
5. **Copy the checkout URL** (will look like: `https://polar.sh/slubbles/subscriptions/postcontent-pro`)
6. **Update** `app/pricing/page.tsx`:
   ```tsx
   // Find this line (~line 120):
   <a href="https://polar.sh/slubbles/subscriptions">
   
   // Replace with your actual product URL:
   <a href="https://polar.sh/slubbles/subscriptions/postcontent-pro">
   ```
7. **Commit and push** the change

### Verify Polar.sh Configuration:
- [x] Account created: https://polar.sh/slubbles
- [x] Access token generated
- [ ] Product created (TODO: Do this manually)
- [ ] Checkout URL updated in pricing page
- [ ] Test payment flow

---

## 🗄️ Database Migrations

### Already Applied:
```bash
✅ 20260105084956_init - Initial schema
✅ 20260105111801_add_subscription_fields - Subscription support
```

### Current Schema:
- **User** - Auth + subscription status
- **Account** - OAuth providers
- **Session** - Active sessions
- **Post** - Generated content for usage tracking
- **VerificationToken** - Email verification

**No action needed** - migrations are already applied to Neon database.

---

## 🚀 Deployment Steps

### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy to production
cd /workspaces/idea-dump/content-generator
vercel --prod

# Follow prompts:
# - Link to existing project? Yes
# - Select your project: postcontent
# - Deploy to production? Yes
```

### Option B: Git Push (Auto-deploy)
```bash
# Vercel auto-deploys from GitHub main branch
git push origin main

# Check deployment status:
# https://vercel.com/slubbles/postcontent/deployments
```

### Option C: Vercel Dashboard
1. Go to https://vercel.com/slubbles/postcontent
2. Click "Deployments"
3. Click "Redeploy" on latest deployment
4. Select "Use existing build cache" → "Redeploy"

---

## 🧪 Post-Deployment Testing

### 1. Authentication Flow
- [ ] Visit https://postcontent.io
- [ ] Click "Sign In"
- [ ] Test Google OAuth login
- [ ] Verify redirect back to homepage
- [ ] Check Navigation shows user email
- [ ] Test "Sign Out"

### 2. Content Generation
- [ ] Go to Generate page (homepage)
- [ ] Enter test input: "Shipped a new feature today"
- [ ] Select tone: "Sarcastic"
- [ ] Click "Generate Posts"
- [ ] Verify 3 posts generated
- [ ] Check usage counter updates (1/10 posts)
- [ ] Copy post to clipboard
- [ ] Generate 9 more posts (reach limit)

### 3. Usage Limits
- [ ] Generate 10 posts (free limit)
- [ ] Try to generate 11th post
- [ ] Verify 403 error with upgrade message
- [ ] Check Usage Indicator shows 10/10 with "Upgrade" button
- [ ] Click "Upgrade" → redirects to Pricing page

### 4. Payment Flow
- [ ] Go to Pricing page
- [ ] Click "Upgrade to Pro"
- [ ] Complete payment on Polar.sh
- [ ] Verify redirect to /success page
- [ ] Check order ID displayed
- [ ] Click "Start Creating Content"
- [ ] **Note:** Subscription status won't auto-update yet (need webhooks)
- [ ] Manually verify in Polar.sh dashboard

### 5. Other Features
- [ ] Reply Generator - paste post, generate replies
- [ ] Thread Generator - enter topic, generate thread
- [ ] Voice Training - submit 5+ posts, see analysis
- [ ] History page - view saved posts
- [ ] Settings page - update preferences

---

## 🐛 Common Issues & Solutions

### Issue: Build fails in Vercel
**Solution:** 
- Check build logs in Vercel dashboard
- Verify all env variables are set
- Run `npm run build` locally to debug

### Issue: Database connection errors
**Solution:**
- Verify `DATABASE_URL` is correct
- Check Neon database is active
- Run `npx prisma generate` in Vercel build command (auto-runs)

### Issue: NextAuth errors (callback URL, CSRF)
**Solution:**
- Verify `NEXTAUTH_URL` matches your domain
- Add `https://postcontent.io` to Google OAuth authorized origins
- Add `https://postcontent.io/api/auth/callback/google` to redirect URIs

### Issue: Users can't generate after hitting limit
**Solution:**
- Manually update user in database:
  ```sql
  UPDATE "User" 
  SET subscribed = true, 
      "subscriptionStatus" = 'active'
  WHERE email = 'user@example.com';
  ```
- Or wait for webhook integration

### Issue: Payments not tracked automatically
**Expected:** This is normal - webhooks not implemented yet
**Workaround:** Manually verify subscriptions in Polar.sh dashboard

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)
- Go to: https://vercel.com/slubbles/postcontent/analytics
- Monitor: Page views, visitor count, top pages
- Free tier: 100k events/month

### Recommended (Future):
- **Sentry** - Error tracking
- **Plausible** - Privacy-friendly analytics
- **PostHog** - Product analytics

---

## 🔒 Security Checklist

- [x] Environment variables in Vercel (not in code)
- [x] HTTPS enforced (Vercel auto-enables)
- [x] NextAuth CSRF protection enabled
- [x] Prisma parameterized queries (SQL injection safe)
- [x] Google OAuth restricted to verified domain
- [ ] Rate limiting on API routes (TODO)
- [ ] Webhook signature verification (TODO)
- [ ] Input sanitization for AI prompts (TODO)

---

## 📈 Success Metrics to Track

### Week 1:
- Sign-ups: Target 50
- Free → Pro conversions: Target 5% (2-3 users)
- Posts generated: Target 500
- Average posts per user: Target 10

### Month 1:
- Active users: Target 200
- MRR: Target $120 (10 Pro users)
- Churn rate: Target <10%
- Feature usage: Which features most popular?

---

## 🎉 Launch Strategy

### Day 1: Soft Launch
1. Deploy to production
2. Test all flows personally
3. Invite 5-10 beta users
4. Monitor for errors

### Day 2-3: Public Launch
1. Post on Product Hunt
2. Tweet announcement thread
3. Post on Reddit (r/SideProject, r/EntrepreneurRideAlong)
4. Share in indie hacker communities

### Week 1: Early Feedback
1. Email beta users for feedback
2. Monitor Vercel logs for errors
3. Track usage patterns
4. Iterate on UI/UX based on feedback

---

## 📞 Support Setup

### Email Forwarding:
- Set up: `support@postcontent.io` → your personal email
- Use Cloudflare Email Routing (free)
- Or Gmail alias

### Documentation:
- [ ] Create Help Center / FAQ page
- [ ] Add onboarding flow for new users
- [ ] Write blog post: "How to use PostContent"

---

## ✅ Final Checklist Before Launch

- [ ] All environment variables added to Vercel
- [ ] Polar.sh product created and URL updated
- [ ] Test authentication flow end-to-end
- [ ] Test payment flow (use real payment or Polar test mode)
- [ ] Verify usage limits work correctly
- [ ] Check mobile responsiveness
- [ ] Test in multiple browsers (Chrome, Safari, Firefox)
- [ ] Domain DNS pointing to Vercel (postcontent.io)
- [ ] SSL certificate active (auto from Vercel)
- [ ] Google Analytics / Plausible installed (optional)
- [ ] Set up email forwarding for support@
- [ ] Prepare launch tweet/post

---

## 🚦 Current Status

**Build:** ✅ Passing  
**Database:** ✅ Connected  
**Auth:** ✅ Working  
**API Routes:** ✅ Protected  
**Usage Limits:** ✅ Enforced  
**Payment:** ⏳ Needs product creation  
**Deployment:** ⏳ Ready to deploy  

**Next Action:** Create Polar.sh product, then deploy to Vercel!

---

**Need Help?**  
- GitHub: https://github.com/slubbles/post-content
- Vercel Docs: https://vercel.com/docs
- NextAuth Docs: https://next-auth.js.org
- Polar.sh Docs: https://docs.polar.sh

**End of Deployment Checklist**
