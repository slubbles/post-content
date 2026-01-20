"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
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
  LogOut,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Crown,
  History,
  ImageIcon,
  Video,
} from "lucide-react"
import { FeedbackModal } from "@/components/feedback-modal"
import { useUsage } from "@/hooks/use-usage"

const mainNavItems = [
  { href: "/dashboard/generate", label: "Generate Posts", icon: Sparkles },
  { href: "/dashboard/caption", label: "Create Captions", icon: ImageIcon },
  { href: "/dashboard/reply", label: "Reply to Posts", icon: MessageSquare },
  { href: "/dashboard/thread", label: "Create Threads", icon: List },
  { href: "/dashboard/video-script", label: "Video Scripts", icon: Video },
  { href: "/dashboard/train", label: "Train AI", icon: GraduationCap },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "#feedback", label: "Give Feedback", icon: MessageCircle, action: "feedback" },
]

interface DashboardSidebarProps {
  user?: {
    name?: string
    email?: string
    image?: string
    plan?: "free" | "pro" | "enterprise"
  }
  isCollapsed?: boolean
  onToggleCollapse?: (collapsed: boolean) => void
}

export function DashboardSidebar({ user, isCollapsed: externalCollapsed, onToggleCollapse }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const { usage } = useUsage()

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed

  const { used, limit, percentage } = usage

  useEffect(() => {
    if (externalCollapsed === undefined) {
      const saved = localStorage.getItem("sidebar-collapsed")
      if (saved !== null) {
        setInternalCollapsed(saved === "true")
      }
    }
  }, [externalCollapsed])

  const toggleCollapse = () => {
    const newState = !isCollapsed
    if (onToggleCollapse) {
      onToggleCollapse(newState)
    } else {
      setInternalCollapsed(newState)
    }
    localStorage.setItem("sidebar-collapsed", String(newState))
    window.dispatchEvent(new Event("sidebar-toggle"))
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
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

  const getPlanBadge = () => {
    const plan = user?.plan || "free"
    return plan.charAt(0).toUpperCase() + plan.slice(1) + " Plan"
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <TooltipProvider delayDuration={0}>
      <FeedbackModal open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />

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

        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-icon.svg" alt="PostContent" width={32} height={32} className="h-7 w-7" priority />
          <span className="text-lg font-bold">PostContent</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-2">
                <div className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {getPlanBadge()}
                </div>
                <p className="text-sm font-medium">{user?.name ?? "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email ?? "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing" className="cursor-pointer text-primary">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Link>
            </DropdownMenuItem>
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
          "fixed left-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out lg:translate-x-0",
          isCollapsed ? "w-[60px]" : "w-[240px]",
          isMobileMenuOpen && "w-60",
          !isMobileMenuOpen && "-translate-x-full lg:translate-x-0",
        )}
        style={{ top: "0", paddingTop: "0" }}
      >
        <div className="hidden lg:block absolute -right-3 top-16 z-50">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-background shadow-md hover:scale-110"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex h-14 items-center justify-center border-b border-sidebar-border px-4">
          <Link href="/dashboard/generate" className="flex items-center gap-3">
            <Image 
              src="/images/logo-icon.png" 
              alt="PostContent" 
              width={32} 
              height={32} 
              className="h-8 w-8 rounded-lg"
              priority 
            />
            {!isCollapsed && (
              <span className="font-semibold text-lg text-sidebar-foreground">PostContent</span>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            if (item.action === "feedback") {
              return isCollapsed ? (
                <Tooltip key="feedback">
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFeedbackOpen(true)}
                      className={cn(
                        "h-10 w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  key="feedback"
                  variant="ghost"
                  onClick={() => setIsFeedbackOpen(true)}
                  className={cn(
                    "h-10 w-full justify-start gap-3 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              )
            }

            return isCollapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-10 w-full justify-center",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-full justify-start gap-3 px-3",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Credits Widget */}
        <div className="border-t border-sidebar-border p-2">
          {isCollapsed ? (
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
                  <p className="text-xs">{limit - used} remaining</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/pricing">
              <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-3 transition-colors hover:bg-sidebar-accent cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sidebar-foreground">Credits</span>
                    <span className="text-xs text-muted-foreground">
                      {used} / {limit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{limit - used} remaining</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="border-t border-sidebar-border p-2">
          <DropdownMenu>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-full justify-center p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">{user?.name || "Account"}</TooltipContent>
              </Tooltip>
            ) : (
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-3 py-2">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-sm font-medium text-sidebar-foreground truncate w-full">
                      {user?.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">{getPlanBadge()}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent align="end" side="right" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-2">
                  <div className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {getPlanBadge()}
                  </div>
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing" className="cursor-pointer text-primary font-medium">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Link>
              </DropdownMenuItem>
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
