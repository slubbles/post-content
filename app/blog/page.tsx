import type { Metadata } from "next"
import Link from "next/link"
import { AppNavigation } from "@/components/app-navigation"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Blog - AI Content Marketing Tips & Strategies | PostContent",
  description: "Read expert insights on AI content generation, social media strategy, LinkedIn marketing, Twitter growth, and multi-platform content creation. Free actionable tips for marketers.",
  keywords: [
    "AI content marketing blog",
    "social media strategy",
    "content creation tips",
    "AI writing",
    "LinkedIn marketing",
    "Twitter growth",
    "content automation",
    "social media AI",
    "digital marketing blog",
    "content marketing 2026"
  ],
  openGraph: {
    title: "PostContent Blog - AI Content Marketing Insights",
    description: "Expert tips on AI content generation, social media strategy, and multi-platform marketing.",
    url: "https://www.postcontent.io/blog",
    siteName: "PostContent",
    type: "website",
    images: [
      {
        url: "https://www.postcontent.io/images/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "PostContent Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostContent Blog - AI Content Marketing Insights",
    description: "Expert tips on AI content generation and social media strategy",
    creator: "@postcontent",
    images: ["https://www.postcontent.io/images/blog-og.jpg"],
  },
  alternates: {
    canonical: "https://www.postcontent.io/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const dynamic = 'force-static'

const blogPosts = [
  {
    id: 1,
    slug: "ai-content-generation-guide-2026",
    title: "AI Content Generation: Complete Guide for Marketers in 2026",
    excerpt:
      "Learn how AI is transforming content creation, best practices for multi-platform posting, and how to maintain your authentic voice while using AI tools.",
    category: "Guide",
    author: "PostContent Team",
    date: "2026-01-14",
    readTime: "12 min read",
  },
  {
    id: 2,
    slug: "linkedin-content-strategy-2026",
    title: "LinkedIn Content Strategy That Actually Works in 2026",
    excerpt:
      "Stop posting into the void. Learn the exact content formats, posting frequency, and engagement tactics that drive real business results on LinkedIn.",
    category: "Strategy",
    author: "PostContent Team",
    date: "2026-01-12",
    readTime: "10 min read",
  },
  {
    id: 3,
    slug: "twitter-x-growth-tactics",
    title: "How to Grow on X (Twitter) in 2026: No BS Guide",
    excerpt:
      "Cut through the noise. Learn the exact tactics, content types, and engagement strategies that grow real followers and drive actual business results on X.",
    category: "Growth",
    author: "PostContent Team",
    date: "2026-01-10",
    readTime: "8 min read",
  },
]

export default async function BlogPage() {
  const session = await auth()
  const isAuthenticated = !!session?.user

  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={isAuthenticated} user={session?.user} />

      <div className="mx-auto max-w-7xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">Blog</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories about content creation and social media
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <Card
                className="group transition-all duration-300 hover:shadow-lg animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg sm:text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full group-hover:gap-3 transition-all bg-transparent touch-target"
                    variant="outline"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-sm text-muted-foreground">
            More articles coming soon. Subscribe to our newsletter to stay updated.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
