"use client"

import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  suggestions,
  onSuggestionClick,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        </div>
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center backdrop-blur-sm border border-primary/10">
          <Icon className="h-12 w-12 text-primary animate-in zoom-in duration-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 text-pretty leading-relaxed">{description}</p>

      {suggestions && suggestions.length > 0 && (
        <div className="mb-6 w-full max-w-md">
          <p className="text-xs text-muted-foreground mb-3">Try one of these to get started:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-transparent hover:bg-primary/5 hover:border-primary/30 transition-all"
                onClick={() => onSuggestionClick?.(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {action && (
        <Button onClick={action.onClick} className="rounded-full transition-all hover:scale-105">
          {action.label}
        </Button>
      )}
    </div>
  )
}
