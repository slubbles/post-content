"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { List, Zap, Video } from "lucide-react"
import { GeneratedThread } from "@/components/generated-thread"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThreadGenerator() {
  const [topic, setTopic] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [threadLength, setThreadLength] = useState([5])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatedThread, setGeneratedThread] = useState<string[]>([])

  const [hook, setHook] = useState("")
  const [story, setStory] = useState("")
  const [offer, setOffer] = useState("")
  const [contentType, setContentType] = useState<"thread" | "video-script">("thread")

  const used = 45
  const limit = 100

  const maxTopicChars = 500
  const maxKeyPointsChars = 800
  const maxHookChars = 300
  const maxStoryChars = 1000
  const maxOfferChars = 500

  const topicLength = topic.length
  const keyPointsLength = keyPoints.length
  const hookLength = hook.length
  const storyLength = story.length
  const offerLength = offer.length

  const isTopicNearLimit = topicLength > maxTopicChars * 0.8
  const isTopicOverLimit = topicLength > maxTopicChars
  const isKeyPointsNearLimit = keyPointsLength > maxKeyPointsChars * 0.8
  const isKeyPointsOverLimit = keyPointsLength > maxKeyPointsChars
  const isHookNearLimit = hookLength > maxHookChars * 0.8
  const isHookOverLimit = hookLength > maxHookChars
  const isStoryNearLimit = storyLength > maxStoryChars * 0.8
  const isStoryOverLimit = storyLength > maxStoryChars
  const isOfferNearLimit = offerLength > maxOfferChars * 0.8
  const isOfferOverLimit = offerLength > maxOfferChars

  const handleGenerate = async () => {
    if (contentType === "thread" && (!topic.trim() || isTopicOverLimit)) return
    if (contentType === "video-script" && (!hook.trim() || !story.trim() || !offer.trim())) return

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
        body: JSON.stringify(
          contentType === "thread"
            ? {
                topic,
                keyPoints,
                threadLength: threadLength[0],
              }
            : {
                contentType: "video-script",
                hook,
                story,
                offer,
              },
        ),
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
        <CardHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <List className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Thread Builder
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Break down your big ideas into bite-sized brilliance or create video scripts
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
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={contentType} onValueChange={(v) => setContentType(v as "thread" | "video-script")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="thread" className="gap-2">
                <List className="h-4 w-4" />
                Thread
              </TabsTrigger>
              <TabsTrigger value="video-script" className="gap-2">
                <Video className="h-4 w-4" />
                Video Script
              </TabsTrigger>
            </TabsList>

            {/* Thread Content */}
            <TabsContent value="thread" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="thread-topic" className="text-sm sm:text-base">
                  Main Topic
                </Label>
                <Textarea
                  id="thread-topic"
                  placeholder="What's your main idea? e.g. 'Why most startups fail at product-market fit'"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={cn(
                    "min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base",
                    isTopicOverLimit && "border-destructive focus-visible:ring-destructive",
                  )}
                  disabled={isGenerating}
                />
                <div className="flex justify-end">
                  <span
                    className={cn(
                      "text-xs tabular-nums transition-colors",
                      isTopicOverLimit
                        ? "text-destructive font-medium"
                        : isTopicNearLimit
                          ? "text-orange-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {topicLength}/{maxTopicChars}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="thread-length" className="text-sm sm:text-base">
                    Thread Length
                  </Label>
                  <span className="text-xs sm:text-sm font-medium tabular-nums">{threadLength[0]} posts</span>
                </div>
                <Slider
                  id="thread-length"
                  min={3}
                  max={15}
                  step={1}
                  value={threadLength}
                  onValueChange={setThreadLength}
                  disabled={isGenerating}
                  className="touch-target"
                />
                <p className="text-xs text-muted-foreground">
                  Longer threads allow for deeper exploration of your topic
                </p>
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
                  disabled={isGenerating}
                />
              </div>
            </TabsContent>

            {/* Video Script Content */}
            <TabsContent value="video-script" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="hook" className="text-sm sm:text-base">
                  Hook (5-8 seconds)
                </Label>
                <Textarea
                  id="hook"
                  placeholder="Start with a pattern interrupt or direct question. e.g. 'You're spending 3 hours writing. Here's how I do it in 30 seconds.'"
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  className={cn(
                    "min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base",
                    isHookOverLimit && "border-destructive focus-visible:ring-destructive",
                  )}
                  disabled={isGenerating}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Call out the problem or pain point</span>
                  <span
                    className={cn(
                      "text-xs tabular-nums transition-colors",
                      isHookOverLimit
                        ? "text-destructive font-medium"
                        : isHookNearLimit
                          ? "text-orange-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {hookLength}/{maxHookChars}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="story" className="text-sm sm:text-base">
                  Story (30-45 seconds)
                </Label>
                <Textarea
                  id="story"
                  placeholder="Share your journey or the struggle. Paint the daily scene. Show the cycle. Reveal the real problem. e.g. 'I used to spend hours on one post...'"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={6}
                  className={cn(
                    "resize-none text-sm sm:text-base",
                    isStoryOverLimit && "border-destructive focus-visible:ring-destructive",
                  )}
                  disabled={isGenerating}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Build empathy through shared experience</span>
                  <span
                    className={cn(
                      "text-xs tabular-nums transition-colors",
                      isStoryOverLimit
                        ? "text-destructive font-medium"
                        : isStoryNearLimit
                          ? "text-orange-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {storyLength}/{maxStoryChars}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offer" className="text-sm sm:text-base">
                  Offer (15-30 seconds)
                </Label>
                <Textarea
                  id="offer"
                  placeholder="Present the solution and CTA. Show transformation with numbers. e.g. 'PostContent helped me go from 3 hours to 30 minutes. Start free today.'"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  rows={4}
                  className={cn(
                    "resize-none text-sm sm:text-base",
                    isOfferOverLimit && "border-destructive focus-visible:ring-destructive",
                  )}
                  disabled={isGenerating}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Clear CTA with urgency and social proof</span>
                  <span
                    className={cn(
                      "text-xs tabular-nums transition-colors",
                      isOfferOverLimit
                        ? "text-destructive font-medium"
                        : isOfferNearLimit
                          ? "text-orange-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {offerLength}/{maxOfferChars}
                  </span>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={
                isGenerating ||
                (contentType === "thread" && (!topic.trim() || isTopicOverLimit)) ||
                (contentType === "video-script" &&
                  (!hook.trim() ||
                    !story.trim() ||
                    !offer.trim() ||
                    isHookOverLimit ||
                    isStoryOverLimit ||
                    isOfferOverLimit))
              }
              className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              {!isGenerating && (
                <>
                  {contentType === "thread" ? <List className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                  {contentType === "thread" ? "Generate Thread" : "Generate Video Script"}
                </>
              )}
              {isGenerating && (
                <span className="w-full">Crafting {contentType === "thread" ? "thread" : "script"}...</span>
              )}
            </Button>
            {isGenerating && <Progress value={generatingProgress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>

      {generatedThread.length > 0 && <GeneratedThread thread={generatedThread} />}
    </div>
  )
}
