"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RateLimitWarningProps {
  used: number
  limit: number
  resetTime?: string
}

export function RateLimitWarning({ used, limit, resetTime }: RateLimitWarningProps) {
  const percentage = (used / limit) * 100
  const remaining = limit - used

  if (percentage < 80) return null

  const isAtLimit = remaining === 0
  const isNearLimit = remaining > 0 && remaining <= 10

  return (
    <Alert
      variant={isAtLimit ? "destructive" : "default"}
      className={isNearLimit ? "border-amber-500/50 bg-amber-500/10" : ""}
    >
      {isAtLimit ? <Zap className="h-4 w-4" /> : <Clock className="h-4 w-4 text-amber-600" />}
      <AlertTitle>{isAtLimit ? "Credit limit reached" : "Running low on credits"}</AlertTitle>
      <AlertDescription className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>
              {used} of {limit} credits used
            </span>
            {resetTime && <span className="text-muted-foreground">Resets {resetTime}</span>}
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        {isAtLimit ? (
          <p className="text-sm">Upgrade your plan to continue generating content without interruption.</p>
        ) : (
          <p className="text-sm">You have {remaining} credits remaining. Consider upgrading for unlimited access.</p>
        )}

        <Button size="sm" asChild className={isAtLimit ? "" : "bg-amber-600 hover:bg-amber-700"}>
          <Link href="/pricing">Upgrade Plan</Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
