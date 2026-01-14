"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function ResendEmailButton() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async () => {
    if (!session?.user?.email) {
      toast({
        title: "Error",
        description: "No email address found. Please sign in again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Email sent!",
          description: data.message || "Check your inbox for the verification link.",
        })
        setCountdown(60) // Start 1-minute countdown
      } else {
        toast({
          title: "Failed to send",
          description: data.error || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to resend verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = isLoading || countdown > 0

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full bg-transparent"
      onClick={handleResend}
      disabled={isDisabled}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : countdown > 0 ? (
        `Resend in ${countdown}s`
      ) : (
        "Resend verification email"
      )}
    </Button>
  )
}
