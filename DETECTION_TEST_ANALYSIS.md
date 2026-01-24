# Detection Test Results & Analysis

**Date:** January 24, 2026  
**Test Script:** `scripts/quick-detection-test.mjs`  
**Sample Size:** 20 posts (10 human, 10 AI)

---

## 📊 Test Results

### Overall Performance
- **Accuracy:** 75% (15/20 correctly classified)
- **Human Posts:** 8/10 correct (80%)
- **AI Posts:** 7/10 correct (70%)

### Score Distribution

**Human Posts (Expected: <40):**
- Average: **20.5**
- Range: 0-40
- Distribution:
  - 🟢 MINIMAL/LOW (0-39): 8 posts
  - 🟡 MEDIUM (40-59): 2 posts
  - 🔴 HIGH (60+): 0 posts

**AI Posts (Expected: ≥40):**
- Average: **54.0**
- Range: 25-100
- Distribution:
  - 🟢 MINIMAL/LOW (0-39): 3 posts
  - 🟡 MEDIUM (40-59): 3 posts
  - 🔴 HIGH (60+): 4 posts

---

## ✅ What's Working Well

1. **Strong AI Detection**
   - Top AI posts scored 70-100 (perfect detection)
   - Buzzword detection is effective
   - Complex punctuation flagging works

2. **Good Human Recognition**
   - 80% of human posts passed (score <40)
   - Casual, authentic writing scores low (0-15)
   - Personal pronouns and contractions help

3. **Clear Separation**
   - Human average (20.5) vs AI average (54.0)
   - 33.5 point gap is significant
   - Most scores cluster correctly

---

## ⚠️ Issues Found

### 1. False Positives (Human flagged as AI)
**Problem:** 2/10 human posts scored ≥40

**Examples:**
- "Quick tip for founders: your MVP should embarrass you..." → Score: 40
- "tried that viral growth hack. it didn't work..." → Score: 40

**Root Cause:**
- Short posts without personal pronouns get penalized (+25)
- Generic opening "Quick tip" triggers penalty (+10)
- Missing contractions in short advice

**Impact:** Low - Only at threshold (40), not severely flagged

---

### 2. False Negatives (AI passed as human)
**Problem:** 3/10 AI posts scored <40

**Examples:**
- "As we navigate the ever-changing landscape of technology..." → Score: 30
- "Let me share some valuable insights I've gathered..." → Score: 25
- "Embracing a data-driven mindset is no longer optional..." → Score: 35

**Root Cause:**
- AI posts with contractions ("I've") bypass detection
- "Let me" opening not flagged (should be added to generic list)
- Some buzzwords present but not enough to cross threshold

**Impact:** Moderate - These AI posts would be marked as safe

---

### 3. Threshold Sensitivity

**Current Thresholds:**
- MINIMAL: 0-19
- LOW: 20-39
- MEDIUM: 40-59
- HIGH: 60+

**Observation:**
- Several posts cluster at 25-40 range
- Line between LOW and MEDIUM (40) is critical
- Small changes in penalties can flip classification

---

## 💡 Recommendations

### High Priority Fixes

#### 1. Adjust Generic Opening List
**Add these patterns:**
```typescript
const genericOpenings = [
  'Here are', 'Let me', 'Today I want', 'I am excited to',
  'In this post', 'Allow me to',
  'Quick tip',          // NEW
  'Pro tip',            // NEW
  'Hot take',           // NEW
  'Unpopular opinion'   // NEW (but lower penalty)
];
```

**Justification:** Real humans use these too, so maybe reduce penalty to 5 points instead of 10.

#### 2. Reduce Personal Pronoun Penalty
**Current:** -25 points if missing  
**Proposed:** -15 points if missing

**Justification:** Short posts/tips naturally lack "I/my/we". The penalty is too harsh.

#### 3. Add "Landscape" Pattern Detection
**Current:** Only checks individual buzzwords  
**Proposed:** Add phrase patterns:
- "navigate the [adj] landscape"
- "in today's [adj] landscape"
- "the landscape of [noun]"

**Justification:** "Landscape" in context is more AI-like than as standalone word.

---

### Medium Priority Improvements

