import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { Resend } from "resend"
import crypto from "crypto"
import { renderVerificationEmail } from "@/lib/email-templates"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    // Send verification email if Resend is configured
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
        // Don't fail signup if email fails
      }
    } else {
      console.warn("Resend not configured - verification email not sent")
      console.log(`Verification URL: ${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/verify?token=${token}`)
    }

    // Auto sign in after signup
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (error) {
    console.error("Signup error details:", error)
    // Log specific error type for debugging
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return NextResponse.json({ 
      error: "Failed to create account. Please try again or contact support.", 
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    }, { status: 500 })
  }
}
