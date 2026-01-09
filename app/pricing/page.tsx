import { AppNavigation } from "@/components/app-navigation"
import { PricingCards } from "@/components/pricing-cards"
import { Suspense } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-7xl mobile-safe-padding py-12 sm:py-16 lg:py-20">
        <div className="mb-16 text-center space-y-6 animate-fade-in">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Plans and Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            Choose the plan that fits your content needs. Start free, upgrade when you're ready.
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-100 animate-on-load">
          <Suspense fallback={<LoadingSpinner />}>
            <PricingCards />
          </Suspense>
        </div>

        <div className="mt-20 animate-fade-in-up animate-delay-200 animate-on-load">
          <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">What counts as a generation?</AccordionTrigger>
                <AccordionContent>
                  One click = one credit. Simple. Want 5 different variants? Still one credit. We're not here to nickel
                  and dime you. We want you to experiment, find what resonates, and grow your audience faster.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Can I upgrade or downgrade anytime?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Launch week? Scale up. Vacation month? Scale down. Life happens. Your billing should
                  adapt. No contracts, no penalties, no awkward conversations with sales. Just instant changes that work
                  for YOU.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What if I run out of credits?</AccordionTrigger>
                <AccordionContent>
                  Your account stays active, your history is safe. Upgrade instantly for more credits or wait for your
                  monthly refresh. We'll never hold your content hostage. Once you create it, it's yours forever—even if
                  you downgrade to free.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Why should I pay when ChatGPT is free?</AccordionTrigger>
                <AccordionContent>
                  Because ChatGPT doesn't know YOUR voice. It sounds generic, robotic, fake. PostContent trains on YOUR
                  writing style so every post sounds authentically you. Plus: no copy-pasting, no prompt engineering, no
                  15-minute detours. Just instant, on-brand content.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in-up animate-delay-300 animate-on-load">
          <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8">
            <h3 className="text-2xl font-bold mb-3">Ready to scale your content?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Start free and upgrade when you need more power. No contracts, no commitments.
            </p>
            <a href="/signup">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:scale-105 transition-transform">
                Start Creating Now - It's Free
              </button>
            </a>
            <p className="text-xs text-muted-foreground mt-3">No credit card required</p>
          </div>
        </div>
      </main>
    </div>
  )
}
