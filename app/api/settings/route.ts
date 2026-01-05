import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse preferences if stored as JSON string, otherwise use defaults
    let preferences = {
      defaultPlatform: "twitter",
      defaultTone: "professional",
      defaultVariants: 3,
      temperature: 0.8,
      enableHistory: true,
      autoSave: true,
    };

    if (user.preferences) {
      try {
        preferences = typeof user.preferences === 'string' 
          ? JSON.parse(user.preferences) 
          : user.preferences;
      } catch (e) {
        console.error("Error parsing preferences:", e);
      }
    }

    return NextResponse.json({
      name: user.name || "",
      email: user.email || "",
      preferences,
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { name, email, preferences } = data;

    // Update user in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        preferences: JSON.stringify(preferences),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings save error:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
