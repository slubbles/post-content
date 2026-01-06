# Mobile Testing Checklist - PostContent.io

**Last Updated:** January 6, 2026  
**Site:** https://www.postcontent.io

---

## 📱 Test Devices Required

### iOS Devices
- [ ] iPhone 15 Pro (iOS 17+) - Latest flagship
- [ ] iPhone 12/13 (iOS 16+) - Mid-range common
- [ ] iPhone SE (iOS 15+) - Smaller screen, budget
- [ ] iPad Pro (iPadOS 17+) - Tablet view

### Android Devices
- [ ] Samsung Galaxy S23/S24 - Latest flagship
- [ ] Google Pixel 7/8 - Stock Android
- [ ] Budget Android (< $300) - Performance test
- [ ] Android Tablet - Tablet view

### Browsers to Test
- [ ] Safari (iOS default)
- [ ] Chrome (Android default)
- [ ] Firefox Mobile
- [ ] Samsung Internet Browser

---

## 🧪 Testing Methodology

### 1. Screen Sizes to Test
```
📱 Mobile Portrait:
- 375px (iPhone SE)
- 390px (iPhone 12/13 Pro)
- 430px (iPhone 14/15 Pro Max)
- 360px (Small Android)

📱 Mobile Landscape:
- 667px × 375px
- 844px × 390px

📲 Tablet Portrait:
- 768px (iPad Mini)
- 1024px (iPad Pro)

📲 Tablet Landscape:
- 1024px × 768px
- 1366px × 1024px
```

---

## ✅ LAYOUT & RESPONSIVENESS

### Landing Page (`/`)

#### Portrait Mode
- [ ] Hero section visible without scrolling
- [ ] Headline readable (not truncated)
- [ ] CTA buttons accessible (not cut off)
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] Feature cards stack vertically
- [ ] Testimonials readable
- [ ] Footer displays correctly
- [ ] Navigation collapses to hamburger menu

#### Landscape Mode
- [ ] Content adapts to wider viewport
- [ ] Images don't distort
- [ ] Navigation stays accessible

**Common Issues to Check:**
- Text too small (< 16px on mobile)
- Buttons too close together (< 44px touch target)
- Images overflow container
- Fixed positioning breaks layout

---

### Authentication Pages

#### Login Page (`/login`)
- [ ] Form fits viewport (no zoom)
- [ ] Input fields large enough to tap (min 44px height)
- [ ] Email keyboard shows "@" symbol
- [ ] Password field has show/hide toggle
- [ ] "Continue with Google" button visible
- [ ] Error messages visible below inputs
- [ ] "Sign up" link clickable
- [ ] Logo redirects to home

**Test Scenarios:**
1. Tap email input → keyboard appears → form doesn't break
2. Tap password → secure keyboard appears
3. Toggle password visibility → text visible/hidden
4. Submit form → loading state shows → redirects properly

#### Signup Page (`/signup`)
- [ ] All form fields accessible
- [ ] Name, email, password inputs work
- [ ] Password strength indicator visible
- [ ] "Already have account?" link works
- [ ] Terms/Privacy links clickable

---

### App Navigation

#### Mobile Bottom Navigation (< 768px)
- [ ] Fixed to bottom of screen
- [ ] Doesn't overlap content
- [ ] Safe area padding (iOS notch)
- [ ] Active state highlighted
- [ ] Icons + labels visible
- [ ] Tappable area: 52px minimum

**iOS Safe Areas:**
- [ ] Top: Space for notch/Dynamic Island
- [ ] Bottom: Space for home indicator
- [ ] No content hidden behind system UI

#### Desktop Navigation (≥ 768px)
- [ ] Horizontal top nav shows
- [ ] Bottom nav hidden
- [ ] All nav items accessible

---

### Generate Page (`/generate`)

#### Input Form
- [ ] Textarea expands to show content
- [ ] Character counter visible
- [ ] Tone selector dropdown works
- [ ] Tapping input focuses correctly
- [ ] Keyboard doesn't cover input
- [ ] "Generate" button always visible

