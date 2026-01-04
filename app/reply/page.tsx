'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import Footer from '@/components/Footer';

interface Reply {
  text: string;
  tag: 'Funny' | 'Insightful' | 'Spicy';
}

export default function ReplyPage() {
  const [postToReply, setPostToReply] = useState('');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!postToReply.trim()) {
      toast.error('Paste a post to reply to first!');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          postToReply: postToReply.trim(),
          context: context.trim() || undefined 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate replies');
      }

      const data = await response.json();
      setReplies(data.replies);
    } catch (error) {
      console.error('Reply generation error:', error);
      toast.error('Failed to generate replies. Using fallback.');
      
      // Fallback to mock replies
      const mockReplies: Reply[] = [
        { text: "This is fire. Now do it in production.", tag: 'Funny' },
        { text: "Okay but does it scale? (jk I don't care, this is cool)", tag: 'Spicy' },
        { text: "Adding this to my 'steal later' list. Great work!", tag: 'Insightful' },
      ];
      setReplies(mockReplies);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Reply copied! Go roast responsibly.');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy. Your clipboard has standards.');
    }
  };

  const handleFeedback = (index: number, feedback: 'spicy' | 'mild') => {
    const savedFeedback = JSON.parse(localStorage.getItem('replyFeedback') || '[]');
    savedFeedback.push({
      reply: replies[index].text,
      feedback,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('replyFeedback', JSON.stringify(savedFeedback));
    
    toast.success(feedback === 'spicy' ? 'Noted: Too spicy!' : 'Noted: Too mild!');
  };

  const tagColors = {
    Funny: 'accent-orange',
    Insightful: 'accent-blue',
    Spicy: 'accent-purple',
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
          <h1 className="text-5xl font-display font-bold mb-4">
            Reply <span className="text-primary">Generator</span>
          </h1>
          <p className="text-xl text-gray-400">
            Engage without the mental overhead.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-atome-xl p-8 mb-8"
        >
          {/* Post to Reply To */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Paste the post you want to reply to
            </label>
            <textarea
              value={postToReply}
              onChange={(e) => setPostToReply(e.target.value)}
              placeholder="Just shipped my side project after 6 months of building! 🚀"
              className="w-full bg-gray-50 border border-gray-700 rounded-atome-lg p-4 text-black placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none h-32"
              disabled={isGenerating}
            />
          </div>

          {/* Optional Context */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              What's your angle? (optional)
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Supportive? Funny? Technical advice?"
              className="w-full bg-gray-50 border border-gray-700 rounded-atome-lg p-4 text-black placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              disabled={isGenerating}
            />
          </div>

          {/* Generate Button */}
          <motion.button
            onClick={handleGenerate}
            disabled={!postToReply.trim() || isGenerating}
            whileHover={{ scale: postToReply.trim() && !isGenerating ? 1.02 : 1 }}
            whileTap={{ scale: postToReply.trim() && !isGenerating ? 0.98 : 1 }}
            className={clsx(
              'w-full py-4 px-6 rounded-atome-lg font-semibold text-lg transition-all',
              postToReply.trim() && !isGenerating
                ? 'bg-primary hover:shadow-atome-yellow text-black shadow-lg shadow-primary/25'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            )}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Crafting replies...
              </span>
            ) : (
              'Craft replies'
            )}
          </motion.button>
        </motion.div>

        {/* Replies */}
        {replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-bold mb-4">
              Your reply options:
            </h3>

            {replies.map((reply, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-atome-lg p-6 hover:border-gray-600 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="text-black text-lg flex-1">
                    {reply.text}
                  </p>
                  <span className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-medium border',
                    `bg-${tagColors[reply.tag]}/10 border-${tagColors[reply.tag]}/30 text-${tagColors[reply.tag]}`
                  )}>
                    {reply.tag}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleCopy(reply.text, index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        'px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                        copiedIndex === index
                          ? 'bg-primary text-dark'
                          : 'bg-gray-50 border border-gray-700 hover:border-primary text-black'
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
                  </div>

                  {/* Feedback Buttons */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => handleFeedback(index, 'spicy')}
                      className="px-3 py-1 bg-gray-50 border border-gray-700 hover:border-orange-500 rounded-lg transition-all"
                      title="Too spicy"
                    >
                      Spicy
                    </button>
                    <button
                      onClick={() => handleFeedback(index, 'mild')}
                      className="px-3 py-1 bg-gray-50 border border-gray-700 hover:border-blue-500 rounded-lg transition-all"
                      title="Too mild"
                    >
                      🥱
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-atome-lg"
            >
              <p className="text-sm text-gray-400 text-center">
                <span className="text-primary font-medium">Pro tip:</span> Use feedback buttons to teach the AI your engagement style!
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
