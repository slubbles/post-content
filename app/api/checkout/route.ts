import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers, cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    // Get session - NextAuth v5 with App Router
    const session = await auth()
    
    // Debug logging
    const headersList = await headers()
    const cookieStore = await cookies()
    const cookieHeader = headersList.get('cookie')
    const sessionToken = cookieStore.get('next-auth.session-token') || cookieStore.get('__Secure-next-auth.session-token')
    
    console.log("[Checkout] Session check:", { 
      hasSession: !!session, 
      hasUser: !!session?.user, 
      hasEmail: !!session?.user?.email,
      email: session?.user?.email,
      hasCookies: !!cookieHeader,
      hasSessionToken: !!sessionToken,
      authSecret: !!process.env.AUTH_SECRET || !!process.env.NEXTAUTH_SECRET,
      cookieHeader: cookieHeader?.substring(0, 100) // Log first 100 chars
    })
    
    if (!session?.user?.email) {
      console.error("[Checkout] No session or email found - User may not be logged in")
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      )
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

    // Add user email as query parameter for pre-filling
    const urlWithEmail = `${checkoutUrl}?checkout[email]=${encodeURIComponent(session.user.email)}`

    return NextResponse.json({ 
      checkoutUrl: urlWithEmail,
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
