export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    "/generate/:path*",
    "/reply/:path*", 
    "/thread/:path*",
    "/train/:path*",
    "/history/:path*",
    "/settings/:path*",
  ],
}
