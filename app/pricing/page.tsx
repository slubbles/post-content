import { AppNavigation } from "@/components/app-navigation"
import { PricingCards } from "@/components/pricing-cards"
import { Suspense } from "react"
import { Check, AlertCircle, TrendingUp, Clock, Users } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-7xl mobile-safe-padding py-12 sm:py-16 lg:py-20">
        <div className="mb-16 text-center space-y-6 animate-fade-in">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Clock className="inline h-4 w-4 mr-1" />
            427 creators upgraded in the last 7 days
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Stop Leaving Money on the Table
            <br />
            <span className="text-primary">Start at $0. Scale When You're Ready.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            Every post you don't publish is potential revenue lost. Join 10,000+ creators who stopped paying expensive
            copywriters and started creating authentic content that converts—in seconds, not hours.
          </p>

          <div className="flex flex-col items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>
                <strong>Start free forever</strong> • No credit card • Cancel anytime
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>
                <strong>Used by developers</strong> at Google, Meta, Stripe, and 500+ Y Combinator startups
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>
                <strong>10,000+ creators</strong> ditched writer's block and 3x their posting frequency
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              Free tier limited to first 10,000 monthly signups.{" "}
              <strong className="text-primary">Claim yours now.</strong>
            </span>
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-100 animate-on-load">
          <Suspense fallback={<LoadingSpinner />}>
            <PricingCards />
          </Suspense>
        </div>

        <div className="mt-20 animate-fade-in-up animate-delay-200 animate-on-load">
          <h2 className="mb-8 text-center text-3xl font-bold">Still on the fence? We've got you covered.</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">What counts as a generation?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One click = one credit. Simple. Want 5 different variants? Still one credit. We're not here to nickel
                and dime you. We want you to experiment, find what resonates, and grow your audience faster.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. Launch week? Scale up. Vacation month? Scale down. Life happens. Your billing should adapt.
                No contracts, no penalties, no awkward conversations with sales. Just instant changes that work for YOU.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">What if I run out of credits?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your account stays active, your history is safe. Upgrade instantly for more credits or wait for your
                monthly refresh. We'll never hold your content hostage. Once you create it, it's yours forever—even if
                you downgrade to free.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">Why should I pay when ChatGPT is free?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Because ChatGPT doesn't know YOUR voice. It sounds generic, robotic, fake. PostContent trains on YOUR
                writing style so every post sounds authentically you. Plus: no copy-pasting, no prompt engineering, no
                15-minute detours. Just instant, on-brand content.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in-up animate-delay-300 animate-on-load">
          <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8">
            <h3 className="text-2xl font-bold mb-3">Your audience is waiting. Don't make them wait longer.</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Every day without consistent content is a day your competitors gain ground. Start free. Upgrade when
              you're ready. Dominate your niche.
            </p>
            <a href="/signup">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:scale-105 transition-transform">
                Start Creating Now - It's Free
              </button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">No credit card required • 10 free posts/month forever</p>
          </div>
        </div>
      </main>
    </div>
  )
}
