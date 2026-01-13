"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Loader2, Plus, X, Sparkles, Check, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function TrainingWizard() {
  const { toast } = useToast()
  const [examples, setExamples] = useState<string[]>([""])
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [tone, setTone] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)

  const maxExampleChars = 500
  const maxToneChars = 400

  useEffect(() => {
    const loadTrainingData = async () => {
      try {
        const response = await fetch("/api/train")
        if (response.ok) {
          const data = await response.json()
          if (data.profile) {
            setExamples(data.profile.examples?.length > 0 ? data.profile.examples : [""])
            setKeywords(data.profile.keywords || [])
            setTone(data.profile.tone || "")
            setHasExistingProfile(true)
          }
        }
      } catch (error) {
        console.error("[v0] Failed to load training data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadTrainingData()
  }, [])

  const filledExamples = examples.filter((e) => e.trim().length >= 50).length
  const hasKeywords = keywords.length >= 3
  const hasTone = tone.trim().length >= 30

  const progressSteps = [
    { label: "2+ writing samples", completed: filledExamples >= 2, current: filledExamples },
    { label: "3+ topic keywords", completed: hasKeywords, current: keywords.length },
    { label: "Voice description", completed: hasTone, current: hasTone ? 1 : 0 },
  ]

  const completedSteps = progressSteps.filter((s) => s.completed).length
  const progressPercentage = Math.round((completedSteps / progressSteps.length) * 100)

  const addExample = () => {
    setExamples([...examples, ""])
  }

  const removeExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index))
  }

  const updateExample = (index: number, value: string) => {
    const newExamples = [...examples]
    newExamples[index] = value
    setExamples(newExamples)
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    try {
      const response = await fetch("/api/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examples: examples.filter((e) => e.trim()),
          keywords,
          tone,
        }),
      })

      if (response.ok) {
        setSaveSuccess(true)
        setHasExistingProfile(true)
        toast({
          title: "Voice profile saved",
          description: "Your AI is now trained on your writing style.",
        })
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        throw new Error("Save failed")
      }
    } catch (error) {
      console.error("[v0] Training save error:", error)
      toast({
        title: "Save failed",
        description: "Unable to save your voice profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-muted rounded w-1/3 mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    progressPercentage === 100 ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {progressPercentage === 100 ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{completedSteps}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {progressPercentage === 100
                      ? "Voice profile complete!"
                      : hasExistingProfile
                        ? "Update your voice profile"
                        : "Train your AI voice"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {progressPercentage === 100
                      ? "Your AI will now sound like you"
                      : `${completedSteps} of ${progressSteps.length} steps complete`}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex flex-wrap gap-4 text-sm">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full flex items-center justify-center",
                      step.completed ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {step.completed && <Check className="h-3 w-3" />}
                  </div>
                  <span className={cn(step.completed ? "text-foreground" : "text-muted-foreground")}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Writing Examples
          </CardTitle>
          <CardDescription>Share 2-3 posts that sound like you. The AI will pick up your vibe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {examples.map((example, index) => {
            const exampleLength = example.length
            const isNearLimit = exampleLength > maxExampleChars * 0.8
            const isOverLimit = exampleLength > maxExampleChars
            const isTooShort = exampleLength > 0 && exampleLength < 50

            return (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        Example {index + 1}
                        {exampleLength >= 50 && <Check className="h-3 w-3 text-primary" />}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium transition-colors",
                          isOverLimit && "text-destructive",
                          isNearLimit && !isOverLimit && "text-amber-600",
                          !isNearLimit && "text-muted-foreground",
                        )}
                      >
                        {exampleLength}/{maxExampleChars}
                      </span>
                    </div>
                    <Textarea
                      placeholder={`Paste something you've written that captures your style...`}
                      value={example}
                      onChange={(e) => updateExample(index, e.target.value)}
                      rows={3}
                      className={cn(
                        "resize-none transition-all focus:ring-2 focus:ring-primary/20",
                        isOverLimit && "border-destructive focus:ring-destructive",
                      )}
                    />
                    {isTooShort && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Add more content (at least 50 characters) for better training
                      </p>
                    )}
                  </div>
                  {examples.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExample(index)}
                      className="shrink-0 transition-colors hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
          {filledExamples < 2 && (
            <p className="text-xs text-muted-foreground">
              Add at least 2 examples (50+ chars each) for best results. The more you add, the better the AI learns your
              style.
            </p>
          )}
          <Button
            variant="outline"
            onClick={addExample}
            className="w-full gap-2 bg-transparent transition-all hover:scale-[1.01]"
          >
            <Plus className="h-4 w-4" />
            Add Another Example
          </Button>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Favorite Topics & Keywords
            {hasKeywords && <Check className="h-4 w-4 text-primary" />}
          </CardTitle>
          <CardDescription>What do you love talking about? Add at least 3 topics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., productivity, design, startups..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addKeyword()
                }
              }}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
            <Button onClick={addKeyword} className="shrink-0 transition-all hover:scale-[1.05]">
              Add
            </Button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="gap-1 pr-1 transition-all hover:scale-105">
                  {keyword}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 transition-colors hover:bg-destructive/20"
                    onClick={() => removeKeyword(keyword)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          {keywords.length < 3 && (
            <p className="text-xs text-muted-foreground">
              Add {3 - keywords.length} more topic(s) to complete this step
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Your Voice & Vibe
            {hasTone && <Check className="h-4 w-4 text-primary" />}
          </CardTitle>
          <CardDescription>How would you describe your writing style? Be honest! (30+ characters)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Writing style</span>
            <span
              className={cn(
                "text-xs font-medium transition-colors",
                tone.length > maxToneChars && "text-destructive",
                tone.length > maxToneChars * 0.8 && tone.length <= maxToneChars && "text-amber-600",
                tone.length <= maxToneChars * 0.8 && "text-muted-foreground",
              )}
            >
              {tone.length}/{maxToneChars}
            </span>
          </div>
          <Textarea
            placeholder="I'm casual and friendly, maybe a bit sarcastic. I keep things short and punchy, no fluff. I like to use real examples instead of theory..."
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            rows={4}
            className={cn(
              "resize-none transition-all focus:ring-2 focus:ring-primary/20",
              tone.length > maxToneChars && "border-destructive focus:ring-destructive",
            )}
          />
          {tone.length > 0 && tone.length < 30 && (
            <p className="text-xs text-amber-600">Add {30 - tone.length} more characters to complete this step</p>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={isSaving || progressPercentage < 100}
        className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
        size="lg"
        variant={saveSuccess ? "default" : "default"}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Teaching the AI...
          </>
        ) : saveSuccess ? (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Saved! Your AI is ready
          </>
        ) : progressPercentage < 100 ? (
          <>
            <GraduationCap className="mr-2 h-4 w-4" />
            Complete all steps to save
          </>
        ) : (
          <>
            <GraduationCap className="mr-2 h-4 w-4" />
            {hasExistingProfile ? "Update Voice Profile" : "Save Training Profile"}
          </>
        )}
      </Button>
    </div>
  )
}
