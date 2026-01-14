import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AppNavigation } from "@/components/app-navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const docs = {
  "quick-start": {
    title: "Quick Start Guide",
    category: "Getting Started",
    content: `
# Quick Start Guide

Welcome to PostContent. This guide will get you from signup to your first generated post in under 5 minutes.

## Step 1: Create Your Account

1. Go to postcontent.io/signup
2. Sign up with email or Continue with Google
3. Verify your email (if using email signup)
4. You're automatically on the Free plan with 10 generations

## Step 2: Generate Your First Post

1. Go to Dashboard > Generate
2. Enter a topic or message (e.g., "Launching my new product next week")
3. Select your platform (LinkedIn, Twitter/X, Instagram, Facebook, or Threads)
4. Choose a tone (Professional, Casual, Humorous, Inspirational, or Educational)
5. Set number of variants (Free: 3, Pro: 5, Enterprise: Unlimited)
6. Click "Generate Posts"

## Step 3: Review and Use Your Content

Within seconds, you'll see 3 different versions of your post:
- Each variant takes a different strategic approach
- All are optimized for your selected platform's character limits
- All match the tone you selected

Click "Copy" on the version you like, then paste it directly into your social media platform.

## Step 4: Optional - Train Your Voice

Want posts that sound more like YOU?

1. Go to Dashboard > Train AI
2. Upload 5-10 of your past posts
3. Click "Analyze My Voice"
4. Future generations will match your writing style

## What's Next?

- Explore Reply Generator for crafting thoughtful responses
- Try Thread Builder for creating multi-post threads
- Check out your generation history
- Upgrade to Pro for 200 generations/month

That's it. You're ready to create consistent, on-brand content in seconds.
`,
  },
  "post-generator": {
    title: "Post Generator",
    category: "Features",
    content: `
# Post Generator

The Post Generator is your primary tool for creating social media content across all platforms.

## How It Works

The Post Generator uses AI to transform your topic into platform-optimized, on-brand posts that match your desired tone.

### Input Fields

**Topic or Message (Required)**
- What you want to post about
- Can be a full thought or just keywords
- Examples: "Launching my SaaS tomorrow", "productivity tips", "hiring a designer"
- 500 character limit

**Platform (Required)**
- Twitter/X: 280 characters max, punchy and quotable
- LinkedIn: 500-1000 words, thought leadership style
- Instagram: 2200 characters, visual-first captions with emoji
- Facebook: Conversational, community-focused, up to 5000 characters
- Threads: 500 characters, casual and authentic

**Tone (Required)**
- Professional: Polished, authoritative, business-appropriate
- Casual: Friendly, conversational, relatable
- Humorous: Witty, entertaining, playful
- Inspirational: Motivating, uplifting, action-oriented
- Educational: Clear, informative, teaching-focused

**Number of Variants**
- Free plan: 3 variants per generation
- Pro plan: 5 variants per generation
- Enterprise: Unlimited variants

### Strategic Variants

Each variant takes a different strategic approach:

**Variant 1: Contrarian**
- Challenges conventional thinking
- "Everyone says X, but actually Y"
- Great for sparking engagement

**Variant 2: Story-Based**
- Uses personal narrative or observation
- "Here's what I learned..."
- Builds relatability and trust

**Variant 3: Data-Driven**
- Leads with statistics or facts
- "X% of people don't know..."
- Establishes authority

Additional variants (Pro/Enterprise) include tactical breakdowns, unpopular opinions, and more.

### Best Practices

**Be Specific**
- Bad: "marketing"
- Good: "why cold email still works in 2026"

**One Idea Per Post**
- Don't try to cover multiple topics
- Focus creates clarity

**Trust the AI, But Edit**
- The AI gives you 80-90% there
- Add your final personal touch
- Remove anything that doesn't feel authentic

### Common Issues

**"Posts sound too generic"**
- Solution: Train your voice (Dashboard > Train AI)
- Upload 10+ past posts for better personalization

**"Wrong character count"**
- Solution: Make sure you selected the right platform
- LinkedIn posts should be 500-1000 words, not 280 characters

**"All variants sound the same"**
- Solution: Try different tones
- Or regenerate - each generation creates new strategic angles

### Credits Usage

Each generation uses 1 credit regardless of how many variants you request.

Regenerating uses another credit.

Free plan: 10 credits total (one-time)
Pro plan: 200 credits per month
Enterprise: Unlimited

### Keyboard Shortcuts

- Cmd/Ctrl + Enter: Generate posts
- Cmd/Ctrl + C: Copy selected variant
- Cmd/Ctrl + R: Regenerate

`,
  },
  "voice-training": {
    title: "AI Voice Training",
    category: "Features",
    content: `
# AI Voice Training

Voice training teaches the AI to write like YOU, not like a generic AI bot.

## Why Voice Training Matters

Generic AI content sounds the same. Everyone using ChatGPT gets the same voice.

Your audience can tell. They scroll past it.

Voice training solves this by analyzing YOUR writing patterns and replicating them.

## How It Works

1. Upload 5-20 of your past social media posts
2. The AI analyzes:
   - Average sentence length
   - Vocabulary choices
   - Paragraph structure
   - Use of questions vs statements
   - Emoji usage (or lack thereof)
   - Opening hooks and CTAs
   - Punctuation patterns
   - Contractions vs formal language

3. Future generations match your style automatically

## What to Upload

**Good examples:**
- Your best-performing posts
- Posts that feel most "you"
- Various tones (some casual, some professional)
- Different topics from your niche

**Bad examples:**
- Reposted quotes
- Link-only posts
- One-word responses
- Posts you didn't write yourself

## Minimum Requirements

- At least 5 posts
- Each post should be 50+ characters
- Mix of platforms is fine
- Can be from different time periods

## Voice Profile Accuracy

The more posts you upload, the better:

- 5 posts: 60-70% accuracy
- 10 posts: 80-85% accuracy
- 15+ posts: 90-95% accuracy

## Updating Your Voice

Your writing style evolves. Update your voice profile quarterly:

1. Go to Dashboard > Train AI
2. Click "Update Voice"
3. Upload recent posts
4. Click "Re-analyze"

## Voice Training and Tone Selection

Voice training works WITH tone selection, not instead of it.

Example:
- Your voice: Uses short sentences, rarely uses emojis
- You select: Professional tone

Result: Professional content that uses YOUR pattern of short sentences without emojis.

## Privacy

Your uploaded posts are:
- Used only to train YOUR voice profile
- Not shared with other users
- Not used to train the base AI model
- Deletable at any time from account settings

## Disabling Voice Training

Want to use generic AI voice instead?

Go to Dashboard > Account > Preferences > Disable Voice Training

Each generation will then use the base AI model without personalization.

## Troubleshooting

**"AI still doesn't sound like me"**
- Upload 10+ more posts
- Make sure uploaded posts are truly your writing
- Check that posts are substantial (not one-liners)

**"AI sounds TOO much like me, including typos"**
- This is rare but possible
- Re-upload with only your cleanest, best-edited posts

**"Can I train different voices for different platforms?"**
- Not currently supported
- Single voice profile applies to all platforms
- Platform-specific formatting is handled separately

`,
  },
  "pricing-plans": {
    title: "Understanding Pricing & Plans",
    category: "Getting Started",
    content: `
# Understanding Pricing & Plans

PostContent offers three plans designed for different usage levels.

## Free Plan

**Perfect for:** Testing the platform, occasional posting

**Includes:**
- 10 total generations (one-time, not monthly)
- 3 variants per generation
- All 5 platforms (Twitter/X, LinkedIn, Instagram, Facebook, Threads)
- All 5 tones
- Basic AI models
- Email support

**Limitations:**
- No voice training
- No priority support
- No API access

## Pro Plan - $19/month

**Perfect for:** Content creators, solopreneurs, marketers

**Includes:**
- 200 generations per month
- 5 variants per generation
- All platforms and tones
- Voice training (unlimited uploads)
- Advanced AI models
- Priority support (24-hour response)
- Generation history
- API access (coming soon)

**Best for:**
- Posting 3-5 times per week across platforms
- Building personal brand
- Running small marketing campaigns

## Enterprise Plan - $99/month

**Perfect for:** Agencies, teams, high-volume users

**Includes:**
- Unlimited generations
- Unlimited variants per generation
- Everything in Pro
- Team collaboration features
- Dedicated account manager
- Custom AI model fine-tuning
- White-label options
- Priority API access
- Advanced analytics
- SLA guarantee

**Best for:**
- Managing multiple client accounts
- Agency teams
- High-frequency posting (daily/multiple times per day)
- Custom workflow requirements

## What's a Generation?

A generation = 1 use of any content creation feature:
- Generating a post = 1 credit
- Generating a reply = 1 credit
- Building a thread = 1 credit
- Creating a video script = 1 credit

The number of variants doesn't affect credit usage. Generating 3 variants uses the same 1 credit as generating 5 variants.

## What Are Variants?

When you generate content, you get multiple versions to choose from:
- Free: 3 different versions
- Pro: 5 different versions
- Enterprise: Unlimited versions

Each variant takes a different strategic approach (contrarian, story-based, data-driven, etc.).

## Credit Rollover

**Free Plan:** No rollover (10 credits total, forever)

**Pro Plan:** No rollover. You get 200 fresh credits on the 1st of each month.

**Enterprise:** No credit limit, so no rollover needed.

## Upgrading

**Free → Pro:**
- Instant upgrade, charged immediately
- Pro features available within seconds
- No credit transfer (you get fresh 200 credits)

**Pro → Enterprise:**
- Contact sales for onboarding
- Typically activated within 24 hours
- Pro-rated billing for remaining month

## Downgrading

**Pro → Free:**
- Takes effect at end of billing cycle
- You keep Pro features until cycle ends
- Unused credits don't transfer

**Enterprise → Pro:**
- Requires 30-day notice
- Ensure team features aren't in use
- Takes effect at end of current month

## Refund Policy

**30-day money-back guarantee on Pro plan**
- Full refund if requested within 30 days of first payment
- No questions asked
- Processed within 5-7 business days

**Enterprise plan:**
- Refunds handled case-by-case
- Contact support for details

## Payment Methods

- Credit card (Visa, Mastercard, Amex, Discover)
- PayPal (coming soon)
- Bank transfer for Enterprise (annual only)

## Billing Cycle

- Monthly plans: Billed on the same day each month
- Annual plans: 20% discount, billed once per year
- Enterprise: Monthly or annual options

## FAQ

**Can I change plans mid-month?**
Yes. Pro-rated charges apply.

**What happens if I run out of credits?**
You can either wait until next month or upgrade to a higher plan.

**Do you offer discounts?**
- Annual plans: 20% off
- Students/educators: 30% off (verification required)
- Nonprofits: 50% off (verification required)

**Can I get a custom plan?**
Enterprise customers can request custom limits and features. Contact sales.

`,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doc = docs[params.slug as keyof typeof docs]

  if (!doc) {
    return {
      title: "Documentation Not Found",
    }
  }

  return {
    title: `${doc.title} - PostContent Docs`,
    description: `Learn about ${doc.title}`,
  }
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = docs[params.slug as keyof typeof docs]

  if (!doc) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/docs">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">{doc.category}</p>
          <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {doc.content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                  {line.replace("# ", "")}
                </h1>
              )
            }
            if (line.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                  {line.replace("## ", "")}
                </h2>
              )
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={index} className="text-xl font-semibold mt-5 mb-2">
                  {line.replace("### ", "")}
                </h3>
              )
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <h4 key={index} className="text-lg font-medium mt-4 mb-2">
                  {line.replace(/\*\*/g, "")}
                </h4>
              )
            }
            if (line.trim().startsWith("- ")) {
              return (
                <li key={index} className="ml-6">
                  {line.replace(/^- /, "")}
                </li>
              )
            }
            if (line.match(/^\d+\./)) {
              return (
                <li key={index} className="ml-6">
                  {line.replace(/^\d+\. /, "")}
                </li>
              )
            }
            if (line.trim() === "") {
              return <br key={index} />
            }
            return (
              <p key={index} className="my-4">
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
