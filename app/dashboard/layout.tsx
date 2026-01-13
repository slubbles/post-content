import type React from "react"
import type { Metadata, Viewport } from "next"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "Dashboard - PostContent",
  description: "Create and manage your AI-powered social media content",
}

export const viewport: Viewport = {
  themeColor: "#ff4b3c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
