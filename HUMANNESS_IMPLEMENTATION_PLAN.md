# Humanness System Implementation Plan

> **Created:** January 24, 2026  
> **Status:** Planning Phase  
> **Priority:** HIGH - Game-changing feature

---

## 🎯 Executive Summary

Implementing a **Humanness Scale System** to make AI-generated content undetectable by LinkedIn/platform algorithms. This addresses the #1 user concern: "Does this sound like AI?"

**Key Features:**
1. **Humanness Slider** - 4 levels from corporate to texting
2. **AI Detection Risk Checker** - Score content before posting
3. **"Make More Human" Button** - One-click improvement
4. **Multi-Variant Generation** - 3 versions at different humanness levels

**Marketing Impact:**
- **From:** "AI-powered social media generator"
- **To:** "The only AI tool that won't get you shadowbanned"

---

## 📊 Current System Analysis

### ✅ What We Have
- 5 tone presets (Professional, Casual, Humorous, Inspirational, Educational)
- Temperature configs (0.6-0.8)
- Voice profile matching
- AI phrase blacklist
- Basic content validation

### ❌ What's Missing
- **No humanness control** - Tone ≠ How Human It Sounds
- **No detection risk scoring** - Can't measure AI likelihood
- **No one-click humanizer** - Users stuck with first output
- **No variant comparison** - All 3 variations at same humanness level

---

## 🏗️ Architecture Design

### 1. Humanness Levels System

```typescript
// lib/prompts.ts - NEW CONSTANT

export const HUMANNESS_LEVELS = {
  'corporate_polished': {
    level: 1,
    temperature: 0.3,
    description: '🤖 Corporate & Polished',
    detectionRisk: 'HIGH',
    characteristics: [
      'Sophisticated vocabulary',
      'Perfect grammar',
      'No contractions',
      'Formal punctuation'
    ],
    instructions: `
Write in a professional, polished tone.
Use sophisticated vocabulary appropriately.
Complete sentences, proper grammar.
Sound like a business publication.
NO contractions, NO casual language.
Use formal transitions and structure.
    `
  },
  
  'professional_authentic': {
    level: 2,
    temperature: 0.7,
    description: '💼 Professional but Real',
    detectionRisk: 'MEDIUM',
    characteristics: [
      'Mixed vocabulary',
      'Some contractions',
      'Varied sentence length',
      'Personal touches'
    ],
    instructions: `
