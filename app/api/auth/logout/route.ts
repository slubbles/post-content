import { NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST() {
  try {
    await signOut({ redirect: false })
    
    // Create response with success
    const response = NextResponse.json({ success: true })
    
    // Explicitly clear session cookies
    response.cookies.set('authjs.session-token', '', { 
      maxAge: 0,
      path: '/'
    })
    response.cookies.set('__Secure-authjs.session-token', '', { 
      maxAge: 0,
      path: '/',
      secure: true
    })
    
    return response
  } catch (error) {
    console.error("Logout error:", error)
    // Even if there's an error, return success and clear cookies
    const response = NextResponse.json({ success: true })
    response.cookies.set('authjs.session-token', '', { maxAge: 0, path: '/' })
    response.cookies.set('__Secure-authjs.session-token', '', { maxAge: 0, path: '/', secure: true })
    return response
  }
}
