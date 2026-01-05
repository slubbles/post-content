import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { checkout_id?: string };
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  const checkoutId = searchParams.checkout_id;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-primary rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Welcome to <span className="text-primary">Pro!</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your subscription is now active. Time to create unlimited content!
        </p>

        {/* Checkout ID (if available) */}
        {checkoutId && (
          <div className="bg-gray-100 rounded-atome-lg p-4 mb-8 inline-block">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="text-xs font-mono text-gray-700">{checkoutId}</p>
          </div>
        )}

        {/* Benefits Recap */}
        <div className="bg-white rounded-atome-lg border-2 border-gray-200 p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            You now have access to:
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><strong>Unlimited posts</strong> - No monthly limits</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><strong>Priority generation</strong> - Faster AI responses</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><strong>Advanced features</strong> - Voice training, threads, replies</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700"><strong>Priority support</strong> - Get help when you need it</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-primary text-black font-bold rounded-atome-lg hover:scale-105 hover:shadow-atome-yellow transition-all duration-200"
        >
          Start Creating Content
        </Link>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-8">
          Questions? Email us at{' '}
          <a href="mailto:support@postcontent.io" className="text-primary hover:underline">
            support@postcontent.io
          </a>
        </p>

        {/* Manage Subscription */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Manage your subscription on{' '}
            <a 
              href="https://polar.sh/slubbles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Polar.sh
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