Write conversationally but professionally.
Mix simple and sophisticated words naturally.
USE contractions (I'm, you're, it's).
Vary sentence length (short and long).
Start sentences with "And" or "But" if natural.
Sound like a smart person, not a press release.
Include personal markers: "I've found", "in my experience"
NO em-dashes or semicolons.
    `
  },
  
  'casual_authentic': {
    level: 3,
    temperature: 0.8,
    description: '💬 Casual & Authentic',
    detectionRisk: 'LOW',
    characteristics: [
      'Everyday words',
      'Frequent contractions',
      'Sentence fragments OK',
      'Occasional casual markers'
    ],
    instructions: `
Write casually but not unprofessionally.
Simple everyday words only.
Contractions are natural and frequent.
Fragments okay if natural.
Use sparingly: honestly, actually, literally
Can use "lol" or "idk" if context fits.
Sound like explaining to a friend over coffee.
NO sophisticated vocabulary.
NO perfect parallel structure.
    `
  },
  
  'texting_friend': {
    level: 4,
    temperature: 0.9,
    description: '🗣️ Like Texting',
    detectionRisk: 'MINIMAL',
    characteristics: [
      'Very simple words',
      'Lowercase "i" sometimes',
      'Internet shorthand OK',
      'Intentional imperfections'
    ],
    instructions: `
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
    `
  }
}

export type HumannessLevel = keyof typeof HUMANNESS_LEVELS;
```

---

### 2. AI Detection Risk Checker

```typescript
// lib/validation.ts - NEW FUNCTION

export interface AIDetectionResult {
  riskScore: number;              // 0-100
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH';
  flags: string[];                // What triggered detection
  recommendations: string[];       // How to fix
  passed: boolean;                 // Score < 40
  metrics: {
    avgSentenceLength: number;
    hasPersonalPronouns: boolean;
    hasContractions: boolean;
    aiBuzzwordCount: number;
    complexPunctuation: boolean;
  };
}

export function checkAIDetectionRisk(content: string): AIDetectionResult {
  let riskScore = 0;
  const flags: string[] = [];
  const recommendations: string[] = [];
  
  // METRIC 1: AI Buzzwords (15 points each)
  const aiBuzzwords = [
    'delve', 'tapestry', 'leverage', 'dive deep', 'unpack', 
    'landscape', 'paradigm', 'synergy', 'robust', 'comprehensive',
    'innovative', 'cutting-edge', 'revolutionary', 'game-changer',
    'unlock', 'harness', 'seamless', 'elevate', 'transform',
    'optimize', 'streamline', 'empower', 'dynamic'
  ];
  
  let buzzwordCount = 0;
  aiBuzzwords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      buzzwordCount += matches.length;
      riskScore += 15 * matches.length;
      flags.push(`❌ AI buzzword: "${word}" (${matches.length}x)`);
      recommendations.push(`Replace "${word}" with simpler alternative`);
    }
  });
  
  // METRIC 2: Sentence Length (20 points if too long)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  
  if (avgLength > 25) {
    riskScore += 20;
    flags.push(`⚠️ Long sentences (avg ${avgLength.toFixed(1)} words)`);
    recommendations.push('Break up long sentences into shorter ones');
  } else if (avgLength > 20) {
    riskScore += 10;
    flags.push(`⚠️ Slightly long sentences (avg ${avgLength.toFixed(1)} words)`);
  }
  
  // METRIC 3: Personal Pronouns (25 points if missing)
  const personalWords = ['I', "I'm", "I've", "I'll", 'my', 'me', 'we', "we're", 'our'];
  const hasPersonal = personalWords.some(word => 
    new RegExp(`\\b${word}\\b`, 'i').test(content)
  );
  
  if (!hasPersonal) {
    riskScore += 25;
    flags.push('❌ No personal pronouns (sounds robotic)');
    recommendations.push("Add 'I', 'my', 'we', or personal experiences");
  }
  
  // METRIC 4: Contractions (15 points if missing)
  const contractions = ["'m", "'re", "'ve", "'ll", "n't", "'d"];
  const hasContractions = contractions.some(c => content.includes(c));
  
  if (!hasContractions) {
    riskScore += 15;
    flags.push('❌ No contractions (too formal)');
    recommendations.push("Use I'm, you're, it's, don't, can't");
  }
  
  // METRIC 5: Complex Punctuation (10 points)
  const hasComplexPunctuation = content.includes('—') || 
                                 content.includes(';') || 
                                 content.includes(':') && content.split(':').length > 2;
  
  if (hasComplexPunctuation) {
    riskScore += 10;
    flags.push('⚠️ Overly formal punctuation (em-dashes, semicolons)');
    recommendations.push('Use simple periods, commas, and occasional dashes');
  }
  
  // METRIC 6: Perfect Parallel Structure (AI tell)
  const bulletPoints = content.match(/^[-•*]\s/gm);
  if (bulletPoints && bulletPoints.length >= 3) {
    const lines = content.split('\n').filter(l => l.match(/^[-•*]\s/));
    const allSameLength = lines.every(l => Math.abs(l.length - lines[0].length) < 10);
    
    if (allSameLength) {
      riskScore += 15;
      flags.push('⚠️ Perfect parallel structure (AI pattern)');
      recommendations.push('Vary bullet point length and structure');
    }
  }
  
  // METRIC 7: Opening/Closing Patterns
  const weakOpenings = [
    'Here are', 'Let me', 'Today I want', 'In this post',
    'Welcome to', "I'm excited to", 'Join me'
  ];
  
  weakOpenings.forEach(opening => {
    if (content.toLowerCase().startsWith(opening.toLowerCase())) {
      riskScore += 10;
      flags.push(`⚠️ Generic opening: "${opening}"`);
      recommendations.push('Start with a hook, question, or bold statement');
    }
  });
  
  // METRIC 8: Overly Enthusiastic (AI tell)
  const exclamationCount = (content.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    riskScore += 5;
    flags.push('⚠️ Excessive exclamation marks');
    recommendations.push('Use exclamation marks sparingly');
  }
  
  // Calculate risk level
  let riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH';
  if (riskScore >= 60) riskLevel = 'HIGH';
  else if (riskScore >= 40) riskLevel = 'MEDIUM';
  else if (riskScore >= 20) riskLevel = 'LOW';
  else riskLevel = 'MINIMAL';
  
  return {
    riskScore: Math.min(riskScore, 100), // Cap at 100
    riskLevel,
    flags,
    recommendations: [...new Set(recommendations)], // Remove duplicates
    passed: riskScore < 40,
    metrics: {
      avgSentenceLength: parseFloat(avgLength.toFixed(1)),
      hasPersonalPronouns: hasPersonal,
      hasContractions: hasContractions,
      aiBuzzwordCount: buzzwordCount,
      complexPunctuation: hasComplexPunctuation
    }
  };
}

// Helper for displaying risk badge
export function getRiskBadge(riskLevel: string): string {
  const badges = {
    'MINIMAL': '🟢',
    'LOW': '🟢',
    'MEDIUM': '🟡',
    'HIGH': '🔴'
  };
  return badges[riskLevel] || '⚪';
}

export function getRiskColor(riskLevel: string): string {
  const colors = {
    'MINIMAL': 'green',
    'LOW': 'green',
    'MEDIUM': 'yellow',
    'HIGH': 'red'
  };
  return colors[riskLevel] || 'gray';
}
```

---

### 3. Make More Human Function

```typescript
// lib/claude.ts - NEW FUNCTION

export async function humanizeContent(
  content: string,
  currentTone: Tone,
  platform: Platform,
  voiceProfile?: VoiceProfile | null
): Promise<{
  humanized: string;
  before: AIDetectionResult;
  after: AIDetectionResult;
  improvements: string[];
}> {
  
  const beforeScore = checkAIDetectionRisk(content);
  
  const humanizePrompt = `
You are an expert at making AI-generated content sound authentically human.

ORIGINAL CONTENT:
${content}

CURRENT SETTINGS:
- Tone: ${currentTone}
- Platform: ${platform}
- Character Limit: ${PLATFORM_CONFIGS[platform].maxChars}

${voiceProfile ? `
USER'S VOICE PROFILE:
- Sarcasm level: ${voiceProfile.sarcasmLevel}%
- Tired/burnout vibes: ${voiceProfile.tiredLevel}%
- Signature words: ${voiceProfile.favoriteWords.join(', ')}
- Average sentence length: ${voiceProfile.avgLength} words
` : ''}

YOUR MISSION: Make this sound like a real person wrote it quickly, not an AI.

APPLY THESE CHANGES:

1. **Simplify Vocabulary** (Critical)
   - Replace: leverage → use, robust → strong, comprehensive → complete
   - Replace: delve → explore, tapestry → mix, paradigm → model
   - Use everyday words a friend would use

2. **Add Casual Elements**
   - Use contractions naturally: I'm, you're, it's, don't, can't
   - Can add occasional fillers: honestly, actually, tbh (sparingly)
   - Lowercase 'i' once or twice if it feels natural
   - Can use "idk", "lol" if tone allows

3. **Create Natural Imperfections**
   - Vary sentence rhythm dramatically (mix 5-word and 20-word sentences)
   - Use fragments where they'd naturally occur
   - Can trail off with ... if appropriate
   - Break "perfect" parallel structure in lists
   - Remove overly polished transitions

4. **Fix AI Tells**
   - Cut all AI buzzwords completely
   - Remove formal punctuation (em-dashes, semicolons)
   - Eliminate perfect parallel structure
   - NO generic openings ("Here are...", "Let me...")
   - Reduce exclamation marks to 1-2 max

5. **Add Authenticity**
   - Include personal pronouns (I, my, we)
   - Can admit uncertainty: "I think", "maybe", "probably"
   - Sound typed quickly, not carefully edited
   - Personal voice over corporate voice
   - Can be slightly imperfect (it's humanizing)

6. **Maintain Quality**
   - Keep the core message intact
   - Preserve the framework structure (Hook-Story-Offer)
   - Same value proposition
   - Just change HOW it's said, not WHAT

CRITICAL RULES:
- Character limit: ${PLATFORM_CONFIGS[platform].maxChars} (strict)
- Keep the same tone essence (${currentTone})
- Don't lose the conversion elements
- Sound like someone typing to their audience, not a bot

OUTPUT: Return ONLY the rewritten content, nothing else.
`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    temperature: 0.9, // High temp for natural variation
    messages: [{
      role: 'user',
      content: humanizePrompt
    }]
  });

  const humanized = response.content[0].text.trim();
  const afterScore = checkAIDetectionRisk(humanized);
  
  // Calculate improvements
  const improvements: string[] = [];
  
  if (afterScore.riskScore < beforeScore.riskScore) {
    const improvement = beforeScore.riskScore - afterScore.riskScore;
    improvements.push(`Risk score reduced by ${improvement} points`);
  }
  
  if (!beforeScore.metrics.hasPersonalPronouns && afterScore.metrics.hasPersonalPronouns) {
    improvements.push('Added personal pronouns');
  }
  
  if (!beforeScore.metrics.hasContractions && afterScore.metrics.hasContractions) {
    improvements.push('Added contractions');
  }
  
  if (beforeScore.metrics.aiBuzzwordCount > afterScore.metrics.aiBuzzwordCount) {
    improvements.push(`Removed ${beforeScore.metrics.aiBuzzwordCount - afterScore.metrics.aiBuzzwordCount} AI buzzwords`);
  }
  
  if (beforeScore.metrics.avgSentenceLength > afterScore.metrics.avgSentenceLength + 3) {
    improvements.push('Shortened average sentence length');
  }
  
  return {
    humanized,
    before: beforeScore,
    after: afterScore,
    improvements
  };
}
```

---

### 4. Updated generatePosts Function

```typescript
// lib/claude.ts - MODIFY EXISTING

export async function generatePosts(
  input: string,
  platform: Platform,
  tone: Tone,
  humanness?: HumannessLevel,
  voiceProfile?: VoiceProfile | null,
  multiHumanness: boolean = false
): Promise<Array<{
  content: string;
  humanness?: string;
  aiDetection: AIDetectionResult;
}>> {
  
  // MULTI-HUMANNESS MODE: Generate 3 versions at different levels
  if (multiHumanness) {
    const levels: HumannessLevel[] = [
      'professional_authentic',
      'casual_authentic',
      'texting_friend'
    ];
    
    const results = await Promise.all(
      levels.map(async (level) => {
        const systemPrompt = buildSystemPrompt({
          input,
          platform,
          tone,
          humanness: level,
          voiceProfile
        });
        
        const humannessConfig = HUMANNESS_LEVELS[level];
        
        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: getMaxTokensForPlatform(platform),
          temperature: humannessConfig.temperature,
          system: [{
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' }
          }],
          messages: [{
            role: 'user',
            content: input
          }]
        });
        
        const content = response.content[0].text.trim();
        const aiDetection = checkAIDetectionRisk(content);
        
        return {
          content,
          humanness: humannessConfig.description,
          aiDetection
        };
      })
    );
    
    return results;
  }
  
  // STANDARD MODE: Generate 3 variations at same humanness level
  const systemPrompt = buildSystemPrompt({
    input,
    platform,
    tone,
    humanness,
    voiceProfile
  });
  
  const temperature = humanness 
    ? HUMANNESS_LEVELS[humanness].temperature 
    : TONE_CONFIGS[tone].temperature;
  
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: getMaxTokensForPlatform(platform),
    temperature,
    system: [{
      type: 'text',
      text: systemPrompt,
      cache_control: { type: 'ephemeral' }
    }],
    messages: [{
      role: 'user',
      content: `Generate 3 unique variations of posts for:\n\n${input}`
    }]
  });
  
  const variations = parseVariations(response.content[0].text);
  
  return variations.map(content => ({
    content,
    humanness: humanness ? HUMANNESS_LEVELS[humanness].description : undefined,
    aiDetection: checkAIDetectionRisk(content)
  }));
}

// Helper function
function buildSystemPrompt(params: {
  input: string;
  platform: Platform;
  tone: Tone;
  humanness?: HumannessLevel;
  voiceProfile?: VoiceProfile | null;
}): string {
  const { platform, tone, humanness, voiceProfile } = params;
  
  let systemPrompt = BASE_SYSTEM_PROMPT;
  systemPrompt += CONVERSION_FRAMEWORKS;
  systemPrompt += TONE_CONFIGS[tone].prompt;
  
  // ADD HUMANNESS LAYER (if specified)
  if (humanness) {
    const config = HUMANNESS_LEVELS[humanness];
    systemPrompt += `\n\n## HUMANNESS LEVEL: ${config.description}\n\n`;
    systemPrompt += `**Detection Risk Target:** ${config.detectionRisk}\n\n`;
    systemPrompt += config.instructions;
  }
  
  // ADD PLATFORM GUIDELINES
  systemPrompt += `\n\n## PLATFORM: ${platform.toUpperCase()}\n\n`;
  systemPrompt += `- Max Characters: ${PLATFORM_CONFIGS[platform].maxChars}\n`;
  systemPrompt += `- Style: ${PLATFORM_CONFIGS[platform].style}\n`;
  systemPrompt += `- Format: ${PLATFORM_CONFIGS[platform].format}\n`;
  
  // ADD VOICE PROFILE (if available)
  if (voiceProfile) {
    systemPrompt += formatVoiceProfile(voiceProfile);
  }
  
  return systemPrompt;
}
```

---

## 🔌 API Endpoints

### 1. Update POST /api/generate

```typescript
// app/api/generate/route.ts - MODIFY

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  const { 
    input, 
    platform, 
    tone, 
    humanness,           // NEW
    multiHumanness       // NEW
  } = body;

  // Validation
  const validation = validateGenerateInput(input, platform, tone);
  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Usage check
  const canGenerate = await canUserGeneratePost(userId);
  if (!canGenerate) {
    return NextResponse.json({ 
      error: 'Generation limit reached' 
    }, { status: 429 });
  }

  // Get voice profile
  const voiceProfile = await prisma.voiceProfile.findUnique({
    where: { userId }
  });

  // Generate posts
  const results = await generatePosts(
    input,
    platform,
    tone,
    humanness,
    voiceProfile,
    multiHumanness
  );

  // Track usage
  await trackPostGeneration(userId, 'generate');

  return NextResponse.json({
    variations: results,
    metadata: {
      timestamp: new Date().toISOString(),
      platform,
      tone,
      humanness: humanness || 'default',
      multiHumanness
    }
  });
}
```

---

### 2. Create POST /api/humanize

```typescript
// app/api/humanize/route.ts - NEW FILE

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { humanizeContent } from '@/lib/claude';
import { prisma } from '@/lib/prisma';
import type { Tone, Platform } from '@/types';

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { content, tone, platform } = body;

    if (!content || !tone || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: content, tone, platform' },
        { status: 400 }
      );
    }

    // Get voice profile for better humanization
    const voiceProfile = await prisma.voiceProfile.findUnique({
      where: { userId }
    });

    // Humanize the content
    const result = await humanizeContent(
      content,
      tone as Tone,
      platform as Platform,
      voiceProfile
    );

    return NextResponse.json({
      success: true,
      original: content,
      humanized: result.humanized,
      before: result.before,
      after: result.after,
      improvements: result.improvements,
      riskReduction: result.before.riskScore - result.after.riskScore
    });
    
  } catch (error) {
    console.error('Humanize error:', error);
    return NextResponse.json(
      { error: 'Failed to humanize content' },
      { status: 500 }
    );
  }
}
```

---

## 📦 Type Definitions

```typescript
// types/index.ts - ADD THESE

