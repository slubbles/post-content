import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "FAQ - PostContent",
  description: "Frequently asked questions about PostContent.",
}

const faqs = [
  {
    question: "What is PostContent?",
    answer:
      "PostContent is an AI-powered content generation tool for social media. It helps you create engaging posts, replies, and threads in seconds while maintaining your unique voice and style.",
  },
  {
    question: "How does the AI training work?",
    answer:
      "Our AI training feature analyzes samples of your existing writing to learn your unique voice, tone, and style. The more examples you provide, the better the AI becomes at generating content that sounds like you.",
  },
  {
    question: "What are credits and how do they work?",
    answer:
      "Credits are used each time you generate content. Each generation costs 1 credit. Free accounts get 10 credits per month, Pro accounts get 200 credits, and Enterprise accounts get unlimited credits. Credits reset at the start of each billing cycle.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes! You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period, and you won't be charged again.",
  },
  {
    question: "Do you store my generated content?",
    answer:
      "Yes, we store your generated content in your history so you can access it later. You can view, copy, or delete any generated content from your history page. You can also download all your data from your account settings.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "PostContent supports Twitter/X, LinkedIn, Instagram, Facebook, and Threads. Each platform gets content optimized for its specific format, character limits, and best practices. Generate once, post everywhere.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Every new account starts with a free plan that includes 10 credits per month. You can upgrade to a paid plan at any time to get more credits and advanced features.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with PostContent for any reason, contact our support team within 30 days of your purchase for a full refund—no questions asked. Refunds are processed within 5-7 business days.",
  },
  {
    question: "Do you offer team or agency plans?",
    answer:
      "Yes! Our Enterprise plan is perfect for teams and agencies. It includes unlimited credits, priority support, and team collaboration features. Contact us for custom pricing based on your team size.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-4xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about PostContent</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
