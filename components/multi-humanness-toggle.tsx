"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiHumannessToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}

export function MultiHumannessToggle({ enabled, onChange, disabled }: MultiHumannessToggleProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border bg-card transition-all duration-200",
        enabled && "border-primary/40 bg-primary/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex-1 space-y-1 mr-4">
        <Label 
          htmlFor="multi-humanness" 
          className={cn(
            "text-sm font-medium cursor-pointer flex items-center gap-2",
            disabled && "cursor-not-allowed"
          )}
        >
          <span>Compare 3 Humanness Levels</span>
          {enabled && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
              Active
            </span>
          )}
        </Label>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Generate posts at 3 different humanness levels (Professional, Casual, Texting) to compare which style works best
        </p>
      </div>
      <Switch
        id="multi-humanness"
        checked={enabled}
        onCheckedChange={onChange}
        disabled={disabled}
        className="shrink-0"
      />
    </div>
  )
}

// Compact version for smaller spaces
export function MultiHumannessToggleCompact({ enabled, onChange, disabled }: MultiHumannessToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="multi-humanness-compact"
        checked={enabled}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Label 
        htmlFor="multi-humanness-compact"
        className={cn(
          "text-sm cursor-pointer flex items-center gap-1.5",
          disabled && "cursor-not-allowed"
        )}
      >
        <span>Compare Styles</span>
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
      </Label>
    </div>
  )
}
