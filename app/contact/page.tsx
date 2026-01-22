"use client"

import type React from "react"

import { AppNavigation } from "@/components/app-navigation"
import Link from "next/link"
import { Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Redirect to success page
      window.location.href = '/contact/success'
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or email us directly at support@postcontent.io",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <AppNavigation />

      <div className="mx-auto max-w-4xl mobile-safe-padding py-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">Have questions? We're here to help.</p>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Get help via email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <a href="mailto:support@postcontent.io" className="text-sm text-primary hover:underline">
                  support@postcontent.io
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("support@postcontent.io")
                    toast({ title: "Copied!", description: "Email copied to clipboard" })
                  }}
                  className="p-1.5 hover:bg-primary/10 hover:text-primary rounded transition-all hover:scale-110 cursor-pointer active:scale-95"
                  aria-label="Copy email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Response within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Find answers quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/faq" className="text-sm text-primary hover:underline">
                View FAQ
              </Link>
              <p className="text-xs text-muted-foreground mt-2">Common questions and answers</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your question or issue..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
