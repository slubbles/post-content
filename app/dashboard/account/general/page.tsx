import { SettingsForm } from "@/components/settings-form"

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your profile and account information.</p>
      </div>

      <SettingsForm />
    </div>
  )
}
