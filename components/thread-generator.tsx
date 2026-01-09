"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { List, Zap } from "lucide-react"
import { GeneratedThread } from "@/components/generated-thread"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function ThreadGenerator() {
  const [topic, setTopic] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [threadLength, setThreadLength] = useState([5])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatedThread, setGeneratedThread] = useState<string[]>([])

  const used = 45
  const limit = 100

  const maxTopicChars = 500
  const maxKeyPointsChars = 800
  const topicLength = topic.length
  const keyPointsLength = keyPoints.length

  const isTopicNearLimit = topicLength > maxTopicChars * 0.8
  const isTopicOverLimit = topicLength > maxTopicChars
  const isKeyPointsNearLimit = keyPointsLength > maxKeyPointsChars * 0.8
  const isKeyPointsOverLimit = keyPointsLength > maxKeyPointsChars

  const handleGenerate = async () => {
    if (!topic.trim() || isTopicOverLimit) return

    setIsGenerating(true)
    setGeneratingProgress(0)

    const progressInterval = setInterval(() => {
      setGeneratingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 12
      })
    }, 350)

    try {
      const response = await fetch("/api/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          keyPoints,
          threadLength: threadLength[0],
        }),
      })

      const data = await response.json()
      clearInterval(progressInterval)
      setGeneratingProgress(100)

      if (data.thread) {
        setTimeout(() => {
          setGeneratedThread(data.thread)
        }, 200)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error("Thread generation error:", error)
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setGeneratingProgress(0)
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                Thread Builder
              </CardTitle>
              <CardDescription>Break down your big ideas into bite-sized brilliance</CardDescription>
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
              <Label htmlFor="topic">Main Topic</Label>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isTopicOverLimit && "text-destructive",
                  isTopicNearLimit && !isTopicOverLimit && "text-amber-600",
                  !isTopicNearLimit && "text-muted-foreground",
                )}
              >
                {topicLength}/{maxTopicChars}
              </span>
            </div>
            <Textarea
              id="topic"
              placeholder="What's the big idea you want to share? Tell us the story..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className={cn(
                "resize-none transition-all focus:ring-2 focus:ring-primary/20",
                isTopicOverLimit && "border-destructive focus:ring-destructive",
              )}
            />
            {!topic && (
              <p className="text-xs text-muted-foreground">
                Tip: Be specific! "5 ways to improve productivity" works better than just "productivity"
              </p>
            )}
            {isTopicOverLimit && (
              <p className="text-xs text-destructive">
                Topic is too long. Keep it focused under {maxTopicChars} characters.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="keyPoints">Key Points (Optional)</Label>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isKeyPointsOverLimit && "text-destructive",
                  isKeyPointsNearLimit && !isKeyPointsOverLimit && "text-amber-600",
                  !isKeyPointsNearLimit && "text-muted-foreground",
                )}
              >
                {keyPointsLength}/{maxKeyPointsChars}
              </span>
            </div>
            <Textarea
              id="keyPoints"
              placeholder="Got specific points to hit? Add them here (one per line works great)..."
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              rows={4}
              className={cn(
                "resize-none transition-all focus:ring-2 focus:ring-primary/20",
                isKeyPointsOverLimit && "border-destructive focus:ring-destructive",
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="threadLength">Thread Length</Label>
              <span className="text-sm font-medium text-primary">{threadLength[0]} posts</span>
            </div>
            <Slider
              id="threadLength"
              min={3}
              max={15}
              step={1}
              value={threadLength}
              onValueChange={setThreadLength}
              className="transition-opacity hover:opacity-80"
            />
            <p className="text-xs text-muted-foreground">Tip: 5-7 posts hit the sweet spot for engagement</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating || isTopicOverLimit}
              className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              {!isGenerating && (
                <>
                  <List className="mr-2 h-4 w-4" />
                  Generate Thread
                </>
              )}
              {isGenerating && <span className="w-full">Crafting thread...</span>}
            </Button>
            {isGenerating && <Progress value={generatingProgress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>

      {generatedThread.length > 0 && <GeneratedThread thread={generatedThread} />}
    </div>
  )
}
