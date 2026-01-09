import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
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
    
    console.log("Checkout request:", { plan, normalizedPlan, billingCycle, isAnnual, checkoutUrl })

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
