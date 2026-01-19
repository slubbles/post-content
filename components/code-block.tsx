"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      {title && (
        <div className="bg-zinc-800 text-zinc-100 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-zinc-700">
          {title}
        </div>
      )}
      <div className={cn("relative bg-zinc-900 rounded-lg", title ? "rounded-t-none" : "")}>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 hover:bg-zinc-700"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
        </Button>
        <pre className="overflow-x-auto p-4">
          <code className="text-sm text-zinc-100 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  )
}
