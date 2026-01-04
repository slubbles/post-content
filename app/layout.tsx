import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "PostContent - AI-Powered Social Posts",
  description: "Generate engaging X/Twitter posts in seconds. AI-powered content creation made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: 'blockButton',
          socialButtonsPlacement: 'top',
        },
        variables: {
          colorPrimary: '#f0ff5f',
          colorText: '#000000',
          colorBackground: '#ffffff',
          colorInputBackground: '#fafafa',
          colorInputText: '#000000',
          fontFamily: 'var(--font-manrope), system-ui, sans-serif',
          borderRadius: '1rem',
        },
        elements: {
          card: 'shadow-xl border border-gray-200',
          headerTitle: 'text-2xl font-bold text-black',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border-2 border-gray-200 hover:border-primary hover:bg-gray-50 transition-all font-medium',
          formButtonPrimary: 'bg-primary hover:shadow-atome-yellow text-black font-bold transition-all hover:scale-105',
          footerActionLink: 'text-black hover:text-gray-700 font-medium',
          formFieldInput: 'border-2 border-gray-200 focus:border-primary rounded-xl',
          identityPreviewText: 'text-black font-medium',
          identityPreviewEditButton: 'text-black hover:text-gray-700',
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${manrope.variable} font-sans`}>
          <Navigation />
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
            style: {
              background: '#1A2332',
              color: '#fff',
              border: '1px solid #00D775',
            },
            success: {
              iconTheme: {
                primary: '#00D775',
                secondary: '#0A0E14',
              },
            },
          }}
        />
        </body>
      </html>
    </ClerkProvider>
  );
}
