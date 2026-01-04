'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface PostGeneratorProps {
  onGenerate: (input: string, tone: string) => void;
  isGenerating: boolean;
}

const tonePresets = [
  {
    id: 'sarcastic',
    name: 'Sarcastic Underdog',
    emoji: '😤',
    color: 'purple',
    description: 'Tired but proud',
  },
  {
    id: 'raw',
    name: 'Raw Builder',
    emoji: '',
    color: 'blue',
    description: 'No BS, just ship',
  },
  {
    id: 'roast',
    name: 'Self-Roast Master',
    emoji: '🤦',
    color: 'orange',
    description: 'Comedy through pain',
  },
];

export default function PostGenerator({ onGenerate, isGenerating }: PostGeneratorProps) {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState('sarcastic');
  const charCount = input.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onGenerate(input, selectedTone);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border border-gray-200 rounded-atome-xl p-4 sm:p-6 md:p-8 shadow-atome"
    >
      <form onSubmit={handleSubmit}>
        {/* Input Area */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-black mb-2 sm:mb-3">
            What did you ship today? <span className="text-gray-500 text-xs sm:text-sm font-normal">(Or what broke?)</span>
          </label>
          <div className="relative">
            <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Built a feature that... well, it exists now."
            className="w-full bg-gray-50 border border-gray-300 rounded-atome-lg p-4 sm:p-5 text-black placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none h-32 sm:h-36 text-base sm:text-lg"
            disabled={isGenerating}
          />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className={clsx(
              "text-sm font-medium transition-colors",
              charCount > 50 ? "text-primary" : "text-gray-500"
            )}>
              {charCount > 0 ? `${charCount} characters` : 'Start typing...'}
            </span>
            <span className="text-xs text-gray-500 italic">
              Be honest. The AI will roast you anyway.
            </span>
          </div>
        </div>

        {/* Tone Presets */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">
            Pick your vibe
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {tonePresets.map((preset) => (
              <motion.button
                key={preset.id}
                type="button"
                onClick={() => setSelectedTone(preset.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  'relative p-3 sm:p-4 rounded-atome-lg border-2 transition-all text-left',
                  selectedTone === preset.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300',
                  isGenerating && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isGenerating}
              >
                <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                  <span className="text-3xl sm:text-4xl">{preset.emoji}</span>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-black mb-1 text-base sm:text-lg">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {preset.description}
                    </div>
                  </div>
                </div>
                {selectedTone === preset.id && (
                  <motion.div
                    layoutId="selected"
                    className="absolute inset-0 border-2 border-primary bg-primary/5 rounded-atome-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          type="submit"
          disabled={!input.trim() || isGenerating}
          whileHover={{ scale: input.trim() && !isGenerating ? 1.02 : 1 }}
          whileTap={{ scale: input.trim() && !isGenerating ? 0.98 : 1 }}
          className={clsx(
            'w-full py-4 sm:py-5 px-6 sm:px-8 rounded-atome-pill font-bold text-lg sm:text-xl transition-all relative overflow-hidden min-h-[52px]',
            input.trim() && !isGenerating
              ? 'bg-primary hover:shadow-atome-yellow text-black shadow-atome'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          )}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Cooking up some chaos...
            </span>
          ) : (
            <span>Cook up some chaos</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
