import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service - PostContent",
  description: "Terms and conditions for using PostContent AI content generator",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="mx-auto max-w-4xl mobile-safe-padding py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 9, 2026</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using PostContent, you accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              PostContent is an AI-powered content generation platform that helps users create social media posts,
              replies, and threads for X/Twitter. Our service uses artificial intelligence to generate content based on
              user input and training data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To access certain features of PostContent, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree not to use PostContent to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Generate content that violates any applicable laws or regulations</li>
              <li>Create spam, deceptive, or misleading content</li>
              <li>Harass, abuse, or harm other users or third parties</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Reverse engineer or attempt to extract source code from our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Content Ownership and Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Content you generate using PostContent is yours. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>You grant us a license to store and process your inputs to provide the service</li>
              <li>We may use anonymized data to improve our AI models</li>
              <li>You are responsible for ensuring your generated content complies with platform policies</li>
              <li>We do not claim ownership of content you create</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payment</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">For paid plans:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Subscriptions are billed monthly in advance</li>
              <li>You can cancel at any time with immediate effect</li>
              <li>No refunds for partial months</li>
              <li>We reserve the right to change pricing with 30 days notice</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to
              modify, suspend, or discontinue any part of the service with or without notice. We are not liable for any
              service interruptions or data loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              PostContent is provided "as is" without warranties of any kind. We are not liable for any damages arising
              from your use of the service, including but not limited to content generated by our AI, lost revenue, or
              reputational harm. Your sole remedy is to stop using the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe
              violates these Terms or is harmful to other users, us, or third parties, or for any other reason in our
              sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via
              email or through the service. Continued use of PostContent after changes constitutes acceptance of the new
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us at support@postcontent.io
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
