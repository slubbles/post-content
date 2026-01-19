"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sparkles, AlertCircle, RefreshCw, Zap } from "lucide-react"
import { GeneratedPosts } from "@/components/generated-posts"
import { ConfettiCelebration } from "@/components/confetti-celebration"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const platforms = [
  { value: "twitter", label: "Twitter/X", shortLabel: "X" },
  { value: "linkedin", label: "LinkedIn", shortLabel: "In" },
]

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
]

const examplePrompts = [
  "Launching my new product next week",
  "Just hit a major milestone",
  "Hot take on AI in marketing",
  "Lessons from my biggest failure",
  "Why most advice is wrong",
]

export function PostGenerator() {
  const { toast } = useToast()
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState("twitter")
  const [tone, setTone] = useState("professional")
  const [variants, setVariants] = useState([3])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const used = 45
  const limit = 100

  const maxChars = 500
  const charCount = topic.length
  const isNearLimit = charCount > maxChars * 0.8
  const isOverLimit = charCount > maxChars

  useEffect(() => {
    const handlePopulateForm = (event: CustomEvent) => {
      if (event.detail?.metadata?.topic) {
        setTopic(event.detail.metadata.topic)
      }
    }

    window.addEventListener("populateForm", handlePopulateForm as EventListener)
    return () => window.removeEventListener("populateForm", handlePopulateForm as EventListener)
  }, [])

  const handleGenerate = async () => {
    if (!topic.trim() || isOverLimit) return

    setIsGenerating(true)
    setGeneratingProgress(0)
    setApiError(null)

    const progressInterval = setInterval(() => {
      setGeneratingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 15
      })
    }, 300)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platform,
          tone,
          variants: variants[0],
        }),
      })

      const data = await response.json()

      clearInterval(progressInterval)
      setGeneratingProgress(100)

      if (!response.ok) {
        setApiError(data.error || "Failed to generate posts. Please try again.")
        toast({
          title: "Generation failed",
          description: data.error || "Unable to generate posts. Please try again.",
          variant: "destructive",
        })
        return
      }

      if (data.posts) {
        setTimeout(() => {
          setGeneratedPosts(data.posts)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 100)
          toast({
            title: "Posts generated!",
            description: `Created ${data.posts.length} post${data.posts.length > 1 ? "s" : ""} for you.`,
          })
        }, 200)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error("[v0] Generation error:", error)
      setApiError("Network error. Please check your connection and try again.")
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setGeneratingProgress(0)
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      <ConfettiCelebration trigger={showConfetti} />

      {apiError && (
        <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{apiError}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              className="ml-4 hover:scale-105 bg-transparent"
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Generate Posts
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Tell us what you want to post about. We'll make it sound good.
              </CardDescription>
            </div>
            <Link href="/pricing" className="shrink-0">
              <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs sm:text-sm text-muted-foreground transition-colors hover:bg-muted cursor-pointer touch-target">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium tabular-nums">
                  {used}/{limit}
                </span>
              </div>
            </Link>
          </div>

          <div className="block sm:hidden">
            <p className="text-xs text-muted-foreground mb-2">Try these:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setTopic(prompt)}
                  className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm sm:text-base">
              Topic or Message
            </Label>
            <Textarea
              id="topic"
              placeholder="e.g. 'Launching my new product next week' or 'Just learned something cool about AI'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={cn(
                "min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base",
                isOverLimit && "border-destructive focus-visible:ring-destructive",
              )}
              disabled={isGenerating}
            />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground hidden sm:block">
                The more specific you are, the better your posts will be.
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
                  className={cn("touch-target text-xs sm:text-sm", platform === p.value && "shadow-sm")}
                >
                  <span className="sm:hidden">{p.shortLabel}</span>
                  <span className="hidden sm:inline">{p.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Tone</Label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <Button
                  key={t.value}
                  type="button"
                  variant={tone === t.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTone(t.value)}
                  disabled={isGenerating}
                  className={cn("touch-target text-xs sm:text-sm", tone === t.value && "shadow-sm")}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="variants">Number of Variants</Label>
              <span className="text-sm font-medium text-primary">
                {variants[0]} option{variants[0] > 1 ? "s" : ""}
              </span>
            </div>
            <Slider
              id="variants"
              min={1}
              max={5}
              step={1}
              value={variants}
              onValueChange={setVariants}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">More variants = more options to choose from</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating || isOverLimit}
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-target text-sm sm:text-base"
              size="lg"
            >
              {!isGenerating && (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Posts
                </>
              )}
              {isGenerating && <span className="w-full">Generating...</span>}
            </Button>
            {isGenerating && <Progress value={generatingProgress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>

      {generatedPosts.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GeneratedPosts posts={generatedPosts} platform={platform} />
        </div>
      )}
    </div>
  )
}
