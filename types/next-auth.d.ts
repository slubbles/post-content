import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      subscribed?: boolean
      subscriptionStatus?: string
      subscriptionId?: string
      subscriptionEndsAt?: Date | null
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    subscribed?: boolean
    subscriptionStatus?: string
    subscriptionId?: string
    subscriptionEndsAt?: Date | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    emailVerified?: Date | null
    subscribed?: boolean
    subscriptionStatus?: string
    subscriptionId?: string
    subscriptionEndsAt?: Date | null
  }
}
