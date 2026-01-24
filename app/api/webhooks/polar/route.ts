import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"
import crypto from "crypto"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

// Polar.sh webhook handler for subscription events
export async function POST(request: Request) {
  try {
    // Check rate limit (protect against webhook spam)
    const rateLimitKey = getRateLimitKey(request, undefined, 'webhook')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
    
    // Get webhook signature from headers
    const headersList = await headers()
    const signature = headersList.get("polar-signature")
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET
    
    // Verify webhook signature
    if (!signature || !webhookSecret) {
      console.error("[Polar Webhook] Missing signature or webhook secret")
      return NextResponse.json(
        { error: "Unauthorized - Missing signature" },
        { status: 401 }
      )
    }
    
    // Read raw body for signature verification
    const rawBody = await request.text()
    const body = JSON.parse(rawBody)
    
    // Verify HMAC signature (Polar uses HMAC-SHA256)
    const computedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex")
    
    if (signature !== computedSignature) {
      console.error("[Polar Webhook] Invalid signature")
      return NextResponse.json(
        { error: "Unauthorized - Invalid signature" },
        { status: 401 }
      )
    }
    
    console.log("[Polar Webhook] Signature verified successfully")
    
    const { event, data } = body
    
    // Handle different Polar.sh events
    switch (event) {
      case "subscription.created":
      case "subscription.updated":
        await handleSubscriptionUpdate(data)
        break
        
      case "subscription.canceled":
        await handleSubscriptionCanceled(data)
        break
        
      case "subscription.active":
        await handleSubscriptionActive(data)
        break
        
      default:
        console.log(`Unhandled Polar webhook event: ${event}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Polar webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

async function handleSubscriptionUpdate(data: any) {
  const { customer_email, subscription_id, status } = data
  
  const user = await prisma.user.update({
    where: { email: customer_email },
    data: {
      subscribed: status === "active",
      subscriptionId: subscription_id,
      subscriptionStatus: status,
      subscriptionEndsAt: data.current_period_end 
        ? new Date(data.current_period_end * 1000) 
        : null,
    },
  })
  
  // Track affiliate conversion for new subscriptions
  if (status === "active") {
    await trackAffiliateConversion(user.id, data.amount || 0)
  }
}

async function handleSubscriptionActive(data: any) {
  const { customer_email, subscription_id } = data
  
  const user = await prisma.user.update({
    where: { email: customer_email },
    data: {
      subscribed: true,
      subscriptionId: subscription_id,
      subscriptionStatus: "active",
      subscriptionEndsAt: data.current_period_end 
        ? new Date(data.current_period_end * 1000) 
        : null,
    },
  })
  
  // Track affiliate conversion
  await trackAffiliateConversion(user.id, data.amount || 0)
}

async function handleSubscriptionCanceled(data: any) {
  const { customer_email, subscription_id } = data
  
  await prisma.user.update({
    where: { email: customer_email },
    data: {
      subscriptionStatus: "cancelled",
      // Keep subscribed=true until period ends
    },
  })
}

async function trackAffiliateConversion(userId: string, amount: number) {
  // Get user's referral code
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referredBy: true },
  })
  
  if (!user?.referredBy) {
    return // No affiliate referral for this user
  }
  
  // Find the affiliate link
  const affiliateLink = await prisma.affiliateLink.findUnique({
    where: { code: user.referredBy },
  })
  
  if (!affiliateLink) {
    return // Affiliate link no longer exists
  }
  
  // Calculate commission (30%)
  const commission = Math.round(amount * 0.30 * 100) / 100
  
  // Create affiliate referral record
  await prisma.affiliateReferral.create({
    data: {
      affiliateCode: user.referredBy,
      referredUserId: userId,
      status: 'completed',
      commission: commission,
      convertedAt: new Date(),
    },
  })
  
  // Update affiliate link stats
  await prisma.affiliateLink.update({
    where: { id: affiliateLink.id },
    data: {
      conversions: { increment: 1 },
      earnings: { increment: commission },
    },
  })
}
