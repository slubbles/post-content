import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"

export default function ContactSuccessPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-2xl mobile-safe-padding py-16 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Message Received!</CardTitle>
            <CardDescription className="text-base">
              Thanks for reaching out. We've got your message.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/50 p-6">
              <Mail className="h-8 w-8 text-primary mb-3 mx-auto" />
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email to the address you provided.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Our team typically responds within <strong>24 hours</strong> during business days.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Need immediate help? Check out our{" "}
              <Link href="/faq" className="text-primary hover:underline">
                FAQ page
              </Link>{" "}
              or browse the{" "}
              <Link href="/docs" className="text-primary hover:underline">
                documentation
              </Link>
              .
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  Back to Home
                </Button>
              </Link>
              <Link href="/dashboard/generate">
                <Button className="w-full sm:w-auto">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