#### 4. Sentence Fragment Detection
**Add positive signals for human writing:**
- Sentence fragments (no verb)
- Lists without bullets
- Incomplete thoughts followed by "..."

**Scoring:** -5 points per fragment (reduces risk)

#### 5. Emoji Usage
**Add detection:**
- Emojis present = more human-like
- Reduce score by 5 points if emojis found

**Current AI posts:** 0/10 have emojis  
**Current human posts:** 2/10 have emojis

#### 6. Buzzword Context Awareness
**Problem:** "Leverage" in "leverage cutting-edge" is AI  
**But:** "I don't leverage social media" is human

**Solution:** Check if buzzword appears with other buzzwords (compound penalty)

---

### Low Priority (Future)

7. **Capitalization Patterns**
   - All caps words ("SO GOOD")
   - Intentional lowercase ("i think...")

8. **Question Marks**
   - Rhetorical questions more human
   - Add positive signal

9. **Platform-Specific Rules**
   - LinkedIn = more formal acceptable
   - Twitter = shorter = less penalty

---

## 🔧 Proposed Threshold Adjustments

### Option A: Keep Current (40 pass threshold)
**Pros:** Clear separation, conservative  
**Cons:** Some human posts flagged

### Option B: Raise to 45
**Pros:** Fewer false positives  
**Cons:** More AI posts pass

### Option C: Lower to 35
**Pros:** Catch more AI posts  
**Cons:** More false positives

### **Recommendation: Keep at 40, but adjust penalties**

Instead of changing threshold, fix the penalties:
- Personal pronouns: 25 → 15
- Generic opening: 10 → 5 (for common human phrases)
- Add emoji bonus: -5 points
- Add fragment bonus: -5 points per fragment

**Expected Impact:**
- Human average: 20.5 → 12-15 (better)
- AI average: 54.0 → 50-55 (still caught)
- Accuracy: 75% → 85-90%

---

## 🎯 Next Steps

### Immediate (This Session)
1. ✅ Create test scripts
2. ✅ Run detection tests
3. ⏭️ Implement penalty adjustments
4. ⏭️ Re-run tests to validate
5. ⏭️ Update documentation

### Testing Phase
6. ⏭️ Test E2E user flow
7. ⏭️ Test all humanness levels
8. ⏭️ Test multi-humanness mode
9. ⏭️ Mobile testing

### Polish
10. ⏭️ Fix any UI issues
11. ⏭️ Add loading states
12. ⏭️ Final documentation

---

## 📈 Success Metrics

### Target Accuracy: 85%+
- Current: 75%
- After adjustments: Expected 85-90%

### Score Separation
- Current gap: 33.5 points (good)
- Target gap: 30+ points (maintain)

### False Positive Rate
- Current: 20% (2/10 human)
- Target: <10% (0-1/10 human)

### False Negative Rate
- Current: 30% (3/10 AI)
- Target: <15% (0-1/10 AI)

---

## 💭 Observations

### What We Learned

1. **Casual = More Human**
   - Posts with "idk", "lol", "honestly" scored 0-15
   - This validates our humanness level design

2. **Buzzwords Are Strong Signals**
   - "delve", "tapestry", "leverage" instant red flags
   - High-scoring AI posts all had 3+ buzzwords

3. **Contractions Matter**
   - AI can fake contractions ("I've gathered")
   - But combination with other signals still works

4. **Short Posts Are Tricky**
   - Hard to detect patterns in <50 words
   - May need minimum length threshold

5. **Generic Openings Are Effective**
   - "Here are", "Let me" reliably indicate AI
   - But need to be careful with human equivalents

---

## 🚀 Confidence Level

**Overall: 8/10**

**Why:**
- Core algorithm works well (75% baseline)
- Clear patterns identified
- Adjustments are straightforward
- No fundamental flaws

**Concerns:**
- Edge cases at threshold boundary
- Short posts harder to classify
- AI improving (needs ongoing updates)

**Ship-Ready:** ✅ YES (with adjustments)

The system is good enough to ship. 75% accuracy is acceptable for v1, and we know exactly how to improve to 85%+. Users can always manually override with "Make More Human" button.

---

**End of Analysis**
