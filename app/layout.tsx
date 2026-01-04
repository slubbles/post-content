import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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
  );
}
