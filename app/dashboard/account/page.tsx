"use client"

import { SettingsForm } from "@/components/settings-form"
import { BillingSection } from "@/components/billing-section"
import { Separator } from "@/components/ui/separator"

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile, account preferences, and billing information
        </p>
      </div>

      <SettingsForm />

      <Separator className="my-8" />

      <BillingSection />
    </div>
  )
}
