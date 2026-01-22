import { AppNavigation } from "@/components/app-navigation"
import { Footer } from "@/components/footer"
import { auth } from "@/lib/auth"

export const metadata = {
  title: "Privacy Policy - PostContent",
  description: "How PostContent collects, uses, and protects your data",
}

export default async function PrivacyPage() {
  const session = await auth()
  const isAuthenticated = !!session?.user

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <AppNavigation isAuthenticated={isAuthenticated} user={session?.user} />

      <div className="mx-auto max-w-4xl mobile-safe-padding py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 9, 2026</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3 mt-4">Account Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Email address</li>
              <li>Name</li>
              <li>Password (encrypted)</li>
              <li>Profile information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Usage Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">We automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and features used</li>
              <li>Time and date of access</li>
              <li>Referring URLs</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Content Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">We store:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Posts, replies, and threads you generate</li>
              <li>Training data you provide</li>
              <li>AI preferences and settings</li>
              <li>Generation history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide and maintain our service</li>
              <li>Generate personalized AI content based on your preferences</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service updates and important notifications</li>
              <li>Improve our AI models and service features</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Service providers (payment processing, hosting, analytics)</li>
              <li>AI model providers to generate content</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We use anonymized and aggregated data for service improvements without personally identifying you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We implement security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Encrypted password storage (bcrypt)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Secure cloud infrastructure</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve user experience</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can control cookies through your browser settings, but some features may not work properly without
              them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data</li>
              <li>Object to data processing</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can exercise these rights through your account settings or by contacting support@postcontent.io
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide services. After account
              deletion, we retain some information for legal compliance, fraud prevention, and dispute resolution,
              typically for 90 days, after which it is permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              PostContent is not intended for users under 13 years of age. We do not knowingly collect information from
              children. If we discover we have collected data from a child, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate
              safeguards are in place to protect your information in accordance with this privacy policy and applicable
              data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of significant changes via email
              or through the service. Continued use after changes indicates acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your data, please contact us at:
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Email: support@postcontent.io
              <br />
              Website: https://postcontent.io/contact
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
