"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Loader2 } from "lucide-react"
import { GeneratedPosts } from "@/components/generated-posts"
import { UsageIndicator } from "@/components/usage-indicator"
import { cn } from "@/lib/utils"

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
  const [generatedReplies, setGeneratedReplies] = useState<string[]>([])

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
      if (data.replies) {
        setGeneratedReplies(data.replies)
      }
    } catch (error) {
      console.error("Reply generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <UsageIndicator />

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Smart Reply Generator
          </CardTitle>
          <CardDescription>Drop the post you're replying to, we'll craft the perfect response</CardDescription>
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
            <Label htmlFor="replyTone">Reply Vibe</Label>
            <Select value={replyTone} onValueChange={setReplyTone}>
              <SelectTrigger id="replyTone" className="transition-all focus:ring-2 focus:ring-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {replyTones.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!originalPost.trim() || isGenerating || isPostOverLimit}
            className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crafting your reply...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Generate Reply
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedReplies.length > 0 && <GeneratedPosts posts={generatedReplies} platform="reply" />}
    </div>
  )
}
