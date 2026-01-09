import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, MessageSquare, List, GraduationCap, Zap, TrendingUp } from "lucide-react"
import { Footer } from "@/components/footer"
import { AppNavigation } from "@/components/app-navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Stop staring at blank screens</span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Create X/Twitter posts
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              10x faster with AI
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl">
            AI-powered content generator for X/Twitter. Train it on your writing style, generate posts in seconds that
            sound like you—not generic ChatGPT.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-primary px-6 text-base hover:scale-105 hover:bg-primary/90 sm:w-auto sm:px-8"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full bg-transparent px-6 text-base hover:scale-105 sm:w-auto sm:px-8"
              >
                See Features
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">10 free posts/month. No credit card needed.</p>
        </div>
      </section>

      {/* Story: Show the transformation */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-destructive">Without PostContent</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Posting feels like work</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">Spending hours writing one post</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">Generic AI that sounds robotic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">Inconsistent posting schedule</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-destructive">✗</span>
                <span className="text-muted-foreground">Content that doesn't sound like you</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">With PostContent</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Posting becomes effortless</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">10+ posts generated in 5 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">AI trained on YOUR voice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">Post daily without burnout</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-muted-foreground">Authentic content that builds trust</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Everything you need to dominate your content game
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Built for creators who want quality content without burning out.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Generation</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Generate platform-optimized posts for Twitter, LinkedIn, Facebook, and Instagram in seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Replies</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Craft perfect responses to comments and posts with context-aware AI that matches your tone.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <List className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Thread Builder</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Create compelling multi-post threads that tell your story and keep readers engaged.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI Training</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Train the AI on your writing style, brand voice, and preferred keywords for personalized content.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Generate content in seconds, not hours. Spend less time writing, more time engaging.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Better Engagement</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Create content that resonates with your audience and drives real engagement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Loved by creators everywhere
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:mt-4 sm:text-lg">
            See what people are saying about Post Content
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          <Card className="border-border transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-semibold text-primary">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Sarah Mitchell</p>
                  <p className="text-xs text-muted-foreground">Content Creator</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground text-sm">
                "This tool saved me hours every week. I can focus on engaging with my audience instead of staring at a
                blank screen."
              </p>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-semibold text-primary">JC</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">James Chen</p>
                  <p className="text-xs text-muted-foreground">Marketing Manager</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground text-sm">
                "The AI understands my brand voice perfectly. It's like having a writing assistant who actually gets
                me."
              </p>
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-semibold text-primary">ER</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Emily Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Entrepreneur</p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground text-sm">
                "Finally, a tool that doesn't make my posts sound robotic. The variety of tones is perfect for different
                platforms."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-20">
        <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to transform your content creation?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Join thousands of creators who've ditched writer's block and started posting with confidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-8 text-base hover:scale-105 hover:bg-primary/90"
                >
                  Get Started Free
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">No credit card required</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
