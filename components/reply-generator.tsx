"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MessageSquare, Zap } from "lucide-react"
import { GeneratedPosts } from "@/components/generated-posts"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"

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
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Smart Reply Generator
              </CardTitle>
              <CardDescription>Drop the post you're replying to, we'll craft the perfect response</CardDescription>
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
              <Label htmlFor="originalPost">Original Post</Label>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isPostOverLimit && "text-destructive",
                  isPostNearLimit && !isPostOverLimit && "text-amber-600",
                  !isPostNearLimit && "text-muted-foreground",
                )}
              >
                {postLength}/{maxPostChars}
              </span>
            </div>
            <Textarea
              id="originalPost"
              placeholder="Paste the post you're replying to here..."
              value={originalPost}
              onChange={(e) => setOriginalPost(e.target.value)}
              rows={4}
              className={cn(
                "resize-none transition-all focus:ring-2 focus:ring-primary/20",
                isPostOverLimit && "border-destructive focus:ring-destructive",
              )}
            />
            {isPostOverLimit && (
              <p className="text-xs text-destructive">
                Post is too long. Please keep it under {maxPostChars} characters.
              </p>
            )}
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
            <Label>Reply Vibe</Label>
            <ToggleGroup
              type="single"
              value={replyTone}
              onValueChange={(v) => v && setReplyTone(v)}
              className="justify-start flex-wrap"
            >
              {replyTones.map((t) => (
                <ToggleGroupItem
                  key={t.value}
                  value={t.value}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {t.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
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
