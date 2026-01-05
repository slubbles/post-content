import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto flex max-w-2xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-in zoom-in">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">You're all set!</CardTitle>
            <CardDescription className="text-base">
              Your account is upgraded and ready to roll. Time to create some magic.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Sparkles className="h-5 w-5 text-primary" />
                What you just unlocked:
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>More generation credits to play with</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>Advanced AI models for better content</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>Priority support when you need help</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="flex-1">
                <Button className="w-full transition-all hover:scale-[1.02]" size="lg">
                  Start Creating
                </Button>
              </Link>
              <Link href="/settings" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent transition-all hover:scale-[1.02]" size="lg">
                  Tweak Settings
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Check your email for the receipt and subscription details.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
