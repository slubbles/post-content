"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      router.push("/dashboard/generate")
    }
  }

  const handleSkip = () => {
    router.push("/dashboard/generate")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center mobile-safe-padding bg-background py-12">
      <div className="mb-8">
        <Link href="/">
          <Image
            src="/images/postcontent-20logo-20-20with-20text.png"
            alt="Post Content"
            width={321}
            height={180}
            className="h-[45px] md:h-[60px] w-auto"
            priority
          />
        </Link>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Welcome to Post Content</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip
            </Button>
          </div>
          <div className="space-y-2 pt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Generate AI-Powered Posts</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create engaging X/Twitter posts in seconds. Our AI learns your voice and generates content that sounds
                like you, not a robot.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 py-8">
              <h3 className="text-xl font-semibold text-center">What you can do</h3>
              <div className="space-y-4">
                <FeatureItem
                  title="Generate Posts"
                  description="Create single posts for any topic in your authentic voice"
                />
                <FeatureItem
                  title="Smart Replies"
                  description="Generate contextual replies to any post or conversation"
                />
                <FeatureItem
                  title="Build Threads"
                  description="Create multi-post threads that tell compelling stories"
                />
                <FeatureItem title="Train Your AI" description="Teach the AI your writing style with examples" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">You're all set!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start generating your first post now. You have{" "}
                <span className="font-semibold text-primary">100 free credits</span> to get started.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Previous
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1">
              {step === totalSteps ? "Get Started" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
