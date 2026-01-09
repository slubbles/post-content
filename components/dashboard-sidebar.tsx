"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  User,
  CreditCard,
  HelpCircle,
  FileText,
  Zap,
  LayoutGrid,
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
    <TooltipProvider delayDuration={0}>
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

        <Link href="/dashboard/generate" className="flex items-center">
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
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
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

      <aside
        className={cn(
          "fixed left-0 z-40 flex h-screen w-16 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0 w-60" : "-translate-x-full lg:translate-x-0",
        )}
        style={{ top: "0", paddingTop: "0" }}
      >
        <div className="flex h-14 items-center justify-center border-b border-sidebar-border">
          <Link href="/dashboard/generate" className="flex items-center">
            <div className="hidden lg:block">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                P
              </div>
            </div>
            <div className="lg:hidden">
              <Image
                src="/images/postcontent-20logo-20-20with-20text.png"
                alt="Post Content"
                width={321}
                height={180}
                className="h-[30px] w-auto"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1 border-b border-sidebar-border p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
                <Zap className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Quick Actions</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </div>

        <div className="border-b border-sidebar-border p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Search (⌘K)</TooltipContent>
          </Tooltip>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-10 w-10",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/pricing">
                <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-2 transition-colors hover:bg-sidebar-accent cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-bold text-sidebar-foreground">{used}</span>
                    <Progress value={percentage} className="h-1 w-8" />
                  </div>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="space-y-1">
                <p className="font-medium">Generations</p>
                <p className="text-xs text-muted-foreground">
                  {used} / {limit} used
                </p>
                <p className="text-xs">{limit - used} credits remaining</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="border-t border-sidebar-border p-2 space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            )
          })}

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" side="right" className="w-48">
              {accountSubItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className={cn(isActive && "bg-accent")}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 rounded-full p-0 mt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">{user?.name || "Account"}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" side="right" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Spacer for mobile to prevent content being hidden under header */}
      <div className="h-14 lg:hidden" />
    </TooltipProvider>
  )
}
