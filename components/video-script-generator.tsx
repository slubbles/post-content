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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formats = [
  {
    value: "hook-story-offer",
    label: "Hook-Story-Offer",
    description: "Pattern interrupt → empathy building → transformation CTA",
  },
  {
    value: "provide-value",
    label: "Provide Value",
    description: "Educational content that builds authority and trust",
  },
  {
    value: "emotion-logic-urgency",
    label: "Emotion-Logic-Urgency",
    description: "Emotional hook → logical reasoning → scarcity/urgency close",
  },
]

export function VideoScriptGenerator() {
  const { toast } = useToast()
  const [hook, setHook] = useState("")
  const [story, setStory] = useState("")
  const [offer, setOffer] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedScript, setGeneratedScript] = useState("")
  const [context, setContext] = useState("")
  const [format, setFormat] = useState("hook-story-offer")

  const used = 45
  const limit = 100

  const maxChars = 1500
  const hookCount = hook.length
  const storyCount = story.length
  const offerCount = offer.length
  const contextCount = context.length // Declare contextCount variable

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast({
        title: "Missing context",
        description: "Please provide context about your video idea",
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
        body: JSON.stringify({ context, format }),
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to generate video script")
      }

      const data = await response.json()
      setGeneratedScript(data.script)
      window.dispatchEvent(new Event('credits-updated'))
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

  const selectedFormat = formats.find((f) => f.value === format)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Video Script Generator
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Choose a format and describe your video idea. AI will write the full script.
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
            <Label className="text-sm sm:text-base font-semibold">Script Format</Label>
            <Select value={format} onValueChange={setFormat} disabled={isGenerating}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{fmt.label}</span>
                      <span className="text-xs text-muted-foreground">{fmt.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedFormat && (
              <p className="text-xs text-muted-foreground mt-1">{selectedFormat.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="context" className="text-sm sm:text-base font-semibold">
                Video Context
              </Label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  contextCount > maxChars ? "text-destructive font-medium" : "text-muted-foreground",
                )}
              >
                {contextCount}/{maxChars}
              </span>
            </div>
            <Textarea
              id="context"
              placeholder="Describe your video idea: What's the topic? Who's the audience? What action do you want them to take? Include key points you want to hit."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className={cn(
                "min-h-[160px] resize-none text-sm sm:text-base",
                contextCount > maxChars && "border-destructive focus-visible:ring-destructive",
              )}
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              {format === "hook-story-offer" &&
                "AI will create a pattern interrupt hook, empathy-building story, and transformation CTA"}
              {format === "provide-value" &&
                "AI will structure educational content that establishes your authority"}
              {format === "emotion-logic-urgency" &&
                "AI will craft an emotional opening, logical middle, and urgent close"}
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!context.trim() || contextCount > maxChars || isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
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
