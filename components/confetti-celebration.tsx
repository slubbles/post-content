"use client"

import { useEffect, useState } from "react"

interface ConfettiCelebrationProps {
  trigger: boolean
}

export function ConfettiCelebration({ trigger }: ConfettiCelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>(
    [],
  )

  useEffect(() => {
    if (trigger) {
      const colors = ["#f0ff5f", "#60a5fa", "#f97316", "#a855f7", "#22c55e"]
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
      }))
      setParticles(newParticles)

      setTimeout(() => setParticles([]), 2000)
    }
  }, [trigger])

  if (particles.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute h-2 w-2 animate-confetti rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
