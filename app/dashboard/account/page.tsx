"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, History, CreditCard, User } from "lucide-react"
import { SettingsForm } from "@/components/settings-form"
import { HistorySection } from "@/components/history-section"
import { BillingSection } from "@/components/billing-section"

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, view history, and handle billing
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <SettingsForm />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 mt-6">
          <SettingsForm showPreferencesOnly />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <HistorySection />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <BillingSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
