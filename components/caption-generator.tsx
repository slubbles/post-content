"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, ImageIcon, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { GeneratedPosts } from "@/components/generated-posts"
import Link from "next/link"
import { cn } from "@/lib/utils"

const platforms = [
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
]

export function CaptionGenerator() {
  const { toast } = useToast()
  const [context, setContext] = useState("")
  const [platform, setPlatform] = useState("facebook")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([])

  const used = 45
  const limit = 100

  const maxChars = 800
  const charCount = context.length
  const isNearLimit = charCount > maxChars * 0.8
  const isOverLimit = charCount > maxChars

  const handleGenerate = async () => {
    if (!context.trim() || isOverLimit) return

    setIsGenerating(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 300)

    try {
      const response = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, platform }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to generate captions")
      }

      const data = await response.json()
      setGeneratedCaptions(data.captions)
      toast({
        title: "Captions generated!",
        description: `Created ${data.captions.length} caption${data.captions.length > 1 ? "s" : ""} for you.`,
      })
    } catch (error) {
      console.error("[v0] Caption generation error:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Unable to generate captions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setProgress(0)
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Generate Captions
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Create compelling captions for your images and videos.
              </CardDescription>
            </div>
            <Link href="/pricing" className="shrink-0">
              <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:bg-muted cursor-pointer">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium tabular-nums">
                  {used}/{limit}
                </span>
              </div>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="context" className="text-sm sm:text-base">
              Context or Description
            </Label>
            <Textarea
              id="context"
              placeholder="Describe what your image/video is about. What's the message? What action do you want people to take? The more context, the better the caption."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className={cn(
                "min-h-[120px] resize-none text-sm sm:text-base",
                isOverLimit && "border-destructive focus-visible:ring-destructive",
              )}
              disabled={isGenerating}
            />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">
                Tip: Mention the image content, your goal, and desired emotion
              </p>
              <span
                className={cn(
                  "tabular-nums transition-colors",
                  isOverLimit
                    ? "text-destructive font-medium"
                    : isNearLimit
                      ? "text-orange-500"
                      : "text-muted-foreground",
                )}
              >
                {charCount}/{maxChars}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Platform</Label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <Button
                  key={p.value}
                  type="button"
                  variant={platform === p.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPlatform(p.value)}
                  disabled={isGenerating}
                  className={cn("touch-target text-xs sm:text-sm bg-transparent", platform === p.value && "shadow-sm")}
                >
                  {p.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {platform === "facebook"
                ? "Facebook captions can be longer and more casual"
                : "LinkedIn captions should be professional and value-driven"}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!context.trim() || isGenerating || isOverLimit}
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base bg-transparent"
              size="lg"
            >
              {!isGenerating && (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Captions
                </>
              )}
              {isGenerating && <span>Generating...</span>}
            </Button>
            {isGenerating && <Progress value={progress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>

      {generatedCaptions.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GeneratedPosts posts={generatedCaptions} platform={platform} />
        </div>
      )}
    </div>
  )
}
