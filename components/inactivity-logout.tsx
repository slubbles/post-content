"use client"

import { useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"

const INACTIVITY_TIMEOUT = 60 * 60 * 1000 // 1 hour in milliseconds

export function InactivityLogout() {
  const { data: session } = useSession()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  useEffect(() => {
    // Only track inactivity if user is logged in
    if (!session?.user) {
      return
    }

    const resetTimer = () => {
      lastActivityRef.current = Date.now()

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        // Check if really inactive (in case of race conditions)
        const timeSinceLastActivity = Date.now() - lastActivityRef.current
        if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
          console.log("Auto-logout due to inactivity")
          await signOut({ redirect: true, callbackUrl: "/login?timeout=true" })
        }
      }, INACTIVITY_TIMEOUT)
    }

    // Events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ]

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer)
    })

    // Initialize timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [session])

  return null // This component doesn't render anything
}
