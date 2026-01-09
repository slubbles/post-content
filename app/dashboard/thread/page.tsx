import { ThreadGenerator } from "@/components/thread-generator"
import { HistorySection } from "@/components/history-section"

export default function DashboardThreadPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thread Builder</h1>
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
