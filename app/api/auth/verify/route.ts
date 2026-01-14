import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Resend } from "resend"
import { renderWelcomeEmail } from "@/lib/email-templates"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url))
    }

    // Find pending user with this token
    const pendingUser = await prisma.pendingUser.findUnique({
      where: { token },
    })

    if (!pendingUser) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url))
    }

    // Check if token expired
    if (pendingUser.expires < new Date()) {
      await prisma.pendingUser.delete({
        where: { token },
      })
      return NextResponse.redirect(new URL("/login?error=token_expired", request.url))
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: pendingUser.email },
    })

    if (existingUser) {
      // Clean up pending user
      await prisma.pendingUser.delete({
        where: { token },
      })
      return NextResponse.redirect(new URL("/login?error=user_exists", request.url))
    }

    // Create the actual user account
    const newUser = await prisma.user.create({
      data: {
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        emailVerified: new Date(), // Mark as verified
        referredBy: pendingUser.referredBy, // Transfer affiliate code
      },
    })

    // Delete pending user
    await prisma.pendingUser.delete({
      where: { token },
    })

    // Send welcome email
    if (resend) {
      try {
        const dashboardUrl = `${process.env.NEXTAUTH_URL}/dashboard`
        await resend.emails.send({
          from: "PostContent <noreply@postcontent.io>",
          to: newUser.email!,
          subject: "Welcome to PostContent! 🎉",
          html: renderWelcomeEmail({
            name: newUser.name || "there",
            dashboardUrl,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError)
        // Don't fail the verification if email fails
      }
    } else {
      // No email service configured - log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️  RESEND_API_KEY not configured - welcome email not sent')
      }
    }

    // Redirect to login with success message
    return NextResponse.redirect(new URL("/login?verified=true", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/login?error=verification_failed", request.url))
  }
}
