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

        {/* Hook */}
        <div className="mb-8 sm:mb-12 text-center px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Earn While You Sleep</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Turn your audience into{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              recurring revenue
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your followers already ask for tool recommendations. Why not get paid every month for helping them? 30% recurring commission. No cap. No expiration.
          </p>
        </div>

        {/* Story: Show the transformation */}
        <div className="mb-10 sm:mb-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">The Old Way vs. The PostContent Way</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-destructive">Other Affiliate Programs:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>One-time payouts that disappear after the first month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Low conversion because the product doesn't actually solve a problem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>30-day cookies that expire before your audience even decides</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Generic promo materials that don't match your brand</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">PostContent Affiliate Program:</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>30% recurring every single month</strong> for the lifetime of each customer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>High conversion</strong> because content creators actually need this tool daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>90-day cookie window</strong> so you never lose a commission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Custom promo kit</strong> with emails, graphics, and video demos ready to use</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-10 sm:mb-16 grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader className="p-4 sm:p-6">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">30% Recurring Commission</CardTitle>
              <CardDescription className="text-sm">
                Not one-time. Every single month. As long as they stay subscribed, you earn.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader className="p-4 sm:p-6">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">90-Day Cookie</CardTitle>
              <CardDescription className="text-sm">
                Your audience researches before buying. We wait 90 days. You still get credited.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader className="p-4 sm:p-6">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
              <CardTitle className="text-lg sm:text-xl">Real-Time Tracking</CardTitle>
              <CardDescription className="text-sm">
                See every click, signup, and dollar earned instantly in your dashboard. No waiting weeks for reports.
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

        {/* Offer: Clear CTA with urgency */}
        <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-background to-primary/5 p-6 sm:p-8 lg:p-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">287 affiliates joined this month</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Start Earning Recurring Revenue Today</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground px-4 max-w-2xl mx-auto mb-6">
            Applications are approved within 24 hours. Top affiliates earn $2,000-$5,000/month in recurring commissions. Your first payout comes 30 days after your first referral converts.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="mailto:affiliates@postcontent.io?subject=Affiliate Program Application" className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto touch-target">
                Apply Now - It's Free
              </Button>
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              <strong className="text-foreground">Limited spots:</strong> We only accept affiliates who can drive quality signups
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              Questions? Email{" "}
              <a href="mailto:affiliates@postcontent.io" className="text-primary hover:underline font-medium">
                affiliates@postcontent.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
