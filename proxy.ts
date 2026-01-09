import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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

  return NextResponse.next()
}

export const config = {
  matcher: ["/generate", "/reply", "/thread", "/train", "/settings", "/history"],
}
