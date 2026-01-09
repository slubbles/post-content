import { AppNavigation } from "@/components/app-navigation"
import { TrainingWizard } from "@/components/training-wizard"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { QuickActionButton } from "@/components/quick-action-button"
import { Suspense } from "react"

export default function TrainPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs />

        <div className="mb-8 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Teach the AI to write like you</h1>
          <p className="mt-4 text-lg text-muted-foreground">Show us your style, and we'll capture your unique voice</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TrainingWizard />
        </Suspense>
      </main>
      <KeyboardShortcuts />
      <QuickActionButton />
    </div>
  )
}
