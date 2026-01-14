"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, Crown, Zap } from "lucide-react"
import Link from "next/link"

const planFeatures = {
  pro: {
    title: "Welcome to Pro!",
    subtitle: "You just leveled up. Here's what changed:",
    features: [
      { text: "200 generations per month (vs 10 on Free)", highlight: true },
      { text: "5 variants per generation (vs 3)", highlight: true },
      { text: "Advanced AI models for better quality", highlight: false },
      { text: "AI training with your writing samples", highlight: false },
      { text: "Priority email support", highlight: false },
      { text: "Full generation history", highlight: false },
    ],
    cta: "Start Generating Pro Content",
    icon: Zap,
    color: "text-primary",
  },
  enterprise: {
    title: "Welcome to Enterprise!",
    subtitle: "You're running at full power now:",
    features: [
      { text: "Unlimited generations (create all you want)", highlight: true },
      { text: "Unlimited variants per generation", highlight: true },
      { text: "Premium AI models (best quality)", highlight: false },
      { text: "Advanced AI training & fine-tuning", highlight: false },
      { text: "24/7 priority support", highlight: false },
      { text: "Team collaboration tools", highlight: false },
      { text: "API access for custom integrations", highlight: false },
    ],
    cta: "Access Your Enterprise Dashboard",
    icon: Crown,
    color: "text-amber-500",
  },
}

export function SuccessContent() {
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState<"pro" | "enterprise" | null>(null)

  useEffect(() => {
    const planParam = searchParams.get("plan")
    if (planParam === "pro" || planParam === "enterprise") {
      setPlan(planParam)
    }
  }, [searchParams])

  const planData = plan ? planFeatures[plan] : null
  const Icon = planData?.icon || Sparkles

  if (!plan) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-in zoom-in">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">You're all set!</CardTitle>
          <CardDescription className="text-base">
            Your account is upgraded and ready to roll. Time to create some magic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Sparkles className="h-5 w-5 text-primary" />
              What you just unlocked:
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span>More generation credits to play with</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span>Advanced AI models for better content</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span>Priority support when you need help</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/generate" className="flex-1">
              <Button className="w-full transition-all hover:scale-[1.02]" size="lg">
                Start Creating
              </Button>
            </Link>
            <Link href="/dashboard/account" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent transition-all hover:scale-[1.02]" size="lg">
                Account Settings
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Check your email for the receipt and subscription details.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full shadow-lg border-primary/30">
      <CardHeader className="text-center">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-in zoom-in ${planData.color}`}
        >
          <Icon className="h-10 w-10" />
        </div>
        <CardTitle className="text-3xl">{planData.title}</CardTitle>
        <CardDescription className="text-base">{planData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
          <ul className="space-y-3">
            {planData.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 ${feature.highlight ? "text-primary" : "text-primary/60"}`}
                />
                <span
                  className={`text-sm ${feature.highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Ready to put your new powers to work?</p>
          <p className="text-xs text-muted-foreground">
            Your upgraded features are active immediately. No waiting, no setup.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/generate" className="flex-1">
            <Button className="w-full transition-all hover:scale-[1.02]" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              {planData.cta}
            </Button>
          </Link>
          <Link href="/dashboard/account/billing" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent transition-all hover:scale-[1.02]" size="lg">
              View Billing
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Receipt sent to your email. Need help?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
