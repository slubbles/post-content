import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, MessageSquare, List, GraduationCap, Zap, TrendingUp, Clock, AlertCircle, User } from "lucide-react"
import { Footer } from "@/components/footer"
import { AppNavigation } from "@/components/app-navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background mobile-overflow-safe">
      <AppNavigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-8 sm:py-12 lg:py-20 animate-fade-in">
        <div className="text-center">
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 sm:px-4">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-destructive flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-destructive">
              Inconsistent posting is killing your brand visibility
            </span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-7xl leading-tight">
            A week of posts ready before
            <br className="hidden sm:block" />
            <span className="block sm:inline"> </span>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              you finish scrolling 'for inspiration.'
            </span>
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 lg:mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg px-4 sm:px-0">
            Your audience doesn't care if it's perfect. They care if you show up. Generate authentic posts that sound
            like you—not AI—in seconds.
          </p>
          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-primary px-6 sm:px-8 text-sm sm:text-base hover:scale-105 hover:bg-primary/90 touch-target"
              >
                <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Start Creating Now - It's Free
              </Button>
            </Link>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span>2,847 posts created today</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
              <span>521 users online now</span>
            </div>
          </div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground px-4">
            Join 10,000+ creators. No credit card needed. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Story: Show the transformation */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-8 sm:py-12 lg:py-16 animate-fade-in-up animate-delay-100">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-4">The Reality Nobody Talks About</h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            You want to build your audience, but creating consistent content feels impossible with everything else on
            your plate.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-destructive">The Painful Reality</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">The content struggle is real</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Staring at blank screens</strong> for hours trying to write one good post
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Missing opportunities</strong> because you don't have time to post consistently
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Generic ChatGPT output</strong> that doesn't capture your unique voice or style
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Losing momentum</strong> watching others grow while your profile stays quiet
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your New Reality</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Post consistently without the burnout</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>10 posts in 10 minutes</strong>—get your week's content done in one sitting
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Sounds exactly like you</strong> because the AI learns your unique writing style
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Never miss a day</strong> of posting even when life gets busy
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Actually grow your audience</strong> with consistent, authentic content
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-8 sm:py-12 lg:py-20 animate-fade-in-up animate-delay-200">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4 px-4">
            How It Works
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            From idea to published post in 4 simple steps
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative group">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 text-sm font-semibold text-primary">Step 1</div>
              <h3 className="text-xl font-bold mb-2">Sign up free</h3>
              <p className="text-sm text-muted-foreground">
                Create account in 30 seconds. No credit card needed. Start with 100 free posts monthly.
              </p>
            </div>
            <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="relative group">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 text-sm font-semibold text-primary">Step 2 (Optional)</div>
              <h3 className="text-xl font-bold mb-2">Train your AI</h3>
              <p className="text-sm text-muted-foreground">
                Feed it your best posts. AI learns your voice, style, and tone. Skip this if you want generic output.
              </p>
            </div>
            <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="relative group">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 text-sm font-semibold text-primary">Step 3</div>
              <h3 className="text-xl font-bold mb-2">Generate content</h3>
              <p className="text-sm text-muted-foreground">
                Pick platform, tone, topic. Click generate. Get 5 variants instantly. Choose your favorite.
              </p>
            </div>
            <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="relative group">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 text-sm font-semibold text-primary">Step 4</div>
              <h3 className="text-xl font-bold mb-2">Post & engage</h3>
              <p className="text-sm text-muted-foreground">
                Copy with one click. Post to your platform. Spend saved time engaging with your audience instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mobile-safe-padding mx-auto max-w-7xl py-8 sm:py-12 lg:py-20 animate-fade-in-up animate-delay-300"
      >
        <div className="text-center">
          <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight px-4">
            Your complete content arsenal
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-pretty text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            Stop juggling tools. Everything you need in one place.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-16 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">AI Post Generator</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Hit your weekly content quota in 10 minutes. Twitter, LinkedIn, Facebook, Instagram—all optimized.
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">Smart Reply Assistant</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Never leave comments unanswered. Context-aware replies that match your brand voice, generated in seconds.
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <List className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">Thread Builder</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Turn one idea into viral-worthy threads. Structure your story to keep readers hooked till the end.
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">Voice Training</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Feed the AI your best posts. It learns your style, tone, and keywords so every output sounds like you
              wrote it.
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">Bulk Generation</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Schedule an entire month in one session. Generate 50+ posts and queue them up across all platforms.
            </p>
          </div>

          <div className="group p-4 sm:p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all">
            <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">Performance Analytics</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Track what works. See which AI-generated posts get the most engagement and double down on winners.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8 lg:p-12">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 px-4">Why creators trust PostContent</h3>
            <p className="text-sm sm:text-base text-muted-foreground px-4">Real numbers that make sense</p>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
            <div className="text-center py-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">92%</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">Lower cost vs. hiring help</p>
            </div>
            <div className="text-center py-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">10x</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">More content in the same time</p>
            </div>
            <div className="text-center py-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">100%</div>
              <p className="text-xs sm:text-sm text-muted-foreground px-2">Your authentic voice preserved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Results Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-8 sm:py-12 lg:py-20 animate-fade-in-up animate-delay-400">
        <div className="text-center">
          <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight px-4">
            Real people. Real results.
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 lg:mt-4 max-w-2xl text-pretty text-sm sm:text-base lg:text-lg text-muted-foreground px-4">
            They were stuck in the content struggle. Now they're thriving.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-16 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">SM</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">Sarah Mitchell</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Content Creator</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "Went from 3 posts per week to 15. My engagement doubled because I finally had time to interact instead of
              just write."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">5x content output</div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">JC</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">James Chen</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Marketing Consultant</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "Cut my content budget by $4,200/month. The AI captured my voice so well, clients can't tell the
              difference."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">$4.2k monthly savings</div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">ER</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">Emily Rodriguez</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Solopreneur</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "Finally consistent posting across 4 platforms. My audience grew 3x in 2 months with zero extra stress."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">3x audience growth</div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">MK</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">Marcus Kim</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Agency Owner</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "Scaled from 1 client to 12 without hiring. PostContent is like having a junior content writer for
              $39/month."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">12x client capacity</div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">AL</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">Aisha Lopez</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Personal Brand</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "No more Sunday night panic writing posts. I batch create on Friday afternoons and enjoy my weekends
              again."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">Work-life balance restored</div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg border border-border bg-card">
            <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-xs sm:text-sm font-semibold text-primary">DP</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm truncate">David Park</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Startup Founder</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-2 sm:mb-3">
              "Replaced our $5k/month agency with PostContent. Same quality output, 98% cost reduction. Absolute game
              changer."
            </p>
            <div className="text-[10px] sm:text-xs text-primary font-medium">98% cost savings</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-scale-in animate-delay-500">
        <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bg-primary/10 border-b border-primary/20 py-2 text-center">
            <p className="text-sm font-medium text-primary">
              <Clock className="inline h-4 w-4 mr-1" />
              2,847 posts created in the last 24 hours. Your competitors aren't waiting.
            </p>
          </div>
          <CardContent className="p-12 pt-20 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Don't Let Another Day Go By
              <br />
              <span className="text-primary">Without Growing Your Audience</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              While you're overthinking your next post, 10,000+ creators are using PostContent to engage their audience
              daily. Join them now and never miss a posting opportunity again.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-8 sm:px-10 text-sm sm:text-base hover:scale-105 hover:bg-primary/90 touch-target"
                >
                  <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Claim Your Free Account Now
                </Button>
              </Link>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                Start with 10 free posts per month. No credit card required.
              </p>
              <p className="text-xs text-muted-foreground">Cancel anytime. Keep all your content forever.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
