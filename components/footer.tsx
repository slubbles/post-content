import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react"

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl mobile-safe-padding py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/images/postcontent-20logo-20-20with-20text.png"
                alt="Post Content"
                width={321}
                height={180}
                className="h-[45px] w-auto sm:h-[55px]"
                priority
              />
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Stop overthinking. Start posting. Create engaging social media content in seconds.
            </p>

            <div className="mt-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-black hover:text-white transition-colors"
                asChild
              >
                <a href="https://x.com/postcontent" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <XIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#0A66C2] hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://linkedin.com/company/postcontent"
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
                className="h-9 w-9 hover:bg-[#1877F2] hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://facebook.com/postcontent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-gradient-to-tr hover:from-[#FD5949] hover:via-[#D6249F] hover:to-[#285AEB] hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://instagram.com/postcontent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[#FF0000] hover:text-white transition-colors"
                asChild
              >
                <a
                  href="https://youtube.com/@postcontent"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/dashboard/generate"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Generate
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/reply"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Reply
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/thread"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Thread
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/train"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Train
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
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
                <Link href="/help" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Help Center
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
                <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
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

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Post Content. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
