"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, WifiOff, Clock, CreditCard, ShieldAlert } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

type ErrorType = "network" | "rate_limit" | "credits" | "auth" | "server" | "unknown"

interface ApiErrorProps {
  type?: ErrorType
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

const errorConfig: Record<
  ErrorType,
  {
    icon: LucideIcon
    title: string
    description: string
    action?: { label: string; href: string }
  }
> = {
  network: {
    icon: WifiOff,
    title: "Connection failed",
    description: "Unable to connect to the server. Please check your internet connection and try again.",
  },
  rate_limit: {
    icon: Clock,
    title: "Too many requests",
    description: "You've made too many requests. Please wait a moment before trying again.",
  },
  credits: {
    icon: CreditCard,
    title: "Out of credits",
    description: "You've used all your generation credits for this period. Upgrade to continue creating.",
    action: { label: "Upgrade Plan", href: "/pricing" },
  },
  auth: {
    icon: ShieldAlert,
    title: "Authentication required",
    description: "Your session has expired. Please log in again to continue.",
    action: { label: "Log In", href: "/login" },
  },
  server: {
    icon: AlertCircle,
    title: "Server error",
    description: "Something went wrong on our end. Our team has been notified and is working on it.",
  },
  unknown: {
    icon: AlertCircle,
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again or contact support if this persists.",
  },
}

export function ApiError({ type = "unknown", message, onRetry, showRetry = true }: ApiErrorProps) {
  const config = errorConfig[type]
  const Icon = config.icon

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
            <Icon className="h-5 w-5 text-destructive" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base">{config.title}</CardTitle>
            <CardDescription>{message || config.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-3 pt-0">
        {showRetry && onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )}
        {config.action && (
          <Button size="sm" asChild>
            <Link href={config.action.href}>{config.action.label}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
