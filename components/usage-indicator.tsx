"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function UsageIndicator() {
  // Mock data - will be replaced with real data from API
  const used = 45
  const limit = 100

  const percentage = (used / limit) * 100
  const isLowCredits = percentage > 80

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isLowCredits && "border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20",
      )}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className={cn("h-4 w-4", isLowCredits ? "text-amber-600" : "text-primary")} />
              {isLowCredits ? "Running low on credits" : "Credits"}
            </span>
            <span
              className={cn(
                "font-medium tabular-nums",
                isLowCredits ? "text-amber-700 dark:text-amber-500" : "text-muted-foreground",
              )}
            >
              {used} / {limit}
            </span>
          </div>
          <Progress value={percentage} className={cn("h-2 transition-all", isLowCredits && "[&>div]:bg-amber-500")} />
          {isLowCredits && (
            <p className="text-xs text-amber-700 dark:text-amber-500">
              You've used {Math.round(percentage)}% of your credits this month
            </p>
          )}
        </div>
        <Link href="/pricing" className="ml-6">
          <Button
            variant={isLowCredits ? "default" : "outline"}
            size="sm"
            className={cn("whitespace-nowrap transition-all duration-200", !isLowCredits && "bg-transparent")}
          >
            {isLowCredits ? (
              <>
                <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                Upgrade Now
              </>
            ) : (
              "Upgrade"
            )}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
