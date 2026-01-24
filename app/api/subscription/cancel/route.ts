import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'cancel')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many cancellation requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        subscribed: true,
        subscriptionId: true,
        subscriptionStatus: true,
      },
    })

    if (!user?.subscribed || user.subscriptionStatus !== "active") {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 400 }
      )
    }

    // Call Polar.sh API to cancel the subscription
    const polarAccessToken = process.env.POLAR_ACCESS_TOKEN
    
    if (!polarAccessToken) {
      console.error("[Cancel Subscription] POLAR_ACCESS_TOKEN not configured")
      return NextResponse.json(
        { error: "Payment provider not configured" },
        { status: 500 }
      )
    }

    if (!user.subscriptionId) {
      console.error("[Cancel Subscription] No subscription ID found for user")
      return NextResponse.json(
        { error: "Subscription ID not found" },
        { status: 400 }
      )
    }

    try {
      // Cancel subscription via Polar API
      const polarResponse = await fetch(
        `https://api.polar.sh/v1/subscriptions/${user.subscriptionId}/cancel`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${polarAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!polarResponse.ok) {
        const errorData = await polarResponse.text()
        console.error("[Cancel Subscription] Polar API error:", errorData)
        throw new Error(`Polar API error: ${polarResponse.status}`)
      }

      console.log("[Cancel Subscription] Successfully cancelled via Polar API")
    } catch (polarError) {
      console.error("[Cancel Subscription] Failed to cancel via Polar:", polarError)
      // Continue to update local DB even if Polar API fails
      // This ensures user sees cancellation status
    }

    // Update local database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        subscriptionStatus: "cancelled",
        // Keep subscribed=true until billing period ends
        // Polar webhook will update this when period expires
      },
    })

    return NextResponse.json({
      message: "Subscription cancelled. You'll retain access until the end of your billing period.",
    })
  } catch (error) {
    console.error("Cancel subscription error:", error)
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    )
  }
}
