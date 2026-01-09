"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    image: undefined,
  }

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
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} isCollapsed={isCollapsed} onToggleCollapse={setIsCollapsed} />
      <main
        className="flex-1 transition-all duration-300 pt-14 lg:pt-0"
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth >= 1024 ? (isCollapsed ? "60px" : "240px") : "0",
        }}
      >
        <div className="mx-auto max-w-7xl mobile-safe-padding py-6 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
