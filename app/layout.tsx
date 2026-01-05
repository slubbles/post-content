import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.postcontent.io'),
  title: {
    default: "Post Content - AI Social Media Post Generator",
    template: "%s | Post Content"
  },
  description: "Create engaging social media posts in seconds with AI. Generate X/Twitter posts, threads, and replies that sound like you. Stop overthinking, start posting.",
  keywords: ["AI content generator", "social media posts", "Twitter post generator", "X posts", "content creation", "AI writing", "social media marketing", "content marketing"],
  authors: [{ name: "Post Content" }],
  creator: "Post Content",
  publisher: "Post Content",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.postcontent.io",
    siteName: "Post Content",
    title: "Post Content - AI Social Media Post Generator",
    description: "Create engaging social media posts in seconds with AI. Generate posts, threads, and replies that sound like you.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Post Content - AI Social Media Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post Content - AI Social Media Post Generator",
    description: "Create engaging social media posts in seconds with AI. Stop overthinking, start posting.",
    creator: "@postcontent",
    images: ["/og-image.png"],
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#f0ff5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
