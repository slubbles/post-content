'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

interface SavedPost {
  id: string;
  text: string;
  tone: string;
  timestamp: string;
  used: boolean;
}

export default function HistoryPage() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Load saved posts from localStorage
    const saved = localStorage.getItem('savedPosts');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'used') return post.used;
    if (filter === 'unused') return !post.used;
    return true;
  });

  const handleCopy = async (post: SavedPost) => {
    await navigator.clipboard.writeText(post.text);
    setCopiedId(post.id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMarkUsed = (id: string) => {
    const updated = posts.map(p => 
      p.id === id ? { ...p, used: !p.used } : p
    );
    setPosts(updated);
    localStorage.setItem('savedPosts', JSON.stringify(updated));
    toast.success('Updated!');
  };

  const handleDelete = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('savedPosts', JSON.stringify(updated));
    toast.success('Deleted!');
  };

  const handleClearAll = () => {
    if (confirm('Delete all posts? This cannot be undone.')) {
      setPosts([]);
      localStorage.removeItem('savedPosts');
      toast.success('History cleared!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Your <span className="text-primary">Post History</span>
          </h1>
          <p className="text-gray-400 text-lg">
            All your generated posts in one place. Track what you've used.
          </p>
        </div>

        {/* Stats & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Stats */}
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold text-primary">{posts.length}</div>
              <div className="text-sm text-gray-500">Total Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {posts.filter(p => p.used).length}
              </div>
              <div className="text-sm text-gray-500">Used</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {posts.filter(p => !p.used).length}
              </div>
              <div className="text-sm text-gray-500">Unused</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-primary text-dark'
                  : 'bg-gray-50 text-gray-400 hover:text-black'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unused')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unused'
                  ? 'bg-primary text-dark'
                  : 'bg-gray-50 text-gray-400 hover:text-black'
              }`}
            >
              Unused
            </button>
            <button
              onClick={() => setFilter('used')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'used'
                  ? 'bg-primary text-dark'
                  : 'bg-gray-50 text-gray-400 hover:text-black'
              }`}
            >
              Used
            </button>
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">📭</div>
            <h3 className="text-2xl font-display font-bold mb-4">
              {filter === 'all' ? 'No posts yet' : `No ${filter} posts`}
            </h3>
            <p className="text-gray-400 mb-8">
              {filter === 'all' 
                ? 'Generate some posts to see them here!'
                : `Try a different filter to see more posts.`}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white border rounded-atome-lg p-6 hover:border-gray-600 transition-all ${
                      post.used ? 'border-gray-200 opacity-60' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-black text-lg mb-4 leading-relaxed">{post.text}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg text-primary">
                            {post.tone}
                          </span>
                          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                          <span>{post.text.length} chars</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleCopy(post)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg transition-all ${
                            copiedId === post.id
                              ? 'bg-primary text-dark'
                              : 'bg-gray-50 hover:bg-gray-700'
                          }`}
                          title="Copy"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {copiedId === post.id ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            )}
                          </svg>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleMarkUsed(post.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg transition-all ${
                            post.used
                              ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                              : 'bg-gray-50 hover:bg-gray-700'
                          }`}
                          title={post.used ? 'Mark as unused' : 'Mark as used'}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.button>

                        <motion.button
                          onClick={() => handleDelete(post.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-gray-50 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 rounded-lg transition-all"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Clear All Button */}
            {posts.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-gray-50 border border-gray-700 hover:border-red-500/50 hover:text-red-400 rounded-atome-lg font-medium transition-all"
                >
                  Clear All History
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
