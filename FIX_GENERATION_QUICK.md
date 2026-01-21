# 🔧 Fix Generation Issues - Quick Start

## Problem
Reply, thread, and video script generation are not working due to:
1. ❌ Missing valid API key in `.env.local`
2. ❌ Video script API parameter mismatch (NOW FIXED)

---

## ✅ SOLUTION (Takes 5 minutes)

### Step 1: Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create Key"
5. Copy the API key (starts with `sk-ant-api03-...`)

### Step 2: Update .env.local

Open `/workspaces/idea-dump/content-generator/.env.local` and replace:

```bash
# Change this:
ANTHROPIC_API_KEY=your-key-here

# To this (paste your actual key):
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
cd /workspaces/idea-dump/content-generator
npm run dev
```

### Step 4: Test All Generation Features

1. **Test Reply Generation**
   - Go to `/dashboard/reply`
   - Paste a post to reply to
   - Click "Generate Replies"
   - Should see 3 replies (Funny, Insightful, Spicy)

2. **Test Thread Generation**
   - Go to `/dashboard/thread`
   - Enter a topic
   - Click "Generate Thread"
   - Should see 5-7 tweets in a thread

3. **Test Video Script Generation**
   - Go to `/dashboard/video-script`
   - Enter your video context
   - Select a format
   - Click "Generate Script"
   - Should see a complete video script

---

## ✅ What Was Fixed

### 1. Video Script API Mismatch (Fixed in this commit)

**File:** `app/api/video-script/route.ts`

**Before:**
- Backend expected: `{ hook, story, offer }`
- Frontend sent: `{ context, format }`
- Result: 400 error "Missing required fields"

**After:**
- Backend now accepts: `{ context, format }`
- Matches frontend perfectly
- Validates context (1-1500 chars)
- Uses format to determine script structure

### 2. API Key Configuration (User Action Required)

You need to add your Anthropic API key following Step 1-3 above.

---

## 📋 Verification Checklist

After adding your API key:

- [ ] Reply generation works
- [ ] Thread generation works  
- [ ] Video script generation works
- [ ] Credits update after each generation
- [ ] Copy buttons work
- [ ] No error toasts appear

---

## 💡 Why This Happened

1. **API Key:** The `.env.local` file had placeholder values from the template
2. **Video Script:** Frontend and backend were developed separately and got out of sync on parameter names

Both are now fixed or documented for you to fix.

---

## 🆘 If Still Having Issues

### Check API Key Format
```bash
# Should start with sk-ant-api03-
# Should be ~100+ characters long
# No spaces or quotes
```

### Check Server Logs
```bash
# In your terminal where `npm run dev` is running
# Look for errors like:
# "ANTHROPIC_API_KEY is not configured"
# "Failed to generate replies"
```

### Verify Environment Variable Loaded
```bash
cd /workspaces/idea-dump/content-generator
grep ANTHROPIC .env.local
# Should show your actual key, not "your-key-here"
```

---

## 📚 Full Technical Details

See `GENERATION_DIAGNOSIS.md` for:
- Complete root cause analysis
- Code flow diagrams
- All files involved
- Testing procedures
- Alternative fix approaches

---

## ⚡ Quick Commands

```bash
# Check current API key
grep ANTHROPIC /workspaces/idea-dump/content-generator/.env.local

# Restart dev server
cd /workspaces/idea-dump/content-generator
npm run dev

# Check if server is running
curl http://localhost:3000/api/auth/me
```

---

## 📞 Next Steps

1. ✅ Get Anthropic API key (5 min)
2. ✅ Update .env.local (30 sec)
3. ✅ Restart server (30 sec)
4. ✅ Test all 3 generation types (2 min)
5. ✅ Celebrate! 🎉

**Total Time: ~8 minutes**
