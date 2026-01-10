"use client"

import { useState } from "react"
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
import { useUsage } from "@/hooks/use-usage"

const platforms = [
  { value: "twitter", label: "Twitter/X", shortLabel: "X" },
  { value: "linkedin", label: "LinkedIn", shortLabel: "In" },
  { value: "instagram", label: "Instagram", shortLabel: "IG" },
  { value: "facebook", label: "Facebook", shortLabel: "FB" },
  { value: "threads", label: "Threads", shortLabel: "Th" },
]

const tones = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
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
  const { usage, refresh } = useUsage()

  const { used, limit } = usage

  const maxChars = 500
  const charCount = topic.length
  const isNearLimit = charCount > maxChars * 0.8
  const isOverLimit = charCount > maxChars

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
          input: topic,
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
          refresh()
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
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generate Posts
              </CardTitle>
              <CardDescription>Tell us what you want to post about. We'll make it sound good.</CardDescription>
            </div>
            <Link href="/pricing">
              <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted cursor-pointer">
                <Zap className="h-3 w-3" />
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
              <Label htmlFor="topic">Topic or Message</Label>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isOverLimit && "text-destructive",
                  isNearLimit && !isOverLimit && "text-amber-600",
                  !isNearLimit && "text-muted-foreground",
                )}
              >
                {charCount}/{maxChars}
              </span>
            </div>
            <Textarea
              id="topic"
              placeholder="e.g. 'Launching my new product next week' or 'Just learned something cool about AI'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              className={cn(
                "resize-none transition-all duration-200 focus:ring-2",
                isOverLimit && "border-destructive focus:ring-destructive",
              )}
            />
            {!topic && (
              <p className="text-xs text-muted-foreground">The more specific you are, the better your posts will be.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Platform</Label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <Button
                  key={p.value}
                  type="button"
                  variant={platform === p.value ? "default" : "outline"}
                  onClick={() => setPlatform(p.value)}
                  className="transition-all hover:scale-105"
                >
                  <span className="hidden sm:inline">{p.label}</span>
                  <span className="sm:hidden">{p.shortLabel}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <Button
                  key={t.value}
                  type="button"
                  variant={tone === t.value ? "default" : "outline"}
                  onClick={() => setTone(t.value)}
                  className="transition-all hover:scale-105"
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
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
