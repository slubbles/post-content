"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Save, User, Palette, Sparkles, Trash2, Download, Camera, Check, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { Badge } from "@/components/ui/badge"

export function SettingsForm() {
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
  const [defaultPlatform, setDefaultPlatform] = useState("twitter")
  const [defaultTone, setDefaultTone] = useState("professional")
  const [defaultVariants, setDefaultVariants] = useState("3")
  const [temperature, setTemperature] = useState([0.8])
  const [enableHistory, setEnableHistory] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [connectedAccounts, setConnectedAccounts] = useState<{ provider: string; email: string }[]>([])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.settings) {
            setName(data.settings.name || "")
            setEmail(data.settings.email || "")
            setAvatarUrl(data.settings.avatarUrl || "")
            setDefaultPlatform(data.settings.preferences?.defaultPlatform || "twitter")
            setDefaultTone(data.settings.preferences?.defaultTone || "professional")
            setDefaultVariants(String(data.settings.preferences?.defaultVariants || 3))
            setTemperature([data.settings.preferences?.temperature || 0.8])
            setEnableHistory(data.settings.preferences?.enableHistory ?? true)
            setAutoSave(data.settings.preferences?.autoSave ?? true)
            setEmailNotifications(data.settings.preferences?.emailNotifications ?? true)
            setConnectedAccounts(data.settings.connectedAccounts || [])
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
    setHasChanges(true)
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
                <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name || "Profile"} />
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

      <Card className="transition-all hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Preferences
          </CardTitle>
          <CardDescription className="text-pretty">Set your default generation preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="defaultPlatform">Default Platform</Label>
              <Select value={defaultPlatform} onValueChange={setDefaultPlatform}>
                <SelectTrigger id="defaultPlatform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="threads">Threads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultTone">Default Tone</Label>
              <Select value={defaultTone} onValueChange={setDefaultTone}>
                <SelectTrigger id="defaultTone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultVariants">Default Number of Variants</Label>
            <Select value={defaultVariants} onValueChange={setDefaultVariants}>
              <SelectTrigger id="defaultVariants">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 variant</SelectItem>
                <SelectItem value="2">2 variants</SelectItem>
                <SelectItem value="3">3 variants</SelectItem>
                <SelectItem value="4">4 variants</SelectItem>
                <SelectItem value="5">5 variants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Save to History</Label>
                <p className="text-sm text-muted-foreground text-pretty">
                  Automatically save generated content to history
                </p>
              </div>
              <Switch checked={enableHistory} onCheckedChange={setEnableHistory} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save Drafts</Label>
                <p className="text-sm text-muted-foreground text-pretty">Save your work in progress automatically</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground text-pretty">Receive tips and product updates</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Advanced AI Settings
          </CardTitle>
          <CardDescription className="text-pretty">Fine-tune AI behavior for power users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Creativity Level</Label>
              <span className="text-sm font-medium text-primary">{temperature[0].toFixed(1)}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={temperature}
              onValueChange={setTemperature}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground text-pretty">
              Lower values (0.3-0.5) are more focused and predictable. Higher values (0.7-1.0) are more creative and
              varied.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription className="text-pretty">Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-medium">Delete Account</p>
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
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sticky bottom-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 -mx-4 border-t">
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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
        confirmText="Delete Account"
        isDestructive={true}
      />
    </div>
  )
}
