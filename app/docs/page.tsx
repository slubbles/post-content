import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { BookOpen, Video, Code, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"

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
      { label: "Quick Start Guide", href: "/docs/quick-start" },
      { label: "Understanding Pricing", href: "/pricing" },
      { label: "Account Setup", href: "/signup" },
      { label: "Credits System", href: "/docs/credits" },
    ],
  },
  {
    title: "Features",
    description: "Deep dive into all the powerful features PostContent offers.",
    icon: Video,
    links: [
      { label: "Post Generator", href: "/dashboard/generate" },
      { label: "Reply Generator", href: "/dashboard/reply" },
      { label: "Thread Builder", href: "/dashboard/thread" },
      { label: "AI Voice Training", href: "/dashboard/train" },
    ],
  },
  {
    title: "Product Roadmap",
    description: "See what features we're building next and our vision for the future.",
    icon: Code,
    links: [
      { label: "2026 Roadmap", href: "/docs/roadmap" },
      { label: "Recently Shipped", href: "/docs/roadmap#completed" },
      { label: "Feature Requests", href: "/contact" },
      { label: "Changelog", href: "/blog" },
    ],
  },
  {
    title: "Help & Support",
    description: "Get help and learn best practices for content creation.",
    icon: FileText,
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Support", href: "/contact" },
      { label: "Best Practices", href: "/blog/ai-content-generation-guide-2026" },
      { label: "Community", href: "/contact" },
    ],
  },
]

export default async function DocsPage() {
  const session = await auth()
  const isAuthenticated = !!session?.user

  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={isAuthenticated} user={session?.user} />

      <div className="mx-auto max-w-4xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">Documentation</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using PostContent effectively
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
          {docCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2.5 sm:space-y-3">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline touch-target"
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

        <div className="mt-8 sm:mt-12 rounded-lg border border-border bg-card p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold">Need More Help?</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground px-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto touch-target">Contact Support</Button>
            </Link>
            <Link href="/faq" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto touch-target bg-transparent">
                Browse FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
