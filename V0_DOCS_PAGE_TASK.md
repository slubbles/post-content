# V0 Task: Implement Documentation Page UI

## 📋 Overview
Transform [DOCUMENTATION.md](/workspaces/idea-dump/content-generator/DOCUMENTATION.md) into a beautiful, interactive documentation page at `/docs`.

## 🎯 Current Status
- `/app/docs/page.tsx` exists but shows placeholder content
- Full documentation written in DOCUMENTATION.md (912 lines)
- Need to convert MD content to React components with navigation

## 🎨 Design Requirements

### Layout Structure
```
┌─────────────────────────────────────────────┐
│           Header (AppNavigation)             │
├──────────────┬──────────────────────────────┤
│   Sidebar    │      Content Area            │
│   (TOC)      │                              │
│   - Sticky   │   - Searchable               │
│   - Scroll   │   - Code blocks              │
│   - Links    │   - Tables                   │
│              │   - Collapsible sections     │
│   (Desktop)  │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

### Components Needed

1. **DocsSidebar** (Left Navigation)
   - Sticky position (top: 64px)
   - Table of contents from sections
   - Active section highlighting
   - Smooth scroll to sections
   - Collapsible on mobile (hamburger menu)

2. **DocsContent** (Main Area)
   - Markdown-style rendering
   - Code syntax highlighting
   - Copy button for code blocks
   - Responsive tables
   - Anchor links for headings
   - Search functionality

3. **DocsSearch** (Optional but nice)
   - Search box at top
   - Filter sections by keyword
   - Highlight matches

## 📝 Content Structure from DOCUMENTATION.md

### Main Sections (TOC)
1. Getting Started
   - Create Your Account
   - First Steps

2. Features Overview
   - AI-Powered Content Generation
   - Platforms Supported

3. Content Generators
   - Generate Posts
   - Reply to Posts
   - Create Threads
   - Video Scripts
   - Caption Generator

4. Account Management
   - Profile Settings (4 tabs)

5. Pricing & Subscriptions
   - Plan Comparison (table)
   - How to Upgrade
   - Cancel Anytime

6. API Reference
   - Authentication
   - Endpoints (POST /api/generate, etc.)
   - Code examples

7. Troubleshooting
   - Generation Issues
   - Account Issues
   - Payment Issues
   - History Not Loading

8. Support & Resources

## 🎨 Design Inspiration

### Style Guide
- **Font**: System font stack (already in globals.css)
- **Colors**: Use existing design tokens
  - Primary: `#f0ff5f` (yellow)
  - Background: `hsl(var(--background))`
  - Card: `hsl(var(--card))`
  - Border: `hsl(var(--border))`
  
- **Code Blocks**: Dark theme with syntax highlighting
  ```tsx
  // Use Prism.js or similar
  <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4">
    <code>{codeContent}</code>
  </pre>
  ```

- **Tables**: Striped rows, responsive
  ```tsx
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-muted">
        <tr>
          <th className="p-3 text-left">Feature</th>
          <th className="p-3 text-left">Free</th>
          <th className="p-3 text-left">Pro</th>
        </tr>
      </thead>
    </table>
  </div>
  ```

### Example Implementation

**File: `/app/docs/page.tsx`**
```tsx
import { AppNavigation } from "@/components/app-navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsContent } from "@/components/docs-content"

export default function DocsPage() {
  const sections = [
    { id: "getting-started", title: "Getting Started" },
    { id: "features", title: "Features Overview" },
    { id: "generators", title: "Content Generators" },
    // ... rest of sections
  ]

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-8 py-8">
          {/* Sidebar - Hidden on mobile, shown on lg+ */}
          <aside className="hidden lg:block w-64 shrink-0">
            <DocsSidebar sections={sections} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4">
            <DocsContent />
          </main>
        </div>
      </div>
    </div>
  )
}
```

