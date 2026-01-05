"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Sparkles, MessageSquare, List, GraduationCap } from "lucide-react"
import Link from "next/link"

export function QuickActionButton() {
  const [open, setOpen] = useState(false)

  const actions = [
    { icon: Sparkles, label: "Generate Post", href: "/generate", color: "text-primary" },
    { icon: MessageSquare, label: "Create Reply", href: "/reply", color: "text-blue-500" },
    { icon: List, label: "Start Thread", href: "/thread", color: "text-purple-500" },
    { icon: GraduationCap, label: "Train AI", href: "/train", color: "text-green-500" },
  ]

  return (
    <div className="fixed bottom-20 right-6 z-40 md:bottom-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            aria-label="Quick actions"
          >
            <Plus className={`h-6 w-6 transition-transform ${open ? "rotate-45" : ""}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-56 p-2">
          <div className="space-y-1">
            {actions.map((action) => (
              <Link key={action.href} href={action.href} onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 transition-all hover:scale-[1.02]"
                  size="sm"
                >
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                  <span>{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
