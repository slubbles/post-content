"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Save, User, Trash2, Download, Camera, Check, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { Badge } from "@/components/ui/badge"

interface SettingsFormProps {
  // AI Preferences props for external control
  defaultPlatform: string
  setDefaultPlatform: (value: string) => void
  defaultTone: string
  setDefaultTone: (value: string) => void
  defaultVariants: string
  setDefaultVariants: (value: string) => void
  temperature: number[]
  setTemperature: (value: number[]) => void
  enableHistory: boolean
  setEnableHistory: (value: boolean) => void
  autoSave: boolean
  setAutoSave: (value: boolean) => void
  emailNotifications: boolean
  setEmailNotifications: (value: boolean) => void
}

export function SettingsForm({
  defaultPlatform,
  setDefaultPlatform,
  defaultTone,
  setDefaultTone,
  defaultVariants,
  setDefaultVariants,
  temperature,
  setTemperature,
  enableHistory,
  setEnableHistory,
  autoSave,
  setAutoSave,
  emailNotifications,
  setEmailNotifications,
}: SettingsFormProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [connectedAccounts, setConnectedAccounts] = useState<{ provider: string; email: string }[]>([])

  // Store initial values to track changes
  const [initialValues, setInitialValues] = useState<{
    name: string
    email: string
    defaultPlatform: string
    defaultTone: string
    defaultVariants: string
    temperature: number
    enableHistory: boolean
    autoSave: boolean
    emailNotifications: boolean
  } | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.settings) {
            const loadedName = data.settings.name || ""
            const loadedEmail = data.settings.email || ""
            const loadedPlatform = data.settings.preferences?.defaultPlatform || "twitter"
            const loadedTone = data.settings.preferences?.defaultTone || "professional"
            const loadedVariants = String(data.settings.preferences?.defaultVariants || 3)
            const loadedTemp = data.settings.preferences?.temperature || 0.8
            const loadedHistory = data.settings.preferences?.enableHistory ?? true
            const loadedAutoSave = data.settings.preferences?.autoSave ?? true
            const loadedNotifs = data.settings.preferences?.emailNotifications ?? true

            setName(loadedName)
            setEmail(loadedEmail)
            setAvatarUrl(data.settings.avatarUrl || "")
            setConnectedAccounts(data.settings.connectedAccounts || [])

            // Set AI preferences via props
            setDefaultPlatform(loadedPlatform)
            setDefaultTone(loadedTone)
            setDefaultVariants(loadedVariants)
            setTemperature([loadedTemp])
            setEnableHistory(loadedHistory)
            setAutoSave(loadedAutoSave)
            setEmailNotifications(loadedNotifs)

            // Store initial values for change detection
            setInitialValues({
              name: loadedName,
              email: loadedEmail,
              defaultPlatform: loadedPlatform,
              defaultTone: loadedTone,
              defaultVariants: loadedVariants,
              temperature: loadedTemp,
              enableHistory: loadedHistory,
              autoSave: loadedAutoSave,
              emailNotifications: loadedNotifs,
            })
          }
        }
      } catch (error) {
        console.error("[v0] Failed to load settings:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  useEffect(() => {
    if (!initialValues) {
      // Don't check for changes until initial values are loaded
      setHasChanges(false)
      return
    }

    // Compare current values with initial values
    const changed =
      name !== initialValues.name ||
      email !== initialValues.email ||
      defaultPlatform !== initialValues.defaultPlatform ||
      defaultTone !== initialValues.defaultTone ||
      defaultVariants !== initialValues.defaultVariants ||
      temperature[0] !== initialValues.temperature ||
      enableHistory !== initialValues.enableHistory ||
      autoSave !== initialValues.autoSave ||
      emailNotifications !== initialValues.emailNotifications

    setHasChanges(changed)
  }, [
    name,
    email,
    defaultPlatform,
    defaultTone,
    defaultVariants,
    temperature,
    enableHistory,
    autoSave,
    emailNotifications,
    initialValues,
  ])

  const getUserInitials = () => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email?.charAt(0).toUpperCase() || "U"
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          preferences: {
            defaultPlatform,
            defaultTone,
            defaultVariants: Number.parseInt(defaultVariants),
            temperature: temperature[0],
            enableHistory,
            autoSave,
            emailNotifications,
          },
        }),
      })

      if (response.ok) {
        // Update initial values to reflect the new saved state
        setInitialValues({
          name,
          email,
          defaultPlatform,
          defaultTone,
          defaultVariants,
          temperature: temperature[0],
          enableHistory,
          autoSave,
          emailNotifications,
        })
        setHasChanges(false)
        toast({
          title: "Settings saved",
          description: "Your preferences have been updated successfully.",
        })
      } else {
        const data = await response.json()
        toast({
          title: "Save failed",
          description: data.error || "Unable to save settings. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Settings save error:", error)
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/export-data", {
        method: "GET",
      })

      if (response.ok) {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `postcontent-data-${new Date().toISOString().split("T")[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
        toast({
          title: "Data exported",
          description: "Your data has been downloaded successfully.",
        })
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      console.error("[v0] Export error:", error)
      toast({
        title: "Export failed",
        description: "Unable to export data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted.",
        })
        window.location.href = "/"
      } else {
        throw new Error("Delete failed")
      }
    } catch (error) {
      console.error("[v0] Delete error:", error)
      toast({
        title: "Delete failed",
        description: "Unable to delete account. Please contact support.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-muted rounded w-1/3 mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="transition-transform hover:scale-105"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {hasChanges ? "Save Changes" : "Saved"}
            </>
          )}
        </Button>
      </div>

      <Card className="transition-all hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile
          </CardTitle>
          <CardDescription className="text-pretty">Your public profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || undefined} alt={name || "Profile"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profile photo</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="transition-all focus:ring-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="transition-all focus:ring-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {connectedAccounts.length > 0 && (
        <Card className="transition-all hover:shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Connected Accounts
            </CardTitle>
            <CardDescription className="text-pretty">Manage your linked accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="font-semibold text-sm">{account.provider.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{account.provider}</p>
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Data & Account</CardTitle>
          <CardDescription className="text-pretty">Export your data or delete your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border p-4">
            <div className="space-y-1">
              <p className="font-medium">Export Your Data</p>
              <p className="text-sm text-muted-foreground text-pretty">
                Download all your generated content and account data.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleExportData}
              disabled={isExporting}
              className="bg-transparent transition-transform hover:scale-105"
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-destructive/50 p-4">
            <div className="space-y-1">
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground text-pretty">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="bg-transparent text-destructive hover:text-destructive border-destructive/50 hover:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
        confirmText="Delete Account"
        variant="destructive"
      />
    </div>
  )
}
