'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSession, signOut } from 'next-auth/react';

const navItems = [
  { id: 'generate', label: 'Generate', href: '/', icon: '' },
  { id: 'train', label: 'Train Voice', href: '/train', icon: '' },
  { id: 'reply', label: 'Reply', href: '/reply', icon: '' },
  { id: 'thread', label: 'Thread', href: '/thread', icon: '' },
  { id: 'history', label: 'History', href: '/history', icon: '' },
  { id: 'pricing', label: 'Pricing', href: '/pricing', icon: '' },
  { id: 'settings', label: 'Settings', href: '/settings', icon: '' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white backdrop-blur-sm sticky top-0 z-50 safe-top">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-atome-lg flex items-center justify-center hover:scale-110 hover:shadow-atome-yellow transition-all font-bold text-black text-lg sm:text-xl">
              PC
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-bold hidden sm:block text-black">PostContent</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.id} href={item.href} className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      'px-4 lg:px-6 py-2.5 rounded-atome-lg font-medium transition-all text-sm lg:text-base',
                      isActive
                        ? 'text-black bg-primary'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    )}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
            
            {/* Auth Button */}
            {status === 'loading' ? (
              <div className="w-10 h-10 rounded-atome-lg bg-gray-200 animate-pulse"></div>
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden xl:block">
                  {session.user.email}
                </span>
                <button
                  onClick={() => signOut({ redirectTo: '/login' })}
                  className="px-4 lg:px-6 py-2.5 rounded-atome-lg font-medium text-sm lg:text-base text-gray-600 hover:text-black hover:bg-gray-100 transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-4 lg:px-6 py-2.5 rounded-atome-lg font-medium text-sm lg:text-base text-black bg-primary hover:shadow-atome-yellow transition-all">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Tagline */}
          <div className="hidden lg:block text-sm text-gray-400">
            Built by someone who hates writing
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.id} href={item.href} className="relative flex-1">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                      'py-3 text-center transition-all min-h-[52px] flex items-center justify-center',
                      isActive ? 'text-primary' : 'text-gray-600 hover:text-black'
                    )}
                  >
                    <div className="text-xs sm:text-sm font-medium">{item.label}</div>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabMobile"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
