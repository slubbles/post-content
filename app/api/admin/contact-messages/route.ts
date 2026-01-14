import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { prisma } from "@/lib/db"

// Admin endpoint to view contact messages
export async function GET(request: Request) {
  try {
    // Require admin access
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "50")

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ messages, total: messages.length })
  } catch (error) {
    console.error("Fetch contact messages error:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}
