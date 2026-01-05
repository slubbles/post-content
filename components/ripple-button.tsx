"use client"

import type React from "react"

import { useState, type MouseEvent } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface RippleButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function RippleButton({ children, onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = { x, y, id: Date.now() }
    setRipples([...ripples, newRipple])

    setTimeout(() => {
      setRipples((current) => current.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.(e)
  }

  return (
    <Button {...props} onClick={handleClick} className={`relative overflow-hidden ${props.className || ""}`}>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
      {children}
    </Button>
  )
}
