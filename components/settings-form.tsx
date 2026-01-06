"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, User, Palette, Sparkles, Trash2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ConfirmationModal } from "@/components/confirmation-modal"

export function SettingsForm() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [defaultPlatform, setDefaultPlatform] = useState("twitter")
  const [defaultTone, setDefaultTone] = useState("professional")
  const [defaultVariants, setDefaultVariants] = useState("3")
  const [temperature, setTemperature] = useState("0.8")
  const [enableHistory, setEnableHistory] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

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
            temperature: Number.parseFloat(temperature),
            enableHistory,
            autoSave,
          },
        }),
      })

      if (response.ok) {
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

  return (
    <div className="space-y-6">
      <Card className="transition-all hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Account Information
          </CardTitle>
          <CardDescription className="text-pretty">Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="transition-all focus:ring-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
          <div className="space-y-2">
            <Label htmlFor="temperature">Creativity Level (Temperature: {temperature})</Label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <p className="text-sm text-muted-foreground text-pretty">
              Lower values are more focused, higher values are more creative
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Button
            variant="outline"
            onClick={handleExportData}
            disabled={isExporting}
            className="rounded-full bg-transparent transition-transform hover:scale-105"
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
            variant="outline"
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
            className="rounded-full bg-transparent text-destructive hover:text-destructive transition-transform hover:scale-105"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="rounded-full transition-transform hover:scale-105">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
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
