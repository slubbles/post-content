import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Roadmap - PostContent",
  description: "See what's coming next for PostContent. Our product roadmap for 2026.",
}

const roadmapQuarters = [
  {
    quarter: "Q1 2026",
    status: "In Progress",
    icon: Clock,
    features: [
      {
        title: "Image Generation",
        description: "Generate custom images for your posts using AI",
        status: "planned",
      },
      {
        title: "Video Script Generator",
        description: "Create engaging video scripts for TikTok, YouTube Shorts, and Reels",
        status: "planned",
      },
      {
        title: "Content Calendar",
        description: "Schedule and plan your content weeks in advance",
        status: "planned",
      },
      {
        title: "Browser Extension",
        description: "Generate content directly from any website",
        status: "in-progress",
      },
    ],
  },
  {
    quarter: "Q2 2026",
    status: "Planned",
    icon: Sparkles,
    features: [
      {
        title: "Team Collaboration",
        description: "Invite team members, share voice profiles, and collaborate on content",
        status: "planned",
      },
      {
        title: "Advanced Analytics",
        description: "Track which posts perform best and get AI-powered insights",
        status: "planned",
      },
      {
        title: "Multi-language Support",
        description: "Generate content in 20+ languages",
        status: "planned",
      },
      {
        title: "Content Templates",
        description: "Save and reuse your best-performing content formats",
        status: "planned",
      },
    ],
  },
  {
    quarter: "Q3 2026",
    status: "Planned",
    icon: Sparkles,
    features: [
      {
        title: "API Access",
        description: "Integrate PostContent into your own applications",
        status: "planned",
      },
      {
        title: "Zapier Integration",
        description: "Connect PostContent to 5000+ apps",
        status: "planned",
      },
      {
        title: "White Label Solution",
        description: "Rebrand PostContent for your agency clients",
        status: "planned",
      },
      {
        title: "Advanced Voice Cloning",
        description: "Even more accurate voice matching with sentiment analysis",
        status: "planned",
      },
    ],
  },
  {
    quarter: "Q4 2026",
    status: "Planned",
    icon: Sparkles,
    features: [
      {
        title: "Mobile Apps",
        description: "Native iOS and Android apps for on-the-go content creation",
        status: "planned",
      },
      {
        title: "Video Generation",
        description: "Generate short-form videos with AI voiceover",
        status: "planned",
      },
      {
        title: "Community Features",
        description: "Share templates, collaborate with other creators",
        status: "planned",
      },
      {
        title: "Enterprise Plan",
        description: "Custom pricing, dedicated support, and advanced security",
        status: "planned",
      },
    ],
  },
]

const completedFeatures = [
  "AI Post Generation for 5+ platforms",
  "Reply Generator with context awareness",
  "Thread Builder for long-form content",
  "Voice Training from sample posts",
  "Multiple tone options",
  "Credit-based pricing system",
  "User authentication & profiles",
  "Post history tracking",
  "Email verification",
  "OAuth login (Google)",
]

export default async function RoadmapPage() {
  const session = await auth()
  const isAuthenticated = !!session?.user

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={isAuthenticated} user={session?.user} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href="/docs">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Docs
          </Button>
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Product Roadmap</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what we're building next. Our roadmap is driven by user feedback and market needs.
          </p>
        </div>

        {/* Completed Features */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Recently Shipped</CardTitle>
            </div>
            <CardDescription>Features that are already live in production</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {completedFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quarterly Roadmap */}
        <div className="space-y-8">
          {roadmapQuarters.map((quarter, index) => {
            const Icon = quarter.icon
            return (
              <Card key={quarter.quarter} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{quarter.quarter}</CardTitle>
                        <CardDescription className="mt-1">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              quarter.status === "In Progress"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-gray-500/10 text-muted-foreground"
                            }`}
                          >
                            {quarter.status}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {quarter.features.map((feature) => (
                      <div key={feature.title} className="rounded-lg border border-border p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{feature.title}</h3>
                          {feature.status === "in-progress" && (
                            <span className="flex h-2 w-2 mt-1.5">
                              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Request Feature CTA */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Have a Feature Request?</CardTitle>
            <CardDescription>We'd love to hear your ideas for PostContent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our roadmap is heavily influenced by user feedback. If you have a feature you'd love to see, let us know!
            </p>
            <Link href="/contact">
              <Button>Submit Feature Request</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
