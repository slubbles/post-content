import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function PricingPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Simple, <span className="text-primary">transparent</span> pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start free, upgrade when you're ready to scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-atome-lg border-2 border-gray-200 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-black">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">Perfect for trying out PostContent</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700"><strong>10 posts</strong> per month</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">All generation types</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Voice training</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Post history</span>
              </li>
            </ul>

            <button disabled className="w-full py-3 px-6 rounded-atome-lg font-bold text-gray-400 bg-gray-100 cursor-not-allowed">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-black to-gray-900 rounded-atome-lg p-8 relative overflow-hidden border-2 border-primary">
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold text-white">$12</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">For serious content creators</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white"><strong>Unlimited posts</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Priority generation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Advanced voice training</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Export & scheduling</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white">Priority support</span>
              </li>
            </ul>

            <a 
              href="https://buy.polar.sh/polar_cl_wqQ8TgLRsG7HXeqwr6Aj7ErbEz0VMvyVJp18K27Lk7D"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-6 bg-primary text-black font-bold rounded-atome-lg hover:shadow-atome-yellow transition-all hover:scale-105 text-center"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Frequently asked questions
          </h2>
          
          <div className="space-y-6">
            <details className="bg-white rounded-atome-lg border-2 border-gray-200 p-6 cursor-pointer">
              <summary className="font-bold text-black text-lg">
                Can I cancel anytime?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Cancel anytime with one click. No questions asked. If you cancel, you'll still have access until the end of your billing period.
              </p>
            </details>

            <details className="bg-white rounded-atome-lg border-2 border-gray-200 p-6 cursor-pointer">
              <summary className="font-bold text-black text-lg">
                What happens when I reach the free limit?
              </summary>
              <p className="mt-3 text-gray-600">
                You won't be able to generate new posts until next month, or you can upgrade to Pro for unlimited access.
              </p>
            </details>

            <details className="bg-white rounded-atome-lg border-2 border-gray-200 p-6 cursor-pointer">
              <summary className="font-bold text-black text-lg">
                Do you offer refunds?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, we offer a 7-day money-back guarantee. If you're not satisfied, just email us and we'll refund you immediately.
              </p>
            </details>

            <details className="bg-white rounded-atome-lg border-2 border-gray-200 p-6 cursor-pointer">
              <summary className="font-bold text-black text-lg">
                How is Polar.sh different?
              </summary>
              <p className="mt-3 text-gray-600">
                Polar.sh is a creator-friendly payment platform with lower fees than Stripe and built-in community features. Plus, they're open source!
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?{' '}
            <a href="mailto:support@postcontent.io" className="text-black font-semibold hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
