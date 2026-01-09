'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-800 mt-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-xl text-primary">PostContent</h3>
            <p className="text-gray-400 text-sm">
              Generate social posts in seconds. AI-powered content for X/Twitter.
            </p>
          </div>
          
          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white">Features</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Generate
              </Link>
              <Link href="/dashboard/train" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Train Voice
              </Link>
              <Link href="/dashboard/reply" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Reply
              </Link>
              <Link href="/dashboard/thread" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Thread
              </Link>
              <Link href="/dashboard/account" className="text-gray-400 hover:text-primary text-sm transition-colors">
                History
              </Link>
              <Link href="/dashboard/account" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Settings
              </Link>
            </nav>
          </div>
          
          {/* Status */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white">Status</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                Week 3 Complete • Grok API Ready ✅
              </p>
              <p className="text-gray-400">
                Next: GitHub Webhooks 🔗
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-gray-500 text-xs">All systems operational</span>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} PostContent • Making content creation effortless
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com" 
              target="_blank"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              GitHub
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              𝕏 / Twitter
            </Link>
            <span className="text-gray-500 text-xs">
              Made with coffee and determination
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
