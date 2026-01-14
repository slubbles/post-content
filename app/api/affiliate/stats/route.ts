import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import crypto from "crypto"

// Get user's affiliate stats and link
export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create affiliate link
    let affiliateLink = await prisma.affiliateLink.findFirst({
      where: { userId: session.user.id },
    })

    if (!affiliateLink) {
      // Generate unique affiliate code
      const code = crypto.randomBytes(4).toString("hex")
      
      affiliateLink = await prisma.affiliateLink.create({
        data: {
          userId: session.user.id,
          code,
        },
      })
    }

    // Get referral stats
    const referrals = await prisma.affiliateReferral.findMany({
      where: { affiliateCode: affiliateLink.code },
      orderBy: { createdAt: 'desc' },
    })

    const stats = {
      totalClicks: affiliateLink.clicks,
      totalConversions: affiliateLink.conversions,
      totalEarnings: affiliateLink.earnings,
      pendingEarnings: referrals
        .filter(r => r.status === 'converted')
        .reduce((sum, r) => sum + r.commission, 0),
      paidEarnings: referrals
        .filter(r => r.status === 'paid')
        .reduce((sum, r) => sum + r.commission, 0),
    }

    return NextResponse.json({
      affiliateCode: affiliateLink.code,
      affiliateUrl: `${process.env.NEXTAUTH_URL}?ref=${affiliateLink.code}`,
      stats,
      referrals: referrals.slice(0, 10), // Last 10 referrals
    })
  } catch (error) {
    console.error("Affiliate stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch affiliate data" },
      { status: 500 }
    )
  }
}
