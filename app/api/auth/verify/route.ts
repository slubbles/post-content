import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

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
    await prisma.user.create({
      data: {
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        emailVerified: new Date(), // Mark as verified
      },
    })

    // Delete pending user
    await prisma.pendingUser.delete({
      where: { token },
    })

    // Redirect to success page instead of directly to login
    return NextResponse.redirect(new URL("/email-verified", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/login?error=verification_failed", request.url))
  }
}
