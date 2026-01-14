import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Track affiliate conversion (called from Polar webhook or signup)
export async function POST(request: Request) {
  try {
    const { affiliateCode, userId, subscriptionId, planAmount } = await request.json()

    if (!affiliateCode || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if affiliate link exists
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { code: affiliateCode },
    })

    if (!affiliateLink) {
      return NextResponse.json({ error: "Invalid affiliate code" }, { status: 404 })
    }

    // Check if user already referred
    const existing = await prisma.affiliateReferral.findFirst({
      where: { referredUserId: userId },
    })

    if (existing) {
      return NextResponse.json({ error: "User already referred" }, { status: 400 })
    }

    // Calculate commission (e.g., 30% of first payment)
    const commission = planAmount ? planAmount * 0.3 : 0

    // Create referral record
    await prisma.affiliateReferral.create({
      data: {
        affiliateCode,
        referredUserId: userId,
        status: subscriptionId ? "converted" : "pending",
        subscriptionId,
        commission,
        convertedAt: subscriptionId ? new Date() : null,
      },
    })

    // Update affiliate link stats
    await prisma.affiliateLink.update({
      where: { code: affiliateCode },
      data: {
        conversions: { increment: 1 },
        earnings: { increment: commission },
      },
    })

    return NextResponse.json({ 
      success: true,
      commission 
    })
  } catch (error) {
    console.error("Affiliate conversion error:", error)
    return NextResponse.json(
      { error: "Failed to track conversion" },
      { status: 500 }
    )
  }
}
