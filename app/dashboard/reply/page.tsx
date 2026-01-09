import { ReplyGenerator } from "@/components/reply-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HistorySection } from "@/components/history-section"

export default function DashboardReplyPage() {
  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard/generate" },
            { label: "Reply", href: "/dashboard/reply" },
          ]}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Smart Replies</h1>
        <p className="mt-2 text-muted-foreground">
          Generate contextual replies to social media posts that match your voice.
        </p>
      </div>

      <ReplyGenerator />

      <div className="pt-8 border-t">
        <HistorySection type="reply" title="Recent Replies" limit={10} />
      </div>
    </div>
  )
}
