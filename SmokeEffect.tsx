'use client'

import { useEffect, useState } from 'react'

interface SmokeParticle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

const SMOKE_COUNT = 5

export function SmokeEffect() {
  const [particles, setParticles] = useState<SmokeParticle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    setMounted(true)
    setParticles(
      Array.from({ length: SMOKE_COUNT }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,
        y: 50 + Math.random() * 40,
        size: 60 + Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
      }))
    )
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="smoke-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            marginLeft: `-${p.size / 2}px`,
            marginTop: `-${p.size / 2}px`,
            animation: `smokeFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
