# PostContent Design System

**Hybrid Design**: Wise.com components + Atome colors

## Design Philosophy

This design system combines the best of two worlds:
- **Component Patterns from Wise.com**: Clean, functional UI with pill buttons and clear spacing
- **Color Palette from Atome.ph**: Vibrant yellow (#f0ff5f) with strong contrast

---

## Pattern Extractor Results

### Wise.com Analysis
```
🔘 BUTTONS:
   - Found 46 buttons
   - Common padding: 8px 12px
   - Common radius: 9999px (pill buttons)

🏠 HERO SECTION:
   - Height: 804px
   - Background: transparent

📏 SPACING:
   - Custom scale (needs standardization)
   - Detected values: NaN, 0, 2, 4, 8, 10, 12, 16, 20, 24...

🎨 COLOR ROLES:
   - Background colors: #9fe870 (green), #163300 (dark green)
   - Primary button colors: #9fe870, #163300, #ffffff
```

### Atome.ph Brand Colors
```
Primary: #f0ff5f (vibrant yellow)
Background: Light (#fafafa)
Text: Black (#000000)
```

---

## Button System (Wise-inspired)

### Primary Buttons
```tsx
className="px-3 py-2 bg-primary text-black font-bold rounded-full hover:shadow-atome-yellow"
```

**Key Properties:**
- `rounded-full` (9999px) - Pill shape from Wise
- `px-3 py-2` (8px 12px) - Wise's button padding
- `bg-primary` - Atome yellow (#f0ff5f)
- `font-bold` - Strong visual hierarchy

### Secondary Buttons
```tsx
className="px-3 py-2 bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20"
```

### Icon Buttons
```tsx
className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
```

---

## Spacing Scale (Tailwind)

Based on detected patterns, using 4px base:
```javascript
spacing: {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
}
```

---

## Color System

### Primary Palette (Atome)
```css
primary: {
  DEFAULT: '#f0ff5f',  /* Atome yellow */
  dark: '#e0ef4f',     /* Hover state */
  light: '#f5ff7f',    /* Lighter accent */
}
```

### Backgrounds
```css
background: '#fafafa'  /* Light gray */
card: '#ffffff'        /* White cards */
```

### Text
```css
text: '#000000'        /* Pure black */
gray: '#3e3e3e'        /* Secondary text */
```

---

## Border Radius

```javascript
borderRadius: {
  'atome-sm': '5px',
  'atome-md': '10px',
  'atome-lg': '34px',
  'atome-xl': '45px',
  'atome-pill': '100px',  // Original Atome pills
  'wise': '9999px',       // Wise pill buttons (NEW)
}
```

**Migration Guide:**
- Use `rounded-full` for all buttons (Wise style)
- Use `rounded-atome-lg` for cards (34px)
- Use `rounded-atome-xl` for large containers (45px)

---

## Typography

**Font Family**: Manrope (Google Fonts)
- Display: 700-800 weight
- Body: 400-600 weight

**Hierarchy:**
```tsx
h1: text-4xl md:text-5xl font-bold
h2: text-3xl md:text-4xl font-bold
h3: text-2xl md:text-3xl font-semibold
body: text-base md:text-lg font-normal
caption: text-sm font-medium
```

---

## Component Patterns

### Hero Section (Wise-inspired)
```tsx
<section className="min-h-[804px] flex items-center justify-center bg-transparent">
  <div className="max-w-4xl text-center">
    <h1>Hero Title</h1>
    <button className="px-6 py-3 bg-primary rounded-full">
      Primary CTA
    </button>
  </div>
</section>
```

### Cards (Atome-style)
```tsx
<div className="bg-white border border-gray-200 rounded-atome-xl p-6 shadow-atome">
  {/* Card content */}
</div>
```

### Navigation (Wise-inspired)
```tsx
<nav className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200">
  {/* Nav items with pill buttons */}
</nav>
```

---

## Shadows

```javascript
boxShadow: {
  'atome': 'rgba(0, 0, 0, 0.15) 0px 5px 12px 0px',
  'atome-yellow': 'rgba(240, 255, 95, 0.3) 0px 4px 16px 0px',
}
```

**Usage:**
- `shadow-atome` - Default card shadow
- `shadow-atome-yellow` - Hover state for primary buttons

---

## Global Styles (globals.css)

### Button Base Styles (Wise-inspired)
```css
button,
a[class*="btn"],
a[role="button"] {
  padding: 8px 12px;
  border-radius: 9999px; /* Pill buttons */
  font-weight: 600;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Focus States (Accessibility)
```css
*:focus-visible {
  outline: 2px solid #f0ff5f; /* Atome yellow */
  outline-offset: 2px;
  border-radius: 9999px; /* Pill shape */
}
```

---

## Usage Examples

### Primary CTA Button
```tsx
<button className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:shadow-atome-yellow transition-all">
  Get Started
</button>
```

### Secondary Button
```tsx
<button className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200">
  Learn More
</button>
```

### Outline Button
```tsx
<button className="px-4 py-2 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-black">
  Explore
</button>
```

### Icon Button
```tsx
<button className="p-3 bg-primary/10 rounded-full hover:bg-primary/20">
  <IconComponent />
</button>
```

---

## Files Modified

✅ **Tailwind Config**: Added `rounded-wise` (9999px)
✅ **Global CSS**: Wise button defaults (8px 12px padding, pill shape)
✅ **Pricing Page**: Primary CTA uses `rounded-full`
✅ **Thread Page**: Generate and copy buttons use `rounded-full`
✅ **Train Page**: Save button uses `rounded-full`
✅ **Settings Page**: Export button uses `rounded-full`
✅ **PostGenerator**: Already using `rounded-atome-pill` (100px ≈ pill)

---

## Design Tokens (JavaScript)

```javascript
export const designTokens = {
  colors: {
    primary: '#f0ff5f',
    primaryDark: '#e0ef4f',
    primaryLight: '#f5ff7f',
    black: '#000000',
    grayLight: '#fafafa',
    grayMedium: '#3e3e3e',
  },
  
  spacing: {
    button: { x: '12px', y: '8px' },
    card: '24px',
    section: '64px',
  },
  
  borderRadius: {
    button: '9999px',
    card: '34px',
    cardLarge: '45px',
  },
  
  shadows: {
    card: 'rgba(0, 0, 0, 0.15) 0px 5px 12px 0px',
    buttonHover: 'rgba(240, 255, 95, 0.3) 0px 4px 16px 0px',
  },
  
  typography: {
    fontFamily: 'Manrope, -apple-system, sans-serif',
    weights: {
      normal: 400,
      medium: 600,
      bold: 700,
      black: 800,
    },
  },
};
```

---

## Testing Checklist

- [x] Prisma Client regenerated (subscription fields)
- [x] Wise pill buttons applied (rounded-full)
- [x] Atome colors maintained (#f0ff5f primary)
- [x] Button padding updated (8px 12px)
- [x] Dev server running successfully
- [ ] Visual QA on all pages
- [ ] Mobile responsiveness check
- [ ] Accessibility audit (focus states)

---

## Next Steps

1. **Visual QA**: Review all pages at http://localhost:3000
2. **Mobile Test**: Check responsive design on smaller screens
3. **Accessibility**: Verify keyboard navigation with pill buttons
4. **Animation Timing**: Adjust Framer Motion durations if needed
5. **Pro User Badge**: Add visual indicator for subscribed users

---

## Credits

- **Component Inspiration**: [Wise.com](https://wise.com) - Button patterns, spacing, navigation
- **Color Palette**: [Atome.ph](https://www.atome.ph) - Primary yellow (#f0ff5f)
- **Design Tool**: pattern-extractor-v2.js - Visual pattern analysis

---

Last updated: January 5, 2026
