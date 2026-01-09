import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get optional type filter from query params
    const { searchParams } = new URL(request.url)
    const typeFilter = searchParams.get("type") // "generate", "reply", "thread"
    const limit = parseInt(searchParams.get("limit") || "20")

    // Build where clause with optional type filter
    const whereClause: any = { userId: session.user.id }
    if (typeFilter) {
      whereClause.type = typeFilter
    }

    // Fetch user's posts ordered by most recent
    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        content: true,
        type: true,
        createdAt: true,
      },
    });

    // Transform posts to match frontend format
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      type: post.type,
      platform: "twitter", // Default platform - could be stored in DB
      topic: extractTopicFromContent(post.content),
      createdAt: post.createdAt.toISOString(),
      posts: [post.content], // Single post for now
    }));

    return NextResponse.json({ history: formattedPosts });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing post ID" },
        { status: 400 }
      );
    }

    // Delete the post (verify ownership)
    await prisma.post.deleteMany({
      where: {
        id,
        userId: session.user.id, // Ensure user owns the post
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("History delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

// Helper to extract topic from content (first 50 chars)
function extractTopicFromContent(content: string): string {
  const cleaned = content.replace(/\n/g, " ").trim();
  return cleaned.length > 50 ? cleaned.substring(0, 50) + "..." : cleaned;
}
