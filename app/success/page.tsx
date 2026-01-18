"use client"

import { Suspense } from "react"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { SuccessContent } from "@/components/success-content"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation isAuthenticated={false} />
      <main className="mx-auto flex max-w-2xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <Card className="w-full shadow-lg">
              <CardContent className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </CardContent>
            </Card>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  )
}
