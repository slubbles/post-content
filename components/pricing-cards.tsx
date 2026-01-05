"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out the platform",
    features: ["10 generations per month", "Basic AI models", "3 variants per generation", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 19,
    description: "For content creators and marketers",
    features: [
      "200 generations per month",
      "Advanced AI models",
      "5 variants per generation",
      "Priority support",
      "AI training with examples",
      "Generation history",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For teams and agencies",
    features: [
      "Unlimited generations",
      "Premium AI models",
      "Unlimited variants",
      "24/7 priority support",
      "Advanced AI training",
      "Team collaboration",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false)

  const handleSubscribe = async (planName: string, price: number) => {
    if (planName === "Free") {
      window.location.href = "/signup"
      return
    }

    if (planName === "Enterprise") {
      window.location.href = "mailto:sales@postcontent.io"
      return
    }

    // In a real app, this would create a checkout session with Polar.sh
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName, isAnnual }),
      })

      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-4">
        <span
          className={`text-sm transition-colors ${isAnnual ? "text-muted-foreground" : "font-medium text-foreground"}`}
        >
          Monthly
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Toggle annual billing"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform ${
              isAnnual ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span
          className={`text-sm transition-colors ${!isAnnual ? "text-muted-foreground" : "font-medium text-foreground"}`}
        >
          Annual{" "}
          <Badge variant="secondary" className="ml-1">
            Save 20%
          </Badge>
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const displayPrice = isAnnual && plan.price > 0 ? Math.floor(plan.price * 0.8 * 12) : plan.price

          return (
            <Card
              key={plan.name}
              className={`transition-all hover:shadow-md ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>}
                </div>
                <CardDescription className="text-pretty">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${displayPrice}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/{isAnnual ? "year" : "month"}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-full transition-transform hover:scale-105"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name, displayPrice)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
