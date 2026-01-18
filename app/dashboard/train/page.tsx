import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardTrainPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Train AI</h1>
        <p className="mt-2 text-muted-foreground">
          Teach the AI your unique voice and writing style for more personalized content.
        </p>
      </div>

      <Card className="border-2 border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Coming Soon</CardTitle>
          <CardDescription className="text-base">
            We're working hard on voice training to make your AI-generated content sound exactly like you.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">What to expect:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto text-left">
              <li>✨ Upload 10+ samples of your writing</li>
              <li>🎯 AI learns your unique voice patterns</li>
              <li>🚀 Generate content that sounds authentically you</li>
              <li>📊 See your voice training progress</li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground pt-4">
            Want early access? Let us know!
          </p>
          <Link href="/contact">
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Request Early Access
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
