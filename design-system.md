# Design System - PostContent
**Inspired by**: [Atome.ph](https://www.atome.ph/atome-card)  
**Extracted on**: January 4, 2026  
**Philosophy**: Bold, modern, high-contrast design with playful yellow accent

---

## 🎨 Color Palette

### Primary Colors (ACTUAL IMPLEMENTATION)
```css
--color-primary: #f0ff5f     /* Primary yellow - CTAs, highlights, active states */
--color-background: #fafafa  /* Page background - light gray */
--color-card: #ffffff        /* Card backgrounds - pure white */
--color-text: #000000        /* Primary text - black */
--color-text-gray: #6b7280   /* Secondary text - gray-500 */
--color-border: #e5e5e5      /* Borders - light gray */
--color-gray-50: #f9fafb     /* Subtle backgrounds */
```

### Usage Guidelines
- **Yellow (#f0ff5f)**: Hero sections, CTAs, hover states, brand moments
- **Light Gray (#fafafa)**: Page backgrounds for subtle contrast
- **White (#ffffff)**: Card backgrounds, navigation, content areas
- **Black (#000000)**: Primary text, headings
- **Gray (#6b7280)**: Secondary text, descriptions, labels
- **Light Gray Border (#e5e5e5)**: Dividers, card outlines

### Color Psychology
- White + Yellow = Clean, modern, energetic
- High contrast text = Accessibility-first (WCAG AAA compliant)
- Neon yellow = Bold, confident, memorable
- Light backgrounds = Professional, easy on eyes

---

## 🔤 Typography

### Font Family
```css
font-family: 'GTWalsheimPro', -apple-system, BlinkMacSystemFont, 
             'Helvetica Neue', 'SF Pro Text', Helvetica, sans-serif;
```

**Fallback Strategy**:
1. GTWalsheimPro (custom, to be loaded via Google Fonts alternative or self-hosted)
2. System fonts for performance
3. Sans-serif as ultimate fallback

### Type Scale
```css
--text-xs: 13px       /* Small labels, captions */
--text-sm: 14px       /* Body small */
--text-base: 16px     /* Body text */
--text-lg: 18px       /* Subheadings */
--text-xl: 24px       /* Section titles */
--text-2xl: 32px      /* Page titles */
--text-3xl: 36px      /* Hero small */
--text-4xl: 50px      /* Hero large */
```

### Font Weights
```css
--font-normal: 400    /* Body text */
--font-medium: 500    /* Emphasis */
--font-bold: 700      /* Headings, CTAs */
```

### Line Heights
```css
--leading-tight: 1.2  /* Headings */
--leading-normal: 1.5 /* Body text */
--leading-relaxed: 1.8 /* Comfortable reading */
```

---

## 📐 Spacing System

### Base Unit: 4px
```css
--space-1: 4px        /* 0.25rem */
--space-2: 8px        /* 0.5rem */
--space-3: 12px       /* 0.75rem */
--space-4: 16px       /* 1rem */
--space-5: 20px       /* 1.25rem */
--space-6: 24px       /* 1.5rem */
--space-8: 32px       /* 2rem */
--space-10: 40px      /* 2.5rem */
--space-12: 48px      /* 3rem */
--space-16: 64px      /* 4rem */
--space-20: 80px      /* 5rem */
```

### Common Patterns (from Atome)
- **Card padding**: 40px (desktop), 20px (mobile)
- **Section spacing**: 60-80px vertical
- **Element gaps**: 20px standard
- **Button padding**: 10px 20px (small), 20px 40px (large)

---

## 🔲 Borders & Radius

### Border Radius
```css
--radius-sm: 5px      /* Small elements */
--radius-md: 10px     /* Cards, inputs */
--radius-lg: 34px     /* Buttons */
--radius-xl: 45px     /* Large cards */
--radius-full: 100px  /* Pills, badges */
--radius-circle: 50%  /* Avatars, icons */
```

### Border Widths
```css
--border-thin: 0.8px  /* Subtle dividers */
--border-base: 1.6px  /* Standard borders */
```

### Border Style
- Primarily **solid**
- Use **none none solid** for bottom-only borders (underlines)

---

## 🌑 Shadows

### Elevation System
```css
/* Subtle (from Atome) */
--shadow-sm: rgba(0, 0, 0, 0.15) 0px 5px 12px 0px;

/* Extended for PostContent */
--shadow-none: none;
--shadow-md: rgba(0, 0, 0, 0.2) 0px 8px 16px 0px;
--shadow-lg: rgba(0, 0, 0, 0.25) 0px 12px 24px 0px;
--shadow-yellow: rgba(240, 255, 95, 0.3) 0px 4px 16px 0px; /* For yellow CTAs */
```

### Usage
- **None**: Flat UI elements
- **SM**: Hover states, elevated cards
- **MD**: Modals, dropdowns
- **LG**: Popovers, tooltips
- **Yellow**: Primary CTA hover glow

---

## 🎬 Animations

### Transitions
```css
--transition-fast: 0.2s ease-in-out;
--transition-base: 0.25s ease;
--transition-slow: 0.3s ease;
--transition-transform: transform 0.25s ease;
```

### Common Patterns
```css
/* Hover scale */
.interactive:hover {
  transform: scale(1.05);
  transition: var(--transition-fast);
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 📱 Breakpoints

### Responsive Strategy (from Atome)
```css
--screen-mobile: 480px    /* Small phones */
--screen-tablet: 768px    /* Tablets */
--screen-desktop: 1000px  /* Desktop */
```

### Usage in Tailwind
```javascript
screens: {
  'mobile': '480px',
  'tablet': '768px',
  'desktop': '1000px',
}
```

---

## 🎯 Component Patterns

### Buttons

#### Primary (Yellow CTA)
```css
background: #f0ff5f;
color: #000000;
padding: 20px 40px;
border-radius: 100px;
font-weight: 700;
box-shadow: var(--shadow-yellow);
transition: var(--transition-fast);

&:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}
```

#### Secondary (Black outline)
```css
background: transparent;
color: #ffffff;
border: 1.6px solid #ffffff;
padding: 20px 40px;
border-radius: 100px;
font-weight: 700;
transition: var(--transition-fast);

&:hover {
  background: #ffffff;
  color: #000000;
}
```

### Cards
```css
background: #ffffff;
color: #000000;
padding: 40px;
border-radius: 45px;
box-shadow: var(--shadow-sm);
```

### Inputs
```css
background: #ffffff;
border: 1.6px solid #3e3e3e;
border-radius: 10px;
padding: 10px 20px;
font-size: 16px;

&:focus {
  border-color: #f0ff5f;
  outline: none;
}
```

---

## 🎨 Tailwind Config Implementation

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'atome-black': '#000000',
        'atome-white': '#ffffff',
        'atome-yellow': '#f0ff5f',
        'atome-gray': '#3e3e3e',
        'atome-link': '#0000ee',
      },
      fontFamily: {
        'atome': ['GTWalsheimPro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': '13px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '36px',
        '4xl': '50px',
      },
      borderRadius: {
        'sm': '5px',
        'md': '10px',
        'lg': '34px',
        'xl': '45px',
        'pill': '100px',
      },
      boxShadow: {
        'atome': 'rgba(0, 0, 0, 0.15) 0px 5px 12px 0px',
        'atome-yellow': 'rgba(240, 255, 95, 0.3) 0px 4px 16px 0px',
      },
      screens: {
        'mobile': '480px',
        'tablet': '768px',
        'desktop': '1000px',
      },
    },
  },
};
```

---

## 🚀 Implementation Checklist

### Phase 1: Foundation
- [ ] Update tailwind.config.js with Atome tokens
- [ ] Replace primary green (#00D775) with yellow (#f0ff5f)
- [ ] Update black background to pure #000000
- [ ] Add GTWalsheimPro font (or similar alternative)

### Phase 2: Components
- [ ] Update all buttons to use yellow/black scheme
- [ ] Update cards with Atome border radius (45px)
- [ ] Replace shadows with Atome shadow system
- [ ] Update input styles

### Phase 3: Pages
- [ ] Homepage hero with yellow CTAs
- [ ] Navigation with black background
- [ ] All pages consistent with new palette
- [ ] Footer styling update

### Phase 4: Polish
- [ ] Hover states with yellow highlights
- [ ] Loading states with yellow accents
- [ ] Success/error states (yellow for success)
- [ ] Mobile responsive check

---

## 💡 Design Principles

### 1. **Bold Simplicity**
- High contrast (black/white)
- Single accent color (yellow)
- Generous white space

### 2. **Confident Typography**
- Clear hierarchy
- Bold headings (700 weight)
- Readable body (16px minimum)

### 3. **Playful Interaction**
- Scale on hover (1.05x)
- Yellow glow on CTAs
- Smooth transitions (0.2-0.3s)

### 4. **Accessibility First**
- WCAG AAA contrast ratios
- Clear focus states
- Readable line heights

---

## 🎯 Key Differences from Old Design

| Element | Old (Wise-inspired) | New (Atome-inspired) |
|---------|---------------------|----------------------|
| **Primary Color** | Green (#00D775) | Yellow (#f0ff5f) |
| **Background** | Dark gray (#0A0E14) | Light gray (#fafafa) |
| **Cards** | Dark (#111827) | White (#ffffff) |
| **Text** | White on dark | Black on white |
| **Button Radius** | 12px (xl) | 100px (pill) |
| **Card Radius** | 16px | 20-30px (atome-xl/2xl) |
| **Font** | Inter + Space Grotesk | Inter + Space Grotesk (kept) |
| **Vibe** | Dark/Fintech | Light/Bold/Modern |
| **Mobile** | Basic responsive | Touch-optimized + iOS safe areas |

---

## 📚 Resources

- **Atome.ph**: Original inspiration source
- **GTWalsheimPro**: Similar fonts - Manrope, Poppins, Inter (as fallback)
- **Color Tool**: [Coolors.co](https://coolors.co/000000-ffffff-f0ff5f-3e3e3e)
- **Contrast Checker**: [WebAIM](https://webaim.org/resources/contrastchecker/)

---

**Last Updated**: January 4, 2026  
**Status**: Ready for implementation
