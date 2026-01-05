import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f0ff5f', // Atome yellow
          dark: '#e0ef4f',
          light: '#f5ff7f',
        },
        dark: {
          DEFAULT: '#000000', // Pure black
          lighter: '#1a1a1a',
          card: '#ffffff', // White cards on black
        },
        accent: {
          yellow: '#f0ff5f',
          gray: '#3e3e3e',
          link: '#0000ee',
        },
        gray: {
          300: '#e5e5e5',
          400: '#b8b8b8',
          500: '#8a8a8a',
          600: '#5c5c5c',
          700: '#3e3e3e',
          800: '#2e2e2e',
        }
      },
      fontFamily: {
        sans: ['var(--font-manrope)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-manrope)', 'sans-serif'],
      },
      borderRadius: {
        'atome-sm': '5px',
        'atome-md': '10px',
        'atome-lg': '34px',
        'atome-xl': '45px',
        'atome-pill': '100px',
        'wise': '9999px', // Wise pill buttons
      },
      boxShadow: {
        'atome': 'rgba(0, 0, 0, 0.15) 0px 5px 12px 0px',
        'atome-yellow': 'rgba(240, 255, 95, 0.3) 0px 4px 16px 0px',
        'atome-hover': 'rgba(240, 255, 95, 0.5) 0px 8px 24px 0px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: 'rgba(240, 255, 95, 0.3) 0px 4px 16px 0px' },
          '50%': { boxShadow: 'rgba(240, 255, 95, 0.6) 0px 8px 32px 0px' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
