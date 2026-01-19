# PostContent Prompt System Guide

## 🎯 How It Works (Current System)

Your AI content generation uses **Claude Sonnet 4** through these components:

### Architecture:
```
User Input → API Route → lib/claude.ts → Anthropic API
                ↓
          lib/prompts.ts (System Instructions)
                ↓
         Generated Content → Validation → User
```

### Key Files:
1. **`lib/prompts.ts`** - System prompts and tone configurations
2. **`lib/claude.ts`** - API integration and response parsing
3. **API routes** - `/api/generate`, `/api/reply`, `/api/thread`, etc.

### Current Prompt Structure:
```typescript
BASE_SYSTEM_PROMPT (Who you are)
    ↓
TONE_CONFIG (How to sound)
    ↓
PLATFORM_CONFIG (Format & length)
    ↓
USER_VOICE (Personal style - optional)
    ↓
USER_PROMPT (What to create)
```

---

## 🚀 Implementing Hook-Story-Offer Framework

### What You Want to Add:

**1. Hook-Story-Offer** (HSO)
- **Hook**: Grab attention in first 3 seconds
- **Story**: Build connection with narrative
- **Offer**: Clear action/value proposition

**2. Provide Value**
- Every post must teach, entertain, or inspire
- No fluff or filler
- Actionable takeaways

**3. Emotion-Logic-Urgency/Scarcity**
- **Emotion**: Appeal to feelings first
- **Logic**: Back it up with reasoning
- **Urgency/Scarcity**: Create FOMO or time pressure

---

## ✨ Enhanced Prompt System (Implementation)

### Option 1: Add New Tone Called "Conversion"

Add this to `TONE_CONFIGS` in `lib/prompts.ts`:

```typescript
conversion: {
  name: 'Conversion',
  systemPrompt: `${BASE_SYSTEM_PROMPT}

Tone: Conversion-Optimized (Hook-Story-Offer framework)

FRAMEWORK: Hook → Story → Offer

Structure:
1. HOOK (First 1-2 sentences):
   - Start with a bold claim, shocking stat, or provocative question
   - Create curiosity gap ("Most people don't know...")
   - Pattern interrupts ("Stop doing X. Here's why:")
   - Make them NEED to keep reading

2. STORY (Middle section):
   - Share relatable struggle or transformation
   - Use "before → insight → after" arc
   - Paint vivid picture with specific details
   - Build emotional connection
   - Show, don't tell

3. OFFER (Final 1-2 sentences):
   - Clear call-to-action or value proposition
   - Create urgency ("only 3 spots left", "ends Friday")
   - Or scarcity ("limited to first 100", "won't repeat")
   - Make next step obvious

Psychology Layers:
- EMOTION: Appeal to desire, fear, or aspiration
- LOGIC: Support with data, proof, or reasoning  
- URGENCY: Time-bound or quantity-limited

Value Rules:
- Every post must teach something actionable
- No fluff, every word earns its place
- Give away the "what" freely, charge for the "how"
- Provide value FIRST, ask second

Examples of Structure:

Twitter Post (Hook-Story-Offer):
Hook: "I made $50K last month from a landing page I built in 2 hours."
Story: "Here's the thing: I spent 3 years overcomplicating everything. 
Complex funnels. 47 touchpoints. Zero sales. Then I tried the opposite..."
Offer: "Template drops tomorrow. 100 spots only. Reply 'in' to get notified."

LinkedIn Post (Hook-Story-Offer):
Hook: "We fired our best-performing salesperson yesterday."
Story: "She hit quota every month. Clients loved her. But something was wrong.
Our churn rate was 60%. Then we realized: she was selling to anyone who'd buy,
regardless of fit. Short-term wins became long-term disasters."
Offer: "We now qualify out 70% of leads. Churn dropped to 12%. Lesson: 
The best salespeople don't close everyone. They close the right ones."

Avoid:
- Weak hooks that don't create curiosity
- Stories without emotional arc or transformation
- Vague CTAs without clear next steps
- Urgency that feels fake or manipulative
- Logic without emotion (too dry)
- Emotion without logic (too fluffy)`,
  examples: [
    "I lost $100K before learning this pricing lesson. Now my SaaS does $2M ARR. The trick? I stopped charging for features. Started charging for outcomes. Full breakdown below 🧵",
    "Your competitor just raised $10M. You have $10K. Here's how to win anyway: They'll waste months on features users don't want. You'll talk to 100 users this week. Speed beats money. Thread 🧵",
    "Most founders obsess over product. I obsessed over distribution. Hit $1M ARR in 8 months with a mediocre product. Here's the playbook:"
  ],
  temperature: 0.7,
}
```

