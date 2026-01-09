import type React from "react"
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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} />
      <main className="flex-1 lg:pl-60">
        <div className="mx-auto max-w-7xl mobile-safe-padding py-6 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
