"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export function CheckoutRedirectHandler() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirect")

  useEffect(() => {
    // If user just logged in and there's a checkout pending
    if (status === "authenticated" && redirect === "checkout") {
      const selectedPlan = sessionStorage.getItem("selectedPlan")
      const selectedBillingCycle = sessionStorage.getItem("selectedBillingCycle")

      if (selectedPlan) {
        // Clear sessionStorage
        sessionStorage.removeItem("selectedPlan")
        sessionStorage.removeItem("selectedBillingCycle")

        // Trigger checkout
        fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: selectedPlan,
            billingCycle: selectedBillingCycle || "monthly",
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.checkoutUrl) {
              window.location.href = data.checkoutUrl
            } else {
              router.push("/pricing")
            }
          })
          .catch(() => {
            router.push("/pricing")
          })
      } else {
        router.push("/pricing")
      }
    }
  }, [status, redirect, router])

  return null
}
