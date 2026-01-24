import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit"
import { put } from "@vercel/blob"

// Photo upload endpoint - uses Vercel Blob for cloud storage
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(request, session.user.id, 'upload')
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMITS.general)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many upload requests. Please try again later.', retryAfter: rateLimit.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
      )
    }

    const formData = await request.formData()
    const file = formData.get("photo") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed." },
        { status: 400 }
      )
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 2MB." },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const timestamp = Date.now()
    const filename = `avatars/${session.user.id}-${timestamp}.${file.name.split('.').pop()}`
    
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    })

    // Update user avatar in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: blob.url },
    })

    return NextResponse.json({
      url: blob.url,
      message: "Photo uploaded successfully",
    })

  } catch (error) {
    console.error("Photo upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    )
  }
}
