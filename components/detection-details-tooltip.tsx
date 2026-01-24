"use client"

import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIDetectionResult {
  riskScore: number
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH'
  passed: boolean
  flags: string[]
  recommendations: string[]
  metrics: {
    sentenceLength: number
    pronounUsage: number
    contractionUsage: number
    buzzwordDensity: number
    punctuationVariety: number
    exclamationUsage: number
  }
}

interface DetectionDetailsTooltipProps {
  aiDetection: AIDetectionResult
  children: ReactNode
}

export function DetectionDetailsTooltip({ aiDetection, children }: DetectionDetailsTooltipProps) {
  const getRiskConfig = () => {
    switch (aiDetection.riskLevel) {
      case 'MINIMAL':
      case 'LOW':
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          borderColor: "border-green-200 dark:border-green-800"
        }
      case 'MEDIUM':
        return {
          icon: AlertTriangle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-200 dark:border-yellow-800"
        }
      case 'HIGH':
        return {
          icon: AlertCircle,
          color: "text-red-600",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          borderColor: "border-red-200 dark:border-red-800"
        }
    }
  }

  const config = getRiskConfig()
  const Icon = config.icon

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5", config.color)} />
            AI Detection Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Score Overview */}
          <div className={cn("rounded-lg p-4 border", config.bgColor, config.borderColor)}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Detection Score</span>
              <Badge variant={aiDetection.passed ? "default" : "destructive"}>
                {aiDetection.riskLevel}
              </Badge>
            </div>
            <div className="text-3xl font-bold">{aiDetection.riskScore}/100</div>
            <div className="text-xs text-muted-foreground mt-1">
              Lower scores = more human-like
            </div>
          </div>

          {/* Issues Found */}
          {aiDetection.flags.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Issues Found
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {aiDetection.flags.map((flag, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-600">⚠️</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {aiDetection.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Recommendations
              </h4>
              <div className="space-y-2">
                {aiDetection.recommendations.map((rec, i) => (
                  <div key={i} className="text-xs p-2 rounded border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Analysis Metrics</h4>
            <div className="grid grid-cols-2 gap-2">
              <MetricItem label="Sentence Length" value={aiDetection.metrics.sentenceLength} />
              <MetricItem label="Pronouns" value={aiDetection.metrics.pronounUsage} />
              <MetricItem label="Contractions" value={aiDetection.metrics.contractionUsage} />
              <MetricItem label="Buzzwords" value={aiDetection.metrics.buzzwordDensity} />
              <MetricItem label="Punctuation" value={aiDetection.metrics.punctuationVariety} />
              <MetricItem label="Exclamations" value={aiDetection.metrics.exclamationUsage} />
            </div>
          </div>

          {/* Safe to Post Indicator */}
          <div className={cn(
            "rounded-lg p-3 border flex items-center gap-2",
            aiDetection.passed 
              ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
          )}>
            {aiDetection.passed ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span className="text-sm text-green-700 dark:text-green-400">Safe to post</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-400">
                  Risky - consider using "Make More Human"
                </span>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MetricItem({ label, value }: { label: string; value: number }) {
  const isGood = value <= 30
  const isMedium = value > 30 && value <= 60
  
  return (
    <div className={cn(
      "text-xs p-2 rounded border",
      isGood && "bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-800",
      isMedium && "bg-yellow-50/50 dark:bg-yellow-950/10 border-yellow-200 dark:border-yellow-800",
      !isGood && !isMedium && "bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-800"
    )}>
      <div className="font-medium">{label}</div>
      <div className={cn(
        "text-xs font-mono",
        isGood && "text-green-700 dark:text-green-400",
        isMedium && "text-yellow-700 dark:text-yellow-400",
        !isGood && !isMedium && "text-red-700 dark:text-red-400"
      )}>
        {value}
      </div>
    </div>
  )
}
