"use client"

import { AccountPageClient } from "@/components/account-page-client"

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile, billing, and AI preferences
        </p>
      </div>

      <AccountPageClient />
    </div>
  )
}
