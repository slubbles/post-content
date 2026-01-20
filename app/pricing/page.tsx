import { AppNavigation } from "@/components/app-navigation"
import { PricingPageClient } from "@/components/pricing-page-client"
import { auth } from "@/lib/auth"

export default async function PricingPage() {
  const session = await auth()
  const isAuthenticated = !!session?.user
  
  // Transform user to expected type (handle null values)
  const user = session?.user ? {
    name: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    image: session.user.image ?? undefined,
  } : undefined

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={isAuthenticated} user={user} />
      <PricingPageClient />
    </div>
  )
}
