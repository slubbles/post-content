"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { GeneratedPosts } from "@/components/generated-posts"
import { UsageIndicator } from "@/components/usage-indicator"
import { ConfettiCelebration } from "@/components/confetti-celebration"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const platforms = [
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "threads", label: "Threads" },
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
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const maxChars = 500
  const charCount = topic.length
  const isNearLimit = charCount > maxChars * 0.8
  const isOverLimit = charCount > maxChars

  const handleGenerate = async () => {
    if (!topic.trim() || isOverLimit) return

    setIsGenerating(true)
    setApiError(null)
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
        setGeneratedPosts(data.posts)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 100)
        toast({
          title: "Posts generated!",
          description: `Created ${data.posts.length} post${data.posts.length > 1 ? "s" : ""} for you.`,
        })
      }
    } catch (error) {
      console.error("[v0] Generation error:", error)
      setApiError("Network error. Please check your connection and try again.")
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const loadingMessages = [
    "Cooking up some fire content...",
    "Channeling your inner influencer...",
    "Making it sound less boring...",
    "Adding a sprinkle of personality...",
    "Teaching AI to be funny...",
  ]
  const [loadingMessage] = useState(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

  return (
    <div className="space-y-6">
      <ConfettiCelebration trigger={showConfetti} />
      <UsageIndicator />

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
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate Posts
          </CardTitle>
          <CardDescription>Tell us what you want to post about. We'll make it sound good.</CardDescription>
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

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating || isOverLimit}
            className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingMessage}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Posts
              </>
            )}
          </Button>
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
