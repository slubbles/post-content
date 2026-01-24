"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { AIDetectionBadge } from "@/components/ai-detection-badge"
import { DetectionDetailsTooltip } from "@/components/detection-details-tooltip"
import { MakeMoreHumanButton } from "@/components/make-more-human-button"

interface AIDetectionResult {
  riskScore: number
  riskLevel: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH'
  passed: boolean
  flags: string[]
  recommendations: string[]
  metrics: {
    sentenceLength: number
    pronounUsage: number
    contractionUsage: number
    buzzwordDensity: number
    punctuationVariety: number
    exclamationUsage: number
  }
}

interface GenerationResult {
  content: string
  humanness: string
  aiDetection: AIDetectionResult
}

interface GeneratedPostsProps {
  posts: string[] | GenerationResult[]
  platform: string
}

// Type guard to check if we have detection results
function isDetectionResult(post: string | GenerationResult): post is GenerationResult {
  return typeof post === 'object' && 'aiDetection' in post
}

export function GeneratedPosts({ posts, platform }: GeneratedPostsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set())
  const [currentPosts, setCurrentPosts] = useState(posts)
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

  const handleHumanized = (index: number, humanizedContent: string, before: number, after: number) => {
    if (isDetectionResult(currentPosts[0])) {
      const updatedPosts = [...currentPosts] as GenerationResult[]
      updatedPosts[index] = {
        ...updatedPosts[index],
        content: humanizedContent,
        aiDetection: {
          ...updatedPosts[index].aiDetection,
          riskScore: after,
          riskLevel: after <= 20 ? 'MINIMAL' : after <= 40 ? 'LOW' : after <= 65 ? 'MEDIUM' : 'HIGH',
          passed: after <= 40
        }
      }
      setCurrentPosts(updatedPosts)
      toast({
        title: "Post improved!",
        description: `AI detection score reduced by ${before - after} points.`,
      })
    }
  }

  const getPostContent = (post: string | GenerationResult): string => {
    return typeof post === 'string' ? post : post.content
  }

  const getHumannessLabel = (humanness: string): string => {
    const labels: Record<string, string> = {
      'corporate_polished': '🤖 Corporate',
      'professional_smooth': '💼 Professional', 
      'casual_relaxed': '💬 Casual',
      'texting_friend': '🗣️ Texting'
    }
    return labels[humanness] || humanness
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
            {currentPosts.length} variant{currentPosts.length > 1 ? "s" : ""}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentPosts.map((post, index) => {
          const content = getPostContent(post)
          const hasDetection = isDetectionResult(post)
          
          return (
            <div
              key={index}
              className={cn(
                "group rounded-lg border border-border bg-card p-4 transition-all duration-200",
                "hover:border-primary/20 hover:bg-muted/50 hover:shadow-sm",
                likedPosts.has(index) && "border-primary/40 bg-primary/5",
              )}
            >
              {/* Humanness Label & Detection Badge */}
              {hasDetection && (
                <div className="mb-3 flex items-center justify-between gap-2 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {getHumannessLabel(post.humanness)}
                    </span>
                  </div>
                  <DetectionDetailsTooltip aiDetection={post.aiDetection}>
                    <div>
                      <AIDetectionBadge 
                        aiDetection={post.aiDetection} 
                        size="sm"
                        onClick
                      />
                    </div>
                  </DetectionDetailsTooltip>
                </div>
              )}

              {/* Post Content */}
              <div className="mb-3 whitespace-pre-wrap text-sm leading-relaxed">{content}</div>
              
              {/* Character Count */}
              <div className="mb-2 text-xs text-muted-foreground">{content.length} characters</div>
              
              {/* Actions Row */}
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
                
                <div className="flex items-center gap-2">
                  {/* Make More Human Button (only if we have detection) */}
                  {hasDetection && (
                    <MakeMoreHumanButton
                      content={content}
                      platform={platform}
                      tone="professional"
                      onHumanized={(humanized, before, after) => handleHumanized(index, humanized, before, after)}
                    />
                  )}
                  
                  {/* Copy Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 gap-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-primary-foreground",
                      copiedIndex === index && "bg-green-600 text-white hover:bg-green-700",
                    )}
                    onClick={() => handleCopy(content, index)}
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
            </div>
          )
        })}
        <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Not quite right? Try adjusting the tone or being more specific with your topic.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
