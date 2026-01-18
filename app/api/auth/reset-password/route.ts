import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

// Initialize Resend only if API key is available
let resend: any = null
if (process.env.RESEND_API_KEY) {
  const { Resend } = require("resend")
  resend = new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Find valid reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { token },
      })
      return NextResponse.json({ error: "Reset token has expired" }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: resetToken.identifier },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete used reset token
    await prisma.passwordResetToken.delete({
      where: { token },
    })

    // Send confirmation email
    if (resend) {
      try {
        await resend.emails.send({
          from: "PostContent <hello@postcontent.io>",
          to: user.email!,
          subject: "Your Password Has Been Reset",
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f0ff5f; margin-bottom: 20px;">Password Reset Successful</h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Your PostContent password has been successfully reset.
              </p>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                If you didn't make this change, please contact our support team immediately at 
                <a href="mailto:support@postcontent.io" style="color: #f0ff5f;">support@postcontent.io</a>
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This is an automated message from PostContent.io
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("Failed to send password reset confirmation email:", emailError)
        // Don't fail the request if email fails - password is already reset
      }
    }

    return NextResponse.json({ message: "Password reset successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
