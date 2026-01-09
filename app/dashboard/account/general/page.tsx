import { SettingsForm } from "@/components/settings-form"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard/generate" },
            { label: "Account", href: "/dashboard/account/general" },
            { label: "General", href: "/dashboard/account/general" },
          ]}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your profile and account information.</p>
      </div>

      <SettingsForm />
    </div>
  )
}
