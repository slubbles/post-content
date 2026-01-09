"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out the platform",
    features: ["10 generations per month", "Basic AI models", "3 variants per generation", "Email support"],
    cta: "Start Free",
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
    cta: "Select Plan",
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
    cta: "Select Plan",
    popular: false,
  },
]

export function PricingCards() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        setIsAuthenticated(response.ok)
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const handleSubscribe = async (planName: string) => {
    if (!isAuthenticated && planName !== "Free") {
      toast({
        title: "Login required",
        description: "Please sign in to upgrade your plan",
      })
      router.push("/")
      return
    }

    if (planName === "Free") {
      window.location.href = "/signup"
      return
    }

    if (planName === "Enterprise") {
      window.location.href = "mailto:sales@postcontent.io"
      return
    }

    setLoadingPlan(planName)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to start checkout")
      }

      const data = await response.json()
      if (data.checkoutUrl) {
        toast({
          title: "Redirecting to checkout",
          description: "Please wait while we redirect you to secure payment...",
        })
        window.location.href = data.checkoutUrl
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      toast({
        title: "Checkout failed",
        description:
          error instanceof Error ? error.message : "Unable to start checkout. Please try again or contact support.",
        variant: "destructive",
      })
      setLoadingPlan(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const isLoading = loadingPlan === plan.name

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
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
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
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan !== null}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting checkout...
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
