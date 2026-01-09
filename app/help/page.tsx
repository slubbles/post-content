import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Search, BookOpen, MessageCircle, Mail, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Help Center - PostContent",
  description: "Get help and support for using PostContent.",
}

const helpTopics = [
  {
    title: "Account & Billing",
    icon: HelpCircle,
    questions: [
      "How do I upgrade my plan?",
      "How do credits work?",
      "Can I cancel anytime?",
      "How do I update my payment method?",
    ],
  },
  {
    title: "Using PostContent",
    icon: BookOpen,
    questions: [
      "How do I generate my first post?",
      "What's the difference between Generate and Reply?",
      "How does AI training work?",
      "Can I save my generated content?",
    ],
  },
  {
    title: "Troubleshooting",
    icon: MessageCircle,
    questions: [
      "Why isn't my post generating?",
      "How do I reset my password?",
      "My credits aren't updating",
      "I'm getting an error message",
    ],
  },
]

export default function HelpPage() {
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Help Center</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions and get support</p>
        </div>

        <div className="mb-12 mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search for help..." className="pl-10 py-6 text-base" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {helpTopics.map((topic, index) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.questions.map((question) => (
                      <li key={question}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                        >
                          {question}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Mail className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Get help from our support team. We typically respond within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contact">
                <Button className="w-full">Contact Us</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse our comprehensive guides and tutorials for detailed information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/docs">
                <Button variant="outline" className="w-full bg-transparent">
                  View Docs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
