import { AppNavigation } from "@/components/app-navigation"
import Link from "next/link"
import { Sparkles, TrendingUp } from "lucide-react"

export const metadata = {
  title: "About Us - PostContent",
  description: "The story behind PostContent and why we built it for creators like you",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-3xl mobile-safe-padding py-8 sm:py-12 lg:py-16">
        {/* HOOK */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance leading-tight">
            You're not bad at content.
            <br />
            You're just running out of time.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Every creator knows they should post more. Few actually do. Not because they lack ideas—but because writing
            takes too damn long.
          </p>
        </div>

        {/* STORY */}
        <div className="space-y-8 sm:space-y-10 mb-12 sm:mb-16">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Here's what happened</h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Early 2024. Our founder launched a SaaS product. Spent 6 months building. Zero time marketing. Launch
                day came. 12 signups. All from friends.
              </p>
              <p>
                The problem wasn't the product. It was silence. While competitors posted daily on LinkedIn and Twitter,
                he was staring at blank screens, rewriting the same post for 3 hours, then giving up.
              </p>
              <p className="font-medium text-foreground">
                Great products die in silence because their creators can't create content fast enough.
              </p>
              <p>So he asked: what if AI could write like me? Not generic ChatGPT—but trained on MY voice?</p>
              <p>
                Six months later, PostContent existed. Today, 10,000+ creators use it to stay visible without burnout.
              </p>
            </div>
          </section>

          <section className="border-l-4 border-primary pl-6 py-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Why creators choose us over ChatGPT</h3>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <strong className="text-foreground">Because generic AI killed your authenticity.</strong>
                <p className="mt-1">
                  ChatGPT sounds like ChatGPT. Your audience can tell. PostContent trains on YOUR writing so every post
                  sounds like you wrote it.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Because your time is worth more than $10/hour.</strong>
                <p className="mt-1">
                  Spending 3 hours on one post? That's $30-300 in lost productivity. Generate 10 posts in 5 minutes and
                  spend the rest building your business.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Because consistency beats perfection every time.</strong>
                <p className="mt-1">
                  You don't need the perfect post. You need to show up. PostContent removes the friction so you can post
                  daily without burnout.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">What we believe</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Authenticity &gt; Volume</h3>
                <p className="text-sm text-muted-foreground">
                  We'd rather you post 3 authentic pieces than 30 generic ones. Quality scales with AI. Authenticity
                  doesn't.
                </p>
              </div>
              <div className="space-y-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Consistency &gt; Perfection</h3>
                <p className="text-sm text-muted-foreground">
                  The algorithm rewards frequency, not perfection. Show up every day. Iterate publicly. Win long-term.
                </p>
              </div>
              <div className="space-y-2">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-semibold">Speed &gt; Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Done is better than perfect. Ship fast, learn faster. PostContent helps you move at the speed of
                  thought.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* OFFER */}
        <section className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join 10,000+ creators who stopped overthinking</h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
            Every hour you delay is an hour your competitors use to engage your audience. Start today. No credit card.
            No risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition-all touch-target"
            >
              Start Creating Now - It's Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-border font-semibold hover:bg-accent hover:scale-105 transition-all touch-target"
            >
              View Pricing
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">10 free posts per month • No credit card • Cancel anytime</p>
        </section>
      </div>
    </div>
  )
}
