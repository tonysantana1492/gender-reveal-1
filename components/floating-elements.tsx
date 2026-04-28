"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
  type: "star" | "bubble" | "heart"
  color: "pink" | "blue"
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const types: FloatingElement["type"][] = ["star", "bubble", "heart"]

    const newElements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 8 + Math.random() * 16,
      opacity: 0.1 + Math.random() * 0.2,
      type: types[Math.floor(Math.random() * types.length)],
      color: i % 2 === 0 ? "pink" : "blue",
    }))
    setElements(newElements)
  }, [])

  const renderElement = (el: FloatingElement) => {
    const colorClass = el.color === "pink" ? "text-pink-400" : "text-blue-400"
    const bubbleClass = el.color === "pink"
      ? "border-pink-400 bg-pink-400/10"
      : "border-blue-400 bg-blue-400/10"

    switch (el.type) {
      case "bubble":
        return (
          <div
            className={`rounded-full border-2 ${bubbleClass}`}
            style={{
              width: el.size,
              height: el.size,
              opacity: el.opacity,
            }}
          />
        )
      case "heart":
        return (
          <svg
            width={el.size}
            height={el.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={colorClass}
            style={{ opacity: el.opacity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )
      default:
        return (
          <svg
            width={el.size}
            height={el.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={colorClass}
            style={{ opacity: el.opacity }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float"
          style={{
            left: `${el.left}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          {renderElement(el)}
        </div>
      ))}

      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-300/5 blur-3xl" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-blue-300/5 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-pink-300/5 blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-blue-300/5 blur-3xl" />

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
