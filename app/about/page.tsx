import { AppNavigation } from "@/components/app-navigation"
import Link from "next/link"
import { Target, Users, Zap, Heart, TrendingUp } from "lucide-react"

export const metadata = {
  title: "About Us - PostContent",
  description: "Learn about PostContent's mission to help creators overcome writer's block",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in mobile-overflow-safe">
      <AppNavigation isAuthenticated={false} />

      <div className="mx-auto max-w-4xl mobile-safe-padding py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1.5 mb-3 sm:mb-4">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-primary">Built by creators, for creators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-balance">
            We Felt Your Pain. So We Fixed It.
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
            PostContent exists because we were tired of watching brilliant creators suffer through writer's block while
            their competitors thrived.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">The Origin Story You'll Relate To</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              Picture this: It's 11 PM. You've been staring at a blank screen for 3 hours. You have a product launch
              tomorrow and zero social content ready. Sound familiar?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              That was our founder in early 2024. A developer who could build anything—except consistent content. After
              watching his SaaS launch flop due to zero marketing presence, he realized:{" "}
              <strong>great products die in silence because their creators can't create content fast enough.</strong>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Six months later, PostContent was born. Not as another generic AI tool, but as a solution that learns YOUR
              voice, sounds authentically you, and generates content 10x faster. Today, 10,000+ creators use it daily to
              stay visible, stay relevant, and stay sane.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Story</h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              PostContent was born from a simple frustration: spending hours staring at a blank screen, trying to craft
              the perfect social media post. We realized that developers and creators who excel at building products
              often struggle with consistent content creation.
            </p>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              In 2025, we set out to build an AI tool that doesn't just generate generic content, but learns your unique
              voice and style. Today, over 10,000 creators use PostContent to generate authentic posts 10x faster.
            </p>
          </section>

          <section className="grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center text-center p-4 sm:p-6 border border-border rounded-lg bg-card/50">
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-full bg-primary/10">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Empower creators to focus on what they do best while AI handles the content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 sm:p-6 border border-border rounded-lg bg-card/50">
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-full bg-primary/10">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Our Approach</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Train AI on your writing style so every post sounds authentically you.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 sm:p-6 border border-border rounded-lg bg-card/50">
              <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-full bg-primary/10">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Our Community</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                10,000+ developers, founders, and creators trust PostContent daily.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Why PostContent?</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l-2 border-primary pl-3 sm:pl-4">
                <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">Built for Creators, Not Marketers</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We understand that you're not a copywriter. You build products, write code, or create content in other
                  forms. PostContent bridges that gap.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-3 sm:pl-4">
                <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">Your Voice, Amplified by AI</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Unlike generic AI tools, PostContent learns from your past content to generate posts that truly sound
                  like you.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-3 sm:pl-4">
                <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">Ship Faster, Post Smarter</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Stop overthinking every post. Generate multiple variations in seconds and choose what resonates.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Why Creators Choose Us Over Generic AI</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold mb-2">Because Generic AI Killed Your Authenticity</h3>
                <p className="text-muted-foreground">
                  ChatGPT sounds like ChatGPT. Your audience can tell. PostContent trains on YOUR writing so every post
                  sounds like YOU wrote it—because the AI learned from you.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold mb-2">Because Your Time is Worth More Than $10/Hour</h3>
                <p className="text-muted-foreground">
                  Spending 3 hours on one post? That's $30-300 in lost productivity. Generate 10 posts in 5 minutes and
                  spend the rest of your day building, coding, or living your life.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold mb-2">Because Consistency Beats Perfection Every Time</h3>
                <p className="text-muted-foreground">
                  You don't need the perfect post. You need to post consistently. PostContent removes the friction so
                  you can show up daily without burnout.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
            <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Join 10,000+ Creators Who Stopped Overthinking
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto">
              Every hour you delay is an hour your competitors use to engage your potential audience. Start free today.
              No credit card. No risk. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition-all touch-target text-sm sm:text-base"
              >
                Start Creating Now - It's Free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-border font-semibold hover:bg-accent hover:scale-105 transition-all touch-target text-sm sm:text-base"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-3 sm:mt-4">
              10 free posts per month • No credit card required • Cancel anytime
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
