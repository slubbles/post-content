"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings-form"
import { BillingSection } from "@/components/billing-section"
import { AIPreferencesSection } from "@/components/ai-preferences-section"
import { Separator } from "@/components/ui/separator"

export function AccountPageClient() {
  // AI Preferences state managed at this level and passed to both components
  const [defaultPlatform, setDefaultPlatform] = useState("twitter")
  const [defaultTone, setDefaultTone] = useState("professional")
  const [defaultVariants, setDefaultVariants] = useState("3")
  const [temperature, setTemperature] = useState([0.8])
  const [enableHistory, setEnableHistory] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <SettingsForm
        defaultPlatform={defaultPlatform}
        setDefaultPlatform={setDefaultPlatform}
        defaultTone={defaultTone}
        setDefaultTone={setDefaultTone}
        defaultVariants={defaultVariants}
        setDefaultVariants={setDefaultVariants}
        temperature={temperature}
        setTemperature={setTemperature}
        enableHistory={enableHistory}
        setEnableHistory={setEnableHistory}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
        emailNotifications={emailNotifications}
        setEmailNotifications={setEmailNotifications}
      />

      <Separator />

      {/* Billing Section */}
      <BillingSection />

      <Separator />

      {/* AI Preferences Section */}
      <AIPreferencesSection
        defaultPlatform={defaultPlatform}
        setDefaultPlatform={setDefaultPlatform}
        defaultTone={defaultTone}
        setDefaultTone={setDefaultTone}
        defaultVariants={defaultVariants}
        setDefaultVariants={setDefaultVariants}
        temperature={temperature}
        setTemperature={setTemperature}
        enableHistory={enableHistory}
        setEnableHistory={setEnableHistory}
        autoSave={autoSave}
        setAutoSave={setAutoSave}
        emailNotifications={emailNotifications}
        setEmailNotifications={setEmailNotifications}
      />
    </div>
  )
}
