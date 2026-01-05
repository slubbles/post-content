import { AppNavigation } from "@/components/app-navigation"
import { ThreadGenerator } from "@/components/thread-generator"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { QuickActionButton } from "@/components/quick-action-button"
import { Suspense } from "react"

export default function ThreadPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs />

        <div className="mb-8 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Tell your story, one post at a time
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Turn big ideas into engaging threads that people actually read
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ThreadGenerator />
        </Suspense>
      </main>
      <KeyboardShortcuts />
      <QuickActionButton />
    </div>
  )
}
