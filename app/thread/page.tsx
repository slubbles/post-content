'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import UsageWidget from '@/components/UsageWidget';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface Tweet {
  id: string;
  text: string;
  number: number;
}

export default function ThreadPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [thread, setThread] = useState<Tweet[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Enter a topic first!');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error('Failed to generate thread');
      
      const data = await response.json();
      setThread(data.tweets);
      toast.success('Thread generated!');
    } catch (error) {
      // Fallback to mock data
      const mockThread: Tweet[] = [
        {
          id: '1',
          number: 1,
          text: `🧵 Thread: ${topic}\n\nLet me share what I learned building this...`,
        },
        {
          id: '2',
          number: 2,
          text: 'First off, nothing works on the first try. Accept this early.',
        },
        {
          id: '3',
          number: 3,
          text: 'Second, documentation lies. Or it\'s outdated. Or both. Learn to read source code.',
        },
        {
          id: '4',
          number: 4,
          text: 'The hard part isn\'t the code. It\'s figuring out what to build.',
        },
        {
          id: '5',
          number: 5,
          text: 'Shipping matters more than perfection. Done > Perfect.',
        },
        {
          id: '6',
          number: 6,
          text: 'What\'s your biggest lesson from building lately? Drop it below 👇',
        },
      ];
      setThread(mockThread);
      toast.success('Thread generated! (using mock data)');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyOne = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Copied!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleCopyAll = async () => {
    const fullThread = thread.map((t, i) => `${i + 1}/${thread.length} ${t.text}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(fullThread);
      toast.success('Entire thread copied! Ready to paste on X.');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleEdit = (tweet: Tweet) => {
    setEditingId(tweet.id);
    setEditText(tweet.text);
  };

  const handleSaveEdit = (id: string) => {
    setThread(thread.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
    toast.success('Tweet updated!');
  };

  const handleDelete = (id: string) => {
    setThread(thread.filter(t => t.id !== id).map((t, i) => ({ ...t, number: i + 1 })));
    toast.success('Tweet removed');
  };

  const handleAddTweet = () => {
    const newTweet: Tweet = {
      id: Date.now().toString(),
      number: thread.length + 1,
      text: '',
    };
    setThread([...thread, newTweet]);
    setEditingId(newTweet.id);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            <span className="text-primary">Thread</span> Generator
          </h1>
          <p className="text-xl text-gray-400">
            Turn your ideas into viral threads.
            <br />
            <span className="text-sm text-gray-600">Or at least threads that don't suck.</span>
          </p>
        </motion.div>

        <UsageWidget />

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-atome-lg p-6 mb-8"
        >
          <label className="block text-sm font-medium text-gray-400 mb-3">
            What do you want to thread about?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: How I built my SaaS in 30 days"
            className="w-full bg-gray-50 border border-gray-700 rounded-lg p-4 text-black placeholder-gray-600 focus:outline-none focus:border-primary transition-colors resize-none h-32"
          />
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {topic.length} characters
            </span>
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              className={clsx(
                'px-8 py-4 rounded-atome-lg font-bold text-lg transition-all',
                isGenerating || !topic.trim()
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-dark hover:bg-primary/90 shadow-lg shadow-primary/20'
              )}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Thread'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Thread Preview */}
        {thread.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Header with Copy All */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold">Your Thread</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {thread.length} tweets • Edit inline before posting
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleAddTweet}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-50 border border-gray-700 hover:border-primary text-black rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Tweet
                </motion.button>
                <motion.button
                  onClick={handleCopyAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All
                </motion.button>
              </div>
            </div>

            {/* Thread Display */}
            <AnimatePresence mode="popLayout">
              {thread.map((tweet, index) => (
                <motion.div
                  key={tweet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-atome-lg p-6 hover:border-gray-600 transition-all group relative"
                >
                  {/* Thread Line */}
                  {index < thread.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-4 bg-gray-700" />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {index + 1}/{thread.length}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {editingId === tweet.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-gray-50 border border-primary rounded-lg p-3 text-black focus:outline-none resize-none"
                            rows={4}
                            autoFocus
                          />
                          <div className="flex items-center justify-between">
                            <span className={clsx(
                              'text-sm font-medium',
                              editText.length > 280 ? 'text-orange-500' : 'text-gray-500'
                            )}>
                              {editText.length} / 280 chars
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-4 py-2 bg-gray-50 border border-gray-700 text-black rounded-lg text-sm hover:border-gray-600 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEdit(tweet.id)}
                                className="px-4 py-2 bg-primary text-black font-medium rounded-lg text-sm hover:bg-primary/90 transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-black text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                            {tweet.text}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={clsx(
                              'text-sm font-medium',
                              tweet.text.length > 280 ? 'text-orange-500' : 'text-gray-500'
                            )}>
                              {tweet.text.length} / 280 chars
                              {tweet.text.length > 280 && ' Too long!'}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <motion.button
                                onClick={() => handleCopyOne(tweet.text, tweet.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={clsx(
                                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                                  copiedId === tweet.id
                                    ? 'bg-primary text-dark'
                                    : 'bg-gray-50 border border-gray-700 hover:border-primary text-black'
                                )}
                              >
                                {copiedId === tweet.id ? '✓' : '📋'} Copy
                              </motion.button>
                              <motion.button
                                onClick={() => handleEdit(tweet)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1.5 bg-gray-50 border border-gray-700 hover:border-blue-500 text-black rounded-lg text-sm font-medium transition-all"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                onClick={() => handleDelete(tweet.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1.5 bg-gray-50 border border-gray-700 hover:border-red-500 text-black rounded-lg text-sm font-medium transition-all"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-atome-lg"
            >
              <p className="text-sm text-gray-400 text-center">
                <span className="text-primary font-medium">Pro tip:</span> First tweet = hook.
                Last tweet = CTA. Everything else = value bomb.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
