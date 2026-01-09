import { TrainingWizard } from "@/components/training-wizard"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function DashboardTrainPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard/generate" },
            { label: "Train", href: "/dashboard/train" },
          ]}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Train AI</h1>
        <p className="mt-2 text-muted-foreground">
          Teach the AI your unique voice and writing style for more personalized content.
        </p>
      </div>

      <TrainingWizard />
    </div>
  )
}
