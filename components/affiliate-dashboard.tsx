"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ExternalLink, DollarSign, Users, TrendingUp, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AffiliateStats {
  affiliateUrl: string
  code: string
  totalClicks: number
  totalConversions: number
  totalEarnings: number
  pendingEarnings: number
  paidEarnings: number
  recentReferrals: Array<{
    id: string
    status: string
    commission: number
    createdAt: string
  }>
}

export function AffiliateDashboard() {
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/affiliate/stats")
      if (response.ok) {
        const data = await response.json()
        // Ensure recentReferrals is an array
        setStats({
          ...data,
          recentReferrals: data.recentReferrals || []
        })
      } else {
        throw new Error("Failed to fetch stats")
      }
    } catch (error) {
      console.error("Affiliate stats error:", error)
      toast({
        title: "Error loading stats",
        description: "Unable to load your affiliate data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Affiliate link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading your affiliate stats...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Unable to load affiliate dashboard</p>
          <Button onClick={fetchStats} variant="outline" className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const conversionRate = stats.totalClicks > 0 
    ? ((stats.totalConversions / stats.totalClicks) * 100).toFixed(1) 
    : "0.0"

  return (
    <div className="space-y-6">
      {/* Affiliate Link Card */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Your Affiliate Link</CardTitle>
          <CardDescription>Share this link to start earning 30% recurring commission</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={stats.affiliateUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              onClick={() => copyToClipboard(stats.affiliateUrl)}
              variant="outline"
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => window.open(stats.affiliateUrl, "_blank")}
              variant="outline"
              className="shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Your code:</span>
            <code className="rounded bg-muted px-2 py-1 font-mono">{stats.code}</code>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Paying customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.pendingEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              To be paid next cycle
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${stats.totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ${stats.paidEarnings.toFixed(2)} paid out
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
          <CardDescription>Your latest conversions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentReferrals.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No referrals yet. Start sharing your link!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        referral.status === "paid"
                          ? "default"
                          : referral.status === "converted"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {referral.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="font-semibold">
                    ${referral.commission.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="font-medium mb-2">Commission Structure:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 30% recurring commission on all plans</li>
              <li>• 90-day cookie tracking window</li>
              <li>• Monthly payouts via Polar.sh</li>
              <li>• Minimum payout: $50</li>
            </ul>
          </div>
          <div className="pt-3 border-t">
            <p className="text-sm text-muted-foreground">
              Questions? Contact{" "}
              <a
                href="mailto:affiliates@postcontent.io"
                className="text-primary hover:underline"
              >
                affiliates@postcontent.io
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