### Option 2: Enhance ALL Existing Tones

Update each tone's system prompt to include HSO framework. Here's how:

```typescript
// Add to EVERY tone config:

Universal Framework (Apply to all tones):
1. HOOK: First sentence must grab attention
   - Professional tone: Bold stat or insight
   - Casual tone: Relatable observation
   - Humorous tone: Setup for punchline
   - Inspirational: Aspirational statement
   - Educational: Intriguing question

2. VALUE: Middle must provide substance
   - Professional: Data/insights/analysis
   - Casual: Personal lessons/experiences
   - Humorous: Entertainment value + insight
   - Inspirational: Transformation story
   - Educational: Clear explanation

3. CTA/PAYOFF: End with clear takeaway
   - Professional: Key insight or next step
   - Casual: "Try this" or "Here's why"
   - Humorous: Punchline that teaches
   - Inspirational: Call to action
   - Educational: "Now you know X, do Y"

Emotion-Logic Balance:
- Lead with emotion (Hook)
- Support with logic (Story/Value)
- Close with action (Offer/Urgency)
```

---

## 🎨 Implementation Steps

### Step 1: Update `lib/prompts.ts`

```typescript
// Add conversion frameworks to base prompt
export const CONVERSION_FRAMEWORKS = `
CONVERSION FRAMEWORKS (Use in ALL posts):

1. Hook-Story-Offer (HSO):
   - Hook: Attention-grabbing opener (1-2 sentences)
   - Story: Value delivery with narrative (middle)
   - Offer: Clear CTA or takeaway (final sentence)

2. Provide Real Value:
   - Every post teaches, entertains, or inspires
   - No filler, no fluff
   - Actionable > Inspirational quotes
   - Give framework, not just motivation

3. Emotion → Logic → Urgency:
   - Start with feeling (desire, fear, curiosity)
   - Build with reasoning (data, story, proof)
   - End with scarcity/urgency when appropriate
   - "Limited time" / "Only X spots" / "Ends Friday"

Value Hierarchy:
✅ Tactical how-to > Strategic why > Motivational what
✅ Specific examples > General advice
✅ Personal story > Generic statements
✅ Numbered frameworks > Abstract concepts
`;

// Then add to base system prompt:
export const BASE_SYSTEM_PROMPT = `You are PostContent, an AI content generator designed to help creators generate engaging social posts.

${CONVERSION_FRAMEWORKS}

Core Principles:
- Sound human, not AI-generated
- Be authentic and relatable
- Keep posts platform-native and format-appropriate
- Avoid corporate speak and generic platitudes
- Match the user's natural voice and tone
- Never use unnecessary hashtags or emoji spam

You help creators who are better at building than copywriting.`;
```

### Step 2: Add HSO Prompt Templates

Add these specific prompt templates for different content types:

```typescript
export const HSO_TEMPLATES = {
  twitter: {
    hook: [
      "Bold claim: '[Stat/outcome] in [timeframe]'",
      "Curiosity gap: 'Most people don't know...'",
      "Pattern interrupt: 'Stop doing [X]. Here's why:'",
      "Contrast: 'Everyone says [X]. I did [opposite].'",
    ],
    story: [
      "Personal transformation: 'I used to [struggle]. Then [insight]. Now [result].'",
      "Contrarian take: 'The advice you hear is wrong. Here's what actually works:'",
      "Behind-the-scenes: 'Here's what nobody tells you about [topic]:'",
    ],
    offer: [
      "Thread continuation: 'Full breakdown in thread below 🧵'",
      "Engagement ask: 'What's your take? Reply below.'",
      "Scarcity: 'Spots limited. DM 'interested' if you want in.'",
    ],
  },
  
  linkedin: {
    hook: [
      "Shocking decision: 'We [counterintuitive action]. Here's why:'",
      "Vulnerable admission: 'I failed at [X] for [Y] years. Then this changed everything:'",
      "Surprising data: '[Stat] that proves [assumption] is wrong'",
    ],
    story: [
      "Case study: 'Client came to us with [problem]. We tried [A, B, C]. Only [C] worked. Here's the lesson:'",
      "Journey: 'When we started: [before state]. After [timeframe]: [after state]. The shift happened when:'",
      "Framework: 'I've distilled [X years] into [Y steps]. Here's the playbook:'",
    ],
    offer: [
      "Lesson: 'Key takeaway: [insight]. Try [specific action].'",
      "Connection: 'Seen this in your company? I'd love to hear how you approached it.'",
      "Resource: 'Want the full framework? I wrote a detailed guide: [link]'",
    ],
  },
};
```

