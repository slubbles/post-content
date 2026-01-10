import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import { DollarSign, Users, TrendingUp, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Affiliate Program - PostContent",
  description: "Join our affiliate program and earn 30% recurring commission by promoting PostContent.",
}

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-7xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-6 sm:mb-8"></div>

        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">Affiliate Program</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn 30% recurring commission by promoting PostContent to your audience
          </p>
        </div>

        <div className="mb-10 sm:mb-16 grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">30% Recurring Commission</CardTitle>
              <CardDescription className="text-sm">Earn for the lifetime of each customer you refer</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">90-Day Cookie</CardTitle>
              <CardDescription className="text-sm">
                Get credited for referrals up to 90 days after click
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">Real-Time Tracking</CardTitle>
              <CardDescription className="text-sm">
                Track clicks, signups, and earnings in your dashboard
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-4 sm:px-0">How It Works</h2>
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base flex-shrink-0">
                    1
                  </div>
                  <div>
                    <CardTitle className="mb-1.5 sm:mb-2 text-base sm:text-lg">Sign Up for Free</CardTitle>
                    <CardDescription className="text-sm">
                      Join our affiliate program and get your unique referral link instantly
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base flex-shrink-0">
                    2
                  </div>
                  <div>
                    <CardTitle className="mb-1.5 sm:mb-2 text-base sm:text-lg">Share PostContent</CardTitle>
                    <CardDescription className="text-sm">
                      Promote PostContent to your audience through blog posts, social media, email, or videos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base flex-shrink-0">
                    3
                  </div>
                  <div>
                    <CardTitle className="mb-1.5 sm:mb-2 text-base sm:text-lg">Earn Recurring Commission</CardTitle>
                    <CardDescription className="text-sm">
                      Get paid 30% monthly commission for every customer who signs up through your link
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-4 sm:px-0">Who Should Join?</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Content Creators</CardTitle>
                <CardDescription className="text-sm">
                  YouTubers, bloggers, and influencers who create content about social media marketing, AI tools, or
                  productivity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Marketing Agencies</CardTitle>
                <CardDescription className="text-sm">
                  Agencies managing social media for clients who need efficient content creation tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Social Media Experts</CardTitle>
                <CardDescription className="text-sm">
                  Consultants and coaches teaching others how to grow their social media presence
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">SaaS Reviewers</CardTitle>
                <CardDescription className="text-sm">
                  Tech reviewers and comparison sites featuring productivity and AI tools
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Card className="mb-8 sm:mb-12">
          <CardHeader className="p-4 sm:p-6">
            <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
            <CardTitle className="text-lg sm:text-xl">Promotional Resources</CardTitle>
            <CardDescription className="text-sm">
              Get everything you need to promote PostContent successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>• Pre-written email templates</li>
              <li>• Social media graphics and banners</li>
              <li>• Video demo links</li>
              <li>• Case studies and testimonials</li>
              <li>• Product screenshots and logos</li>
              <li>• Dedicated affiliate support team</li>
            </ul>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold">Ready to Start Earning?</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground px-4">
            Join hundreds of affiliates already earning recurring commissions with PostContent
          </p>
          <div className="mt-4 sm:mt-6">
            <a href="mailto:affiliates@postcontent.io" className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto touch-target">
                Apply Now
              </Button>
            </a>
          </div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground px-4">
            Questions? Email us at{" "}
            <a href="mailto:affiliates@postcontent.io" className="text-primary hover:underline">
              affiliates@postcontent.io
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
