"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

export function OnboardingChecklist() {
  const [visible, setVisible] = useState(false)
  const [completed, setCompleted] = useState({
    firstPost: false,
    trainAI: false,
    exploreReply: false,
  })

  useEffect(() => {
    const checklistState = localStorage.getItem("onboardingChecklist")
    if (checklistState) {
      setCompleted(JSON.parse(checklistState))
    }
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    setVisible(hasSeenWelcome === "true")
  }, [])

  const allCompleted = Object.values(completed).every((v) => v)

  if (!visible || allCompleted) return null

  const tasks = [
    { id: "firstPost", label: "Generate your first post", link: "/dashboard/generate" },
    { id: "trainAI", label: "Train your AI voice", link: "/train" },
    { id: "exploreReply", label: "Try the reply feature", link: "/reply" },
  ]

  const completedCount = Object.values(completed).filter(Boolean).length

  return (
    <Card className="animate-in slide-in-from-top mb-6 border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Get Started</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{tasks.length} completed
            </span>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <Link key={task.id} href={task.link}>
                <div className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-background/50">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      completed[task.id as keyof typeof completed]
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completed[task.id as keyof typeof completed] && <Check className="h-3 w-3" />}
                  </div>
                  <span className="text-sm">{task.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setVisible(false)} className="h-6 w-6 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
