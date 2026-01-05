import { AppNavigation } from "@/components/app-navigation"
import { PricingCards } from "@/components/pricing-cards"
import { Suspense } from "react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Pick your plan, skip the commitment drama
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">Cancel anytime. Upgrade anytime. We're cool like that.</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PricingCards />
        </Suspense>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Questions? We've got answers.</h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold">What counts as a generation?</h3>
              <p className="text-sm text-muted-foreground">
                Each time you hit that generate button (posts, replies, or threads), that's 1 credit. Want 5 variants?
                Still just 1 credit. We're generous like that.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely. Change plans whenever you want. No questions asked, no hassle, just instant changes.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-semibold">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                All major credit cards, debit cards, and digital payment methods. If your bank likes it, we accept it.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
