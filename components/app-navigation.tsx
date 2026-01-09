"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  History,
  Settings,
  LogOut,
  Home,
  Crown,
  User,
} from "lucide-react"
import Image from "next/image"

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

interface AppNavigationProps {
  isAuthenticated?: boolean
  user?: {
    name?: string
    email?: string
    image?: string
    plan?: string
  }
}

export function AppNavigation({ isAuthenticated = true, user }: AppNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()

  const used = 45
  const limit = 100
  const percentage = (used / limit) * 100

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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between mobile-safe-padding">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <Image
                src="/images/postcontent-20logo-20-20with-20text.png"
                alt="Post Content"
                width={321}
                height={180}
                className="h-[45px] w-auto md:h-[60px] lg:h-[90px]"
                priority
              />
            </Link>

            {isAuthenticated && (
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
            )}
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Reorganized profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 transition-transform hover:scale-105">
                        <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-2">
                        <div className="inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {/* Backend will provide: {user.plan} */}
                          {getPlanBadge()}
                        </div>
                        <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email || "user@example.com"}
                        </p>
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
                    <div className="px-2 py-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Credits</span>
                          <span className="text-xs text-muted-foreground">
                            {used} / {limit} used
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">Resets monthly</p>
                      </div>
                    </div>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {isAuthenticated && (
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
      )}

      {isAuthenticated && (
        <style jsx global>{`
          @media (max-width: 768px) {
            body {
              padding-bottom: 88px;
            }
          }
        `}</style>
      )}
    </>
  )
}
