# PostContent - System Prompts & Core Features Documentation

> **Last Updated:** January 24, 2026  
> **Status:** Production Ready  
> **AI Models:** Claude Sonnet 4 (Primary), Grok 3-Mini (Legacy)  
> **New:** Humanness System & AI Detection (v2.0)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [AI Model Architecture](#ai-model-architecture)
- [System Prompts Library](#system-prompts-library)
- [Tone System](#tone-system)
- [**NEW: Humanness System**](#humanness-system)
- [**NEW: AI Detection System**](#ai-detection-system)
- [Platform Configurations](#platform-configurations)
- [Voice Training System](#voice-training-system)
- [Conversion Frameworks](#conversion-frameworks)
- [Validation & Security](#validation--security)
- [Usage Limits](#usage-limits)
- [API Endpoints](#api-endpoints)

---

## 🎯 Overview

PostContent is an AI-powered social media content generator that creates platform-specific posts using advanced language models. The system uses carefully crafted prompts to ensure high-quality, authentic, and conversion-optimized content.

**Key Differentiators:**
- **Voice Matching**: Analyzes user's writing style and mirrors it
- **Platform-Native Content**: Tailored for Twitter, LinkedIn, Instagram, Facebook, Threads
- **Conversion-Optimized**: Built-in Hook-Story-Offer framework
- **Tone Variety**: 5 distinct tones with personality
- **Anti-AI Detection**: Filters generic AI phrases
- **🆕 Humanness Control**: 4-level slider from corporate to casual
- **🆕 AI Detection Scoring**: Know before you post (0-100 risk score)
- **🆕 Make More Human**: One-click content improvement

---

## 🚀 Core Features

### 1. **Post Generator** (`/api/generate`)
**Purpose:** Generate 3 unique post variations based on user input

**AI Model:** Claude Sonnet 4 (`claude-sonnet-4-20250514`)

**Supported Platforms:**
- Twitter/X (280 chars)
- LinkedIn (3000 chars)
- Instagram (2200 chars)
- Facebook (5000 chars)
- Threads (500 chars)

**Supported Tones:**
- Professional
- Casual
- Humorous
- Inspirational
- Educational

**Key Features:**
- Voice profile integration
- Platform-specific formatting
- Post validation and cleanup
- Character limit enforcement
- Anti-AI phrase filtering

**System Prompt Structure:**
```typescript
BASE_SYSTEM_PROMPT
+ CONVERSION_FRAMEWORKS
+ TONE_SPECIFIC_PROMPT
+ HUMANNESS_LAYER (optional - NEW!)
+ PLATFORM_GUIDELINES
+ USER_VOICE_PROFILE (optional)
```

**Location:** `lib/claude.ts` → `generatePosts()`, `generatePostsWithDetection()`

---

### 2. **Thread Creator** (`/api/thread`)
**Purpose:** Generate multi-tweet threads (3-15 tweets)

**AI Model:** Claude Sonnet 4 (`claude-sonnet-4-20250514`)

**Thread Structure:**
- **Tweet 1:** Hook (attention grab)
- **Tweets 2-6:** Story/Value (content delivery)
- **Tweet 7+:** Offer (CTA/engagement)

**Framework:** Hook-Story-Offer (HSO)

**Key Features:**
- Customizable thread length (3-15 tweets)
- Optional key points guidance
- Topic-based generation
- Each tweet <280 chars
- Natural flow between tweets

**System Prompt:** `THREAD_GENERATION_PROMPT` (554 lines of detailed framework)

**Location:** `lib/claude.ts` → `generateThread()`

---

### 3. **Reply Generator** (`/api/reply`)
**Purpose:** Generate context-aware replies to posts

**AI Model:** Claude Sonnet 4 (`claude-sonnet-4-20250514`)

**Reply Styles:**
1. **Funny** - Playful, humorous engagement
2. **Insightful** - Valuable perspective/expertise
3. **Spicy** - Bold, contrarian, debate-sparking

**Key Features:**
- Context-aware responses
- 3 variations per request
- <280 characters each
- Natural, human-like tone
- Optional context parameter

**Location:** `lib/claude.ts` → `generateReplies()`

---

### 4. **Caption Generator** (`/api/caption`)
**Purpose:** Generate Facebook/LinkedIn captions with Hook-Story-Offer

**AI Model:** Anthropic Claude (inline implementation)

**Supported Platforms:**
- Facebook
- LinkedIn

**Framework:** Hook-Story-Offer (HSO)
- **Hook:** Attention-grabbing opening (question, bold statement, fact)
- **Story:** Value, insight, relatable content
- **Offer:** Clear call-to-action

**Key Features:**
- Platform-specific guidelines
- 3 caption variations
- Hashtag recommendations (3-5 for LinkedIn, 2-4 for Facebook)
- Line break optimization
- Professional/conversational balance

**Location:** `app/api/caption/route.ts`

---

### 5. **Video Script Generator** (`/api/video-script`)
**Purpose:** Create short-form video scripts (30-90 seconds)

**AI Model:** Anthropic Claude (inline implementation)

**Target Platforms:**
- TikTok
- Instagram Reels
- YouTube Shorts

**Script Formats:**
1. **Hook-Story-Offer** (Pattern interrupt → empathy → CTA)
2. **Provide Value** (Educational authority building)
3. **Emotion-Logic-Urgency** (Emotional hook → reasoning → scarcity)

**Key Features:**
- Natural, conversational tone
- Stage directions in [brackets]
- 30-90 second optimized
- Easy to perform/read
- Multiple format options

**Location:** `app/api/video-script/route.ts`

---

### 6. **Voice Training** (`/api/train`)
**Purpose:** Analyze user's writing style to match their voice

**AI Model:** Claude Sonnet 4 (`claude-sonnet-4-20250514`)

**Input Requirements:**
- Minimum 5 example posts
- Ideally 10-20 posts for accuracy

**Analysis Output:**
```json
{
  "sarcasmLevel": 75,          // 0-100 scale
  "tiredLevel": 30,            // 0-100 scale (burnout vibes)
  "favoriteWords": ["tbh", "lowkey", "ngl", "fr", "honestly"],
  "avgLength": 42,             // Words per sentence
  "tone": "Sarcastic with self-deprecating humor, casually authentic"
}
```

**Voice Integration:**
Once trained, the voice profile is stored in database and automatically applied to all future generations for that user.

**Location:** `lib/claude.ts` → `analyzeVoice()`

---

## 🤖 AI Model Architecture

### Primary Model: Claude Sonnet 4
```typescript
Model: 'claude-sonnet-4-20250514'
Provider: Anthropic
API: @anthropic-ai/sdk

Used For:
- Post generation
- Thread creation
- Reply generation
- Voice analysis
- Caption generation (inline)
- Video script generation (inline)
```

**Advantages:**
- Superior understanding of context
- Better at matching voice profiles
- More natural, human-like output
- Excellent at following complex frameworks
- Prompt caching support

**Configuration:**
```typescript
{
  model: 'claude-sonnet-4-20250514',
  max_tokens: 500-1500 (platform dependent),
  temperature: 0.6-0.8 (tone dependent),
  system: [
    {
      type: 'text',
      text: systemPrompt,
      cache_control: { type: 'ephemeral' }
    }
  ]
}
```

### Legacy Model: Grok 3-Mini
```typescript
Model: 'grok-3-mini'
Provider: xAI
API: OpenAI SDK (compatible)
Endpoint: https://api.x.ai/v1

Status: DEPRECATED
```

**Note:** Original implementation used Grok, but has been migrated to Claude for better quality.

**Location:** `lib/grok.ts` (legacy, not actively used)

---

## 📝 System Prompts Library

### Base System Prompt
**Location:** `lib/prompts.ts` → `BASE_SYSTEM_PROMPT`

```
You are PostContent, an AI content generator designed to help creators 
generate engaging social posts.

Core Principles:
- Sound human, not AI-generated
- Be authentic and relatable
- Keep posts platform-native and format-appropriate
- Avoid corporate speak and generic platitudes
- Match the user's natural voice and tone
- Never use unnecessary hashtags or emoji spam
```

**Applied To:** All generation types

---

### Conversion Frameworks

**Location:** `lib/prompts.ts` → `CONVERSION_FRAMEWORKS`

#### 1. Hook-Story-Offer (HSO) Structure

**Hook (First 1-2 sentences):**
- Grab attention with bold claim, surprising stat, or provocative question
- Create curiosity gap: "Most people don't know..."
- Pattern interrupt: "Stop doing X. Here's why:"
- Make scrolling past impossible

**Story (Middle section):**
- Share relatable struggle or transformation
- Provide REAL value (frameworks, tactics, lessons)
- Use specific numbers and examples
- Build emotional connection

**Offer (Final 1-2 sentences):**
- Clear CTA or powerful takeaway
- Create urgency/scarcity when appropriate
- Make next step crystal clear

#### 2. Provide Real Value

Every post MUST teach something actionable:
✅ Tactical how-to with steps
✅ Specific framework with numbers
✅ Personal story with lesson
❌ Generic inspiration without substance

**No Fluff Rule:**
- Every word must earn its place
- Give framework, not just motivation
- Specific > General always

#### 3. Emotion → Logic → Urgency

**Layer 1 - EMOTION (Hook):**
Trigger desire, fear, or curiosity

**Layer 2 - LOGIC (Story):**
Support with data, proof, examples

**Layer 3 - URGENCY (Offer):**
Time-bound or quantity-based when appropriate

---

### Quality Standards

**DO:**
✅ Start with high-impact first sentence
✅ Use specific numbers and examples
✅ Include personal experience
✅ End with clear action or takeaway
✅ Balance emotion with logic

**NEVER:**
❌ Weak openings: "Here are..." / "Today I want to..."
❌ Vague language: "some", "many", "often"
❌ AI phrases: "delve", "landscape", "tapestry"
❌ Fluff without substance

---

## 🎨 Tone System

### Available Tones

#### 1. Professional
**Temperature:** 0.6  
**Character:** Corporate, polished, data-driven, authoritative

**Style Guidelines:**
- Use data and metrics to support claims
- Maintain a polished, credible tone
- Focus on insights and analysis
- Present information clearly and concisely
- Establish authority without being condescending
- Use industry-relevant terminology appropriately

**Example Posts:**
- "Our analysis of 50,000 startups reveals 3 patterns that predict early success."
- "3 key metrics that separate profitable SaaS companies from struggling ones."
- "Data-driven insights: Why most product launches fail in the first 90 days."

**Avoid:**
- Overly casual language
- Unsupported claims
- Jargon without explanation
- Being too stiff or robotic

---

#### 2. Casual
**Temperature:** 0.7  
**Character:** Friendly, conversational, relatable, approachable

**Style Guidelines:**
- Write like you're talking to a friend
- Use contractions and natural language
- Share personal experiences and learnings
- Be warm and approachable
- Keep it real and authentic
- Use "I" and "you" to create connection

**Example Posts:**
- "Here's what I learned after 3 years of building in public (the good and the messy)."
- "Just shipped a feature that took 3x longer than expected. Turns out, I was solving the wrong problem."
- "Real talk: The best product advice I got came from a user who almost churned."

**Avoid:**
- Being too formal or corporate
- Oversharing personal details
- Trying too hard to be relatable
- Using excessive slang

---

#### 3. Humorous
**Temperature:** 0.8  
**Character:** Witty, playful, entertaining, light-hearted

**Style Guidelines:**
- Use clever wordplay and observations
- Find humor in everyday situations
- Keep it light and fun
- Use relatable scenarios
- Land the punchline effectively
- Balance humor with actual value

**Example Posts:**
- "Me: 'I'll just fix this one bug' *6 hours later* 'I've accidentally rewritten the entire auth system'"
- "My code at 2am hits different. Plot twist: It doesn't work at 2pm either."
- "Spent all day optimizing my code. It's now 0.002 seconds faster. Time well spent."

**Avoid:**
- Offensive or controversial humor
- Jokes that don't land
- Being funny at others' expense
- Humor without substance

---

#### 4. Inspirational
**Temperature:** 0.7  
**Character:** Motivating, uplifting, action-oriented, encouraging

**Style Guidelines:**
- Share motivating insights and lessons
- Focus on growth and possibility
- Encourage action and forward movement
- Use positive, empowering language
- Share transformative moments
- Balance optimism with authenticity

**Example Posts:**
- "Every expert was once a beginner who refused to quit. Your journey starts with the first step."
- "Your first version doesn't have to be perfect. It just has to exist. Progress over perfection."
- "The code you write today is practice for the developer you'll become tomorrow."

**Avoid:**
- Toxic positivity
- Ignoring real challenges
- Generic platitudes
- Being preachy or condescending

---

#### 5. Educational
**Temperature:** 0.6  
**Character:** Clear, informative, teaching-focused, helpful

**Style Guidelines:**
- Break down complex topics simply
- Use clear explanations and examples
- Structure information logically
- Teach concepts step-by-step
- Provide actionable takeaways
- Make learning accessible

**Example Posts:**
- "Here's how JWT authentication works in 3 steps (no CS degree required)."
- "Understanding the difference between REST and GraphQL: A practical guide."
- "React hooks explained: When to use useState vs useEffect."

**Avoid:**
- Overwhelming with jargon
- Assuming too much knowledge
- Being condescending
- Making it too complicated

---

## �️ Humanness System

### Overview

The Humanness System controls **how formal vs casual** content sounds, separate from tone. While tone affects **what you say** (professional insights vs humor), humanness affects **how you say it** (corporate polish vs texting a friend).

**Key Concept:** Tone + Humanness = Complete Voice Control

### Available Humanness Levels

#### Level 1: Corporate Polished 🤖
**Temperature:** 0.3  
**Detection Risk:** 🔴 HIGH  
**Use When:** Official company announcements, press releases, formal proposals

**Characteristics:**
- Sophisticated vocabulary
- Perfect grammar, no contractions
- Formal punctuation (em-dashes, semicolons)
- Sounds like a business publication

**Instructions Applied:**
```
Write in a professional, polished tone.
Use sophisticated vocabulary appropriately.
Complete sentences, proper grammar.
Sound like a business publication.
NO contractions, NO casual language.
Use formal transitions and structure.
```

**Example Output:**
> "Our comprehensive analysis demonstrates that organizations implementing these methodologies achieve superior outcomes. The data indicates a paradigm shift in operational efficiency."

---

#### Level 2: Professional Authentic 💼
**Temperature:** 0.7  
**Detection Risk:** 🟡 MEDIUM  
**Use When:** LinkedIn posts, professional blogs, thought leadership (RECOMMENDED for most use)

**Characteristics:**
- Mixed vocabulary (simple + sophisticated)
- Uses contractions (I'm, you're, it's)
- Varied sentence length
- Personal touches ("I've found", "in my experience")

**Instructions Applied:**
```
Write conversationally but professionally.
Mix simple and sophisticated words naturally.
USE contractions (I'm, you're, it's).
Vary sentence length (short and long).
Start sentences with "And" or "But" if natural.
Sound like a smart person, not a press release.
Include personal markers: "I've found", "in my experience"
NO em-dashes or semicolons.
```

**Example Output:**
> "I've analyzed 1,000+ posts and found something interesting. The best performers don't sound perfect—they sound human. Here's what I mean."

---

#### Level 3: Casual Authentic 💬
**Temperature:** 0.8  
**Detection Risk:** 🟢 LOW  
**Use When:** Twitter, casual LinkedIn, Instagram captions, building rapport

**Characteristics:**
- Everyday words only
- Frequent contractions
- Sentence fragments OK
- Occasional casual markers (honestly, actually, literally)

**Instructions Applied:**
```
Write casually but not unprofessionally.
Simple everyday words only.
Contractions are natural and frequent.
Fragments okay if natural.
Use sparingly: honestly, actually, literally
Can use "lol" or "idk" if context fits.
Sound like explaining to a friend over coffee.
NO sophisticated vocabulary.
NO perfect parallel structure.
```

**Example Output:**
> "Honestly, this changed everything for me. I used to overthink every post. Now? I just write like I'm texting a friend. Works way better."

---

#### Level 4: Texting Friend 🗣️
**Temperature:** 0.9  
**Detection Risk:** 🟢 MINIMAL  
**Use When:** Twitter hot takes, Threads, ultra-casual engagement, memes

**Characteristics:**
- Very simple words (6th grade level)
- Lowercase "i" sometimes
- Internet shorthand OK (gonna, wanna, idk, lol, tbh)
- Intentional imperfections

**Instructions Applied:**
```
Write like typing quickly to a friend.
Very simple words only - 6th grade level.
Use naturally: gonna, wanna, idk, lol, tbh (but don't spam).
Lowercase 'i' occasionally (not every time).
Short sentences. Fragments totally fine.
Can trail off with ... when appropriate.
Admit uncertainty: "idk if this makes sense but..."
Sound imperfect on purpose - like it wasn't edited.
Simple punctuation only - no semicolons, colons, or em-dashes.
Can use "honestly" or "ngl" if it feels natural.
```

**Example Output:**
> "ngl this is gonna sound weird but... i stopped trying to sound smart and my engagement went up 3x. idk why it works but it does lol"

---

### How to Use

**API Request:**
```json
{
  "input": "Your topic here",
  "tone": "professional",
  "platform": "linkedin",
  "humanness": "professional_authentic"
}
```

**Multi-Humanness Mode:**
```json
{
  "input": "Your topic here",
  "tone": "professional",
  "platform": "linkedin",
  "multiHumanness": true
}
```
Returns 3 variations at different humanness levels for comparison.

**Location:** `lib/prompts.ts` → `HUMANNESS_LEVELS`

---

## 🔍 AI Detection System

### Overview

The AI Detection System analyzes content and scores it 0-100 based on 8 metrics that LinkedIn, Twitter, and other platforms use to detect AI-generated content.

**Purpose:** Know before you post if your content will be flagged or shadowbanned.

### Risk Levels

| Score | Level | Badge | Action |
|-------|-------|-------|--------|
| 0-19 | MINIMAL | 🟢 | Perfect - post confidently |
| 20-39 | LOW | 🟢 | Good - safe to post |
| 40-59 | MEDIUM | 🟡 | Risky - consider humanizing |
| 60+ | HIGH | 🔴 | DON'T POST - will be flagged |

### Detection Metrics

#### 1. AI Buzzwords (15 points each)
**What it checks:** Usage of common AI phrases

**Flagged words:**
- delve, tapestry, leverage, dive deep, unpack
- landscape, paradigm, synergy, robust, comprehensive
- innovative, cutting-edge, revolutionary, game-changer
- unlock, harness, seamless, elevate, transform
- optimize, streamline, empower, dynamic

**Example:**
```
❌ "Let's delve into this comprehensive landscape..." (+30 pts)
✅ "Let's explore this topic in detail..." (0 pts)
```

#### 2. Sentence Length (20 points if avg >25 words)
**What it checks:** Average words per sentence

**Why it matters:** AI tends to write longer, more complex sentences

**Example:**
```
❌ Avg 28 words/sentence (+20 pts)
✅ Avg 15 words/sentence (0 pts)
```

#### 3. Personal Pronouns (25 points if missing)
**What it checks:** Presence of I, I'm, my, me, we, our

**Why it matters:** AI often avoids first-person perspective

**Example:**
```
❌ "The solution involves implementing..." (+25 pts)
✅ "I found the solution involves..." (0 pts)
```

#### 4. Contractions (15 points if missing)
**What it checks:** Usage of I'm, you're, it's, don't, can't

**Why it matters:** Humans naturally use contractions

**Example:**
```
❌ "It is important to..." (+15 pts)
✅ "It's important to..." (0 pts)
```

#### 5. Complex Punctuation (10 points)
**What it checks:** Em-dashes (—), semicolons, multiple colons

**Why it matters:** AI overuses formal punctuation

**Example:**
```
❌ "Consider this—a comprehensive solution; quite effective." (+10 pts)
✅ "Consider this: a complete solution. It works well." (0 pts)
```

#### 6. Perfect Parallel Structure (15 points)
**What it checks:** Bullet points all same length

**Why it matters:** AI creates unnaturally perfect lists

**Example:**
```
❌ All bullets exactly 45 characters (+15 pts)
✅ Bullets vary: 30, 52, 38 characters (0 pts)
```

#### 7. Generic Openings (10 points)
**What it checks:** Starts with "Here are...", "Let me...", "Today I want..."

**Why it matters:** AI defaults to these intros

**Example:**
```
❌ "Here are 5 tips to..." (+10 pts)
✅ "Most people miss this..." (0 pts)
```

#### 8. Excessive Exclamation Marks (5 points if >3)
**What it checks:** Count of ! in content

**Why it matters:** AI overcompensates with enthusiasm

**Example:**
```
❌ "Amazing! Great! Fantastic! Incredible! Wow!" (+5 pts)
✅ "This is amazing and works incredibly well." (0 pts)
```

### API Response Example

```json
{
  "riskScore": 35,
  "riskLevel": "LOW",
  "passed": true,
  "flags": [
    "⚠️ Slightly long sentences (avg 22 words)",
    "❌ AI buzzword: \"leverage\" (1x)"
  ],
  "recommendations": [
    "Replace \"leverage\" with simpler alternative",
    "Consider breaking up longer sentences"
  ],
  "metrics": {
    "avgSentenceLength": 22,
    "hasPersonalPronouns": true,
    "hasContractions": true,
    "aiBuzzwordCount": 1,
    "complexPunctuation": false
  }
}
```

### Make More Human Feature

**Purpose:** One-click improvement to reduce AI detection risk

**How it works:**
1. Analyzes current content (before score)
2. Applies 6 humanization techniques
3. Returns improved content (after score)
4. Shows specific improvements made

**API Endpoint:** `POST /api/humanize`

**Request:**
```json
{
  "content": "Let us delve into this comprehensive solution.",
  "tone": "casual",
  "platform": "twitter"
}
```

**Response:**
```json
{
  "success": true,
  "original": "Let us delve into this comprehensive solution.",
  "humanized": "Let's explore this solution. It's simple and works.",
  "before": {
    "riskScore": 60,
    "riskLevel": "HIGH"
  },
  "after": {
    "riskScore": 15,
    "riskLevel": "MINIMAL"
  },
  "improvements": [
    "Risk score reduced by 45 points",
    "Removed 2 AI buzzwords",
    "Added contractions",
    "Shortened average sentence length"
  ],
  "riskReduction": 45
}
```

**Location:** `lib/validation.ts` → `checkAIDetectionRisk()`, `lib/claude.ts` → `humanizeContent()`

---

## 🌐 Platform Configurations

**Location:** `lib/prompts.ts` → `PLATFORM_CONFIGS`

### Twitter/X

**Avoid:**
- Overwhelming with jargon
- Assuming too much knowledge
- Being condescending
- Making it too complicated

---

## �🌐 Platform Configurations

**Location:** `lib/prompts.ts` → `PLATFORM_CONFIGS`

### Twitter/X
```typescript
{
  maxChars: 280,
  style: 'punchy, quotable, thread-friendly',
  format: 'concise one-liners or short threads'
}
```

### LinkedIn
```typescript
{
  maxChars: 3000,
  style: 'thought leadership, professional insights',
  format: 'long-form 500-1000 words, paragraph breaks for readability'
}
```

### Instagram
```typescript
{
  maxChars: 2200,
  style: 'visual-first, storytelling, engaging',
  format: 'narrative with line breaks, emoji-friendly'
}
```

### Facebook
```typescript
{
  maxChars: 5000,
  style: 'conversational, community-focused',
  format: 'casual long-form, discussion-starting'
}
```

### Threads
```typescript
{
  maxChars: 500,
  style: 'authentic, unpolished, real-time thoughts',
  format: 'casual short posts, conversational'
}
```

---

## 🎭 Voice Training System

### How It Works

**Step 1: Collection**
User provides 5+ example posts that represent their writing style

**Step 2: Analysis**
Claude Sonnet 4 analyzes posts for:
- Sarcasm frequency and intensity
- Burnout/tired vibes
- Signature words and phrases
- Sentence length patterns
- Overall tone descriptor

**Step 3: Profile Creation**
```typescript
interface VoiceProfile {
  userId: string;
  sarcasmLevel: number;      // 0-100
  tiredLevel: number;        // 0-100
  favoriteWords: string[];   // Top 5 characteristic words
  avgLength: number;         // Words per sentence
  updatedAt: DateTime;
}
```

**Step 4: Integration**
Voice profile is automatically appended to system prompts:
```typescript
User's Voice Profile:
- Sarcasm level: 75%
- Tired/burnout vibes: 30%
- Signature words: tbh, lowkey, ngl, fr, honestly
- Average sentence length: 42 words

IMPORTANT: Match this voice profile in your generations. 
Use their signature words naturally, mirror their sarcasm level, 
and match their sentence rhythm.
```

**Database Schema:**
```prisma
model VoiceProfile {
  id            String   @id @default(cuid())
  userId        String   @unique
  sarcasmLevel  Int
  tiredLevel    Int
  favoriteWords String[]
  avgLength     Int
  updatedAt     DateTime @updatedAt
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 📊 Validation & Security

### Input Validation

**Location:** `lib/validation.ts`

#### Sanitization
```typescript
function sanitizeInput(input: string): string {
  return input
    .replace(/\0/g, '')                    // Remove null bytes
    .replace(/\s{10,}/g, '          ')     // Limit whitespace
    .trim();                               // Trim edges
}
```

#### Generation Input Validation
- Minimum 3 characters
- Maximum 5000 characters
- Must be string type
- No null bytes
- Limited consecutive whitespace

#### Tone Validation
Valid tones: `professional`, `casual`, `humorous`, `inspirational`, `educational`

#### Platform Validation
Valid platforms: `twitter`, `linkedin`, `instagram`, `facebook`, `threads`

### Content Validation

**Location:** `lib/prompts.ts` → `validateContent()`

**Checks:**
- Character limit enforcement
- Minimum content length (20 chars)
- AI phrase detection ("delve", "tapestry", "leverage")
- Hashtag count limits (platform-specific)
- Emoji overload detection (>3 emojis)

**AI Phrase Blacklist:**
- "delve into"
- "tapestry"
- "leverage"
- "dive deep"
- "unpack"
- "landscape"

### Rate Limiting

**Location:** `lib/rate-limit.ts`

**Limits:**
- AI Generation: 10 requests/minute
- General API: 60 requests/minute
- Webhooks: 60 requests/minute

**Implementation:** In-memory rate limiting per user/IP

---

## 📈 Usage Limits

**Location:** `lib/usage.ts`

### Free Tier
- **Limit:** 10 generations/month
- **Reset:** First day of each month
- **Enforcement:** Pre-generation check

### Pro Tier
- **Limit:** 200 generations/month
- **Requirement:** `subscribed = true` AND `subscriptionStatus = 'active'`
- **Reset:** First day of each month

### Enterprise Tier
- **Limit:** 999,999 (effectively unlimited)
- **Custom:** Per agreement

### Tracking
```typescript
model Post {
  id        String   @id @default(cuid())
  userId    String
  content   String   @db.Text
  type      String   // 'generate', 'thread', 'reply', 'caption', 'video-script'
  createdAt DateTime @default(now())
}
```

Monthly count query:
```typescript
const count = await prisma.post.count({
  where: {
    userId,
    createdAt: { gte: startOfMonth }
  }
});
```

---

## 🔗 API Endpoints

### Generation Endpoints

#### POST `/api/generate`
**Purpose:** Generate 3 post variations

**Request:**
```json
{
  "input": "Your post idea here",
  "platform": "twitter",
  "tone": "professional",
  "humanness": "professional_authentic",
  "multiHumanness": false
}
```

**Response (Standard Mode):**
```json
{
  "variations": [
    "Post variation 1",
    "Post variation 2",
    "Post variation 3"
  ],
  "postId": "post_abc123"
}
```

**Response (With Detection):**
```json
{
  "variations": [
    {
      "content": "Post text here...",
      "humanness": "💼 Professional but Real",
      "aiDetection": {
        "riskScore": 25,
        "riskLevel": "LOW",
        "passed": true,
        "flags": [],
        "recommendations": [],
        "metrics": {
          "avgSentenceLength": 18,
          "hasPersonalPronouns": true,
          "hasContractions": true,
          "aiBuzzwordCount": 0,
          "complexPunctuation": false
        }
      }
    }
  ],
  "metadata": {
    "timestamp": "2026-01-24T...",
    "platform": "twitter",
    "tone": "professional",
    "humanness": "professional_authentic",
    "withDetection": true
  }
}
```

**Response (Multi-Humanness Mode):**
```json
{
  "variations": [
    {
      "content": "Professional version...",
      "humanness": "💼 Professional but Real",
      "aiDetection": { "riskScore": 30, "riskLevel": "LOW" }
    },
    {
      "content": "Casual version...",
      "humanness": "💬 Casual & Authentic",
      "aiDetection": { "riskScore": 15, "riskLevel": "MINIMAL" }
    },
    {
      "content": "Texting version...",
      "humanness": "🗣️ Like Texting",
      "aiDetection": { "riskScore": 5, "riskLevel": "MINIMAL" }
    }
  ]
}
```

---

#### POST `/api/humanize` 🆕
**Purpose:** Make content more human and reduce AI detection risk

**Request:**
```json
{
  "content": "Let us delve into this comprehensive landscape.",
  "tone": "casual",
  "platform": "twitter"
}
```

**Response:**
```json
{
  "success": true,
  "original": "Let us delve into this comprehensive landscape.",
  "humanized": "Let's explore this topic. It's really interesting.",
  "before": {
    "riskScore": 60,
    "riskLevel": "HIGH",
    "flags": [
      "❌ AI buzzword: \"delve\" (1x)",
      "❌ AI buzzword: \"comprehensive\" (1x)",
      "❌ No contractions (too formal)"
    ]
  },
  "after": {
    "riskScore": 10,
    "riskLevel": "MINIMAL",
    "flags": []
  },
  "improvements": [
    "Risk score reduced by 50 points",
    "Removed 2 AI buzzwords",
    "Added contractions"
  ],
  "riskReduction": 50
}
```

---

#### POST `/api/thread`
**Purpose:** Generate multi-tweet thread

**Request:**
```json
{
  "topic": "How to build a SaaS product",
  "keyPoints": "MVP, validation, pricing",
  "threadLength": 7
}
```

**Response:**
```json
{
  "thread": [
    "1/7 Tweet text...",
    "2/7 Tweet text...",
    "..."
  ],
  "tweets": [...]
}
```

---

#### POST `/api/reply`
**Purpose:** Generate context-aware replies

**Request:**
```json
{
  "postToReply": "Original post text",
  "context": "Optional context/angle"
}
```

**Response:**
```json
{
  "replies": [
    { "text": "Funny reply", "tag": "Funny", "color": "orange" },
    { "text": "Insightful reply", "tag": "Insightful", "color": "blue" },
    { "text": "Spicy reply", "tag": "Spicy", "color": "purple" }
  ]
}
```

---

#### POST `/api/caption`
**Purpose:** Generate Facebook/LinkedIn captions

**Request:**
```json
{
  "context": "New product launch announcement",
  "platform": "linkedin"
}
```

**Response:**
```json
{
  "captions": [
    "Caption variation 1",
    "Caption variation 2",
    "Caption variation 3"
  ]
}
```

---

#### POST `/api/video-script`
**Purpose:** Generate short-form video scripts

**Request:**
```json
{
  "context": "How to get more engagement on social media",
  "format": "hook-story-offer"
}
```

**Response:**
```json
{
  "script": "Complete video script with stage directions..."
}
```

---

#### POST `/api/train`
**Purpose:** Analyze user's voice from example posts

**Request:**
```json
{
  "posts": [
    "Example post 1",
    "Example post 2",
    "..."
  ]
}
```

**Response:**
```json
{
  "profile": {
    "sarcasmLevel": 75,
    "tiredLevel": 30,
    "favoriteWords": ["tbh", "lowkey", "ngl"],
    "avgLength": 42,
    "tone": "Sarcastic with self-deprecating humor"
  }
}
```

---

## 🔧 Configuration Files

### Core Prompt System
**File:** `lib/prompts.ts`
- Base system prompt
- Conversion frameworks
- Tone configurations
- Platform configs
- Thread generation prompt
- Voice analysis prompt
- Reply generation prompts
- Validation functions

### Claude Integration
**File:** `lib/claude.ts`
- generatePosts()
- generateThread()
- generateReplies()
- analyzeVoice()

### Legacy Grok Integration
**File:** `lib/grok.ts`
- Deprecated implementation
- Keep for reference only

### Validation System
**File:** `lib/validation.ts`
- Input sanitization
- Parameter validation
- Email/password validation

### Usage Tracking
**File:** `lib/usage.ts`
- getUserPostCount()
- trackPostGeneration()
- canUserGeneratePost()

---

## 🎯 Best Practices

### Prompt Engineering
1. **Be Specific:** Clear instructions yield better results
2. **Use Examples:** Show don't tell when possible
3. **Structure Matters:** Organize prompts with clear sections
4. **Iterate:** Test and refine prompts based on output quality
5. **Cache Wisely:** Use ephemeral caching for frequently used system prompts

### Voice Matching
1. **Quality Over Quantity:** 10 good examples > 50 mediocre ones
2. **Diversity:** Include various post types from user
3. **Recency:** Recent posts better represent current voice
4. **Authenticity:** Use user's actual posts, not generic samples

### Content Quality
1. **Validate Everything:** Check character limits, platform rules
2. **Filter AI Tells:** Remove generic phrases that scream "AI"
3. **Test Tones:** Each tone should feel distinctly different
4. **Review Output:** Spot-check generations regularly

---

## 📚 Related Documentation

- [README.md](./README.md) - Project setup and overview
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guidelines

---

## 🔄 Changelog

### January 24, 2026 - v2.0 (Humanness System)
- 🆕 **Humanness Control System** - 4 levels from corporate to texting
- 🆕 **AI Detection Scoring** - 8-metric analysis, 0-100 risk score
- 🆕 **Make More Human API** - One-click content improvement
- 🆕 **Multi-Humanness Generation** - Compare 3 humanness levels
- ✅ Updated `/api/generate` with detection support
- ✅ New `/api/humanize` endpoint
- ✅ Added `checkAIDetectionRisk()` function
- ✅ Added `humanizeContent()` function
- ✅ Updated type definitions with `HumannessLevel` and `AIDetectionResult`
- 📚 Comprehensive documentation update

### January 24, 2026 - v1.0
- ✅ Migrated thread generation from Grok to Claude
- ✅ Added comprehensive prompt documentation
- ✅ Documented all 6 core features
- ✅ Added voice training system documentation

### Previous
- Initial prompt system implementation
- Tone configurations added
- Platform-specific guidelines
- Conversion framework integration

---

**Maintained by:** PostContent Team  
**Contact:** dev@postcontent.io
