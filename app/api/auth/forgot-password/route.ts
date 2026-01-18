import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { renderPasswordResetEmail } from "@/lib/email-templates"
import { Resend } from "resend"
import crypto from "crypto"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Don't reveal if user exists or not (security best practice)
    if (!user) {
      return NextResponse.json({
        message: "If an account with that email exists, we sent a password reset link.",
      })
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Store token in database
    await prisma.passwordResetToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    })

    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`

    if (resend) {
      try {
        await resend.emails.send({
          from: "PostContent <noreply@postcontent.io>",
          to: email,
          subject: "Reset Your Password - PostContent",
          html: renderPasswordResetEmail({
            name: user.name || "there",
            resetUrl,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send password reset email:", emailError)
        // Continue anyway - don't reveal email sending failures
      }
    } else {
      // No email service configured - silent fallback
    }

    return NextResponse.json({
      message: "If an account with that email exists, we sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
