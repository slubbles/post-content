import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  MessageSquare,
  List,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  Clock,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { AppNavigation } from "@/components/app-navigation"

const steps = [
  {
    number: "01",
    title: "Choose Your Content Type",
    description:
      "Select from Generate Posts, Reply to Posts, Create Threads, or Train AI. Each tool is optimized for different content needs.",
    icon: Target,
  },
  {
    number: "02",
    title: "Input Your Idea",
    description:
      "Enter your topic, select your platform (LinkedIn, Twitter, Instagram, etc.), and pick your tone. That's all you need.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Get Multiple Variants",
    description:
      "Our AI generates 3 unique approaches—contrarian, story-based, and data-driven—so you can pick what resonates best.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Copy & Post",
    description: "One click to copy. Paste it wherever you post. Done in under 60 seconds.",
    icon: Clock,
  },
]

const features = [
  {
    title: "Generate Posts",
    description: "Create engaging posts for any platform. One idea, multiple platforms, optimized for each.",
    icon: Sparkles,
    href: "/dashboard/generate",
    benefits: ["Multi-platform support", "3 unique variants", "Platform-specific formatting"],
  },
  {
    title: "Reply to Posts",
    description: "Craft thoughtful replies that start conversations and build relationships.",
    icon: MessageSquare,
    href: "/dashboard/reply",
    benefits: ["Context-aware responses", "Multiple tone options", "Engagement-focused"],
  },
  {
    title: "Create Threads",
    description: "Turn complex ideas into compelling thread narratives that keep readers hooked.",
    icon: List,
    href: "/dashboard/thread",
    benefits: ["Auto-split content", "Hook optimization", "Flow structure"],
  },
  {
    title: "Train AI",
    description: "Feed it your best posts. It learns your voice. Every output sounds authentically you.",
    icon: GraduationCap,
    href: "/dashboard/train",
    benefits: ["Voice matching", "Style learning", "Continuous improvement"],
  },
]

export const metadata = {
  title: "How It Works | PostContent - AI Social Media Content Generator",
  description:
    "Learn how PostContent helps you create a week of social media content in minutes. Simple 4-step process to generate authentic posts.",
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16 lg:py-24">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple. Fast. Authentic.</span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            From idea to published post
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              in under 60 seconds
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            No complicated setup. No learning curve. Just type your idea, pick your platform, and get content that
            sounds like you wrote it.
          </p>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps. No complexity. Just results.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-4" />
              )}
              <Card className="relative h-full border-border/50 bg-card/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Four Powerful Tools</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each tool is built for a specific content need. Use them together to dominate every platform.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2 mb-6">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="group/btn bg-transparent">
                        Try {feature.title.split(" ")[0]}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mobile-safe-padding mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <CardContent className="p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Ready to create a week of content
              <br />
              <span className="text-primary">in 30 minutes?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join 10,000+ creators who stopped stressing about content and started showing up consistently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="rounded-full px-8">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Creating - It's Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required. 10 free posts to start.</p>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
