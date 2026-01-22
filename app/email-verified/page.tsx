"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"

export default function EmailVerifiedPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      // Redirect to login after countdown
      setIsRedirecting(true)
      setTimeout(() => {
        router.push("/login?verified=true")
      }, 500)
    }
  }, [countdown, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center mobile-safe-padding bg-background py-12">
      <div className="mb-8 animate-fade-in">
        <Link href="/">
          <Image
            src="/images/postcontent-20logo-20-20with-20text.png"
            alt="Post Content"
            width={321}
            height={180}
            className="h-[45px] md:h-[60px] w-auto"
            priority
          />
        </Link>
      </div>

      <Card className="w-full max-w-md animate-scale-in animate-delay-100 animate-on-load">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-8 w-8 text-green-500 animate-in zoom-in duration-300" />
          </div>
          <CardTitle className="text-2xl">Email Verified! 🎉</CardTitle>
          <CardDescription className="text-base">
            Your email has been successfully verified. You can now log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            {isRedirecting ? (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecting to login...</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Redirecting to login in <span className="font-bold text-foreground">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
              </p>
            )}
          </div>

          <Link href="/login?verified=true" className="block">
            <Button className="w-full">
              Continue to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