**File: `/components/docs-sidebar.tsx`**
```tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function DocsSidebar({ sections }) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    // Track scroll position and update active section
    const handleScroll = () => {
      // Find which section is in view
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block px-3 py-2 text-sm rounded-md transition-colors",
                activeSection === section.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**File: `/components/docs-content.tsx`**
```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DocsContent() {
  return (
    <div className="prose prose-zinc max-w-none">
      {/* Getting Started Section */}
      <section id="getting-started" className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Create Your Account</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Visit <a href="/signup">postcontent.io/signup</a></li>
          <li>Enter your name, email, and password</li>
          <li>Verify your email address (check your inbox)</li>
          <li>Start creating content immediately!</li>
        </ol>
        
        {/* ... more content */}
      </section>

      {/* API Reference Section with Code Blocks */}
      <section id="api-reference" className="mb-16">
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        
        <Card className="my-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">POST /api/generate</h3>
            <p className="text-muted-foreground mb-4">Generate social media posts.</p>
            
            <div className="space-y-4">
              <div>
                <Badge className="mb-2">Request</Badge>
                <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto">
                  <code>{`{
  "topic": "Product launch announcement",
  "platform": "twitter",
  "tone": "professional",
  "variants": 3
}`}</code>
                </pre>
              </div>
              
              <div>
                <Badge className="mb-2">Response</Badge>
                <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto">
                  <code>{`{
  "posts": [
    "Post variant 1...",
    "Post variant 2...",
    "Post variant 3..."
  ]
}`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Troubleshooting Section */}
      <section id="troubleshooting" className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Troubleshooting</h1>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">"Failed to generate content"</h3>
              <ul className="space-y-2">
                <li><strong>Cause:</strong> API rate limit or network error</li>
                <li><strong>Fix:</strong> Wait 30 seconds and try again</li>
                <li><strong>Prevention:</strong> Avoid rapid-fire generations</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* More troubleshooting items */}
        </div>
      </section>
    </div>
  )
}
```

## ✅ Acceptance Criteria

### Must Have
- [ ] Sticky sidebar navigation on desktop
- [ ] Mobile-responsive (hamburger menu or tabs)
- [ ] All 8 main sections implemented
- [ ] Code blocks with syntax highlighting
- [ ] Responsive tables (pricing comparison)
- [ ] Smooth scroll to sections
- [ ] Copy buttons for code examples
- [ ] Consistent spacing and typography

### Nice to Have
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] "Back to top" button
- [ ] Section permalinks
- [ ] Breadcrumbs
- [ ] Previous/Next navigation at bottom

## 📦 Libraries You Might Need

### Code Syntax Highlighting
```bash
npm install react-syntax-highlighter
```

### Markdown to React (if you want to keep MD)
```bash
npm install react-markdown
```

### Copy to Clipboard
```tsx
// Already available in the codebase
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
```

## 🎯 Implementation Steps

1. **Create Components** (Day 1)
   - DocsSidebar.tsx
   - DocsContent.tsx
   - CodeBlock.tsx (for syntax highlighting)

2. **Update Docs Page** (Day 1)
   - Replace placeholder with new layout
   - Import and render components

3. **Content Migration** (Day 2)
   - Convert DOCUMENTATION.md sections to React
   - Add proper HTML structure
   - Style with Tailwind classes

4. **Polish** (Day 2)
   - Mobile responsiveness
   - Smooth scrolling
   - Active section highlighting
   - Copy buttons

5. **Testing** (Day 2)
   - Test all internal links
   - Verify mobile menu works
   - Check code block formatting
   - Validate table responsiveness

## 📝 Notes

- Use existing UI components from `/components/ui/*`
- Match the style of other pages (consistent with `/pricing`, `/faq`)
- Keep it simple and readable
- Focus on usability over fancy animations
- Make sure it's accessible (keyboard navigation, screen readers)

## 🔗 Reference Files

- [DOCUMENTATION.md](DOCUMENTATION.md) - Full content source
- [app/pricing/page.tsx](app/pricing/page.tsx) - Reference for layout
- [app/faq/page.tsx](app/faq/page.tsx) - Reference for accordion/collapsible
- [components/ui/*](components/ui/) - Available UI components

---

**Priority:** MEDIUM (nice to have for launch, not blocking)  
**Estimated Time:** 4-6 hours  
**Complexity:** Medium (mostly layout + content organization)
