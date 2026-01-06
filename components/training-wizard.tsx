"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Loader2, Plus, X, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TrainingWizard() {
  const [examples, setExamples] = useState<string[]>([""])
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [tone, setTone] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const maxExampleChars = 500
  const maxToneChars = 400

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
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Training save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const filledExamples = examples.filter((e) => e.trim()).length

  return (
    <div className="space-y-6">
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

            return (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Example {index + 1}</span>
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
              Add at least 2 examples for best results. The more you add, the better the AI learns your style.
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
          <CardTitle>Favorite Topics & Keywords</CardTitle>
          <CardDescription>What do you love talking about? Add your go-to topics.</CardDescription>
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
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Your Voice & Vibe</CardTitle>
          <CardDescription>How would you describe your writing style? Be honest!</CardDescription>
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
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={isSaving}
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
        ) : (
          <>
            <GraduationCap className="mr-2 h-4 w-4" />
            Save Training Profile
          </>
        )}
      </Button>
    </div>
  )
}
