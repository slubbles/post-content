import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>Post Content</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Stop overthinking. Start posting. Create engaging social media content in seconds.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/generate"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Generate Posts
                </Link>
              </li>
              <li>
                <Link href="/reply" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Smart Replies
                </Link>
              </li>
              <li>
                <Link href="/thread" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Thread Builder
                </Link>
              </li>
              <li>
                <Link href="/train" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  AI Training
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="https://postcontent.io"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://postcontent.io/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Post Content. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