export type HumannessLevel = 
  | 'corporate_polished'
  | 'professional_authentic'
  | 'casual_authentic'
  | 'texting_friend';

export interface AIDetectionResult {
  riskScore: number;
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH';
  flags: string[];
  recommendations: string[];
  passed: boolean;
  metrics: {
    avgSentenceLength: number;
    hasPersonalPronouns: boolean;
    hasContractions: boolean;
    aiBuzzwordCount: number;
    complexPunctuation: boolean;
  };
}

export interface HumanizedResult {
  humanized: string;
  before: AIDetectionResult;
  after: AIDetectionResult;
  improvements: string[];
}

export interface GenerationResult {
  content: string;
  humanness?: string;
  aiDetection: AIDetectionResult;
}
```

---

## 📋 Implementation Checklist

### Phase 1: Core Humanness System (Priority: CRITICAL)
**Estimated Time:** 2-3 days

- [ ] **1.1** Add `HUMANNESS_LEVELS` constant to `lib/prompts.ts`
- [ ] **1.2** Create `HumannessLevel` type in `types/index.ts`
- [ ] **1.3** Update `generatePosts()` signature to accept `humanness` parameter
- [ ] **1.4** Update `generateThread()` signature to accept `humanness` parameter
- [ ] **1.5** Update `generateReplies()` signature to accept `humanness` parameter
- [ ] **1.6** Create `buildSystemPrompt()` helper function
- [ ] **1.7** Implement humanness layer in prompt building
- [ ] **1.8** Test each humanness level outputs correctly
- [ ] **1.9** Verify temperature adjustments work as expected

**Success Criteria:**
- Generating same input at different humanness levels produces distinctly different outputs
- Corporate sounds formal, Texting sounds casual
- Temperature ranges correctly applied (0.3 → 0.9)

---

### Phase 2: AI Detection System (Priority: CRITICAL)
**Estimated Time:** 1-2 days

- [ ] **2.1** Create `AIDetectionResult` interface in `types/index.ts`
- [ ] **2.2** Implement `checkAIDetectionRisk()` in `lib/validation.ts`
- [ ] **2.3** Add all 8 detection metrics:
  - [ ] AI buzzword detection
  - [ ] Sentence length analysis
  - [ ] Personal pronoun check
  - [ ] Contraction detection
  - [ ] Complex punctuation check
  - [ ] Parallel structure detection
  - [ ] Generic opening detection
  - [ ] Exclamation mark analysis
- [ ] **2.4** Create `getRiskBadge()` and `getRiskColor()` helpers
- [ ] **2.5** Modify `/api/generate` to include detection scores
- [ ] **2.6** Modify `/api/thread` to include detection scores
- [ ] **2.7** Modify `/api/reply` to include detection scores
- [ ] **2.8** Test detection accuracy with known AI/human content
- [ ] **2.9** Calibrate risk thresholds (20/40/60)

**Success Criteria:**
- ChatGPT output scores HIGH risk (60+)
- Human-written posts score LOW/MINIMAL (0-20)
- Flags correctly identify specific issues
- Recommendations are actionable

---

### Phase 3: Make More Human Feature (Priority: HIGH)
**Estimated Time:** 2 days

- [ ] **3.1** Create `HumanizedResult` interface in `types/index.ts`
- [ ] **3.2** Implement `humanizeContent()` in `lib/claude.ts`
- [ ] **3.3** Build comprehensive humanization prompt
- [ ] **3.4** Create `/api/humanize` endpoint
- [ ] **3.5** Add before/after comparison logic
- [ ] **3.6** Calculate improvement metrics
- [ ] **3.7** Test with high-risk AI content
- [ ] **3.8** Verify risk score actually decreases
- [ ] **3.9** Ensure character limits are respected

**Success Criteria:**
- Risk score reduces by 15-30 points on average
- Content retains core message
- Tone essence is preserved
- Character limits never exceeded

---

### Phase 4: Multi-Humanness Generation (Priority: MEDIUM)
**Estimated Time:** 1 day

- [ ] **4.1** Add `multiHumanness` parameter to `generatePosts()`
- [ ] **4.2** Implement parallel generation at 3 levels
- [ ] **4.3** Update API response structure for variants
- [ ] **4.4** Add humanness labels to each variant
- [ ] **4.5** Include AI detection for all variants
- [ ] **4.6** Test generation time (should be ~same as regular)
- [ ] **4.7** Verify all 3 variants are distinct

**Success Criteria:**
- Professional variant scores MEDIUM risk (40-60)
- Casual variant scores LOW risk (20-40)
- Texting variant scores MINIMAL risk (0-20)
- Generation completes in <10 seconds

---

### Phase 5: Apply to All Features (Priority: HIGH)
**Estimated Time:** 2 days

- [ ] **5.1** Update `/api/thread` to support humanness
- [ ] **5.2** Update `/api/reply` to support humanness
- [ ] **5.3** Update `/api/caption` to support humanness
- [ ] **5.4** Update `/api/video-script` to support humanness
- [ ] **5.5** Add AI detection to all endpoints
- [ ] **5.6** Test humanness consistency across features
- [ ] **5.7** Ensure character limits per feature

**Success Criteria:**
- All 6 core features support humanness parameter
- AI detection works for all content types
- Humanness levels behave consistently

---

### Phase 6: Documentation (Priority: MEDIUM)
**Estimated Time:** 1 day

- [ ] **6.1** Update `SYSTEM_PROMPTS_DOCUMENTATION.md`
  - [ ] Add Humanness Levels section
  - [ ] Add AI Detection System section
  - [ ] Add Make More Human section
  - [ ] Add Multi-Humanness section
  - [ ] Update all API examples
- [ ] **6.2** Create `HUMANNESS_GUIDE.md` for users
- [ ] **6.3** Update `README.md` with new features
- [ ] **6.4** Add inline code documentation
- [ ] **6.5** Create changelog entry

**Success Criteria:**
- Technical team understands implementation
- Users understand how to use features
- Marketing has clear feature descriptions

---

### Phase 7: Testing & QA (Priority: CRITICAL)
**Estimated Time:** 2-3 days

- [ ] **7.1** Create test suite for humanness levels
- [ ] **7.2** Create test suite for AI detection
- [ ] **7.3** Test with real LinkedIn posts
- [ ] **7.4** A/B test detection accuracy
- [ ] **7.5** Test edge cases (very short/long content)
- [ ] **7.6** Load test parallel humanness generation
- [ ] **7.7** Test voice profile integration
- [ ] **7.8** User acceptance testing
- [ ] **7.9** Fix critical bugs

**Test Cases:**
```typescript
// Example test cases
describe('Humanness System', () => {
  test('Corporate level has no contractions', () => {
    const result = generate(input, 'corporate_polished');
    expect(result).not.toMatch(/'m|'re|'ve|'ll|n't/);
  });
  
  test('Texting level uses casual markers', () => {
    const result = generate(input, 'texting_friend');
    expect(result).toMatch(/\b(idk|lol|tbh|honestly)\b/);
  });
  
  test('AI detection flags buzzwords', () => {
    const content = "Let's delve into this robust landscape";
    const result = checkAIDetectionRisk(content);
    expect(result.riskScore).toBeGreaterThan(40);
    expect(result.flags).toContain('delve');
  });
  
  test('Humanize reduces risk score', () => {
    const aiContent = "Let's leverage this comprehensive solution";
    const result = humanizeContent(aiContent);
    expect(result.after.riskScore).toBeLessThan(result.before.riskScore);
  });
});
```

---

## 🎨 UI/UX Changes Needed

### Dashboard Generation Page

**Add these UI elements:**

1. **Humanness Slider** (below tone selector)
```
Humanness Level:
[━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━]
🤖 Corporate  |  💼 Professional  |  💬 Casual  |  🗣️ Texting

Detection Risk: Medium  🟡
```

2. **Multi-Humanness Checkbox**
```
□ Generate 3 variants at different humanness levels
```

3. **AI Detection Badge** (on each variant card)
```
┌─────────────────────────────────────────┐
│ VARIANT 1 - Professional but Real 💼   │
│ AI Detection: 🟢 LOW RISK (Score: 18)  │
│                                         │
│ [post content here]                     │
│                                         │
│ [Copy] [Edit] [Make More Human]        │
│                                         │
│ [Show Details ▼]                        │
└─────────────────────────────────────────┘

When expanded:
┌─────────────────────────────────────────┐
│ Detection Analysis:                     │
│ • ✅ Has personal pronouns              │
│ • ✅ Uses contractions                  │
│ • ⚠️ Slightly long sentences (avg 22)  │
│ • ✅ No AI buzzwords                    │
│                                         │
│ Recommendations:                        │
│ • Break up long sentences               │
└─────────────────────────────────────────┘
```

4. **Make More Human Modal**
```
┌─────────────────────────────────────────┐
│         Making Your Post More Human     │
│                                         │
│ Before: 🟡 MEDIUM RISK (45 points)     │
│ After:  🟢 LOW RISK (18 points)        │
│                                         │
│ Improvements Made:                      │
│ ✅ Risk score reduced by 27 points     │
│ ✅ Added contractions                   │
│ ✅ Removed 3 AI buzzwords               │
│ ✅ Shortened average sentence length    │
│                                         │
│ [View Original] [Use This Version]     │
└─────────────────────────────────────────┘
```

---

## 🚀 Rollout Strategy

### Week 1: Backend Foundation
- Day 1-2: Implement humanness levels system
- Day 3-4: Implement AI detection checker
- Day 5: Testing and bug fixes

### Week 2: Features & API
- Day 1-2: Implement "Make More Human" function
- Day 3: Create /api/humanize endpoint
- Day 4: Apply to all 6 core features
- Day 5: Integration testing

### Week 3: Documentation & Polish
- Day 1: Update all documentation
- Day 2-3: Comprehensive testing
- Day 4: Bug fixes and optimization
- Day 5: User acceptance testing

### Week 4: Launch
- Day 1: Deploy to staging
- Day 2: Final testing
- Day 3: Deploy to production
- Day 4-5: Monitor and iterate

---

## 📈 Success Metrics

**Technical Metrics:**
- AI detection accuracy: >85% correct classification
- Humanize function: Average 20+ point risk reduction
- Generation time: <10 seconds for multi-humanness
- Error rate: <1%

**Business Metrics:**
- User adoption: >60% use humanness slider
- "Make More Human" usage: >40% of generations
- User satisfaction: >4.5/5 rating
- Retention impact: +15% 30-day retention

**Content Quality Metrics:**
- Average risk score: <30 (LOW risk)
- Posts passing detection: >85%
- User-reported shadowbans: <5%

---

## 🔒 Security & Privacy

1. **API Rate Limiting:**
   - Humanize endpoint: 30 requests/minute (higher than generation)
   - Prevents abuse of humanization service

2. **Content Storage:**
   - Don't store humanized content separately
   - Only track usage metrics

3. **Detection Algorithm:**
   - Run client-side where possible
   - Don't send detection logic to client (prevent gaming)

---

## 💰 Cost Implications

**Claude API Costs:**
- Humanness system: No additional cost (same prompts)
- AI detection: Zero cost (runs locally)
- "Make More Human": +1 additional API call per use
  - Estimated: ~500-1000 tokens
  - Cost: ~$0.003 per humanize
  - If 30% of users humanize: +$0.001 per generation

**Infrastructure:**
- No database changes needed (VoiceProfile already exists)
- No additional services
- Minimal compute overhead

**Estimated Monthly Increase:**
- Current: $X/month in Claude costs
- New: +15-20% ($X * 1.20) if 30% use humanize

---

## 🎯 Marketing Updates

**Landing Page Changes:**

**Hero Section:**
```
Before: "AI-Powered Social Media Content Generator"
After:  "The Only AI Tool That Won't Get You Shadowbanned"

Subheading: "LinkedIn suppresses AI content. 
             We make sure they can't tell."
```

**Feature Highlights:**
- ✅ AI Detection Score (know before you post)
- ✅ Humanness Control (sound like you, not ChatGPT)
- ✅ One-Click Humanizer (fix AI tells instantly)
- ✅ Voice Training (match your unique style)

**Social Proof:**
- "My engagement went up 3x after switching to PostContent's humanness slider"
- "LinkedIn finally stopped suppressing my posts"

---

## 📞 Support Documentation

**FAQ Additions:**

**Q: What is the Humanness Level?**
A: It controls how formal vs casual your content sounds. Corporate sounds polished and professional, while Texting sounds like chatting with a friend.

**Q: What's a good AI Detection score?**
A: Aim for LOW (20-40) or MINIMAL (0-20). Scores above 40 may trigger platform detection.

**Q: Should I use "Make More Human" on every post?**
A: Only if your risk score is MEDIUM (40+) or HIGH (60+). LOW and MINIMAL scores are already safe.

**Q: Does humanness change my post's message?**
A: No, it only changes HOW you say it, not WHAT you say. Core message stays the same.

---

## 🔄 Future Enhancements

**Phase 8 (Future):**
- [ ] A/B test humanness levels with real LinkedIn data
- [ ] Platform-specific detection (LinkedIn vs Twitter algorithms)
- [ ] Custom humanness profiles ("Sound like Gary Vee")
- [ ] Real-time detection while typing
- [ ] Browser extension for humanizing any text
- [ ] Integration with LinkedIn posting (auto-humanize)

---

**Maintained by:** PostContent Team  
**Last Updated:** January 24, 2026  
**Status:** Ready for Implementation