#### Generated Results
- [ ] 3 post variations display
- [ ] Each post card readable
- [ ] Copy buttons work (toast shows)
- [ ] Posts stack vertically on mobile
- [ ] Grid layout on tablet (2 columns)
- [ ] Character count visible per post

**Test Flow:**
1. Type 50 chars → counter updates
2. Select tone → dropdown closes
3. Tap Generate → loading shows → results appear
4. Tap Copy → toast notification → clipboard has text
5. Scroll results → navigation stays accessible

---

### Reply Generator (`/reply`)
- [ ] "Original post" textarea works
- [ ] Reply variations display properly
- [ ] Copy buttons functional
- [ ] Feedback buttons (spicy/mild) tappable

---

### Thread Creator (`/thread`)
- [ ] Thread preview scrolls horizontally
- [ ] Each tweet card visible
- [ ] Edit/delete icons tappable
- [ ] Reorder drag handles work (or disabled on mobile)
- [ ] "Copy thread" button works

---

### History Page (`/history`)
- [ ] Post cards display in list
- [ ] Search input works
- [ ] Filter dropdown accessible
- [ ] Delete buttons tappable
- [ ] Confirmation modal fits screen
- [ ] Empty state shows when no history

---

### Settings Page (`/settings`)
- [ ] Form fields editable
- [ ] Toggle switches work
- [ ] Save button always visible
- [ ] Success toast appears
- [ ] Dangerous actions (delete data) require confirmation

---

### Pricing Page (`/pricing`)
- [ ] Pricing cards stack vertically on mobile
- [ ] 2-column grid on tablet
- [ ] 3-column grid on desktop
- [ ] "Upgrade" buttons accessible
- [ ] Annual toggle works
- [ ] Prices update when toggled

---

## 🎨 UI/UX CHECKLIST

### Touch Targets
- [ ] All buttons ≥ 44px × 44px (Apple guideline)
- [ ] Links have 8px padding
- [ ] Buttons have 12px spacing between
- [ ] Icons are 24px × 24px minimum

### Typography
- [ ] Body text ≥ 16px (no zoom on focus)
- [ ] Headings scale down on mobile
- [ ] Line height ≥ 1.5 for readability
- [ ] No text truncation unless intended

