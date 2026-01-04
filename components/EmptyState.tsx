'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  emoji?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ 
  title, 
  description, 
  emoji = '📭',
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-8xl mb-6"
      >
        {emoji}
      </motion.div>

      <h3 className="text-3xl font-display font-bold mb-4 text-center">
        {title}
      </h3>

      <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-dark font-semibold rounded-xl transition-all shadow-lg shadow-primary/25"
          >
            {actionLabel}
          </motion.button>
        </Link>
      )}
    </motion.div>
  );
}
