import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { Resend } from "resend"
import crypto from "crypto"
import { renderVerificationEmail } from "@/lib/email-templates"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    // Check rate limit (prevent spam signups)
    const rateLimitKey = getRateLimitKey(request, 'anonymous', 'auth-signup')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.auth)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }

    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user already exists (fully registered)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Check if there's a pending registration
    const existingPending = await prisma.pendingUser.findUnique({
      where: { email }
    })

    // Delete old pending registration if exists
    if (existingPending) {
      await prisma.pendingUser.delete({
        where: { email }
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store pending user registration
    await prisma.pendingUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        token,
        expires,
      },
    })

    // Send verification email
    if (resend) {
      const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/verify?token=${token}`
      
      try {
        await resend.emails.send({
          from: "PostContent <noreply@postcontent.io>",
          to: email,
          subject: "Verify your email address",
          html: renderVerificationEmail({
            name,
            verificationUrl,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
        return NextResponse.json({ 
          error: "Failed to send verification email. Please try again." 
        }, { status: 500 })
      }
    } else {
      // No email service configured - silent fallback
      const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/verify?token=${token}`
    }

    return NextResponse.json({ 
      message: "Verification email sent. Please check your inbox.",
      email 
    })
  } catch (error) {
    console.error("Signup error details:", error)
    return NextResponse.json({ 
      error: "Failed to process signup. Please try again.", 
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
