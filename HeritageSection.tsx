'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { number: '137', label: 'Years of Craft', jp: '年' },
  { number: '72', label: 'Folding Layers', jp: '層' },
  { number: '11', label: 'Master Artisans', jp: '人' },
  { number: '∞', label: 'Generations', jp: '世代' },
]

export function HeritageSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="heritage"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #0a0a0b 0%, #111113 50%, #0a0a0b 100%)',
        padding: 'clamp(6rem, 12vh, 12rem) clamp(2rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Large kanji background watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Noto Serif JP, serif',
          fontSize: 'clamp(12rem, 22vw, 28rem)',
          fontWeight: 700,
          color: 'rgba(201,168,76,0.025)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        剣
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gap: 'clamp(3rem, 8vw, 10rem)',
          alignItems: 'center',
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left — text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: 'linear-gradient(to right, #c9a84c, transparent)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.4em',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                }}
              >
                Our Heritage
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#f0ede8',
                marginBottom: '2rem',
              }}
            >
              Born from
              <br />
              <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>fire and silence.</em>
            </h2>

            <p
              style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 300,
                lineHeight: 1.9,
                color: '#6b6b72',
                maxWidth: '460px',
                marginBottom: '3rem',
              }}
            >
              Each blade begins as tamahagane — the jewel steel — smelted for three days and 
              three nights. Folded seventy-two times. Quenched once. The hamon that emerges 
              is a fingerprint no two artisans can recreate.
            </p>

            <p
              style={{
                fontFamily: 'Cormorant, serif',
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                fontWeight: 300,
                lineHeight: 1.9,
                color: '#6b6b72',
                maxWidth: '460px',
              }}
            >
              Since 1887, the Hashinomichi atelier has supplied blades to Emperors, 
              martial institutions, and collectors who understand that a true katana is not 
              a weapon — it is a living philosophy.
            </p>
          </motion.div>
        </div>

        {/* Right — stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.12,
              }}
              style={{
                borderTop: '1px solid rgba(201,168,76,0.15)',
                paddingTop: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                    fontWeight: 300,
                    color: '#c9a84c',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontSize: '1rem',
                    color: 'rgba(201,168,76,0.5)',
                    fontWeight: 300,
                  }}
                >
                  {stat.jp}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  color: '#6b6b72',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
