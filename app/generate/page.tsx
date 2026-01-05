import { AppNavigation } from "@/components/app-navigation"
import { PostGenerator } from "@/components/post-generator"
import { OnboardingChecklist } from "@/components/onboarding-checklist"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { QuickActionButton } from "@/components/quick-action-button"
import { Suspense } from "react"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mobile-safe-padding mx-auto max-w-5xl py-6 sm:py-8">
        <Breadcrumbs />
        <OnboardingChecklist />

        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stop overthinking.
            <br />
            Start posting.
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            Turn your ideas into engaging social media posts in seconds. No more staring at blank screens.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-muted-foreground">Loading generator...</div>}>
          <PostGenerator />
        </Suspense>
      </main>
      <KeyboardShortcuts />
      <QuickActionButton />
    </div>
  )
}
