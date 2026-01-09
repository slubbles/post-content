import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Verify Your Email | Post Content",
  description: "Check your email to verify your account",
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center mobile-safe-padding bg-background py-12">
      <div className="mb-8">
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

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription className="text-base">
            We've sent a verification link to your email address. Click the link to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <ResendEmailButton />
          </Suspense>

          <div className="text-center text-sm text-muted-foreground">
            <p>Didn't receive the email? Check your spam folder.</p>
          </div>

          <div className="pt-4 border-t">
            <Link href="/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ResendEmailButton() {
  return (
    <form action="/api/auth/resend-verification" method="POST">
      <Button type="submit" variant="outline" className="w-full bg-transparent">
        Resend verification email
      </Button>
    </form>
  )
}
