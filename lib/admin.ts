import { auth } from "./auth"
import { prisma } from "./db"

export async function isAdmin(userId?: string): Promise<boolean> {
  try {
    if (!userId) {
      const session = await auth()
      userId = session?.user?.id
    }

    if (!userId) return false

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })

    return user?.role === "admin"
  } catch (error) {
    console.error("Admin check error:", error)
    return false
  }
}

export async function requireAdmin() {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const admin = await isAdmin(session.user.id)
  
  if (!admin) {
    throw new Error("Admin access required")
  }

  return session
}
