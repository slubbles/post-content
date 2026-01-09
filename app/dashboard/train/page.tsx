import { TrainingWizard } from "@/components/training-wizard"

export default function DashboardTrainPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Train AI</h1>
        <p className="mt-2 text-muted-foreground">
          Teach the AI your unique voice and writing style for more personalized content.
        </p>
      </div>

      <TrainingWizard />
    </div>
  )
}
