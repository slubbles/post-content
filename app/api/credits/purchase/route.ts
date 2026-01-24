import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

// Create credit purchase checkout
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'purchase')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many purchase requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }

    const { amount } = await request.json()

    // Define credit packages
    const packages: Record<number, { credits: number; price: number }> = {
      5: { credits: 25, price: 5 },    // $5 = 25 generations
      10: { credits: 55, price: 10 },  // $10 = 55 generations (10% bonus)
      20: { credits: 120, price: 20 }, // $20 = 120 generations (20% bonus)
    }

    const selectedPackage = packages[amount]

    if (!selectedPackage) {
      return NextResponse.json(
        { error: "Invalid package. Choose 5, 10, or 20 dollars." },
        { status: 400 }
      )
    }

    // Create pending purchase record
    const purchase = await prisma.creditPurchase.create({
      data: {
        userId: session.user.id,
        amount: selectedPackage.price,
        credits: selectedPackage.credits,
        status: "pending",
      },
    })

    // Create Polar.sh checkout URL for one-time payment
    const checkoutUrl = `${process.env.POLAR_CREDITS_CHECKOUT_URL}?amount=${amount}&purchase_id=${purchase.id}`

    return NextResponse.json({
      checkoutUrl,
      package: selectedPackage,
      purchaseId: purchase.id,
    })
  } catch (error) {
    console.error("Credit purchase error:", error)
    return NextResponse.json(
      { error: "Failed to create credit purchase" },
      { status: 500 }
    )
  }
}

// Complete credit purchase (called from webhook)
export async function PUT(request: Request) {
  try {
    const { purchaseId, transactionId, status } = await request.json()

    if (!purchaseId) {
      return NextResponse.json({ error: "Purchase ID required" }, { status: 400 })
    }

    const purchase = await prisma.creditPurchase.findUnique({
      where: { id: purchaseId },
    })

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 })
    }

    // Update purchase status
    await prisma.creditPurchase.update({
      where: { id: purchaseId },
      data: {
        status: status || "completed",
        transactionId,
      },
    })

    // Add credits to user if completed
    if (status === "completed") {
      await prisma.user.update({
        where: { id: purchase.userId },
        data: {
          credits: { increment: purchase.credits },
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Credit completion error:", error)
    return NextResponse.json(
      { error: "Failed to complete purchase" },
      { status: 500 }
    )
  }
}
