import { ReplyGenerator } from "@/components/reply-generator"
import { HistorySection } from "@/components/history-section"

export default function DashboardReplyPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Replies</h1>
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
