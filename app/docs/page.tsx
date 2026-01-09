import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, BookOpen, Video, Code, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Documentation - PostContent",
  description: "Learn how to use PostContent to generate amazing social media content.",
}

const docCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of PostContent and get up and running quickly.",
    icon: BookOpen,
    links: [
      { label: "Quick Start Guide", href: "#" },
      { label: "Creating Your First Post", href: "#" },
      { label: "Understanding Credits", href: "#" },
      { label: "Account Setup", href: "#" },
    ],
  },
  {
    title: "Features",
    description: "Deep dive into all the powerful features PostContent offers.",
    icon: Video,
    links: [
      { label: "Post Generator", href: "#" },
      { label: "Reply Generator", href: "#" },
      { label: "Thread Builder", href: "#" },
      { label: "AI Training", href: "#" },
    ],
  },
  {
    title: "API Reference",
    description: "Integrate PostContent into your applications programmatically.",
    icon: Code,
    links: [
      { label: "Authentication", href: "#" },
      { label: "Generate Endpoints", href: "#" },
      { label: "Rate Limits", href: "#" },
      { label: "Webhooks", href: "#" },
    ],
  },
  {
    title: "Best Practices",
    description: "Tips and guidelines for getting the most out of PostContent.",
    icon: FileText,
    links: [
      { label: "Writing Effective Prompts", href: "#" },
      { label: "Tone & Voice Guidelines", href: "#" },
      { label: "Content Calendar Planning", href: "#" },
      { label: "Analytics & Optimization", href: "#" },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="mx-auto max-w-7xl mobile-safe-padding py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about using PostContent effectively
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {docCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold">Need More Help?</h2>
          <p className="mt-2 text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline">Browse FAQ</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
