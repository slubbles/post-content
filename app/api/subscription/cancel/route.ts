import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    // TODO: Integrate with Polar.sh API to cancel subscription
    // For now, this is a placeholder that marks the subscription as cancelled
    // You'll need to:
    // 1. Get POLAR_API_KEY from environment
    // 2. Call Polar's subscription cancellation endpoint
    // 3. Handle the response and update the database

    // Placeholder: Mark subscription as cancelled in database
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
