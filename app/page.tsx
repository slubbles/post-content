import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  MessageSquare,
  List,
  GraduationCap,
  Zap,
  TrendingUp,
  Clock,
  AlertCircle,
  Target,
  Shield,
  Users,
  User,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { AppNavigation } from "@/components/app-navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-fade-in">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Inconsistent posting is killing your brand visibility
            </span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Create 10 posts in the time
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              it takes to write one
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
            Marketing teams are drowning in content demands. Multiple platforms, daily posting, maintaining brand
            voice—all while proving ROI. Generate on-brand posts that sound human, not AI, in seconds.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-primary px-6 text-base hover:scale-105 hover:bg-primary/90 sm:w-auto sm:px-8"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating Now - It's Free
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>2,847 posts created today</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>521 users online now</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Join 10,000+ creators. No credit card needed. Cancel anytime.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-fade-in-up animate-delay-400 animate-on-load">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From idea to published post in 4 simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Story: Show the transformation */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16 animate-fade-in-up animate-delay-100 animate-on-load">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Marketing Reality Nobody Talks About</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your boss wants daily posts. Your audience wants authenticity. Your budget wants efficiency. You're stuck in
            the middle.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-destructive">The Painful Reality</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">The content hamster wheel is exhausting you</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>5 platforms, 3 posts per day</strong>—that's 105 posts per week to write
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Brand voice inconsistency</strong> when juggling multiple clients or campaigns
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Expensive freelancers or agencies</strong> who don't quite get your brand
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">
                  <strong>Generic ChatGPT output</strong> that screams "AI wrote this" and hurts engagement
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your New Reality</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Scale your content without scaling your budget</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>15 posts in 10 minutes</strong>—hit your weekly quota before lunch on Monday
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Perfect brand consistency</strong> across all platforms because AI learns YOUR voice
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Save $3,000+/month</strong> compared to hiring freelancers or agencies
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">
                  <strong>Human-sounding content</strong> that passes the "does this sound like us?" test
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* New Section Added */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-fade-in-up animate-delay-200 animate-on-load">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Step-by-step guide to using PostContent
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
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
        className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-fade-in-up animate-delay-300 animate-on-load"
      >
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Your complete content arsenal
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Stop juggling tools. Everything you need in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Post Generator</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Hit your weekly content quota in 10 minutes. Twitter, LinkedIn, Facebook, Instagram—all optimized.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <Target className="h-3 w-3" />
                <span>Platform-specific optimization</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reply Assistant</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Never leave comments unanswered. Context-aware replies that match your brand voice, generated in
                seconds.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <Shield className="h-3 w-3" />
                <span>Brand voice protection</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <List className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thread Builder</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Turn one idea into viral-worthy threads. Structure your story to keep readers hooked till the end.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <TrendingUp className="h-3 w-3" />
                <span>Engagement-optimized flow</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Voice Training</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Feed the AI your best posts. It learns your style, tone, and keywords so every output sounds like you
                wrote it.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <Users className="h-3 w-3" />
                <span>Personalized to your brand</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Generation</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Schedule an entire month in one session. Generate 50+ posts and queue them up across all platforms.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <Clock className="h-3 w-3" />
                <span>Batch processing for scale</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                Track what works. See which AI-generated posts get the most engagement and double down on winners.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary/80">
                <Target className="h-3 w-3" />
                <span>Data-driven optimization</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Why marketers trust PostContent</h3>
            <p className="text-muted-foreground">Logic that makes sense for your business</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">92%</div>
              <p className="text-sm text-muted-foreground">Lower cost vs. hiring freelancers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10x</div>
              <p className="text-sm text-muted-foreground">More content in the same time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Brand voice consistency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Marketers Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-fade-in-up animate-delay-400 animate-on-load">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Real marketers. Real results.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">
            They were drowning in content demands. Now they're thriving.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">SM</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-xs text-muted-foreground">Content Manager @ TechCorp</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "Went from 3 posts per week to 15. My engagement doubled because I finally had time to interact instead
                of just write."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">5x content output</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">JC</span>
                </div>
                <div>
                  <p className="font-semibold">James Chen</p>
                  <p className="text-xs text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "Cut our content budget by $4,200/month. The AI captured our brand voice so well, clients can't tell the
                difference."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">$4.2k monthly savings</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">ER</span>
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Social Media Lead</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "Finally consistent posting across 4 platforms. My boss asked what changed—I just work smarter now, not
                harder."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">100% consistency</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">MK</span>
                </div>
                <div>
                  <p className="font-semibold">Marcus Kim</p>
                  <p className="text-xs text-muted-foreground">Founder @ GrowthLab</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "Scaled from 1 client to 12 without hiring. PostContent is like having a junior content writer for
                $39/month."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">12x client capacity</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">AL</span>
                </div>
                <div>
                  <p className="font-semibold">Aisha Lopez</p>
                  <p className="text-xs text-muted-foreground">Brand Manager</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "No more Sunday night panic writing posts for Monday. I batch create on Friday afternoons and enjoy my
                weekends again."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">Work-life balance restored</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-semibold text-primary">DP</span>
                </div>
                <div>
                  <p className="font-semibold">David Park</p>
                  <p className="text-xs text-muted-foreground">Startup CMO</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground mb-3">
                "Replaced our $5k/month agency with PostContent. Same quality output, 98% cost reduction. Absolute game
                changer."
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">98% cost savings</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20 animate-scale-in animate-delay-500 animate-on-load">
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
                  className="rounded-full bg-primary px-8 text-base hover:scale-105 hover:bg-primary/90"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
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
