import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session?.user?.id, 'checkout')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many checkout requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }
    
    console.log("[Checkout] Session check:", { 
      hasSession: !!session, 
      hasUser: !!session?.user, 
      userId: session?.user?.id,
      hasEmail: !!session?.user?.email,
      email: session?.user?.email,
      fullSession: JSON.stringify(session, null, 2)
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      )
    }
    
    // If email is not in session, fetch it from database
    let userEmail = session.user.email
    if (!userEmail) {
      console.log("[Checkout] Email not in session, fetching from database...")
      const { prisma } = await import("@/lib/db")
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { email: true }
      })
      
      if (!dbUser?.email) {
        console.error("[Checkout] No email found in database for user:", session.user.id)
        return NextResponse.json(
          { error: "User email not found. Please update your profile." },
          { status: 400 }
        )
      }
      
      userEmail = dbUser.email
      console.log("[Checkout] Email fetched from database:", userEmail)
    }

    const { plan, billingCycle } = await request.json()
    const isAnnual = billingCycle === "annual"
    
    // Normalize plan name to match keys (capitalize first letter)
    const normalizedPlan = plan.charAt(0).toUpperCase() + plan.slice(1)

    // Polar.sh checkout URL - Update with your actual product URLs
    const polarCheckoutUrls: Record<string, string> = {
      Pro: isAnnual 
        ? process.env.POLAR_PRO_ANNUAL_URL || "https://polar.sh/slubbles/subscriptions/postcontent-pro-annual"
        : process.env.POLAR_PRO_MONTHLY_URL || "https://polar.sh/slubbles/subscriptions/postcontent-pro",
      Enterprise: process.env.POLAR_ENTERPRISE_URL || "https://polar.sh/slubbles/subscriptions/postcontent-enterprise",
    }

    const checkoutUrl = polarCheckoutUrls[normalizedPlan]

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      )
    }

    // Build checkout URL with all parameters
    const baseUrl = process.env.NEXTAUTH_URL || 'https://postcontent.io'
    const successUrl = `${baseUrl}/success?plan=${plan}`
    const cancelUrl = `${baseUrl}/pricing?cancelled=true`
    
    // Add all query parameters for Polar checkout
    const params = new URLSearchParams({
      customer_email: userEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
    
    const urlWithParams = `${checkoutUrl}?${params.toString()}`

    return NextResponse.json({ 
      checkoutUrl: urlWithParams,
      plan,
      isAnnual 
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
