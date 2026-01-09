import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, Search, BookOpen, MessageCircle, Mail, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Help Center - PostContent",
  description: "Get help and support for using PostContent.",
}

const helpTopics = [
  {
    title: "Account & Billing",
    icon: HelpCircle,
    questions: [
      {
        q: "How do I upgrade my plan?",
        a: "Click on your profile avatar in the top right, then select 'Upgrade Plan' or visit the Pricing page. Choose your desired plan and complete the payment process.",
      },
      {
        q: "How do credits work?",
        a: "Each generation uses 1 credit. Credits reset monthly on your billing date. Free accounts get 10 credits/month, Pro gets 100 credits/month.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes! You can cancel your subscription from your account settings at any time. You'll retain access until the end of your billing period.",
      },
      {
        q: "How do I update my payment method?",
        a: "Go to Profile > Billing to update your payment information. Changes take effect immediately.",
      },
    ],
  },
  {
    title: "Using PostContent",
    icon: BookOpen,
    questions: [
      {
        q: "How do I generate my first post?",
        a: "Navigate to Generate Posts, enter your topic or message, select your platform and tone, then click 'Generate Posts'. You'll receive multiple variants to choose from.",
      },
      {
        q: "What's the difference between Generate and Reply?",
        a: "Generate creates original posts from scratch. Reply generates contextual responses to existing posts that match your voice.",
      },
      {
        q: "How does AI training work?",
        a: "Go to Train AI and paste examples of your best posts. The AI analyzes your writing style, tone, and patterns to create content that sounds authentically you.",
      },
      {
        q: "Can I save my generated content?",
        a: "Yes! All generated content is automatically saved to your history. You can access it anytime from the history section on each feature page.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    icon: MessageCircle,
    questions: [
      {
        q: "Why isn't my post generating?",
        a: "Check that you've entered a topic and haven't exceeded character limits. If the issue persists, try refreshing the page or contact support.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page. Enter your email and follow the instructions sent to your inbox.",
      },
      {
        q: "My credits aren't updating",
        a: "Credits update in real-time after each generation. If you're seeing incorrect counts, try refreshing the page. Contact support if the issue continues.",
      },
      {
        q: "I'm getting an error message",
        a: "Most errors are temporary. Try refreshing the page or clearing your browser cache. If the error persists, contact our support team with the error details.",
      },
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

        <div className="grid gap-8 mb-12">
          {helpTopics.map((topic, index) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {topic.questions.map((item, qIndex) => (
                      <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
