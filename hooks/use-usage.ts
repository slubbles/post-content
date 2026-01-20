"use client"

import { useEffect, useState } from "react"

export interface UsageData {
  used: number
  limit: number
  remaining: number
  percentage: number
}

export function useUsage() {
  const [usage, setUsage] = useState<UsageData>({
    used: 0,
    limit: 10,
    remaining: 10,
    percentage: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsage = async () => {
    try {
      const response = await fetch("/api/usage")
      
      // If user is not authenticated, silently fail without logging errors
      if (response.status === 401) {
        setLoading(false)
        return
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch usage data")
      }

      const data = await response.json()
      setUsage(data)
      setError(null)
    } catch (err) {
      console.error("Usage fetch error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsage()
    
    // Refresh on window focus
    const handleFocus = () => fetchUsage()
    window.addEventListener('focus', handleFocus)
    
    // Refresh when generation completes
    const handleCreditsUpdate = () => fetchUsage()
    window.addEventListener('credits-updated', handleCreditsUpdate)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('credits-updated', handleCreditsUpdate)
    }
  }, [])

  const refresh = () => {
    setLoading(true)
    fetchUsage()
  }

  return {
    usage,
    loading,
    error,
    refresh,
  }
}
