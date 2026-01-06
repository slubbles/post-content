"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ name?: string; email?: string; password?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors({})
    setIsLoading(true)

    const errors: { name?: string; email?: string; password?: string } = {}
    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Account created!",
          description: "Welcome to Post Content. Let's get started.",
        })
        router.push("/generate")
        router.refresh()
      } else {
        toast({
          title: "Signup failed",
          description: data.error || "Unable to create account. Please try again.",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="transition-all focus:ring-2"
            />
            {validationErrors.name && (
              <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{validationErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="transition-all focus:ring-2"
            />
            {validationErrors.email && (
              <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="transition-all focus:ring-2"
            />
            {validationErrors.password && (
              <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full transition-transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
