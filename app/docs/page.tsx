import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsContent } from "@/components/docs-content"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation - PostContent",
  description: "Complete guide to using PostContent for AI-powered social media content generation.",
}

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    subsections: [
      { id: "create-account", title: "Create Your Account" },
      { id: "first-post", title: "Generate Your First Post" },
    ],
  },
  {
    id: "features",
    title: "Features Overview",
    subsections: [{ id: "content-types", title: "Content Types" }],
  },
  {
    id: "api-reference",
    title: "API Reference",
    subsections: [
      { id: "generate-endpoint", title: "Generate Endpoint" },
      { id: "reply-endpoint", title: "Reply Endpoint" },
      { id: "thread-endpoint", title: "Thread Endpoint" },
    ],
  },
  {
    id: "account",
    title: "Account Management",
    subsections: [{ id: "profile-settings", title: "Profile Settings" }],
  },
  {
    id: "pricing",
    title: "Pricing & Subscriptions",
    subsections: [
      { id: "plan-comparison", title: "Plan Comparison" },
      { id: "upgrade", title: "How to Upgrade" },
    ],
  },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "support", title: "Support & Resources" },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar - Hidden on mobile, shown on lg+ */}
          <aside className="hidden lg:block w-64 shrink-0">
            <DocsSidebar sections={sections} />
          </aside>

          {/* Mobile menu button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button size="lg" className="rounded-full shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <DocsContent />
          </main>
        </div>
      </div>
    </div>
  )
}
