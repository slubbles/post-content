"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  if (paths.length === 0) return null

  const breadcrumbLabels: Record<string, string> = {
    generate: "Generate",
    reply: "Reply",
    thread: "Thread",
    train: "Train",
    history: "History",
    settings: "Settings",
    pricing: "Pricing",
    login: "Login",
    signup: "Sign Up",
  }

  return (
    <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-foreground"
        aria-label="Go to homepage"
      >
        <Home className="h-4 w-4" />
      </Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`
        const isLast = index === paths.length - 1
        const label = breadcrumbLabels[path] || path

        return (
          <Fragment key={path}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className="transition-colors hover:text-foreground">
                {label}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
