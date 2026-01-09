import { AppNavigation } from "@/components/app-navigation"
import { PricingCards } from "@/components/pricing-cards"
import { Suspense } from "react"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-7xl mobile-safe-padding py-12 sm:py-16 lg:py-20">
        <div className="mb-16 text-center space-y-6">
          {/* HOOK: Attention-grabbing problem */}
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Stop paying per post. Start paying for results.
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Plans and Pricing</h1>

          {/* STORY: Transformation narrative */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            Join 10,000+ creators who ditched expensive copywriters and time-consuming brainstorms. Generate unlimited
            content that sounds like you, not a robot.
          </p>

          {/* OFFER: Clear value proposition */}
          <div className="flex flex-col items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>Start free, no credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>Upgrade anytime, cancel instantly</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>Used by developers at Google, Meta, and Y Combinator startups</span>
            </div>
          </div>
        </div>
        {/* </CHANGE> */}

        <Suspense fallback={<div>Loading...</div>}>
          <PricingCards />
        </Suspense>

        <div className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold">Questions? We've got answers.</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">What counts as a generation?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each time you hit that generate button (posts, replies, or threads), that's 1 credit. Want 5 variants?
                Still just 1 credit. We're generous like that because we want you to experiment and find what works.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. Change plans whenever you want. Scale up during launch week, scale down during quiet months.
                No questions asked, no hassle, just instant changes that match your needs.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All major credit cards, debit cards, and digital payment methods through our secure payment partner
                Polar.sh. Your payment info is encrypted and we never store it on our servers.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold text-lg">What if I run out of credits?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your account stays active and your history remains accessible. You can upgrade instantly to get more
                credits or wait until your next billing cycle for a refill. No content is ever lost.
              </p>
            </div>
          </div>
        </div>
        {/* </CHANGE> */}
      </main>
    </div>
  )
}
