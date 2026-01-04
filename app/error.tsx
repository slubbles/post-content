'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-8xl"
        >
          💥
        </motion.div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-display font-bold text-white">
            Something Broke
          </h2>
          <p className="text-gray-400 text-lg">
            Don't panic. It's probably not your fault.
            <br />
            (But it might be mine.)
          </p>
          
          {/* Error Details */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left"
            >
              <p className="text-red-400 text-sm font-mono">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-gray-500 text-xs mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-dark font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Try Again
          </motion.button>
          
          <motion.button
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-dark-lighter border border-gray-700 text-white font-medium rounded-xl hover:border-primary transition-colors"
          >
            Go Home
          </motion.button>
        </div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8"
        >
          <p className="text-sm text-gray-600">
            If this keeps happening, something's actually wrong.
            <br />
            Check the console for details or{' '}
            <a 
              href="https://github.com" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              open an issue
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
