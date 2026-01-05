"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command } from "lucide-react"

const shortcuts = [
  { keys: ["⌘", "K"], description: "Open command menu", action: "search" },
  { keys: ["G", "H"], description: "Go to Generate", action: "navigate-generate" },
  { keys: ["G", "R"], description: "Go to Reply", action: "navigate-reply" },
  { keys: ["G", "T"], description: "Go to Thread", action: "navigate-thread" },
  { keys: ["G", "I"], description: "Go to History", action: "navigate-history" },
  { keys: ["?"], description: "Show keyboard shortcuts", action: "help" },
]

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>Speed up your workflow with these shortcuts</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="rounded bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Press ? to toggle this menu anytime</p>
      </DialogContent>
    </Dialog>
  )
}
