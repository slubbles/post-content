"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const HUMANNESS_LEVELS = {
  1: {
    value: "corporate_polished",
    emoji: "🤖",
    label: "Corporate",
    description: "Corporate & Polished",
    fullDescription: "Sophisticated vocabulary, perfect grammar, formal tone",
    risk: "HIGH",
    riskColor: "text-red-500",
  },
  2: {
    value: "professional_authentic",
    emoji: "💼",
    label: "Professional",
    description: "Professional but Real",
    fullDescription: "Mix of formal and casual, uses contractions, natural flow",
    risk: "MEDIUM",
    riskColor: "text-yellow-500",
  },
  3: {
    value: "casual_authentic",
    emoji: "💬",
    label: "Casual",
    description: "Casual & Authentic",
    fullDescription: "Everyday words, frequent contractions, conversational",
    risk: "LOW",
    riskColor: "text-green-500",
  },
  4: {
    value: "texting_friend",
    emoji: "🗣️",
    label: "Texting",
    description: "Like Texting",
    fullDescription: "Simple words, internet shorthand, intentionally imperfect",
    risk: "MINIMAL",
    riskColor: "text-green-600",
  },
} as const

export type HumannessLevel = "corporate_polished" | "professional_authentic" | "casual_authentic" | "texting_friend"

interface HumannessSliderProps {
  value?: HumannessLevel
  onChange: (value: HumannessLevel) => void
  disabled?: boolean
}

export function HumannessSlider({ value, onChange, disabled }: HumannessSliderProps) {
  // Convert humanness level to slider value (1-4)
  const getSliderValue = (humanness?: HumannessLevel): number => {
    if (!humanness) return 2 // Default to Professional
    const entry = Object.entries(HUMANNESS_LEVELS).find(([_, config]) => config.value === humanness)
    return entry ? Number(entry[0]) : 2
  }

  // Convert slider value (1-4) to humanness level
  const getHumannessValue = (sliderValue: number): HumannessLevel => {
    return HUMANNESS_LEVELS[sliderValue as keyof typeof HUMANNESS_LEVELS].value
  }

  const currentSliderValue = getSliderValue(value)
  const currentLevel = HUMANNESS_LEVELS[currentSliderValue as keyof typeof HUMANNESS_LEVELS]

  const handleValueChange = (values: number[]) => {
    const newValue = values[0]
    onChange(getHumannessValue(newValue))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-right w-full">
          <div className="text-sm font-medium">{currentLevel.description}</div>
          <div className={cn("text-xs font-medium", currentLevel.riskColor)}>
            AI Risk: {currentLevel.risk}
          </div>
        </div>
      </div>

      <div className="relative pt-2 pb-2">
        <Slider
          min={1}
          max={4}
          step={1}
          value={[currentSliderValue]}
          onValueChange={handleValueChange}
          disabled={disabled}
          className={cn(
            "cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        
        {/* Text labels below slider */}
        <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-0.5 mt-2">
          {Object.entries(HUMANNESS_LEVELS).map(([key, level]) => (
            <span
              key={key}
              className={cn(
                "text-[10px] sm:text-xs font-medium transition-colors",
                currentSliderValue === Number(key) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {level.label}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {currentLevel.fullDescription}
      </p>

      <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">💡 Tip:</strong> LinkedIn detects AI more strictly.
          Use <strong>Professional</strong> or <strong>Casual</strong> for best results.
        </p>
      </div>
    </div>
  )
}
