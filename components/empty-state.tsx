"use client"

import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
        </div>
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center backdrop-blur-sm border border-primary/10">
          <Icon className="h-12 w-12 text-primary animate-in zoom-in duration-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-8 text-pretty leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="rounded-full transition-all hover:scale-105">
          {action.label}
        </Button>
      )}
    </div>
  )
}
