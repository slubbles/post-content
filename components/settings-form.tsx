"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Key, User, Palette, Sparkles } from "lucide-react"

export function SettingsForm() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Account settings
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")

  // AI preferences
  const [defaultPlatform, setDefaultPlatform] = useState("twitter")
  const [defaultTone, setDefaultTone] = useState("professional")
  const [defaultVariants, setDefaultVariants] = useState("3")

  // Advanced settings
  const [temperature, setTemperature] = useState("0.8")
  const [enableHistory, setEnableHistory] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  // API settings
  const [xaiApiKey, setXaiApiKey] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
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
          apiKeys: {
            xai: xaiApiKey || undefined,
          },
        }),
      })

      if (response.ok) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Settings save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {saveSuccess && (
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-sm text-primary animate-in fade-in slide-in-from-top-2">
          Settings saved successfully!
        </div>
      )}

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

      <Card className="transition-all hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            API Configuration
          </CardTitle>
          <CardDescription className="text-pretty">Optional: Use your own API keys for AI generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="xaiApiKey">xAI API Key (Optional)</Label>
            <Input
              id="xaiApiKey"
              type="password"
              placeholder="xai-..."
              value={xaiApiKey}
              onChange={(e) => setXaiApiKey(e.target.value)}
              className="transition-all focus:ring-2"
            />
            <p className="text-sm text-muted-foreground text-pretty">Leave empty to use default API keys</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="rounded-full bg-transparent transition-transform hover:scale-105">
          Cancel
        </Button>
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
    </div>
  )
}
