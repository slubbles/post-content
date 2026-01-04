'use client';

import { useState } from 'react';
import PostGenerator from '@/components/PostGenerator';
import GeneratedPosts from '@/components/GeneratedPosts';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [currentTone, setCurrentTone] = useState<string>('sarcastic');

  const handleGenerate = async (input: string, tone: string) => {
    setIsGenerating(true);
    setShowResults(false);
    setCurrentTone(tone);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, tone }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate posts');
      }

      const data = await response.json();
      setGeneratedPosts(data.posts);
      setShowResults(true);
      
      // Track analytics
      trackEvent('post_generated', { 
        tone, 
        duration: Date.now() - startTime,
        success: true 
      });
    } catch (error) {
      console.error('Generation error:', error);
      // Fallback to mock data if API fails
      const mockPosts = getMockPosts(tone);
      setGeneratedPosts(mockPosts);
      setShowResults(true);
      
      // Track analytics (mock data)
      trackEvent('post_generated', { 
        tone, 
        duration: Date.now() - startTime,
        success: false,
        fallback: true
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate different mocks
    const allMocks = [
      "Day 5: Shipped a feature. Already found 3 bugs. Progress? Questionable.",
      "Built this in 4 hours. Spent 6 hours naming variables. Priorities? Flawless.",
      "Finally deployed. Immediately broke production. At least it's consistent.",
      "Wrote 200 lines of code. Deleted 180. Net gain: 20 lines of confusion.",
      "My code works. I don't know why. Scared to touch it now.",
      "Refactored my code. Still a mess but organized chaos now. Progress?",
      "Added a feature no one asked for. Broke two features people use. Classic.",
      "Debugging: The art of removing the bugs you added while debugging.",
      "Ship fast, they said. It'll be fine, they said. Production is on fire.",
      "Implemented AI. Now the app makes mistakes with confidence.",
    ];
    
    const shuffled = allMocks.sort(() => Math.random() - 0.5);
    setGeneratedPosts(shuffled.slice(0, 3));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {!showResults && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-primary px-4 py-12 sm:py-16 md:py-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/10 border border-black/20 rounded-atome-pill mb-6 sm:mb-8">
                <span className="text-black text-xs sm:text-sm font-semibold">Built for builders who hate writing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 text-balance leading-tight text-black px-4">
                Stop staring at{' '}
                <span className="italic">blank tweets</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-6 sm:mb-8 text-balance max-w-3xl mx-auto px-4">
                AI-powered X posts that sound like you. Not some soulless bot.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center px-4">
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl sm:text-3xl font-bold text-black mb-1">3</div>
                  <div className="text-xs sm:text-sm text-black/60">Variations per idea</div>
                </div>
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl sm:text-3xl font-bold text-black mb-1">&lt;5s</div>
                  <div className="text-xs sm:text-sm text-black/60">Generation time</div>
                </div>
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl sm:text-3xl font-bold text-black mb-1">100%</div>
                  <div className="text-xs sm:text-sm text-black/60">Your vibe</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12 bg-white pb-24 md:pb-12">
        <PostGenerator 
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {showResults && (
          <GeneratedPosts 
            posts={generatedPosts}
            onRegenerate={handleRegenerate}
            isRegenerating={isGenerating}
            tone={currentTone}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

// Mock post generator based on tone
function getMockPosts(tone: string): string[] {
  const toneMap: Record<string, string[]> = {
    sarcastic: [
      "Day 5: Shipped a feature. Already found 3 bugs. Progress? Questionable.",
      "Built this in 4 hours. Spent 6 hours naming variables. Priorities? Flawless.",
      "Finally deployed. Immediately broke production. At least it's consistent.",
    ],
    raw: [
      "Shipped the thing. It works. Barely. But it works.",
      "Today: Wrote code. Deleted code. Wrote better code. Maybe.",
      "Built a feature no one asked for. Tomorrow: Build what they need.",
    ],
    roast: [
      "My code works. I don't know why. Scared to touch it now.",
      "Refactored my code. Still a mess but organized chaos now.",
      "Added a feature. Broke two others. This is fine 🔥",
    ],
  };

  return toneMap[tone] || toneMap.sarcastic;
}
