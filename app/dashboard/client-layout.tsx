"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { OnboardingModal } from "@/components/onboarding-modal"

const mockUser = {
  name: "Alex Rivera",
  email: "alex@example.com",
  plan: "free" as const,
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setIsCollapsed(saved === "true")
    }

    const handleCustomEvent = () => {
      const saved = localStorage.getItem("sidebar-collapsed")
      setIsCollapsed(saved === "true")
    }

    window.addEventListener("sidebar-toggle", handleCustomEvent)

    return () => {
      window.removeEventListener("sidebar-toggle", handleCustomEvent)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar user={mockUser} isCollapsed={isCollapsed} onToggleCollapse={setIsCollapsed} />
      <main
        className="flex-1 transition-all duration-300 ease-in-out lg:pl-[240px] min-h-screen"
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth >= 1024 ? (isCollapsed ? "60px" : "240px") : "0",
        }}
      >
        <div className="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-8 max-w-5xl mx-auto">{children}</div>
      </main>
      <OnboardingModal />
    </div>
  )
}
