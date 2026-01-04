'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-2xl"
      >
        {/* 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative"
        >
          <h1 className="text-9xl font-display font-bold text-primary/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🤷</span>
          </div>
        </motion.div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-display font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg">
            Looks like this page got deleted. Or maybe it never existed.
            <br />
            Schrodinger's page, if you will.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-dark font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              ← Back to Home
            </motion.button>
          </Link>
          
          <Link href="/history">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-dark-lighter border border-gray-700 text-white font-medium rounded-xl hover:border-primary transition-colors"
            >
              View History
            </motion.button>
          </Link>
        </div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8"
        >
          <p className="text-sm text-gray-600">
            Fun fact: You're the{' '}
            <span className="text-primary font-medium">
              {Math.floor(Math.random() * 1000) + 1}
            </span>
            th person to see this page today
            <br />
            <span className="text-xs">(not really, we just made that up to make you feel special)</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
