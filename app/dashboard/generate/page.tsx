import { PostGenerator } from "@/components/post-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HistorySection } from "@/components/history-section"

export default function DashboardGeneratePage() {
  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard/generate" },
            { label: "Generate", href: "/dashboard/generate" },
          ]}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Generate Posts</h1>
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
