"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface DocSection {
  id: string
  title: string
  subsections?: { id: string; title: string }[]
}

interface DocsSidebarProps {
  sections: DocSection[]
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const [activeSection, setActiveSection] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)

      section.subsections?.forEach((subsection) => {
        const subElement = document.getElementById(subsection.id)
        if (subElement) observer.observe(subElement)
      })
    })

    return () => observer.disconnect()
  }, [sections])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4">
      <div className="space-y-1">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => {
                scrollToSection(section.id)
                if (section.subsections) toggleSection(section.id)
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left",
                activeSection === section.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{section.title}</span>
              {section.subsections && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedSections.includes(section.id) && "rotate-90"
                  )}
                />
              )}
            </button>

            {section.subsections && expandedSections.includes(section.id) && (
              <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => scrollToSection(subsection.id)}
                    className={cn(
                      "block w-full px-3 py-1.5 text-xs rounded-md transition-colors text-left",
                      activeSection === subsection.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {subsection.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
