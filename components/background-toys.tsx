"use client"

import { useEffect, useState, useCallback } from "react"
import type { JSX } from "react/jsx-runtime"

interface ToyElement {
  id: number
  left: number
  top: number
  rotation: number
  scale: number
  opacity: number
  speed: number
  type: string
  color: string
}

const ToyIcons: Record<string, JSX.Element> = {
  balloon: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <ellipse cx="32" cy="22" rx="18" ry="22" opacity="0.6" />
      <path d="M32 44 Q28 50 32 58" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M28 44 Q24 46 32 44 Q40 46 36 44" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
    </svg>
  ),
  balloonRound: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <circle cx="32" cy="26" r="20" opacity="0.55" />
      <path d="M32 46 Q29 52 32 60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  ),
  question: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <text x="32" y="48" fontSize="48" textAnchor="middle" opacity="0.5" fontFamily="serif" fontWeight="bold">?</text>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 4 L38 24 L58 24 L42 38 L48 58 L32 46 L16 58 L22 38 L6 24 L26 24 Z" opacity="0.5" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 8 L34 28 L54 32 L34 36 L32 56 L30 36 L10 32 L30 28 Z" opacity="0.5" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 54 L8 30 A16 16 0 0 1 32 14 A16 16 0 0 1 56 30 Z" opacity="0.55" />
    </svg>
  ),
  confetti: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <rect x="10" y="10" width="10" height="10" rx="2" opacity="0.5" transform="rotate(20 15 15)" />
      <rect x="42" y="8" width="8" height="8" rx="1" opacity="0.45" transform="rotate(-15 46 12)" />
      <rect x="8" y="44" width="9" height="9" rx="2" opacity="0.5" transform="rotate(30 12 48)" />
      <rect x="44" y="44" width="10" height="10" rx="2" opacity="0.45" transform="rotate(-25 49 49)" />
      <circle cx="32" cy="14" r="5" opacity="0.5" />
      <circle cx="16" cy="32" r="4" opacity="0.4" />
      <circle cx="48" cy="32" r="5" opacity="0.45" />
      <circle cx="32" cy="50" r="4" opacity="0.4" />
    </svg>
  ),
  ribbon: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 32 Q20 20 12 12 Q20 16 32 24 Q44 16 52 12 Q44 20 32 32Z" opacity="0.5" />
      <path d="M32 32 Q20 44 12 52 Q20 48 32 40 Q44 48 52 52 Q44 44 32 32Z" opacity="0.5" />
      <circle cx="32" cy="32" r="4" opacity="0.6" />
    </svg>
  ),
  bottle: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <rect x="20" y="4" width="24" height="8" rx="2" opacity="0.4" />
      <path d="M18 12 h28 l4 12 v32 a4 4 0 01-4 4 H18 a4 4 0 01-4-4 V24 z" opacity="0.5" />
      <rect x="22" y="20" width="20" height="2" opacity="0.3" />
    </svg>
  ),
  pacifier: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <ellipse cx="32" cy="40" rx="20" ry="16" opacity="0.5" />
      <circle cx="32" cy="38" r="8" opacity="0.3" />
      <circle cx="32" cy="16" r="10" opacity="0.4" />
    </svg>
  ),
  onesie: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M16 8 L8 20 L16 24 L16 56 L48 56 L48 24 L56 20 L48 8 L40 16 L24 16 Z" opacity="0.5" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 64 64" fill="currentColor">
      <path d="M40 8 A24 24 0 1 0 40 56 A20 20 0 1 1 40 8" opacity="0.5" />
    </svg>
  ),
}

const PINK = "#e879a0"
const BLUE = "#60a5fa"

export function BackgroundToys() {
  const [toys, setToys] = useState<ToyElement[]>([])
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const toyTypes = Object.keys(ToyIcons)

    const newToys: ToyElement[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 400,
      rotation: Math.random() * 360,
      scale: 0.4 + Math.random() * 0.8,
      opacity: 0.04 + Math.random() * 0.06,
      speed: 0.1 + Math.random() * 0.4,
      type: toyTypes[Math.floor(Math.random() * toyTypes.length)],
      color: i % 2 === 0 ? PINK : BLUE,
    }))
    setToys(newToys)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {toys.map((toy) => (
        <div
          key={toy.id}
          className="absolute transition-transform duration-75"
          style={{
            left: `${toy.left}%`,
            top: `calc(${toy.top}% + ${scrollY * toy.speed}px)`,
            transform: `rotate(${toy.rotation + scrollY * 0.02}deg) scale(${toy.scale})`,
            opacity: toy.opacity,
            width: "80px",
            height: "80px",
            color: toy.color,
          }}
        >
          {ToyIcons[toy.type]}
        </div>
      ))}
    </div>
  )
}
