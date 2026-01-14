import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Photo upload endpoint - requires storage integration (S3, Cloudflare R2, or Vercel Blob)
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    // TODO: Upload to cloud storage
    // Option 1: Vercel Blob
    // import { put } from '@vercel/blob';
    // const blob = await put(`avatars/${session.user.id}`, file, { access: 'public' });
    // const imageUrl = blob.url;
    
    // Option 2: Cloudflare R2
    // Upload to R2 bucket via API
    
    // Option 3: AWS S3
    // Upload to S3 bucket
    
    // For now, return error indicating storage not configured
    return NextResponse.json(
      { 
        error: "Storage not configured. Set up Vercel Blob, Cloudflare R2, or AWS S3 first.",
        instructions: "Add BLOB_READ_WRITE_TOKEN or AWS credentials to .env"
      },
      { status: 501 }
    )

    // Once storage is configured, update user avatar:
    // await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { image: imageUrl },
    // })
    //
    // return NextResponse.json({ 
    //   url: imageUrl,
    //   message: "Photo uploaded successfully" 
    // })

  } catch (error) {
    console.error("Photo upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    )
  }
}
