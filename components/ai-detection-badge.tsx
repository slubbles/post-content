"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Shield, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

export interface AIDetectionResult {
  riskScore: number
  riskLevel: "MINIMAL" | "LOW" | "MEDIUM" | "HIGH"
  passed: boolean
  flags: string[]
  recommendations: string[]
  metrics: {
    avgSentenceLength: number
    hasPersonalPronouns: boolean
    hasContractions: boolean
    aiBuzzwordCount: number
    complexPunctuation: boolean
    perfectParallelStructure: boolean
    genericOpenings: number
    excessiveExclamations: boolean
  }
}

interface AIDetectionBadgeProps {
  aiDetection: AIDetectionResult
  showScore?: boolean
  size?: "sm" | "default" | "lg"
  onClick?: () => void
}

const getRiskConfig = (riskLevel: string) => {
  switch (riskLevel) {
    case "MINIMAL":
      return {
        emoji: "🟢",
        color: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
        icon: CheckCircle,
        label: "MINIMAL",
      }
    case "LOW":
      return {
        emoji: "🟢",
        color: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700",
        icon: CheckCircle,
        label: "LOW",
      }
    case "MEDIUM":
      return {
        emoji: "🟡",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
        icon: AlertTriangle,
        label: "MEDIUM",
      }
    case "HIGH":
      return {
        emoji: "🔴",
        color: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700",
        icon: AlertCircle,
        label: "HIGH",
      }
    default:
      return {
        emoji: "⚪",
        color: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700",
        icon: Shield,
        label: "UNKNOWN",
      }
  }
}

export function AIDetectionBadge({ 
  aiDetection, 
  showScore = true, 
  size = "default",
  onClick 
}: AIDetectionBadgeProps) {
  const config = getRiskConfig(aiDetection.riskLevel)
  const Icon = config.icon

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    default: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border transition-all duration-200",
        config.color,
        sizeClasses[size],
        onClick && "cursor-pointer hover:scale-105 hover:shadow-sm",
        !onClick && "cursor-default"
      )}
      onClick={onClick}
    >
      <Icon className={cn(iconSizes[size], "mr-1.5")} />
      {showScore && (
        <span className="tabular-nums font-semibold">
          {aiDetection.riskScore}
        </span>
      )}
      {showScore && <span className="mx-1">-</span>}
      <span className="font-medium">{config.label}</span>
    </Badge>
  )
}

// Compact version for space-constrained areas
export function AIDetectionIcon({ aiDetection }: { aiDetection: AIDetectionResult }) {
  const config = getRiskConfig(aiDetection.riskLevel)
  
  return (
    <span 
      className="text-lg leading-none" 
      title={`AI Risk: ${aiDetection.riskScore} (${config.label})`}
    >
      {config.emoji}
    </span>
  )
}
