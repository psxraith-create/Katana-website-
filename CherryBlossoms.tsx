'use client'

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  driftX: number
  driftR: number
  opacity: number
  hue: number
}

const PETAL_COUNT = 8

function generatePetal(id: number): Petal {
  return {
    id,
    x: Math.random() * 100,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 16,
    duration: 14 + Math.random() * 10,
    driftX: (Math.random() - 0.5) * 120,
    driftR: 360 + Math.random() * 360,
    opacity: 0.4 + Math.random() * 0.4,
    hue: Math.random() * 20 - 10, // slight hue variation
  }
}

export function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    setMounted(true)
    setPetals(Array.from({ length: PETAL_COUNT }, (_, i) => generatePetal(i)))
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.x}%`,
            top: '-5vh',
            width: `${petal.size}px`,
            height: `${petal.size * 0.7}px`,
            '--drift-x': `${petal.driftX}px`,
            '--drift-r': `${petal.driftR}deg`,
            animation: `petalFall ${petal.duration}s ease-in ${petal.delay}s infinite`,
          } as React.CSSProperties}
        >
          <PetalShape opacity={petal.opacity} hue={petal.hue} gradientId={`pg-${petal.id}`} />
        </div>
      ))}
    </div>
  )
}

function PetalShape({
  opacity,
  hue,
  gradientId,
}: {
  opacity: number
  hue: number
  gradientId: string
}) {
  return (
    <svg
      viewBox="0 0 20 14"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', opacity }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={`hsl(${340 + hue}, 60%, 92%)`} />
          <stop offset="60%" stopColor={`hsl(${335 + hue}, 55%, 82%)`} />
          <stop offset="100%" stopColor={`hsl(${330 + hue}, 45%, 72%)`} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <ellipse
        cx="10"
        cy="7"
        rx="9"
        ry="6"
        fill={`url(#${gradientId})`}
        style={{ filter: 'blur(0.2px)' }}
      />
      <path
        d="M10 1 Q11 7 10 13"
        stroke={`hsl(${330 + hue}, 40%, 70%)`}
        strokeWidth="0.3"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}
