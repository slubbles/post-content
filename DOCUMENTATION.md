# PostContent - Complete Documentation

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [Features Overview](#features-overview)
3. [Content Generators](#content-generators)
4. [Account Management](#account-management)
5. [Pricing & Subscriptions](#pricing--subscriptions)
6. [API Reference](#api-reference)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Create Your Account
1. Visit [postcontent.io/signup](https://postcontent.io/signup)
2. Enter your name, email, and password
3. Verify your email address (check your inbox)
4. Start creating content immediately!

### First Steps
- **Free Plan**: 10 generations per month to test the platform
- **Dashboard**: Your home for all content creation tools
- **History**: Access all previously generated content

---

## ✨ Features Overview

### AI-Powered Content Generation
PostContent uses Claude Sonnet 4 (the latest Anthropic AI) to generate:
- **Social media posts** optimized for engagement
- **Smart replies** that match your tone
- **Thread narratives** that keep readers hooked
- **Video scripts** using Hook-Story-Offer framework
- **Image captions** for Facebook and LinkedIn

### Platforms Supported
- **Twitter/X**: Character-optimized tweets and threads
- **LinkedIn**: Professional tone and formatting (captions)
- **Facebook**: Engagement-focused captions

---

## 📝 Content Generators

### 1. Generate Posts (`/dashboard/generate`)
Create standalone social media posts in seconds.

**How to use:**
1. Enter your topic (e.g., "Launching my new product next week")
2. Select platform: Twitter/X
3. Choose tone: Professional, Casual, Humorous, Inspirational, or Educational
4. Set number of variants (3-5 options)
5. Click "Generate Posts"

**Output:** 3 unique variations with different approaches (contrarian, story-based, data-driven)

**Tips:**
- Be specific with your topic
- Try multiple tones to see what resonates
- Use the "Copy" button to grab your favorite

---

### 2. Reply to Posts (`/dashboard/reply`)
Generate thoughtful replies to engage with others' content.

**How to use:**
1. Paste the original post you're replying to
2. Add context (optional): What angle do you want to take?
3. Choose reply tone: Agreeing, Questioning, Supportive, Neutral, or Add Insight
4. Click "Generate Replies"

**Output:** Smart, contextual replies that build relationships

**Best for:**
- Engaging with industry leaders
- Starting conversations
- Building your network

---

### 3. Create Threads (`/dashboard/thread`)
Turn complex ideas into compelling multi-post narratives.

**How to use:**
1. Enter your main topic or thesis
2. List key points (comma-separated)
3. Set thread length (3-10 posts)
4. Click "Generate Thread"

**Output:** Connected posts with smooth transitions and a strong conclusion

**Tips:**
- Start with a hook in post 1
- Each post should flow naturally
- End with a CTA or question

---

### 4. Video Scripts (`/dashboard/video-script`)
Create scripts for TikTok, Reels, and YouTube Shorts using the Hook-Story-Offer framework.

**How to use:**
1. **Hook (5-8 seconds)**: Pattern interrupt that stops the scroll
2. **Story (30-45 seconds)**: Build empathy through shared struggle
3. **Offer (15-30 seconds)**: Clear call-to-action

**Example:**
- Hook: "How much time did you spend scrolling for content inspiration today?"
- Story: "I used to spend 2 hours every morning doing the same thing..."
- Offer: "Try PostContent and get 7 days of content in 5 minutes"

---

### 5. Caption Generator (`/dashboard/caption`)
Create engaging captions for Facebook and LinkedIn images/videos.

**How to use:**
1. Describe your image/video context
2. Select platform: Facebook or LinkedIn
3. Click "Generate Captions"

**Output:** Hook-Story-Offer formatted captions optimized for each platform

---

## 👤 Account Management

### Profile Settings (`/dashboard/account`)
Manage your account with 4 organized tabs:

#### General Tab
- Update name, email, profile photo
- Connected accounts (Google, Twitter)
- Delete account option

#### Preferences Tab
- Default platform (Twitter/X)
- Default tone (Professional, Casual, etc.)
- Auto-save preferences
- Email notifications

#### History Tab
- View all generated content
- Filter by type and date
- Re-use or regenerate old posts

#### Billing Tab
- Current plan and usage
- Upgrade/downgrade options
- Manage subscription
- Usage statistics

---

## 💳 Pricing & Subscriptions

### Plan Comparison

| Feature | Free | Pro ($19/mo) | Enterprise ($99/mo) |
|---------|------|-------------|---------------------|
| **Generations** | 10/month | 200/month | Unlimited |
| **Variants** | 3 per generation | 5 per generation | Unlimited |
| **AI Models** | Basic | Advanced | Premium |
| **Support** | Email | Priority | 24/7 Priority |
| **History** | 30 days | Unlimited | Unlimited |
| **API Access** | ❌ | ❌ | ✅ |
| **Team Features** | ❌ | ❌ | ✅ |

### How to Upgrade
1. Go to [/pricing](https://postcontent.io/pricing)
2. Click "Select Plan" on your desired tier
3. Complete checkout via Polar.sh (secure payment)
4. Start using new limits immediately

### Cancel Anytime
- No contracts or commitments
- Cancel from `/dashboard/account` → Billing tab
- Access until end of billing period
- No refunds for partial months

---

## 🔧 API Reference

### Authentication
All API endpoints require authentication via NextAuth session.

```typescript
// Get current user session
const session = await auth()
if (!session?.user?.id) {
  // User not authenticated
}
```

### Endpoints

#### POST `/api/generate`
Generate social media posts.

**Request:**
```json
{
  "topic": "Product launch announcement",
  "platform": "twitter",
  "tone": "professional",
  "variants": 3
}
```

**Response:**
```json
{
  "posts": [
    "Post variant 1...",
    "Post variant 2...",
    "Post variant 3..."
  ]
}
```

---

#### POST `/api/reply`
Generate contextual replies.

**Request:**
```json
{
  "originalPost": "Just launched my new SaaS product!",
  "context": "I want to be supportive",
  "replyTone": "supportive"
}
```

**Response:**
```json
{
  "replies": ["Reply 1...", "Reply 2...", "Reply 3..."]
}
```

---

#### POST `/api/thread`
Generate Twitter/X threads.

**Request:**
```json
{
  "topic": "Why most marketing advice is wrong",
  "keyPoints": "outdated tactics, context matters, test everything",
  "threadLength": 5
}
```

**Response:**
```json
{
  "thread": [
    "Tweet 1 (hook)...",
    "Tweet 2...",
    "Tweet 3...",
    "Tweet 4...",
    "Tweet 5 (conclusion)..."
  ]
}
```

---

#### POST `/api/video-script`
Generate video scripts.

**Request:**
```json
{
  "hook": "Stop wasting hours on content creation",
  "story": "I used to spend 2 hours every morning writing posts...",
  "offer": "Try PostContent free and get 7 days of content in 5 minutes"
}
```

**Response:**
```json
{
  "script": "Full formatted video script with stage directions..."
}
```

---

#### POST `/api/caption`
Generate image captions.

**Request:**
```json
{
  "context": "Behind-the-scenes photo of our team launching new feature",
  "platform": "linkedin"
}
```

**Response:**
```json
{
  "captions": ["Caption 1...", "Caption 2...", "Caption 3..."]
}
```

---

#### GET `/api/history`
Fetch generation history.

**Query Params:**
- `type` (optional): "generate" | "reply" | "thread"
- `limit` (optional): Number of items (default: 20)

**Response:**
```json
{
  "history": [
    {
      "id": "clx123",
      "content": "Generated post content...",
      "type": "generate",
      "createdAt": "2026-01-19T10:30:00Z",
      "metadata": {
        "topic": "Product launch",
        "platform": "twitter",
        "tone": "professional"
      }
    }
  ]
}
```

---

#### DELETE `/api/history/{id}`
Delete a history item.

**Response:**
```json
{
  "success": true
}
```

---

#### GET `/api/usage`
Get current usage stats.

**Response:**
```json
{
  "used": 5,
  "limit": 10,
  "remaining": 5,
  "percentage": 50
}
```

---

## 🐛 Troubleshooting

### Generation Issues

**"Failed to generate content"**
- **Cause**: API rate limit or network error
- **Fix**: Wait 30 seconds and try again
- **Prevention**: Avoid rapid-fire generations

**"Invalid input"**
- **Cause**: Topic too short or empty
- **Fix**: Enter at least 10 characters for your topic
- **Tip**: Be specific for better results

---

### Account Issues

**"Email not verified"**
- **Cause**: Haven't clicked verification link
- **Fix**: Check spam folder, resend verification email
- **Link**: `/verify-email` page

**"Out of credits"**
- **Cause**: Used all monthly generations
- **Fix**: Upgrade plan or wait for monthly reset
- **Date**: Credits reset on 1st of each month

---

### Payment Issues

**"Checkout failed"**
- **Cause**: Polar.sh payment processor error
- **Fix**: Try different payment method
- **Contact**: support@postcontent.io

**"Subscription not active"**
- **Cause**: Payment failed or subscription expired
- **Fix**: Update payment method in Polar dashboard
- **Note**: Check email for payment failure notice

---

### History Not Loading

**"History is empty"**
- **Cause**: No content generated yet OR backend not tracking
- **Fix**: Generate content first, then check history
- **Note**: Free accounts: 30-day history limit

**"Failed to fetch history"**
- **Cause**: Database connection or session expired
- **Fix**: Refresh page and log in again
- **Check**: Network tab for 401 errors

---

## 📧 Support

### Get Help
- **Email**: support@postcontent.io
- **Response Time**: Within 24 hours
- **Priority Support**: Pro/Enterprise plans get faster response

### Feature Requests
- **Email**: hello@postcontent.io
- **Include**: Use case, expected behavior, screenshots

### Bug Reports
- **Email**: support@postcontent.io
- **Include**: 
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser and device info
  - Screenshots or video

---

## 🔗 Useful Links

- **Website**: [postcontent.io](https://postcontent.io)
- **Dashboard**: [postcontent.io/dashboard](https://postcontent.io/dashboard)
- **Pricing**: [postcontent.io/pricing](https://postcontent.io/pricing)
- **FAQ**: [postcontent.io/faq](https://postcontent.io/faq)
- **Contact**: [postcontent.io/contact](https://postcontent.io/contact)

---

## 📱 Mobile Usage

PostContent is fully responsive and works on:
- **iOS Safari**: iPhone, iPad
- **Android Chrome**: All Android devices
- **Mobile browsers**: Edge, Firefox, Samsung Internet

**Tips for mobile:**
- Use landscape mode for better visibility
- Save to Home Screen for quick access
- Works offline for viewing saved history

---

## 🔐 Privacy & Security

### Data Protection
- All content encrypted in transit (HTTPS)
- Database hosted on secure Neon PostgreSQL
- Passwords hashed with bcrypt
- No data sold to third parties

### Content Ownership
- You own 100% of generated content
- Export your data anytime from account settings
- Delete account removes all your data

### AI Training
- Your content is NOT used to train AI models
- Each generation is fresh and unique
- No content sharing between users

---

**Last Updated**: January 19, 2026  
**Version**: 1.0.0
