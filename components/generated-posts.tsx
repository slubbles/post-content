"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface GeneratedPostsProps {
  posts: string[]
  platform: string
}

export function GeneratedPosts({ posts, platform }: GeneratedPostsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast({
      title: "Copied to clipboard!",
      description: "Your post is ready to paste anywhere.",
    })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleLike = (index: number) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(index)) {
      newLiked.delete(index)
    } else {
      newLiked.add(index)
      const newDisliked = new Set(dislikedPosts)
      newDisliked.delete(index)
      setDislikedPosts(newDisliked)
      toast({
        title: "Thanks for the feedback!",
        description: "We'll use this to improve your future posts.",
      })
    }
    setLikedPosts(newLiked)
  }

  const handleDislike = (index: number) => {
    const newDisliked = new Set(dislikedPosts)
    if (newDisliked.has(index)) {
      newDisliked.delete(index)
    } else {
      newDisliked.add(index)
      const newLiked = new Set(likedPosts)
      newLiked.delete(index)
      setLikedPosts(newLiked)
    }
    setDislikedPosts(newDisliked)
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your Posts Are Ready
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            {posts.length} variant{posts.length > 1 ? "s" : ""}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className={cn(
              "group rounded-lg border border-border bg-card p-4 transition-all duration-200",
              "hover:border-primary/20 hover:bg-muted/50 hover:shadow-sm",
              likedPosts.has(index) && "border-primary/40 bg-primary/5",
            )}
          >
            <div className="mb-3 whitespace-pre-wrap text-sm leading-relaxed">{post}</div>
            <div className="mb-2 text-xs text-muted-foreground">{post.length} characters</div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 gap-1.5 transition-all duration-200 hover:scale-105",
                    likedPosts.has(index) && "text-green-600 hover:text-green-700",
                  )}
                  onClick={() => handleLike(index)}
                >
                  <ThumbsUp
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      likedPosts.has(index) && "fill-current scale-110",
                    )}
                  />
                  {likedPosts.has(index) ? "Liked" : "Like"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 gap-1.5 transition-all duration-200 hover:scale-105",
                    dislikedPosts.has(index) && "text-red-600 hover:text-red-700",
                  )}
                  onClick={() => handleDislike(index)}
                >
                  <ThumbsDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      dislikedPosts.has(index) && "fill-current scale-110",
                    )}
                  />
                  {dislikedPosts.has(index) ? "Disliked" : "Pass"}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 gap-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground",
                  copiedIndex === index && "bg-green-600 text-white hover:bg-green-700",
                )}
                onClick={() => handleCopy(post, index)}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Not quite right? Try adjusting the tone or being more specific with your topic.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
