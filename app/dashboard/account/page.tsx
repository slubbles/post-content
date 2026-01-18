"use client"

import { SettingsForm } from "@/components/settings-form"

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and settings
        </p>
      </div>
      <SettingsForm />
    </div>
  )
}
