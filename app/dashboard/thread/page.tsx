import { ThreadGenerator } from "@/components/thread-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HistorySection } from "@/components/history-section"

export default function DashboardThreadPage() {
  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard/generate" },
            { label: "Thread", href: "/dashboard/thread" },
          ]}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Thread Builder</h1>
        <p className="mt-2 text-muted-foreground">
          Create compelling multi-post threads that tell a story and keep readers engaged.
        </p>
      </div>

      <ThreadGenerator />

      <div className="pt-8 border-t">
        <HistorySection type="thread" title="Recent Threads" limit={10} />
      </div>
    </div>
  )
}
