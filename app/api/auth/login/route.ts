import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"

export async function POST(request: Request) {
  try {
    // Check rate limit (prevent brute force attacks)
    const rateLimitKey = getRateLimitKey(request, 'anonymous', 'auth-login')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.auth)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Verify user exists and password is correct
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Sign in using NextAuth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    return NextResponse.json({ 
      success: true,
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}
