"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  MessageSquare,
  List,
  GraduationCap,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  CreditCard,
  HelpCircle,
  FileText,
} from "lucide-react"

const mainNavItems = [
  { href: "/dashboard/generate", label: "Generate", icon: Sparkles },
  { href: "/dashboard/reply", label: "Reply", icon: MessageSquare },
  { href: "/dashboard/thread", label: "Thread", icon: List },
  { href: "/dashboard/train", label: "Train", icon: GraduationCap },
]

const bottomNavItems = [
  { href: "#", label: "Support", icon: HelpCircle, external: false },
  { href: "#", label: "Documentation", icon: FileText, external: false },
]

const accountSubItems = [
  { href: "/dashboard/account/general", label: "General", icon: User },
  { href: "/dashboard/account/preferences", label: "Preferences", icon: Settings },
  { href: "/dashboard/account/billing", label: "Billing", icon: CreditCard },
]

interface DashboardSidebarProps {
  user?: {
    name?: string
    email?: string
    image?: string
  }
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountExpanded, setIsAccountExpanded] = useState(false)

  const used = 45
  const limit = 100
  const percentage = (used / limit) * 100

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/" className="flex items-center">
          <Image
            src="/images/postcontent-20logo-20-20with-20text.png"
            alt="Post Content"
            width={321}
            height={180}
            className="h-[30px] w-auto"
            priority
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Credits</span>
                  <span className="text-xs text-muted-foreground">
                    {used} / {limit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={closeMobileMenu} style={{ top: "56px" }} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 z-40 flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ top: "0", paddingTop: "56px" }}
      >
        {/* Desktop Logo */}
        <div className="hidden border-b border-sidebar-border p-4 lg:block">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/postcontent-20logo-20-20with-20text.png"
              alt="Post Content"
              width={321}
              height={180}
              className="h-[35px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="border-b border-sidebar-border p-3">
          <button className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/80">
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-auto rounded border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-xs">⌘K</kbd>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Credits Widget Section */}
        <div className="border-t border-sidebar-border p-3">
          <Link href="/pricing" className="block">
            <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3 transition-colors hover:bg-sidebar-accent">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-sidebar-foreground">Generations</span>
                  <span className="text-xs text-muted-foreground">
                    {used} / {limit}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{limit - used} credits remaining</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}

          <div className="pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsAccountExpanded(!isAccountExpanded)}
              className={cn(
                "w-full justify-between gap-2 px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent",
                isAccountExpanded && "bg-sidebar-accent",
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="truncate">{user?.name || "User"}</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isAccountExpanded && "rotate-180")} />
            </Button>

            {isAccountExpanded && (
              <div className="mt-1 space-y-1 pl-3">
                {accountSubItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 px-3 py-2 text-sm",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer for mobile to prevent content being hidden under header */}
      <div className="h-14 lg:hidden" />
    </>
  )
}
