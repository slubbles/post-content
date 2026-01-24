"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { AIDetectionResult } from "./ai-detection-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MakeMoreHumanButtonProps {
  content: string
  platform: string
  tone: string
  onHumanized: (humanizedContent: string, beforeScore: number, afterScore: number) => void
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

interface HumanizeResponse {
  success: boolean
  original: string
  humanized: string
  before: AIDetectionResult
  after: AIDetectionResult
  improvements: string[]
  riskReduction: number
}

export function MakeMoreHumanButton({ 
  content, 
  platform, 
  tone, 
  onHumanized,
  disabled,
  size = "sm",
  variant = "outline"
}: MakeMoreHumanButtonProps) {
  const [isHumanizing, setIsHumanizing] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [result, setResult] = useState<HumanizeResponse | null>(null)
  const { toast } = useToast()

  const handleHumanize = async () => {
    setIsHumanizing(true)
    
    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          platform,
          tone,
        }),
      })

      const data: HumanizeResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.success === false ? "Failed to humanize" : "Network error")
      }

      if (data.success) {
        setResult(data)
        setShowComparison(true)
        
        toast({
          title: "Content humanized!",
          description: `AI risk reduced by ${data.riskReduction} points`,
        })
      }
    } catch (error) {
      console.error("Humanize error:", error)
      toast({
        title: "Humanization failed",
        description: "Unable to improve content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsHumanizing(false)
    }
  }

  const handleUseHumanized = () => {
    if (result) {
      onHumanized(
        result.humanized,
        result.before.riskScore,
        result.after.riskScore
      )
      setShowComparison(false)
      toast({
        title: "Content updated!",
        description: "Using the humanized version",
      })
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleHumanize}
        disabled={disabled || isHumanizing || !content.trim()}
        className={cn(
          "gap-1.5 transition-all duration-200 hover:scale-105",
          size === "sm" && "h-8",
        )}
      >
        {isHumanizing ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Humanizing...
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5" />
            Make More Human
          </>
        )}
      </Button>

      {/* Comparison Dialog */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Humanization Results
            </DialogTitle>
            <DialogDescription>
              Your content has been improved to sound more human
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-6 pt-4">
              {/* Score Comparison */}
              <div className="flex items-center justify-center gap-4 pb-4 border-b">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Before</div>
                  <div className={cn(
                    "text-3xl font-bold",
                    result.before.riskScore >= 60 ? "text-red-500" :
                    result.before.riskScore >= 40 ? "text-yellow-500" :
                    "text-green-500"
                  )}>
                    {result.before.riskScore}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.before.riskLevel}
                  </div>
                </div>

                <ArrowRight className="h-8 w-8 text-primary" />

                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">After</div>
                  <div className={cn(
                    "text-3xl font-bold",
                    result.after.riskScore >= 60 ? "text-red-500" :
                    result.after.riskScore >= 40 ? "text-yellow-500" :
                    "text-green-500"
                  )}>
                    {result.after.riskScore}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.after.riskLevel}
                  </div>
                </div>

                <div className="ml-4">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    -{result.riskReduction} points
                  </div>
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">✨ Improvements Made</h4>
                <div className="space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <div 
                      key={index}
                      className="text-xs text-muted-foreground bg-green-50 dark:bg-green-900/20 rounded px-3 py-2 border-l-2 border-green-400"
                    >
                      {improvement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Comparison */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">Original</h4>
                  <div className="text-sm p-3 rounded-lg bg-muted/50 border leading-relaxed whitespace-pre-wrap">
                    {result.original}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-primary">Humanized Version</h4>
                  <div className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/20 leading-relaxed whitespace-pre-wrap">
                    {result.humanized}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={handleUseHumanized}
                  className="flex-1"
                >
                  Use Humanized Version
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowComparison(false)}
                  className="flex-1"
                >
                  Keep Original
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
