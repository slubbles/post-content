import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getUserPostCount } from "@/lib/usage"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user from database with all relevant fields
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        subscribed: true,
        subscriptionStatus: true,
        subscriptionId: true,
        subscriptionEndsAt: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate credits used from Post count (this month)
    const creditsUsed = await getUserPostCount(session.user.id)

    // Determine plan and credit limits
    const plan = user.subscribed && user.subscriptionStatus === "active" 
      ? "pro" 
      : "free"
    
    const creditLimit = plan === "free" ? 10 : 200

    return NextResponse.json({
      ...user,
      plan,
      creditsUsed,
      credits: creditLimit - creditsUsed, // remaining credits
      creditLimit,
    })
  } catch (error) {
    console.error("Auth me error:", error)
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    )
  }
}
