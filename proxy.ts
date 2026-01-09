import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle old route redirects first
  const redirects: Record<string, string> = {
    "/generate": "/dashboard/generate",
    "/reply": "/dashboard/reply",
    "/thread": "/dashboard/thread",
    "/train": "/dashboard/train",
    "/settings": "/dashboard/account",
    "/history": "/dashboard/generate", // History is now integrated into feature pages
  }

  if (redirects[pathname]) {
    const url = request.nextUrl.clone()
    url.pathname = redirects[pathname]
    return NextResponse.redirect(url)
  }

  // Check authentication for protected routes
  const protectedPaths = [
    "/dashboard/generate",
    "/dashboard/reply",
    "/dashboard/thread",
    "/dashboard/train",
    "/dashboard/account",
  ]

  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const session = await auth()
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/generate",
    "/reply",
    "/thread",
    "/train",
    "/settings",
    "/history",
    "/dashboard/:path*",
  ],
}
