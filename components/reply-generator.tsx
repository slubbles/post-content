"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MessageSquare, Zap } from "lucide-react"
import { GeneratedPosts } from "@/components/generated-posts"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const replyTones = [
  { value: "agree", label: "Agreeing" },
  { value: "question", label: "Questioning" },
  { value: "supportive", label: "Supportive" },
  { value: "neutral", label: "Neutral" },
  { value: "insightful", label: "Add Insight" },
]

export function ReplyGenerator() {
  const [originalPost, setOriginalPost] = useState("")
  const [context, setContext] = useState("")
  const [replyTone, setReplyTone] = useState("supportive")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatedReplies, setGeneratedReplies] = useState<string[]>([])

  const used = 45
  const limit = 100

  const maxPostChars = 500
  const maxContextChars = 300
  const postLength = originalPost.length
  const contextLength = context.length

  const isPostNearLimit = postLength > maxPostChars * 0.8
  const isPostOverLimit = postLength > maxPostChars
  const isContextNearLimit = contextLength > maxContextChars * 0.8
  const isContextOverLimit = contextLength > maxContextChars

  const handleGenerate = async () => {
    if (!originalPost.trim() || isPostOverLimit) return

    setIsGenerating(true)
    setGeneratingProgress(0)

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
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalPost,
          context,
          replyTone,
        }),
      })

      const data = await response.json()
      clearInterval(progressInterval)
      setGeneratingProgress(100)

      if (data.replies) {
        setTimeout(() => {
          setGeneratedReplies(data.replies)
        }, 200)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error("Reply generation error:", error)
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
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Smart Reply Generator
              </CardTitle>
              <CardDescription className="mt-1.5 text-sm sm:text-base">
                Craft thoughtful replies that add value to the conversation
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
          <div className="space-y-2">
            <Label htmlFor="original-post" className="text-sm sm:text-base">
              Original Post
            </Label>
            <Textarea
              id="original-post"
              placeholder="Paste the post you want to reply to..."
              value={originalPost}
              onChange={(e) => setOriginalPost(e.target.value)}
              className={cn(
                "min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base",
                isPostOverLimit && "border-destructive focus-visible:ring-destructive",
              )}
              disabled={isGenerating}
            />
            <div className="flex justify-end">
              <span
                className={cn(
                  "text-xs tabular-nums transition-colors",
                  isPostOverLimit
                    ? "text-destructive font-medium"
                    : isPostNearLimit
                      ? "text-orange-500"
                      : "text-muted-foreground",
                )}
              >
                {postLength}/{maxPostChars}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Reply Style</Label>
            <div className="flex flex-wrap gap-2">
              {replyTones.map((t) => (
                <Button
                  key={t.value}
                  type="button"
                  variant={replyTone === t.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReplyTone(t.value)}
                  disabled={isGenerating}
                  className={cn("touch-target text-xs sm:text-sm", replyTone === t.value && "shadow-sm")}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="context">Your Take (Optional)</Label>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isContextOverLimit && "text-destructive",
                  isContextNearLimit && !isContextOverLimit && "text-amber-600",
                  !isContextNearLimit && "text-muted-foreground",
                )}
              >
                {contextLength}/{maxContextChars}
              </span>
            </div>
            <Textarea
              id="context"
              placeholder="Got a specific angle or point you want to make? Share it here..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              className={cn(
                "resize-none transition-all focus:ring-2 focus:ring-primary/20",
                isContextOverLimit && "border-destructive focus:ring-destructive",
              )}
            />
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleGenerate}
              disabled={!originalPost.trim() || isGenerating || isPostOverLimit}
              className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              {!isGenerating && (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Generate Reply
                </>
              )}
              {isGenerating && <span className="w-full">Crafting reply...</span>}
            </Button>
            {isGenerating && <Progress value={generatingProgress} className="h-1.5 w-full" />}
          </div>
        </CardContent>
      </Card>
      {generatedReplies.length > 0 && <GeneratedPosts posts={generatedReplies} platform="reply" />}
    </div>
  )
}
