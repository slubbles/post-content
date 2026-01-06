import { NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST() {
  try {
    await signOut({ redirect: false })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    // Even if there's an error, return success since we're logging out
    return NextResponse.json({ success: true })
  }
}