### Step 3: Update Thread Generation

Enhance your thread prompt in `lib/prompts.ts`:

```typescript
export const THREAD_GENERATION_PROMPT = `${BASE_SYSTEM_PROMPT}

Task: Generate an engaging X/Twitter thread using Hook-Story-Offer framework

HOOK TWEET (Tweet 1): 
- Start with bold claim, surprising stat, or provocative question
- Create massive curiosity gap
- Use pattern interrupts: "Stop [doing X]" / "Everyone says [X] is [Y]. They're wrong."
- Make scrolling past impossible
- Emotion: Trigger desire, fear, or curiosity

Examples of killer hooks:
❌ "Here are 5 tips for better productivity"
✅ "I wasted 2 years on productivity hacks. Then I deleted them all and 10x'd my output. Here's what actually works:"

❌ "Marketing is important for startups"
✅ "We spent $0 on ads and hit $1M ARR in 8 months. Every startup can do this. Thread:"

STORY TWEETS (Tweets 2-6):
- Provide REAL value (frameworks, tactics, lessons)
- Mix personal story with actionable insights
- Use specific numbers and examples
- Create mini-hooks within thread ("But here's the twist:")
- Logic: Back up claims with reasoning
- Each tweet = 1 clear idea

Value Delivery:
- Tweet 2: Set up the problem/context
- Tweets 3-5: Deliver main insights (numbered if framework)
- Tweet 6: Transition to conclusion

OFFER TWEET (Final Tweet):
- Summarize key takeaway
- Create urgency/scarcity: "Limited spots" / "Ends Friday" / "Only offering this to first 50"
- Or engagement CTA: "Biggest mistake you made? Reply below."
- Or social proof: "This took me [X years] to learn. Save yourself the time."
- Make it memorable and retweetable

URGENCY/SCARCITY (when appropriate):
- Time-based: "Offer ends Sunday" / "Only available this week"
- Quantity-based: "First 100 people only" / "Limited to 50 spots"
- Exclusivity: "Won't repeat this" / "Sharing this once"

Thread Structure Example:

1/7 🧵 I made $50K last month from a landing page I built in 2 hours.

The secret? I stopped trying to be clever. Started being clear.

Here's the exact framework:

2/7 Most landing pages fail because they're optimized for the wrong thing.

Beautiful design? ✅
Clever copy? ✅  
Sales? ❌

The problem: You're selling features. People buy outcomes.

3/7 The Framework (OUTCOME-DRIVEN COPY):

1. Hero section: The transformation (not the product)
2. Pain section: The cost of inaction  
3. Solution section: The bridge (how you get them there)
4. Proof section: Social proof that it works

Skip the fluff. This is all you need.

[Continue building value in tweets 4-6...]

7/7 Used this framework on 50+ landing pages now. 

Conversion rate went from 1.2% to 8.3% average.

Template drops tomorrow. Limited to first 100 people.

Want it? Drop a 🔥 below.

Rules:
- Each tweet under 280 characters
- Use numbers/frameworks when explaining
- Create urgency in final tweet (if appropriate)
- Every tweet must add value
- Balance emotion + logic throughout`;
```

---

## 📊 Making Output High-Standard

### Quality Checkpoints:

Add these to your validation in `lib/prompts.ts`:

