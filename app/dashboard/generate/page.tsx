import { PostGenerator } from "@/components/post-generator"
import { HistorySection } from "@/components/history-section"

export default function DashboardGeneratePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Posts</h1>
        <p className="mt-2 text-muted-foreground">
          Create engaging social media posts in seconds with AI that sounds like you.
        </p>
      </div>

      <PostGenerator />

      <div className="pt-8 border-t">
        <HistorySection type="generate" title="Recent Generates" limit={10} />
      </div>
    </div>
  )
}
