'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface GeneratedPostsProps {
  posts: string[];
  onRegenerate: () => void;
  isRegenerating: boolean;
  tone?: string;
}

export default function GeneratedPosts({ posts, onRegenerate, isRegenerating, tone = 'sarcastic' }: GeneratedPostsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copied! Now go make it worse by tweeting it.');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy. Even your clipboard judges you.');
    }
  };

  const handleSave = (text: string, index: number) => {
    const savedPostsData = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    const newPost = {
      id: Date.now().toString() + index,
      text,
      tone,
      timestamp: new Date().toISOString(),
      used: false,
    };
    savedPostsData.push(newPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPostsData));
    
    setSavedPosts(prev => new Set(prev).add(index));
    toast.success('Saved to history!');
  };

  const handleUnsave = (index: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    toast.success('Removed from history!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Your Posts</h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Pick your poison. They're all questionable.
          </p>
        </div>
        <motion.button
          onClick={onRegenerate}
          disabled={isRegenerating}
          whileHover={{ scale: isRegenerating ? 1 : 1.05 }}
          whileTap={{ scale: isRegenerating ? 1 : 0.95 }}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-atome-lg font-medium transition-all',
            isRegenerating
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-200 hover:border-primary text-black'
          )}
        >
          <svg 
            className={clsx('w-4 h-4', isRegenerating && 'animate-spin')}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          {isRegenerating ? 'Regenerating...' : 'Regenerate All'}
        </motion.button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-atome-xl p-6 hover:border-gray-300 hover:shadow-atome transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Number Badge */}
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 border border-primary/30 rounded-atome-lg flex items-center justify-center">
                <span className="text-primary font-bold">{index + 1}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-black text-lg leading-relaxed mb-3">
                  {post}
                </p>
                
                {/* Character Count */}
                <div className="flex items-center justify-between">
                  <span className={clsx(
                    'text-sm font-medium',
                    post.length > 280 ? 'text-orange-500' : 'text-gray-500'
                  )}>
                    {post.length} / 280 chars
                    {post.length > 280 && ' Too long!'}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <motion.button
                      onClick={() => handleCopy(post, index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        'px-4 py-2.5 sm:py-2 rounded-atome-pill font-medium text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0',
                        copiedIndex === index
                          ? 'bg-primary text-black shadow-atome-yellow'
                          : 'bg-gray-50 border border-gray-200 hover:border-primary text-black'
                      )}
                    >
                      {copiedIndex === index ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => savedPosts.has(index) ? handleUnsave(index) : handleSave(post, index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        'px-4 py-2.5 sm:py-2 rounded-atome-pill font-medium text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0',
                        savedPosts.has(index)
                          ? 'bg-primary/20 border border-primary/30 text-primary'
                          : 'bg-gray-50 border border-gray-200 hover:border-primary text-black'
                      )}
                      title={savedPosts.has(index) ? 'Saved' : 'Save to history'}
                    >
                      <svg className="w-4 h-4" fill={savedPosts.has(index) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {savedPosts.has(index) ? 'Saved' : 'Save'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-atome-lg"
      >
        <p className="text-sm text-gray-500 text-center">
          <span className="text-primary font-medium">Pro tip:</span> Edit these before posting. 
          Or don't. Chaos is a valid strategy.
        </p>
      </motion.div>
    </motion.div>
  );
}
