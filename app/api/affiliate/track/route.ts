import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

// Track affiliate click
export async function POST(request: Request) {
  try {
    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, undefined, 'affiliate-track')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
    
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Affiliate code required" }, { status: 400 })
    }

    // Check if affiliate link exists
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { code },
    })

    if (!affiliateLink) {
      return NextResponse.json({ error: "Invalid affiliate code" }, { status: 404 })
    }

    // Increment click count
    await prisma.affiliateLink.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
      },
    })

    // Store affiliate code in session/cookie for later conversion tracking
    // Frontend should store this in localStorage or cookie

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Affiliate click tracking error:", error)
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    )
  }
}
