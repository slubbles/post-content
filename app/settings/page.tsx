import { AppNavigation } from "@/components/app-navigation"
import { SettingsForm } from "@/components/settings-form"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { QuickActionButton } from "@/components/quick-action-button"
import { Suspense } from "react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs />

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Make it yours</h1>
          <p className="mt-2 text-muted-foreground">Tweak your preferences and fine-tune your AI assistant</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <SettingsForm />
        </Suspense>
      </main>
      <KeyboardShortcuts />
      <QuickActionButton />
    </div>
  )
}
