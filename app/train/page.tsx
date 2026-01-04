'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import Footer from '@/components/Footer';

export default function TrainPage() {
  const [step, setStep] = useState<'input' | 'analyzing' | 'results'>('input');
  const [posts, setPosts] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const postCount = posts.split('\n').filter(p => p.trim().length > 10).length;

  const handleAnalyze = async () => {
    if (postCount < 5) {
      toast.error('Need at least 5 posts to train your vibe!');
      return;
    }

    setStep('analyzing');
    
    try {
      const postArray = posts.split('\n').filter(p => p.trim().length > 10);
      
      const response = await fetch('/api/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts: postArray }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze voice');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setStep('results');
      toast.success('Voice trained! Now I know your vibe.');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze voice. Using fallback analysis.');
      
      // Fallback to mock analysis
      const mockAnalysis = {
        sarcasmLevel: 60,
        tiredLevel: 40,
        favoriteWords: ['shipped', 'broke', 'trash', 'roast'],
        avgLength: 12,
        sentiment: 'Aggressively mid with a hint of chaos',
        patterns: [
          'Uses short, punchy sentences',
          'Self-deprecating humor is your default',
          'Always mentions bugs or failures',
          'Ends with questions or ironic statements',
        ],
      };
      setAnalysis(mockAnalysis);
      setStep('results');
    }
  };

  const handleSave = () => {
    // Save to localStorage for now
    localStorage.setItem('voiceProfile', JSON.stringify(analysis));
    localStorage.setItem('trainingPosts', posts);
    toast.success('Voice profile saved! Future posts will match your vibe.');
  };

  const handleReset = () => {
    setStep('input');
    setPosts('');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4 text-black">
            Train Your <span className="text-primary">Voice</span>
          </h1>
          <p className="text-xl text-gray-600">
            Feed me your best posts. I'll learn your vibe.
          </p>
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-200 rounded-atome-xl p-8"
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Paste 5-10 of your best X posts (one per line)
                </label>
                <textarea
                  value={posts}
                  onChange={(e) => setPosts(e.target.value)}
                  placeholder="Day 5: Shipped a feature. Already found 3 bugs. Progress? Questionable.&#10;&#10;Built this in 4 hours. Spent 6 hours naming variables.&#10;&#10;My code works. I don't know why. Scared to touch it now."
                  className="w-full bg-gray-50 border border-gray-700 rounded-atome-lg p-4 text-black placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none h-64 font-mono text-sm"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className={clsx(
                    'text-sm font-medium',
                    postCount < 5 ? 'text-orange-500' : 'text-primary'
                  )}>
                    {postCount} / 5 posts minimum
                    {postCount < 5 && ' Need more!'}
                  </span>
                  <span className="text-xs text-gray-600">
                    One post per line, please
                  </span>
                </div>
              </div>

              {/* Example Posts */}
              <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-atome-lg">
                <p className="text-sm text-gray-400 mb-2">
                  <span className="text-primary font-medium">Examples of good training data:</span>
                </p>
                <ul className="text-sm text-gray-500 space-y-1 ml-4">
                  <li>• Your most sarcastic tweets</li>
                  <li>• Posts that got good engagement</li>
                  <li>• Anything that sounds uniquely "you"</li>
                </ul>
              </div>

              {/* Analyze Button */}
              <motion.button
                onClick={handleAnalyze}
                disabled={postCount < 5}
                whileHover={{ scale: postCount >= 5 ? 1.02 : 1 }}
                whileTap={{ scale: postCount >= 5 ? 0.98 : 1 }}
                className={clsx(
                  'w-full py-4 px-6 rounded-atome-lg font-semibold text-lg transition-all',
                  postCount >= 5
                    ? 'bg-primary hover:shadow-atome-yellow text-black shadow-lg shadow-primary/25'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                )}
              >
                Teach the vibe
              </motion.button>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-gray-200 rounded-atome-xl p-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-6"
              >
                🧠
              </motion.div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Analyzing your vibe...
              </h3>
              <p className="text-gray-400 mb-6">
                Reading between the lines (and the sarcasm)
              </p>
              <div className="flex justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <div className="bg-white border border-primary/30 rounded-atome-xl p-8 text-center">
                <div className="text-5xl mb-4 font-bold text-primary">...</div>
                <h3 className="text-3xl font-display font-bold mb-2">
                  Voice Profile Complete!
                </h3>
                <p className="text-xl text-gray-400">
                  {analysis.sentiment}
                </p>
              </div>

              {/* Analysis Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Vibe Levels */}
                <div className="bg-white border border-gray-200 rounded-atome-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Your Vibe
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Sarcasm Level</span>
                        <span className="text-primary font-bold">{analysis.sarcasmLevel}%</span>
                      </div>
                      <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.sarcasmLevel}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Tired Level</span>
                        <span className="text-primary font-bold">{analysis.tiredLevel}%</span>
                      </div>
                      <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.tiredLevel}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="h-full bg-accent-blue"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Favorite Words */}
                <div className="bg-white border border-gray-200 rounded-atome-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">💬</span>
                    Favorite Words
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.favoriteWords.map((word: string, i: number) => (
                      <motion.span
                        key={word}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg text-sm font-medium text-primary"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Avg sentence length: <span className="text-black font-medium">{analysis.avgLength} words</span> (punchy!)
                  </p>
                </div>
              </div>

              {/* Patterns */}
              <div className="bg-white border border-gray-200 rounded-atome-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Patterns I Noticed
                </h4>
                <ul className="space-y-2">
                  {analysis.patterns.map((pattern: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="text-primary mt-1">•</span>
                      {pattern}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 px-6 bg-primary hover:shadow-atome-yellow text-black font-semibold rounded-atome-lg transition-all"
                >
                  Lock in this vibe
                </motion.button>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-gray-50 border border-gray-700 hover:border-gray-600 text-black font-semibold rounded-atome-lg transition-all"
                >
                  Start Over
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
