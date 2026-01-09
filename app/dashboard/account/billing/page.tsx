import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Download } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="mt-2 text-muted-foreground">Manage your subscription and billing information.</p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Current Plan</h3>
          <p className="text-sm text-muted-foreground">You are currently on the Free plan</p>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="font-medium">Free Plan</p>
            <p className="text-sm text-muted-foreground">100 generations per month</p>
          </div>
          <Link href="/pricing">
            <Button>Upgrade Plan</Button>
          </Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Usage This Month</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generations Used</span>
              <span className="font-medium">45 / 100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-[45%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No payment method on file</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Billing History</h3>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">No invoices available</p>
        </div>
      </Card>
    </div>
  )
}
