"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface GeneratedThreadProps {
  thread: string[]
}

export function GeneratedThread({ thread }: GeneratedThreadProps) {
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyAll = async () => {
    const fullThread = thread.map((post, idx) => `${idx + 1}/${thread.length}\n\n${post}`).join("\n\n---\n\n")
    await navigator.clipboard.writeText(fullThread)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const handleCopySingle = async (post: string, index: number) => {
    await navigator.clipboard.writeText(post)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <Card className="transition-all hover:shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your thread is ready ({thread.length} posts)</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full bg-transparent transition-transform hover:scale-105"
          onClick={handleCopyAll}
        >
          {copiedAll ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy All
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {thread.map((post, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm group"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {index + 1}/{thread.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                onClick={() => handleCopySingle(post, index)}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3 w-3 text-green-600" />
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{post}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
