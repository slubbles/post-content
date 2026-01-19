import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"

export function DocsContent() {
  return (
    <div className="max-w-4xl">
      {/* Getting Started */}
      <section id="getting-started" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to PostContent! This guide will help you create your first AI-generated social media post in under 60
          seconds.
        </p>

        <div id="create-account" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>Visit postcontent.io/signup</li>
            <li>Enter your name, email, and password</li>
            <li>Verify your email address (check your inbox)</li>
            <li>Start creating content immediately - 10 free generations included!</li>
          </ol>
        </div>

        <div id="first-post" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Generate Your First Post</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Follow these steps to create your first post:</p>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Choose Your Platform</h3>
                  <p className="text-sm text-muted-foreground">Select Twitter/X or LinkedIn</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Enter Your Topic</h3>
                  <p className="text-sm text-muted-foreground">
                    Example: "Launching my new product next week" or "Just learned something cool about AI"
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Pick Your Tone</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional, Casual, Humorous, Inspirational, or Educational
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. Generate</h3>
                  <p className="text-sm text-muted-foreground">Get 3-5 variants instantly. Pick your favorite!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Features Overview</h1>

        <div id="content-types" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Content Types</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Posts</CardTitle>
                <CardDescription>Single posts for Twitter/X and LinkedIn</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 3-5 variants per generation</li>
                  <li>• Multiple tone options</li>
                  <li>• Character count optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reply to Posts</CardTitle>
                <CardDescription>Engage with your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Paste original post</li>
                  <li>• Choose reply angle</li>
                  <li>• Get contextual responses</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Threads</CardTitle>
                <CardDescription>Long-form Twitter/X content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Hook-Story-Offer format</li>
                  <li>• 5-10 tweet threads</li>
                  <li>• Numbered for easy posting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Scripts</CardTitle>
                <CardDescription>Short-form video content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Hook-Story-Offer</li>
                  <li>• Provide Value</li>
                  <li>• Emotion-Logic-Urgency</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">API Reference</h1>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            All API requests require authentication. Include your API key in the Authorization header.
          </AlertDescription>
        </Alert>

        <div id="generate-endpoint" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">POST /api/generate</h2>
          <p className="text-muted-foreground mb-4">Generate social media posts for Twitter/X or LinkedIn.</p>

          <div className="space-y-6">
            <div>
              <Badge className="mb-3">Request</Badge>
              <CodeBlock
                code={`{
  "topic": "Launching my new AI SaaS product",
  "platform": "twitter",
  "tone": "professional",
  "variants": 3
}`}
                language="json"
              />
            </div>

            <div>
              <Badge className="mb-3">Response</Badge>
              <CodeBlock
                code={`{
  "success": true,
  "variants": [
    "🚀 After 6 months of building, we're launching our AI SaaS today...",
    "Big news: Our AI-powered tool goes live today...",
    "Launch day! We've built something that helps..."
  ],
  "creditsRemaining": 7,
  "generationId": "gen-abc123"
}`}
                language="json"
              />
            </div>
          </div>
        </div>

        <div id="reply-endpoint" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">POST /api/reply</h2>
          <p className="text-muted-foreground mb-4">Generate contextual replies to existing posts.</p>

          <CodeBlock
            code={`{
  "originalPost": "Just shipped a new feature!",
  "replyAngle": "supportive",
  "variants": 3
}`}
            language="json"
          />
        </div>

        <div id="thread-endpoint" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">POST /api/thread</h2>
          <p className="text-muted-foreground mb-4">Generate Twitter/X threads using storytelling frameworks.</p>

          <CodeBlock
            code={`{
  "hook": "Why most SaaS products fail in the first year",
  "story": "I learned this the hard way after 3 failed attempts...",
  "offer": "Here's the framework that finally worked"
}`}
            language="json"
          />
        </div>
      </section>

      {/* Account Management */}
      <section id="account" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Account Management</h1>

        <div id="profile-settings" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
          <p className="text-muted-foreground mb-4">
            Access your account settings at /dashboard/account. Your account page has 4 tabs:
          </p>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Update your name, email, and profile picture
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Set default platform, tone, and notification preferences
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">History</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                View all your past generations with timestamps
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Billing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Manage subscription, view invoices, and update payment method
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Pricing & Subscriptions</h1>

        <div id="plan-comparison" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">Plan Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left font-semibold">Feature</th>
                  <th className="p-3 text-left font-semibold">Free</th>
                  <th className="p-3 text-left font-semibold">Pro ($19/mo)</th>
                  <th className="p-3 text-left font-semibold">Enterprise ($99/mo)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm">Generations per month</td>
                  <td className="p-3 text-sm">10</td>
                  <td className="p-3 text-sm">200</td>
                  <td className="p-3 text-sm">Unlimited</td>
                </tr>
                <tr className="border-b border-border bg-muted/50">
                  <td className="p-3 text-sm">AI models</td>
                  <td className="p-3 text-sm">Basic</td>
                  <td className="p-3 text-sm">Advanced</td>
                  <td className="p-3 text-sm">Premium</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 text-sm">Variants per generation</td>
                  <td className="p-3 text-sm">3</td>
                  <td className="p-3 text-sm">5</td>
                  <td className="p-3 text-sm">Unlimited</td>
                </tr>
                <tr className="border-b border-border bg-muted/50">
                  <td className="p-3 text-sm">Priority support</td>
                  <td className="p-3 text-sm">-</td>
                  <td className="p-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary inline" />
                  </td>
                  <td className="p-3 text-sm">24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="upgrade" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">How to Upgrade</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>Go to /pricing or click "Upgrade" in your dashboard</li>
            <li>Select Pro or Enterprise plan</li>
            <li>Enter payment details (Stripe secure checkout)</li>
            <li>Confirm subscription</li>
            <li>Start using increased limits immediately</li>
          </ol>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Troubleshooting</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                "Failed to generate content"
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Cause:</strong> API rate limit, network error, or insufficient credits
              </p>
              <p>
                <strong>Fix:</strong> Check your credits balance. Wait 30 seconds and try again. If issue persists,
                contact support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Generation history not loading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Cause:</strong> Database connection issue or browser cache
              </p>
              <p>
                <strong>Fix:</strong> Refresh the page. Clear browser cache. Try incognito mode.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Payment declined
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Cause:</strong> Insufficient funds, expired card, or bank security
              </p>
              <p>
                <strong>Fix:</strong> Verify card details. Contact your bank. Try a different payment method.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="mb-16 scroll-mt-24">
        <h1 className="text-4xl font-bold mb-6">Support & Resources</h1>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                support@postcontent.io - We respond within 24 hours (Pro users: within 4 hours)
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground">
                Visit /faq for answers to common questions about billing, features, and usage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Status Page</h3>
              <p className="text-sm text-muted-foreground">
                Check status.postcontent.io for real-time system status and incident reports.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
