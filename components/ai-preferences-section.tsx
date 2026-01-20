"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Palette } from "lucide-react"

interface AIPreferencesSectionProps {
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

export function AIPreferencesSection({
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
}: AIPreferencesSectionProps) {
  return (
    <>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5 flex-1">
                <Label>Save to History</Label>
                <p className="text-sm text-muted-foreground text-pretty">
                  Automatically save generated content to history
                </p>
              </div>
              <Switch checked={enableHistory} onCheckedChange={setEnableHistory} className="self-start sm:self-center" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5 flex-1">
                <Label>Auto-save Drafts</Label>
                <p className="text-sm text-muted-foreground text-pretty">Save your work in progress automatically</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} className="self-start sm:self-center" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-0.5 flex-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground text-pretty">Receive tips and product updates</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} className="self-start sm:self-center" />
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
    </>
  )
}
