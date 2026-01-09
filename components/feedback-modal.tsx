"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const maxChars = 500
  const charCount = feedback.length
  const isOverLimit = charCount > maxChars

  const handleSubmit = async () => {
    if (!feedback.trim() || isOverLimit) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      })

      if (!response.ok) throw new Error("Failed to send feedback")

      setIsSuccess(true)
      toast({
        title: "Feedback sent!",
        description: "Thank you for helping us improve 💛",
      })

      setTimeout(() => {
        onOpenChange(false)
        setIsSuccess(false)
        setFeedback("")
      }, 2000)
    } catch (error) {
      console.error("[v0] Feedback error:", error)
      toast({
        title: "Failed to send",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Got ideas? We're all ears. Your feedback goes straight to our founder and shapes what we build next.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 text-center animate-in fade-in zoom-in">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary fill-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">✅ Feedback sent! Thank you 💛</h3>
            <p className="text-sm text-muted-foreground">This helps us build a better product for you</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Your feedback
                </label>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isOverLimit && "text-destructive",
                    !isOverLimit && "text-muted-foreground",
                  )}
                >
                  {charCount}/{maxChars}
                </span>
              </div>
              <Textarea
                id="feedback"
                placeholder="What can we improve? What's missing? What do you love?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className={cn("resize-none transition-all", isOverLimit && "border-destructive focus:ring-destructive")}
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">💛 Helpful feedback gets rewarded</p>
            </div>
          </div>
        )}

        {!isSuccess && (
          <DialogFooter>
            <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Not now
            </Button>
            <Button onClick={handleSubmit} disabled={!feedback.trim() || isSubmitting || isOverLimit}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Feedback"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