### Colors & Contrast
- [ ] Text readable in bright sunlight
- [ ] Primary yellow (#f0ff5f) has sufficient contrast
- [ ] Dark mode works (if implemented)
- [ ] Disabled states visible

### Forms
- [ ] Input fields autofocus properly
- [ ] Keyboard doesn't cover inputs
- [ ] Submit button stays above keyboard
- [ ] Labels visible when input focused
- [ ] Error messages appear below fields

---

## ⚡ PERFORMANCE

### Load Time
- [ ] Page loads in < 3 seconds on 4G
- [ ] Loading skeletons show immediately
- [ ] Images lazy load below fold
- [ ] Fonts don't cause layout shift

### Animations
- [ ] Smooth 60fps animations
- [ ] No jank when scrolling
- [ ] Page transitions smooth
- [ ] Button press feedback immediate (< 100ms)

### Offline Behavior
- [ ] Error message shows if no connection
- [ ] Retry button works
- [ ] Previously loaded content cached

---

## 🐛 COMMON MOBILE BUGS TO CHECK

### iOS-Specific
- [ ] Input zoom disabled (font-size ≥ 16px)
- [ ] Safari address bar hides on scroll
- [ ] Fixed elements don't jump
- [ ] Date picker works (native iOS picker)
- [ ] Safe areas respected (notch, home indicator)

### Android-Specific
- [ ] Back button works (browser history)
- [ ] Status bar color matches theme
- [ ] Keyboard doesn't resize layout improperly
- [ ] Chrome autofill works

### Cross-Platform
- [ ] No horizontal scroll
- [ ] Images scale properly (no overflow)
- [ ] Videos autoplay with controls
- [ ] Copy/paste works in inputs
- [ ] Long-press context menu works

---

## 🔍 TESTING TOOLS

### Browser DevTools
```
1. Open Chrome DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select device preset or custom dimensions
4. Test in both portrait and landscape
5. Throttle network to "Fast 3G"
```

### Real Device Testing
**Remote Testing Services:**
- BrowserStack (paid) - Test on 3000+ real devices
- LambdaTest (paid) - Cross-browser testing
- Safari on macOS - Use iOS Simulator (free)

**Local Testing:**
1. Connect phone to computer
2. Enable USB debugging (Android)
3. Chrome DevTools → Remote devices
4. Inspect mobile browser

---

## 📊 TESTING MATRIX

Create a spreadsheet with:

| Page | iPhone SE | iPhone 14 | iPad | Galaxy S23 | Pixel 7 | Issues Found |
|------|-----------|-----------|------|------------|---------|--------------|
| `/` | ✅ | ✅ | ✅ | ✅ | ⚠️ | Logo cut off |
| `/login` | ❌ | | | | | Form breaks |
| `/generate` | | | | | | |
| `/reply` | | | | | | |
| ... | | | | | | |

---

## 🎯 PRIORITY TESTING ORDER

### Critical (Must Test First)
1. **Login/Signup flow** - Users can't access app without this
2. **Generate page** - Core functionality
3. **Navigation** - Users can't move around
4. **Payment flow** - Revenue depends on this

### Important (Test Next)
5. **Reply/Thread generators** - Key features
6. **History page** - User data management
7. **Settings** - User preferences

### Nice to Have (Test Last)
8. **Landing page** - Marketing (not app-critical)
9. **Pricing page** - Informational
10. **404/Error pages** - Edge cases

---

## 🚨 CRITICAL ISSUES (Fix Immediately)

Based on your feedback, these MUST be fixed:

### 🔴 BLOCKER
- [ ] **Login fails (500 error)** - AUTH BROKEN
- [ ] **Signup fails (400 error)** - AUTH BROKEN
- [ ] **API returns 401** - Session management broken
- [ ] **Horizontal scroll on mobile** - Layout overflow

### 🟡 HIGH PRIORITY
- [ ] **Google OAuth not visible** - No "Continue with Google" button
- [ ] **Polar.sh checkout broken** - Can't upgrade
- [ ] **Dark mode button text invisible** - UX issue
- [ ] **Loading states missing** - No feedback

### 🟢 MEDIUM PRIORITY
- [ ] **Credits widget too prominent** - Move to avatar
- [ ] **Logo redirects to /generate when logged in** - Should go to /
- [ ] **Missing icons (404)** - Favicon errors
- [ ] **Error messages have no UI** - No visual feedback

---

## 📝 TEST REPORT TEMPLATE

After testing each page, document:

```markdown
## Page: /generate

### Device: iPhone 14 Pro (iOS 17)
### Date: January 6, 2026

**✅ What Works:**
- Textarea accepts input
- Character counter updates
- Tone selector opens

**❌ Issues Found:**
1. Generate button cut off in landscape mode
2. Loading spinner not centered
3. Results scroll horizontally (overflow bug)

**📸 Screenshots:**
- [Attach screenshots of issues]

**🔧 Suggested Fixes:**
- Add `overflow-x: hidden` to results container
- Change button to `position: sticky`
```

---

## 🎉 DONE CRITERIA

Mobile testing is complete when:
- [ ] All critical pages tested on ≥ 2 iOS devices
- [ ] All critical pages tested on ≥ 2 Android devices
- [ ] No horizontal scroll on any page
- [ ] Touch targets ≥ 44px
- [ ] Load time < 3s on 4G
- [ ] All forms work without zoom
- [ ] iOS safe areas respected
- [ ] All issues documented
- [ ] Critical bugs fixed

---

## 🔗 USEFUL LINKS

- **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Material Design (Android)**: https://material.io/design
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Can I Use**: https://caniuse.com (check browser support)
