import type { Metadata } from "next"
import { AppNavigation } from "@/components/app-navigation"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog - PostContent",
  description: "Read the latest news, tips, and insights about AI content generation and social media strategy.",
}

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Creating Engaging X/Twitter Posts",
    excerpt: "Learn the best practices for creating posts that drive engagement and grow your audience.",
    category: "Tips & Tricks",
    author: "Sarah Chen",
    date: "2026-01-05",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How AI is Transforming Content Creation",
    excerpt: "Explore how artificial intelligence is revolutionizing the way creators approach content generation.",
    category: "Industry Insights",
    author: "Michael Rodriguez",
    date: "2025-12-28",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Building Your Personal Brand on Social Media",
    excerpt: "A comprehensive guide to establishing and growing your presence across social platforms.",
    category: "Strategy",
    author: "Emma Thompson",
    date: "2025-12-20",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "The Science Behind Viral Posts",
    excerpt: "Understand the psychology and timing factors that make content go viral.",
    category: "Research",
    author: "Dr. James Park",
    date: "2025-12-15",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Maximizing Your Content Calendar",
    excerpt: "Strategies for planning, scheduling, and maintaining consistent content output.",
    category: "Productivity",
    author: "Lisa Anderson",
    date: "2025-12-10",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Understanding Social Media Analytics",
    excerpt: "Learn how to interpret your metrics and use data to improve your content strategy.",
    category: "Analytics",
    author: "David Kim",
    date: "2025-12-05",
    readTime: "9 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-7xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">Blog</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories about content creation and social media
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group transition-all duration-300 hover:shadow-lg animate-fade-in"
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
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-sm text-muted-foreground">
            More articles coming soon. Subscribe to our newsletter to stay updated.
          </p>
        </div>
      </div>
    </div>
  )
}
