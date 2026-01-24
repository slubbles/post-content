# User Flow Analysis - Generate Feature

## Current Flow (Without Humanness UI)

### 1. User Journey
```
User lands on /dashboard/generate
  ↓
PostGenerator component renders
  ↓
User fills form:
  - Topic/Message (textarea)
  - Platform (Twitter/LinkedIn)
  - Tone (5 options: professional, casual, humorous, inspirational, educational)
  - Number of variants (1-5, default 3)
  ↓
User clicks "Generate Posts"
  ↓
POST /api/generate
  ↓
API Response: { posts: string[] }
  ↓
GeneratedPosts component shows results
  - Each post in a card
  - Copy button
  - Like/Dislike buttons
  - Character count
```

### 2. API Flow (Backend)
```
POST /api/generate receives:
{
  input: string,
  platform: string,
  tone: string,
  humanness?: HumannessLevel,      // NEW - not yet used in UI
  multiHumanness?: boolean          // NEW - not yet used in UI
}
  ↓
Validation:
  - Auth check (session required)
  - Rate limiting (10/min)
  - Usage limits (free: 10/month, pro: 200/month)
  - Input validation (3-5000 chars)
  - Platform validation
  - Tone validation
  - Humanness validation (if provided)
  ↓
Fetch voice profile from database (optional)
  ↓
Branch 1: withDetection (if humanness or multiHumanness)
  generatePostsWithDetection()
    ↓
  Returns: GenerationResult[] with aiDetection scores
    ↓
  Response format:
  {
    variations: [
      {
        content: string,
        humanness: string,
        aiDetection: { riskScore, riskLevel, flags, etc }
      }
    ],
    metadata: { timestamp, platform, tone, humanness, withDetection: true }
  }

Branch 2: Standard (no humanness params)
  generatePosts()
    ↓
  Returns: string[]
    ↓
  Response format:
  {
    posts: string[]
  }
```

### 3. Data Models

**Current API Response (Standard):**
```typescript
{
  posts: string[]
}
```

**New API Response (With Detection):**
```typescript
{
  variations: GenerationResult[]
  metadata: {
    timestamp: string
    platform: string
    tone: string
    humanness: string
    withDetection: boolean
  }
}

interface GenerationResult {
  content: string
  humanness: string  // "💼 Professional but Real"
  aiDetection: AIDetectionResult
}

interface AIDetectionResult {
  riskScore: number              // 0-100
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH'
  passed: boolean                // true if score < 40
  flags: string[]                // ["❌ AI buzzword: \"delve\" (1x)"]
  recommendations: string[]      // ["Replace AI buzzwords..."]
  metrics: {
    avgSentenceLength: number
    hasPersonalPronouns: boolean
    hasContractions: boolean
    aiBuzzwordCount: number
    complexPunctuation: boolean
    perfectParallelStructure: boolean
    genericOpenings: number
    excessiveExclamations: boolean
  }
}
```

### 4. Existing Components

**PostGenerator** (`/components/post-generator.tsx`)
- State management for form inputs
- API call to /api/generate
- Progress bar during generation
- Error handling and retries
- Usage tracking display
- Renders GeneratedPosts when complete

**GeneratedPosts** (`/components/generated-posts.tsx`)
- Displays array of string posts
- Copy to clipboard functionality
- Like/Dislike feedback
- Character count per post
- Currently expects: `string[]`
- **NEEDS UPDATE:** Handle `GenerationResult[]` with detection data

---

## Required Changes for Humanness UI

### New Components to Create

1. **HumannessSlider**
   - Location: `/components/humanness-slider.tsx`
   - Props: `value, onChange, disabled`
   - 4 levels: Corporate (🤖) → Professional (💼) → Casual (💬) → Texting (🗣️)
   - Visual: Slider with emoji markers
   - Shows description on hover/selection

2. **AIDetectionBadge**
   - Location: `/components/ai-detection-badge.tsx`
   - Props: `aiDetection: AIDetectionResult`
   - Displays: Risk level badge (🟢🟡🔴)
   - Shows: Risk score (e.g., "25 - LOW")
   - Clickable to show details

3. **DetectionDetailsTooltip**
   - Location: `/components/detection-details-tooltip.tsx`
   - Props: `aiDetection: AIDetectionResult`
   - Shows: Flags, recommendations, metrics
   - Styled as popover/tooltip

4. **MakeMoreHumanButton**
   - Location: `/components/make-more-human-button.tsx`
   - Props: `content, platform, tone, onHumanized`
   - Calls: POST /api/humanize
   - Shows: Loading state, before/after comparison

5. **MultiHumannessToggle**
   - Location: `/components/multi-humanness-toggle.tsx`
   - Props: `enabled, onChange, disabled`
   - Toggle switch: "Compare 3 humanness levels"

### Component Updates Needed

1. **PostGenerator**
   - Add: HumannessSlider state and component
   - Add: MultiHumannessToggle state and component
   - Update: API call to include humanness params
   - Update: Handle new response format (variations vs posts)
   - Pass detection data to GeneratedPosts

2. **GeneratedPosts**
   - Update: Accept both `string[]` and `GenerationResult[]`
   - Add: AIDetectionBadge to each variant
   - Add: MakeMoreHumanButton to each variant
   - Update: Show humanness label when available
   - Handle: Before/after comparison when humanized

