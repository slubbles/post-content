# Open Graph Images - Creation Guide

> **Status:** Missing OG images need to be created  
> **Priority:** Medium (impacts social sharing)  
> **Timeline:** Can be created within 1-2 hours

---

## 🎨 Required Images

All images should be **1200×630 pixels** (Open Graph standard)

### Blog Images (4 total)

1. **Main Blog Hub**
   - Path: `/public/images/blog-og.jpg`
   - Title: "PostContent Blog"
   - Subtitle: "AI Content Marketing Insights"
   - Design: Clean, modern, branded

2. **AI Content Generation Guide**
   - Path: `/public/images/blog/ai-content-guide-og.jpg`
   - Title: "AI Content Generation: Complete Guide 2026"
   - Visual: AI brain or content creation graphic
   - Colors: Brand colors (blue/purple gradient)

3. **LinkedIn Strategy Post**
   - Path: `/public/images/blog/linkedin-strategy-og.jpg`
   - Title: "LinkedIn Content Strategy That Actually Works"
   - Visual: LinkedIn logo or professional network graphic
   - Colors: LinkedIn blue + brand colors

4. **Twitter/X Growth Post**
   - Path: `/public/images/blog/twitter-growth-og.jpg`
   - Title: "Twitter/X Growth Tactics for 2026"
   - Visual: Twitter/X logo or viral content graphic
   - Colors: Twitter blue/black + brand colors

---

## 🛠️ Design Tools (Choose One)

### Option 1: Canva (Recommended - Easiest)
1. Create account at canva.com
2. Use template: "Facebook Post" (1200×630)
3. Design elements:
   - PostContent logo in corner
   - Large title text (48-60pt)
   - Subtitle or description (24-32pt)
   - Branded gradient background
   - Icon/illustration related to topic

**Canva Template URL:** https://www.canva.com/create/facebook-posts/

### Option 2: Figma (Best for Consistency)
1. Create 1200×630 frame
2. Design system:
   - Background: Gradient (brand colors)
   - Title: Inter Bold 56pt
   - Subtitle: Inter Regular 32pt
   - Logo: Top-left corner (120px width)
   - Icon: Right side (300×300px)
3. Export as JPG (quality: 85%)

### Option 3: AI Generation (Fastest)
Use DALL-E, Midjourney, or similar:

**Prompt for Blog Hub:**
```
Professional social media banner, 1200x630 pixels, "PostContent Blog" in large bold text, subtitle "AI Content Marketing Insights", modern gradient background in blue and purple, minimalist design, clean typography, tech startup aesthetic
```

**Prompt for AI Content Guide:**
```
Blog post header image, 1200x630, "AI Content Generation: Complete Guide 2026", futuristic AI brain illustration, gradient background, professional marketing design, clean modern style
```

---

## 📐 Design Specifications

### Typography
- **Title Font:** Inter Bold or Poppins Bold
- **Title Size:** 48-60pt
- **Subtitle Font:** Inter Regular
- **Subtitle Size:** 24-32pt
- **Color:** White text on dark gradient

### Colors (PostContent Brand)
- **Primary:** #3B82F6 (blue)
- **Secondary:** #8B5CF6 (purple)
- **Gradient:** Linear from primary to secondary
- **Text:** #FFFFFF (white)
- **Logo:** Full color

### Layout
```
┌─────────────────────────────────────────────┐
│ [Logo]                                      │
│                                             │
│                                             │
│           Large Title Text                  │
│           Subtitle or Description           │
│                                             │
│                                    [Icon]   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## ✅ Quick Creation Checklist

For each image:
- [ ] Create 1200×630 canvas
- [ ] Add branded gradient background
- [ ] Place PostContent logo (top-left)
- [ ] Add main title (large, bold, white)
- [ ] Add subtitle/description (smaller, white)
- [ ] Add relevant icon/illustration (optional)
- [ ] Export as JPG (85% quality)
- [ ] Name file correctly (match path in code)
- [ ] Place in `/public/images/` directory
- [ ] Test image in social media preview tool

---

## 🔗 Testing Tools

After creating images, test them:

### 1. Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/

Paste URL: `https://www.postcontent.io/blog`

### 2. Twitter Card Validator
https://cards-dev.twitter.com/validator

Paste URL: `https://www.postcontent.io/blog/ai-content-generation-guide-2026`

### 3. LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

Test all blog post URLs

---

## 📦 Current Image Structure

```
public/
└── images/
    ├── logo-icon.png (existing)
    ├── logo-icon.svg (existing)
    ├── logo.svg (existing)
    ├── blog-og.jpg (NEEDED)
    └── blog/
        ├── ai-content-guide-og.jpg (NEEDED)
        ├── linkedin-strategy-og.jpg (NEEDED)
        └── twitter-growth-og.jpg (NEEDED)
```

---

## 🎯 Priority Order

1. **Highest Priority:** `blog-og.jpg` (main blog hub)
   - Most visible, used when sharing /blog page

2. **High Priority:** `ai-content-guide-og.jpg`
   - First blog post, sets quality standard

3. **Medium Priority:** `linkedin-strategy-og.jpg`

4. **Medium Priority:** `twitter-growth-og.jpg`

---

## 💡 Quick Win Option

**Use a Single Template for All:**

1. Create ONE master template in Canva (1200×630)
2. Design with:
   - PostContent logo
   - Branded gradient
   - Large text area
   - Icon placeholder

3. Duplicate 4 times, only change:
   - Title text
   - Icon/illustration
   - Slight color variation

**Time saved:** ~1 hour (consistent design across all images)

---

## 🚀 Alternative: Temporary Placeholders

If you need to launch quickly, create simple text-based OG images:

```javascript
// Use an OG image generation service
// Example: https://og-image.vercel.app/

// Or create simple images with:
// - Solid color background
// - White text title
// - PostContent logo
```

---

## ✨ Pro Tips

1. **Text Legibility:** Ensure text is readable when scaled down (preview at 300×157)
2. **Safe Zone:** Keep important content 100px from edges
3. **Contrast:** Use dark background + white text for best readability
4. **Brand Consistency:** Use same fonts/colors across all images
5. **File Size:** Keep under 1MB per image (optimize for web)
6. **Format:** JPG preferred over PNG (smaller file size)

---

*Once images are created, place them in the correct directories and test social sharing previews.*

**Estimated Time:** 1-2 hours total for all 4 images
