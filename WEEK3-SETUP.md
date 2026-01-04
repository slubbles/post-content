# VoiceForge - Week 3 Complete! 🔥

## Setup Instructions

### 1. Get Grok API Key
1. Visit [console.x.ai](https://console.x.ai/)
2. Sign up/login with your X account
3. Generate an API key
4. Copy the key (starts with `xai-...`)

### 2. Get Neon Database (Optional for Week 3)
1. Visit [neon.tech](https://neon.tech/)
2. Sign up (GitHub OAuth recommended)
3. Create a new project
4. Copy the connection string
5. Note: Database integration is prepared but not required yet (Week 5 with auth)

### 3. Environment Setup
```bash
cd /workspaces/idea-dump/content-generator
cp .env.local.example .env.local
```

Edit `.env.local` and add your keys:
```
XAI_API_KEY=xai-your-actual-key-here
DATABASE_URL=postgresql://...  # Optional for now
```

### 4. Test the App
```bash
npm run dev
```

## What's New in Week 3

✅ **Grok API Integration**
- Real AI-powered post generation (replaces mock data)
- Voice analysis using Grok's understanding of X/Twitter
- Authentic reply generation
- Fallback to mock data if API fails

✅ **API Routes Created**
- `/api/generate` - Generate 3 post variations
- `/api/train` - Analyze writing voice from sample posts
- `/api/reply` - Generate contextual replies

✅ **Database Schema Ready**
- `voice_profiles` table for storing user voice
- `generated_posts` table for history
- Will be used in Week 5 with Clerk auth

## How It Works

### Generate Posts
1. User enters topic + selects tone
2. Frontend calls `/api/generate`
3. Grok API creates 3 authentic variations
4. Results display with copy buttons

### Train Voice
1. User pastes 5+ sample posts
2. Frontend calls `/api/train`
3. Grok analyzes style (sarcasm, tired vibes, favorite words)
4. Results saved to localStorage (DB in Week 5)

### Generate Replies
1. User pastes post to reply to
2. Optional: Add context/angle
3. Frontend calls `/api/reply`
4. Grok generates 3 replies (Funny, Insightful, Spicy)

## Tech Stack Added

- **OpenAI SDK**: Compatible with xAI API
- **@neondatabase/serverless**: Postgres for edge functions
- **Grok Beta Model**: Trained on X data, understands platform

## Next: Week 4

- GitHub webhook integration for build-in-public automation
- Thread generator (turn blog posts into X threads)
- Tweet history tracking
- Usage analytics

## Testing Without API Key

The app has graceful fallbacks! If no API key is set, it uses mock data automatically. Add your key when ready to test real AI generation.

---

**Cost**: Grok API is pay-as-you-go. Expect ~$0.01-0.05 per generation. Your $100 budget = 2000+ generations. 🚀
