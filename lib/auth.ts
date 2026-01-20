import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      version: "2.0", // Use OAuth 2.0
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials")
            return null
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          })

          if (!user || !user.password) {
            console.error("User not found or no password")
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            console.error("Invalid password")
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For OAuth providers (Google/Twitter), ALWAYS allow sign in
      // NextAuth will handle account creation automatically
      if (account?.provider === "google" || account?.provider === "twitter") {
        // Don't do ANY database operations that could fail
        // Just allow the sign in immediately
        return true
      }
      
      // For credentials provider, check email verification
      if (account?.provider === "credentials") {
        if (!user.email) {
          return false
        }
        
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { emailVerified: true }
          })
          
          // Require email verification for credentials login
          if (!dbUser?.emailVerified) {
            return false
          }
        } catch (error) {
          console.error("Error in credentials signIn:", error)
          return false
        }
      }
      
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        
        // Fetch full user data from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { 
            emailVerified: true,
            subscribed: true,
            subscriptionStatus: true,
            subscriptionId: true,
            subscriptionEndsAt: true,
          }
        })
        
        if (dbUser) {
          token.emailVerified = dbUser.emailVerified
          token.subscribed = dbUser.subscribed
          token.subscriptionStatus = dbUser.subscriptionStatus
          token.subscriptionId = dbUser.subscriptionId
          token.subscriptionEndsAt = dbUser.subscriptionEndsAt
        }
      }
      
      // On every request, refresh user data from database to keep it current
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { 
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            subscribed: true,
            subscriptionStatus: true,
            subscriptionId: true,
            subscriptionEndsAt: true,
          }
        })
        
        if (dbUser) {
          token.name = dbUser.name
          token.email = dbUser.email
          token.picture = dbUser.image
          token.emailVerified = dbUser.emailVerified
          token.subscribed = dbUser.subscribed
          token.subscriptionStatus = dbUser.subscriptionStatus
          token.subscriptionId = dbUser.subscriptionId
          token.subscriptionEndsAt = dbUser.subscriptionEndsAt
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
        session.user.emailVerified = token.emailVerified as Date | null
        session.user.subscribed = token.subscribed as boolean
        session.user.subscriptionStatus = token.subscriptionStatus as string
        session.user.subscriptionId = token.subscriptionId as string
        session.user.subscriptionEndsAt = token.subscriptionEndsAt as Date | null
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
})

// Keep legacy session functions for backward compatibility
import { cookies } from "next/headers"

export async function getSession() {
  return await auth()
}

export async function createSession(userId: string, email: string, name: string) {
  // This is now handled by NextAuth
  // Kept for backward compatibility but not used
  const cookieStore = await cookies()
  const sessionData = {
    userId,
    email,
    name,
    createdAt: Date.now(),
  }

  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return sessionData
}

export async function clearSession() {
  await signOut()
}
