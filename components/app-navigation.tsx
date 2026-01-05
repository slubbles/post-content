"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles, MessageSquare, List, GraduationCap, History, Settings, CreditCard, LogOut, Home } from "lucide-react"

const navItems = [
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/reply", label: "Reply", icon: MessageSquare },
  { href: "/thread", label: "Thread", icon: List },
  { href: "/train", label: "Train", icon: GraduationCap },
  { href: "/history", label: "History", icon: History },
]

const bottomNavItems = [
  { href: "/generate", label: "Generate", icon: Home },
  { href: "/reply", label: "Reply", icon: MessageSquare },
  { href: "/history", label: "History", icon: History },
  { href: "/train", label: "Train", icon: GraduationCap },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between mobile-safe-padding">
          <div className="flex items-center gap-8">
            <Link
              href="/generate"
              className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20 transition-shadow hover:shadow-lg hover:shadow-primary/30">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text sm:inline">
                Post Content
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2 transition-all duration-200",
                        isActive && "bg-secondary text-secondary-foreground shadow-sm",
                        !isActive && "hover:bg-muted",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Pricing</span>
              </Button>
            </Link>
            <Link href="/settings" className="hidden md:block">
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="hidden gap-2 md:flex" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-16 w-full flex-col gap-1 rounded-2xl transition-all duration-200",
                    isActive && "bg-primary/10 text-primary",
                  )}
                >
                  <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      <style jsx global>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 88px;
          }
        }
      `}</style>
    </>
  )
}
