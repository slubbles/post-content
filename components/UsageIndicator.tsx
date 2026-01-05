'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface UsageIndicatorProps {
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
}

export default function UsageIndicator({ used, limit, remaining, percentage }: UsageIndicatorProps) {
  const isNearLimit = percentage >= 80;
  const isAtLimit = remaining === 0;

  return (
    <div className="bg-white rounded-atome-lg border-2 border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Monthly Usage</h3>
          <p className="text-2xl font-bold text-black">
            {used} <span className="text-sm text-gray-500 font-normal">/ {limit} posts</span>
          </p>
        </div>
        {isAtLimit && (
          <Link href="/pricing">
            <button className="px-4 py-2 bg-primary text-black font-bold rounded-full hover:shadow-atome-yellow transition-all hover:scale-105">
              Upgrade
            </button>
          </Link>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute h-full rounded-full ${
            isAtLimit
              ? 'bg-red-500'
              : isNearLimit
              ? 'bg-yellow-500'
              : 'bg-primary'
          }`}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className={isNearLimit ? 'text-red-600 font-medium' : 'text-gray-500'}>
          {remaining} posts remaining
        </span>
        {isNearLimit && !isAtLimit && (
          <Link href="/pricing" className="text-black font-medium hover:underline">
            Upgrade for unlimited →
          </Link>
        )}
      </div>
    </div>
  );
}
