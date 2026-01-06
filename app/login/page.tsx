import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="mobile-safe-padding flex min-h-screen items-center justify-center bg-background">
      <div className="fixed right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <Image
              src="/images/postcontent-20logo-20-20with-20text.png"
              alt="Post Content"
              width={321}
              height={180}
              className="mx-auto h-[45px] w-auto sm:h-[60px] lg:h-[90px]"
              priority
            />
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl">Hey, welcome back!</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Ready to create some awesome content?</p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          New here?{" "}
          <Link href="/signup" className="font-medium text-primary transition-colors hover:underline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  )
}
