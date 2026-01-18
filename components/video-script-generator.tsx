"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, Video, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function VideoScriptGenerator() {
  const { toast } = useToast()
  const [hook, setHook] = useState("")
  const [story, setStory] = useState("")
  const [offer, setOffer] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedScript, setGeneratedScript] = useState("")

  const used = 45
  const limit = 100

  const hookMaxChars = 200
  const storyMaxChars = 800
  const offerMaxChars = 400

  const hookCount = hook.length
  const storyCount = story.length
  const offerCount = offer.length

  const handleGenerate = async () => {
    if (!hook.trim() || !story.trim() || !offer.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill out all three sections (hook, story, offer)",
        variant: "destructive",
      })
      return
    }

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
      const response = await fetch("/api/video-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook, story, offer }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to generate video script")
      }

      const data = await response.json()
      setGeneratedScript(data.script)
      toast({
        title: "Script generated!",
        description: "Your video script is ready.",
      })
    } catch (error) {
      console.error("[v0] Video script generation error:", error)
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Unable to generate script. Please try again.",
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
                <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Hook-Story-Offer Framework
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Create video scripts that convert viewers into customers.
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
            <div className="flex items-center justify-between">
              <Label htmlFor="hook" className="text-sm sm:text-base font-semibold">
                Hook (5-8 seconds)
              </Label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  hookCount > hookMaxChars ? "text-destructive font-medium" : "text-muted-foreground",
                )}
              >
                {hookCount}/{hookMaxChars}
              </span>
            </div>
            <Textarea
              id="hook"
              placeholder="Start with a question or statement that stops the scroll. Example: 'How much time did you spend scrolling for content inspiration today?'"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className="min-h-[80px] resize-none text-sm sm:text-base"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              Pattern interrupt + call out behavior. Make them stop scrolling.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="story" className="text-sm sm:text-base font-semibold">
                Story (30-45 seconds)
              </Label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  storyCount > storyMaxChars ? "text-destructive font-medium" : "text-muted-foreground",
                )}
              >
                {storyCount}/{storyMaxChars}
              </span>
            </div>
            <Textarea
              id="story"
              placeholder="Share the struggle, frustration, and epiphany. Paint specific scenes. Example: 'I used to spend 2 hours every morning doing the same thing...'"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="min-h-[120px] resize-none text-sm sm:text-base"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              Build empathy through shared struggle. Confessional → frustrated → enlightened.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="offer" className="text-sm sm:text-base font-semibold">
                Offer (15-30 seconds)
              </Label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  offerCount > offerMaxChars ? "text-destructive font-medium" : "text-muted-foreground",
                )}
              >
                {offerCount}/{offerMaxChars}
              </span>
            </div>
            <Textarea
              id="offer"
              placeholder="Show transformation and CTA. Example: 'PostContent solved this. One idea, all platforms, 30 seconds. First 10 posts free...'"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="min-h-[100px] resize-none text-sm sm:text-base"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              Show transformation with numbers. Confident, empowering tone. Strong CTA.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!hook.trim() || !story.trim() || !offer.trim() || isGenerating}
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base bg-transparent"
              size="lg"
            >
              {!isGenerating && (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Video Script
                </>
              )}
              {isGenerating && <span>Generating...</span>}
            </Button>
            {isGenerating && <Progress value={progress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>

      {generatedScript && (
        <Card className="animate-in fade-in slide-in-from-bottom-4">
          <CardHeader>
            <CardTitle>Your Video Script</CardTitle>
            <CardDescription>Copy and use for your next video</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4 space-y-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generatedScript}</pre>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(generatedScript)
                  toast({ title: "Copied!", description: "Script copied to clipboard" })
                }}
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Copy Script
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
