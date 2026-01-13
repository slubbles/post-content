"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Linkedin, Github } from "lucide-react"
import { useSession } from "next-auth/react"

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const featureLinks = [
  { label: "Generate", loggedInPath: "/dashboard/generate", loggedOutPath: "/login" },
  { label: "Reply", loggedInPath: "/dashboard/reply", loggedOutPath: "/login" },
  { label: "Thread", loggedInPath: "/dashboard/thread", loggedOutPath: "/login" },
  { label: "Train", loggedInPath: "/dashboard/train", loggedOutPath: "/login" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user

  const handleFeatureClick = (loggedInPath: string, loggedOutPath: string) => {
    if (isAuthenticated) {
      router.push(loggedInPath)
    } else {
      router.push(loggedOutPath)
    }
  }

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl mobile-safe-padding py-8 sm:py-12 lg:py-16">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/images/logo.svg"
                alt="PostContent"
                width={140}
                height={32}
                className="h-8 w-auto sm:h-9 md:h-10"
                priority
              />
            </Link>
            <p className="mt-2 max-w-xs text-xs sm:text-sm leading-relaxed text-muted-foreground px-4 sm:px-0">
              Stop overthinking. Start posting. Create engaging social media content in seconds.
            </p>

            <div className="mt-3 sm:mt-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-9 sm:w-9 hover:bg-black hover:text-white transition-colors touch-target"
                asChild
              >
                <a href="https://x.com/jdvplss" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <XIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-9 sm:w-9 hover:bg-[#0A66C2] hover:text-white transition-colors touch-target"
                asChild
              >
                <a
                  href="https://linkedin.com/in/jdvplss"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-9 sm:w-9 hover:bg-[#333] hover:text-white transition-colors touch-target"
                asChild
              >
                <a href="https://github.com/jdvplss" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Features</h3>
            <ul className="space-y-2">
              {featureLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleFeatureClick(link.loggedInPath, link.loggedOutPath)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Affiliate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {currentYear} Post Content. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