---

## Issues Found & Fixes Needed

### Issue 1: API Response Format Inconsistency ✅ FIXED IN CODE
- **Problem:** API returns different formats based on humanness params
  - Standard: `{ posts: string[] }`
  - Detection: `{ variations: GenerationResult[] }`
- **Impact:** Frontend needs to handle both formats
- **Fix:** PostGenerator should check response format and adapt

### Issue 2: Type Safety Missing
- **Problem:** Frontend doesn't have AIDetectionResult or GenerationResult types
- **Fix:** Create `/types/frontend.ts` with shared types

### Issue 3: Usage Tracking Inconsistency
- **Problem:** Standard mode tracks usage, detection mode doesn't track to database
- **Line:** `app/api/generate/route.ts:145` - Missing trackPostGeneration for detection mode
- **Fix:** Add tracking for detection mode

### Issue 4: Voice Profile Naming Mismatch
- **Problem:** API passes `userVoice` but lib/claude.ts expects `voiceProfile`
- **Line:** `app/api/generate/route.ts:120` vs `lib/claude.ts`
- **Fix:** Check parameter naming consistency

---

## New User Flow (With Humanness)

### Standard Mode (No Humanness Selected)
```
User fills form WITHOUT humanness
  ↓
API returns: { posts: string[] }
  ↓
GeneratedPosts shows posts without detection badges
(Backward compatible with current behavior)
```

### Humanness Mode (Single Level Selected)
```
User fills form + selects humanness level (e.g., "Professional Authentic")
  ↓
API called with: { ..., humanness: "professional_authentic" }
  ↓
API returns: { 
  variations: [
    { content, humanness: "💼 Professional but Real", aiDetection: {...} }
  ],
  metadata: {...}
}
  ↓
GeneratedPosts shows 3 variants with:
  - Detection badge (🟢 25 - LOW)
  - "Make More Human" button
  - Humanness label
```

### Multi-Humanness Mode
```
User fills form + toggles "Compare 3 styles"
  ↓
API called with: { ..., multiHumanness: true }
  ↓
API returns 3 variants at different humanness levels:
  - 💼 Professional but Real (score: 30)
  - 💬 Casual & Authentic (score: 15)
  - 🗣️ Like Texting (score: 5)
  ↓
GeneratedPosts shows side-by-side comparison
User can see which style works best
```

---

## Implementation Order

### Phase 1: Core Components (Tasks 3-7)
1. ✅ Create HumannessSlider
2. ✅ Create AIDetectionBadge
3. ✅ Create DetectionDetailsTooltip
4. ✅ Create MakeMoreHumanButton
5. ✅ Create MultiHumannessToggle

### Phase 2: Integration (Tasks 8-10)
6. Update PostGenerator with humanness controls
7. Update GeneratedPosts to handle detection data
8. Wire up MakeMoreHumanButton to /api/humanize

### Phase 3: Bug Fixes (Task 16)
9. Fix usage tracking for detection mode
10. Fix type safety issues
11. Test error scenarios

### Phase 4: Testing (Tasks 11-15)
12. Create detection accuracy tests
13. Run tests and validate
14. Adjust thresholds if needed
15. End-to-end user flow testing

---

## API Endpoints Summary

### POST /api/generate
**Inputs:** topic, platform, tone, humanness?, multiHumanness?
**Outputs:** 
- Standard: `{ posts: string[] }`
- Detection: `{ variations: GenerationResult[], metadata: {...} }`

### POST /api/humanize
**Inputs:** content, tone, platform
**Outputs:**
```typescript
{
  success: true,
  original: string,
  humanized: string,
  before: AIDetectionResult,
  after: AIDetectionResult,
  improvements: string[],
  riskReduction: number
}
```

---

## UI Mockup (Text-based)

```
┌──────────────────────────────────────────────────────┐
│ Generate Posts ⚡                     Used: 5/10      │
├──────────────────────────────────────────────────────┤
│                                                        │
│ Topic or Message                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Launching my new SaaS product next week...       │ │
│ └──────────────────────────────────────────────────┘ │
│                                                        │
│ Platform: [Twitter] LinkedIn                          │
│ Tone: Professional [Casual] Humorous...               │
│                                                        │
│ Humanness Level: 💼 Professional but Real            │
│ 🤖───────💼═══════💬───────🗣️                         │
│ Corporate  Pro    Casual  Texting                    │
│                                                        │
│ ☐ Compare 3 humanness levels side-by-side            │
│                                                        │
│ [✨ Generate Posts]                                   │
└──────────────────────────────────────────────────────┘

Results:
┌──────────────────────────────────────────────────────┐
│ Variant 1                  🟢 15 - MINIMAL          │
│ 💼 Professional but Real                             │
├──────────────────────────────────────────────────────┤
│ I'm launching my new SaaS next week. Been           │
│ working on this for 6 months and can't wait...      │
│                                                        │
│ 142 characters                                        │
│                                                        │
│ [👍 Like] [👎 Pass] [🔄 Make More Human] [📋 Copy]  │
└──────────────────────────────────────────────────────┘
```

---

**Status:** Flow documented. Ready for implementation.
**Next Step:** Build HumannessSlider component (Task 3)
