import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance">Page not found</h1>
          <p className="text-muted-foreground text-pretty">This page took a wrong turn. Let's get you back on track.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full bg-transparent">
            <Link href="/generate">Start generating</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
