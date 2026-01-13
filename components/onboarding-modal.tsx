"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, GraduationCap, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Generate Posts Instantly",
    description:
      "Just type your topic, pick your platform and tone. We'll create multiple variants for you to choose from.",
    icon: Sparkles,
    tip: "Pro tip: Be specific with your topic for better results.",
  },
  {
    title: "Reply Like a Pro",
    description: "Paste any post you want to reply to, and we'll craft thoughtful responses that match your voice.",
    icon: MessageSquare,
    tip: "Works great for engaging with industry leaders.",
  },
  {
    title: "Train Your Voice",
    description:
      "Share a few writing samples and we'll learn your style. The more you train, the more authentic your posts become.",
    icon: GraduationCap,
    tip: "Add 2-3 examples of your best posts to get started.",
  },
]

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("postcontent-onboarding-complete")
    if (!hasSeenOnboarding) {
      const timer = setTimeout(() => setIsOpen(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem("postcontent-onboarding-complete", "true")
    setIsOpen(false)
  }

  const progress = ((currentStep + 1) / steps.length) * 100
  const CurrentIcon = steps[currentStep].icon
  const isLastStep = currentStep === steps.length - 1

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-colors",
                    index <= currentStep ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CurrentIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{steps[currentStep].title}</DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">{steps[currentStep].description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/50 p-4 mt-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tip: </span>
            {steps[currentStep].tip}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip intro
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {isLastStep ? (
              <>
                Get Started
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
