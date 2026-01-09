import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, MapPin, Clock, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Careers - PostContent",
  description: "Join our team and help shape the future of AI-powered content creation.",
}

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and scale our AI-powered content generation platform using Next.js, TypeScript, and modern web technologies.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive and delightful user experiences for our content creation tools.",
  },
  {
    title: "ML Engineer",
    department: "AI/ML",
    location: "Remote",
    type: "Full-time",
    description: "Improve our AI models and develop new features for personalized content generation.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Help our users get the most out of PostContent and drive product adoption.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="mx-auto max-w-7xl mobile-safe-padding py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Join Our Team</h1>
          <p className="mt-4 text-lg text-muted-foreground">Help us build the future of AI-powered content creation</p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Remote-First</CardTitle>
              <CardDescription>Work from anywhere in the world</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Competitive Pay</CardTitle>
              <CardDescription>Industry-leading compensation and equity</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Great Benefits</CardTitle>
              <CardDescription>Health, dental, unlimited PTO, and more</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold">Open Positions</h2>
          <p className="mt-2 text-muted-foreground">We're always looking for talented people to join our team</p>
        </div>

        <div className="space-y-6">
          {openings.map((job, index) => (
            <Card key={job.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="mb-2">{job.title}</CardTitle>
                    <CardDescription>{job.description}</CardDescription>
                  </div>
                  <Button>Apply Now</Button>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge variant="secondary" className="gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.department}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold">Don't see a perfect fit?</h2>
          <p className="mt-2 text-muted-foreground">
            We're always interested in hearing from talented people. Send us your resume anyway!
          </p>
          <div className="mt-6">
            <a href="mailto:careers@postcontent.io">
              <Button>Send Your Resume</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
