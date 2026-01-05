"use client"

import type React from "react"

import { Card, type CardProps } from "@/components/ui/card"

interface ShimmerCardProps extends CardProps {
  children: React.ReactNode
}

export function ShimmerCard({ children, className, ...props }: ShimmerCardProps) {
  return (
    <Card
      {...props}
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${className || ""}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {children}
    </Card>
  )
}
