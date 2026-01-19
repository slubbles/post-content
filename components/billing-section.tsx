"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, ExternalLink, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function BillingSection() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Unable to load billing data</div>
  }

  const plan = user?.plan || "free"
  const creditsUsed = user?.creditsUsed || 0
  const totalCredits = user?.creditLimit || (plan === "free" ? 10 : plan === "pro" ? 200 : 999999)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your subscription details and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold capitalize">{plan}</p>
                <Badge>{plan === "free" ? "Active" : "Subscribed"}</Badge>
              </div>
            </div>
            {plan !== "free" && (
              <Button variant="outline" className="bg-transparent">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Credits Used</span>
              <span className="font-medium tabular-nums">
                {creditsUsed}/{totalCredits === 999999 ? "∞" : totalCredits}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: totalCredits === 999999 ? "0%" : `${(creditsUsed / totalCredits) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {plan === "free" ? "Resets monthly" : "Resets on billing cycle"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Stats</CardTitle>
          <CardDescription>See how you're using PostContent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Posts Generated</p>
              <p className="text-2xl font-bold">{creditsUsed}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Credits Remaining</p>
              <p className="text-2xl font-bold">
                {totalCredits === 999999 ? "∞" : totalCredits - creditsUsed}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">{creditsUsed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {plan === "free" && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Upgrade for More Credits</CardTitle>
            </div>
            <CardDescription>Get more generations and unlock premium features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>200 generations per month (Pro) or Unlimited (Enterprise)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Advanced AI models for better content</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Priority support when you need help</span>
              </div>
            </div>
            <Link href="/pricing">
              <Button className="w-full">
                View Plans
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
