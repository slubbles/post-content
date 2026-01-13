import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Resend } from "resend"
import crypto from "crypto"
import { renderVerificationEmail } from "@/lib/email-templates"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({ success: true, message: "If an account exists, a verification email has been sent" })
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({ success: true, message: "Email already verified" })
    }

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Generate new token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Save token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    // Send email if Resend is configured
    if (resend) {
      const verificationUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/verify?token=${token}`
      
      try {
        await resend.emails.send({
          from: "PostContent <noreply@postcontent.io>",
          to: email,
          subject: "Verify your email address",
          html: renderVerificationEmail({
            name: user.name || "there",
            verificationUrl,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
        // Don't fail the request if email fails, but log it
      }
    } else {
      // No email service configured - silent fallback
    }

    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent. Please check your inbox." 
    })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ 
      error: "Failed to resend verification email" 
    }, { status: 500 })
  }
}
