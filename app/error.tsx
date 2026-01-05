"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance">Oops! Something went wrong</h1>
          <p className="text-muted-foreground text-pretty">
            Don't worry, it happens to the best of us. Let's try that again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="rounded-full">
            Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="rounded-full">
            Go home
          </Button>
        </div>

        {error.digest && <p className="text-xs text-muted-foreground font-mono">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
