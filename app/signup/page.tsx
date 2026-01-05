import { SignupForm } from "@/components/signup-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="mobile-safe-padding flex min-h-screen items-center justify-center bg-background">
      <div className="fixed right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80 sm:text-2xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform hover:scale-110">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            Post Content
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:mt-6 sm:text-3xl">Let's get you started</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Create awesome content in minutes, not hours
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary transition-colors hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  )
}
