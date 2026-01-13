"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { OnboardingModal } from "@/components/onboarding-modal"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Get user from session or fallback
  // Map subscribed status to plan type
  const getUserPlan = (): "free" | "pro" | "enterprise" => {
    if (!session?.user) return "free"
    const user = session.user as { subscribed?: boolean; subscriptionStatus?: string }
    if (user.subscribed && user.subscriptionStatus === "active") {
      // Could be extended to differentiate pro vs enterprise from subscriptionId
      return "pro"
    }
    return "free"
  }

  const user = session?.user ? {
    name: session.user.name || "User",
    email: session.user.email || "",
    plan: getUserPlan(),
  } : {
    name: "User",
    email: "",
    plan: "free" as const,
  }

  useEffect(() => {
    setIsMounted(true)
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

  // Calculate margin based on collapsed state (only after mount to avoid SSR mismatch)
  const sidebarMargin = isMounted && isCollapsed ? "60px" : "240px"

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar user={user} isCollapsed={isCollapsed} onToggleCollapse={setIsCollapsed} />
      <main
        className="flex-1 transition-all duration-300 ease-in-out min-h-screen pt-14 lg:pt-0"
        style={{
          marginLeft: isMounted ? `var(--sidebar-width, ${sidebarMargin})` : "0",
        }}
      >
        <style jsx>{`
          @media (min-width: 1024px) {
            main {
              --sidebar-width: ${sidebarMargin};
            }
          }
          @media (max-width: 1023px) {
            main {
              --sidebar-width: 0px;
            }
          }
        `}</style>
        <div className="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 lg:pt-8 max-w-5xl mx-auto">{children}</div>
      </main>
      <OnboardingModal />
    </div>
  )
}