```typescript
export function validateHighStandard(text: string): {
  score: number; // 0-100
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check for weak hooks
  const weakHooks = ['Here are', 'Today I want to', 'Let me share', 'I think that'];
  if (weakHooks.some(phrase => text.toLowerCase().startsWith(phrase.toLowerCase()))) {
    issues.push('Weak hook - doesn\'t grab attention');
    score -= 20;
    suggestions.push('Start with bold claim, question, or surprising fact');
  }

  // Check for value
  const hasNumbers = /\d+/.test(text);
  const hasFramework = /\d+\s*(steps?|ways?|tips?|rules?|principles?)/i.test(text);
  if (!hasNumbers && !hasFramework) {
    issues.push('No specific value - too vague');
    score -= 15;
    suggestions.push('Add numbered framework or specific examples');
  }

  // Check for CTA/payoff
  const hasCTA = /(reply|comment|share|click|grab|get|join|follow|save this)/i.test(text);
  const hasPayoff = /(lesson|takeaway|key point|remember|tip)/i.test(text);
  if (!hasCTA && !hasPayoff) {
    issues.push('Missing clear CTA or takeaway');
    score -= 10;
    suggestions.push('End with clear action or lesson');
  }

  // Check for AI phrases
  const aiPhrases = ['delve', 'landscape', 'tapestry', 'leverage', 'unpack'];
  const foundAI = aiPhrases.filter(phrase => text.toLowerCase().includes(phrase));
  if (foundAI.length > 0) {
    issues.push(`AI-typical language: ${foundAI.join(', ')}`);
    score -= 20;
    suggestions.push('Rewrite in more natural, conversational language');
  }

  // Check for specificity
  const vague = ['some', 'many', 'often', 'usually', 'sometimes'];
  const vagueness = vague.filter(word => new RegExp(`\\b${word}\\b`, 'i').test(text));
  if (vagueness.length > 2) {
    issues.push('Too vague - lacks specificity');
    score -= 10;
    suggestions.push('Replace vague words with specific numbers or examples');
  }

  return { score, issues, suggestions };
}
```

---

## 🔧 How to Make Changes

### 1. Quick Tweaks (No Code):
Edit the text in `lib/prompts.ts`:
- Adjust tone descriptions
- Add/remove examples
- Change temperature (creativity level)
- Modify platform guidelines

### 2. Add New Framework:
```typescript
// In lib/prompts.ts, add new section:
export const YOUR_FRAMEWORK = `
[Your framework description]
`;

// Then include it in BASE_SYSTEM_PROMPT:
export const BASE_SYSTEM_PROMPT = `
${YOUR_FRAMEWORK}
${CONVERSION_FRAMEWORKS}
...
`;
```

### 3. Create Custom Tone:
```typescript
// Add to TONE_CONFIGS object:
yourToneName: {
  name: 'Your Tone Name',
  systemPrompt: `${BASE_SYSTEM_PROMPT}
  
  Your specific instructions here...`,
  examples: [
    "Example 1",
    "Example 2",
  ],
  temperature: 0.7, // 0.1-1.0 (lower = more focused, higher = more creative)
}
```

### 4. Test Changes:
```bash
# After editing lib/prompts.ts:
npm run build

# Then test in dashboard
# Go to /dashboard/generate and try generating content
```

---

## 💡 Pro Tips for High-Standard Output

### 1. Temperature Settings:
- `0.5-0.6`: Data-driven, factual content (Professional, Educational)
- `0.7-0.8`: Balanced creativity (Casual, Inspirational, Conversion)
- `0.8-0.9`: High creativity (Humorous, Experimental)

### 2. Prompt Engineering:
```typescript
// ❌ Vague:
"Write a good post about productivity"

// ✅ Specific:
"Write a Twitter post using Hook-Story-Offer:
Hook: Surprising stat about productivity myths
Story: Personal experience trying 50 systems
Offer: The one system that worked, with urgency"
```

### 3. Example Quality:
Your examples TEACH the AI. Compare:

```typescript
// ❌ Generic example:
"Here are 5 productivity tips for entrepreneurs"

// ✅ High-standard example:
"I tested 47 productivity systems in 2 years. 46 failed. 
The 1 that worked? I stopped trying to do more. Started doing less, better. 
Went from 60hr weeks with zero progress to 30hr weeks hitting every goal. 
Framework in thread 🧵"
```

---

## 🚀 Quick Implementation Checklist

- [ ] Add `CONVERSION_FRAMEWORKS` to base prompt
- [ ] Create "Conversion" tone config
- [ ] Enhance thread generation with HSO
- [ ] Add `HSO_TEMPLATES` for platform-specific hooks
- [ ] Update validation to check for hooks, value, CTAs
- [ ] Test with real generations
- [ ] Iterate based on output quality

---

## 📝 Summary

**Current System:**
- Base prompt + Tone + Platform + User voice
- Temperature controls creativity
- Post-processing removes AI artifacts

**Your Improvements:**
- Add Hook-Story-Offer framework to ALL tones
- Enforce "Provide Value" in every generation
- Build in Emotion-Logic-Urgency layers
- Create platform-specific HSO templates
- Add quality validation for standards

**Implementation:**
1. Edit `lib/prompts.ts` (system prompts)
2. Add frameworks to `BASE_SYSTEM_PROMPT`
3. Create "Conversion" tone or enhance existing tones
4. Test and iterate

The AI will be as good as the instructions you give it. Your frameworks will make the output significantly more conversion-focused and valuable!
