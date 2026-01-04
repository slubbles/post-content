'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultTone: 'sarcastic',
    autoSave: true,
    showCharCount: true,
    darkMode: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('userSettings', JSON.stringify(updated));
    toast.success('Setting updated!');
  };

  const handleClearData = () => {
    if (confirm('Clear all data? This will delete your history and voice profile.')) {
      localStorage.clear();
      toast.success('All data cleared!');
      window.location.href = '/';
    }
  };

  const handleExportData = () => {
    const data = {
      posts: localStorage.getItem('savedPosts'),
      voiceProfile: localStorage.getItem('voiceProfile'),
      settings: localStorage.getItem('userSettings'),
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `postcontent-backup-${Date.now()}.json`;
    a.click();
    toast.success('Data exported!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-primary">Settings</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Customize your PostContent experience
          </p>
        </div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-atome-xl p-8 mb-6"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Preferences</h2>

          <div className="space-y-6">
            {/* Default Tone */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Default Tone</h3>
                <p className="text-sm text-gray-400">Your go-to vibe for new posts</p>
              </div>
              <select
                value={settings.defaultTone}
                onChange={(e) => updateSetting('defaultTone', e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-700 rounded-lg text-black focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="sarcastic">Sarcastic Underdog</option>
                <option value="raw">Raw Builder</option>
                <option value="roast">Self-Roast Master</option>
              </select>
            </div>

            {/* Auto-save */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Auto-save Posts</h3>
                <p className="text-sm text-gray-400">Automatically save generated posts to history</p>
              </div>
              <button
                onClick={() => updateSetting('autoSave', !settings.autoSave)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.autoSave ? 'bg-primary' : 'bg-gray-700'
                }`}
              >
                <motion.div
                  animate={{ x: settings.autoSave ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full"
                />
              </button>
            </div>

            {/* Character Count */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Show Character Count</h3>
                <p className="text-sm text-gray-400">Display character count while writing</p>
              </div>
              <button
                onClick={() => updateSetting('showCharCount', !settings.showCharCount)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.showCharCount ? 'bg-primary' : 'bg-gray-700'
                }`}
              >
                <motion.div
                  animate={{ x: settings.showCharCount ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-atome-xl p-8 mb-6"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Data & Privacy</h2>

          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full px-6 py-4 bg-primary/10 border border-primary/30 hover:bg-primary/20 rounded-atome-lg font-semibold text-primary transition-all flex items-center justify-between"
            >
              <span>Export Your Data</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            <button
              onClick={handleClearData}
              className="w-full px-6 py-4 bg-gray-50 border border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 rounded-atome-lg font-semibold text-red-400 transition-all flex items-center justify-between"
            >
              <span>Clear All Data</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-atome-lg">
            <p className="text-sm text-gray-400">
              <span className="text-primary font-semibold">Privacy:</span> All data is stored locally in your browser. 
              Nothing is sent to our servers except API calls for generation. You own your data.
            </p>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-atome-xl p-8"
        >
          <h2 className="text-2xl font-display font-bold mb-6">About PostContent</h2>

          <div className="space-y-4 text-gray-400">
            <p>
              PostContent helps you generate engaging social posts in seconds. Built for creators, developers, and anyone building an audience on X/Twitter.
            </p>
            <p>
              Powered by <span className="text-primary font-semibold">Grok AI</span>, trained on 
              X data for platform-native content.
            </p>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span>Version</span>
                <span className="text-black font-mono">0.3.0</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span>Build Date</span>
                <span className="text-black font-mono">Jan 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
