# Polar.sh Design Reference for PostContent Dashboard

## Overview
User provided Polar.sh dashboard screenshots as the exact design reference for PostContent's authenticated pages.

**Design Goal:** Replicate Polar.sh's dashboard layout, navigation structure, and visual design exactly, but with PostContent branding and features.

---

## Screenshot 1: Dashboard/Home View

### Key Elements:
1. **Left Sidebar Navigation** (~240px width)
   - Dark background
   - Navigation items with icons:
     - Home
     - Products
     - Customers
     - Analytics
     - Sales
     - Finance
     - Settings
   - Bottom section:
     - Support
     - Documentation
     - "Post Content" organization dropdown

2. **Main Content Area**
   - No top navbar
   - Page title: "Home" (H1)
   - Revenue card with dropdown ("Revenue ▼")
   - Large metric display: "$0"
   - Date range selector below
   - Chart visualization (line graph)
   - Timeline labels at bottom

3. **Visual Design**
   - Dark theme (#0a0a0a background)
   - Elevated cards (#1a1a1a)
   - Subtle borders/dividers
   - Clean typography
   - Generous spacing

---

## Screenshot 2: Settings Page with Sub-Navigation

### Key Elements:
1. **Sidebar** (Same as Screenshot 1)
   - "Settings" item is highlighted/active
   - Shows nested sub-items:
     - General (active)
     - Members
     - Webhooks
     - Custom Fields

2. **Main Content - Settings Layout**
   - Page title: "Organization Settings" (H1)
   - Sections with clear hierarchy:
     
   **Profile Section:**
   - Label: "Identifier"
   - Value with copy button
   - Description text (muted)
   
   - Label: "Organization Slug"
   - Value with copy button
   - Description text
   
   **Form Fields:**
   - Logo upload (square placeholder with icon)
   - Organization Name field
   - Support Email field
   - Website field
   - Social Media section with "+ Add Social" button
   
   **Subscriptions Section** (below fold)

3. **Layout Pattern:**
   - Two-column layout for some fields (Logo | Name, Email)
   - Full-width fields for others
   - Consistent spacing between sections
   - Labels above inputs
   - Muted helper text below fields

---

## PostContent Adaptation

### Sidebar Navigation (PostContent version):
```
[PostContent Logo]
[Search: ⌘K]

📝 Generate
💬 Reply
🧵 Thread
🎓 Train
📜 History

[Credits Widget]
50 / 200 generations
[Progress bar]
Upgrade →

━━━━━━━━━━━━━━
🆘 Support
📚 Documentation

👤 Account ▼
   ├─ General
   ├─ Preferences
   ├─ Billing
   └─ Logout
```

### Feature Pages (Generate, Reply, Thread, Train):
```
Page Title (H1)
━━━━━━━━━━━━━━━━━━━━━━

[Main Feature Card]
- Form/input area
- Action button
- Results display

Recent History
━━━━━━━━━━━━━━━━━━━━━━
[History item 1]
[History item 2]
[History item 3]
...
[View All History]
```

### Account/Settings Page:
```
Account Settings (H1)
━━━━━━━━━━━━━━━━━━━━━━

[Sub-nav on left or tabs]
General | Preferences | Billing | API Keys

Profile Section
━━━━━━━━━━━━
User ID: [value] [Copy]
Email: user@example.com

[Avatar/Logo upload]

Name: [input]
Email: [input]

AI Preferences
━━━━━━━━━━━━
Writing style: [dropdown]
Tone: [dropdown]

Voice Training
━━━━━━━━━━━━
[Upload examples button]
[Training status]
```

---

## Design System Specs (Extracted from Polar.sh)

### Colors (Dark Theme)
```
Background:    #0a0a0a
Surface:       #1a1a1a
Border:        #2a2a2a
Text Primary:  #ffffff
Text Muted:    #9ca3af
Accent:        #f0ff5f (PostContent yellow)
```

### Typography
```
H1 (Page Title):  24px, 600 weight
H2 (Section):     18px, 600 weight
Body:             14px, 400 weight
Small/Muted:      12px, 400 weight, muted color
```

### Spacing
```
Page padding:     32px
Card padding:     24px
Section gap:      32px
Field gap:        16px
```

### Components
```
Card:
  - Background: Surface (#1a1a1a)
  - Border: 1px solid Border (#2a2a2a)
  - Border-radius: 8px
  - Padding: 24px

Button:
  - Height: 40px
  - Border-radius: 6px
  - Padding: 0 16px
  - Font: 14px, 500 weight

Input:
  - Height: 40px
  - Border: 1px solid Border
  - Border-radius: 6px
  - Padding: 0 12px
  - Focus: Accent color border

Sidebar Nav Item:
  - Height: 40px
  - Padding: 0 16px
  - Border-radius: 6px
  - Hover: Lighter background
  - Active: Accent/highlight
```

---

## Implementation Notes for v0

1. **Use these screenshots as the PRIMARY design reference**
2. **DO NOT deviate from this layout structure**
3. **Match spacing, sizing, and visual hierarchy exactly**
4. **Adapt only the content/features, not the design pattern**
5. **PostContent brand colors (yellow #f0ff5f) for accents only**
6. **Test sidebar collapse behavior on mobile**
7. **Ensure dark theme consistency throughout**

---

## Files to Create/Update

### New Components Needed:
- `components/dashboard-sidebar.tsx` - Main sidebar navigation
- `components/credits-widget.tsx` - Usage indicator in sidebar
- `components/dashboard-layout.tsx` - Wrapper for all authenticated pages
- `components/history-section.tsx` - History list for feature pages
- `components/account-nav.tsx` - Nested navigation for settings

### Pages to Update:
- `app/dashboard/generate/page.tsx`
- `app/dashboard/reply/page.tsx`
- `app/dashboard/thread/page.tsx`
- `app/dashboard/train/page.tsx`
- `app/dashboard/account/page.tsx`

### Styling:
- Update `app/globals.css` with Polar.sh-inspired design tokens
- Ensure all components use consistent spacing/sizing
