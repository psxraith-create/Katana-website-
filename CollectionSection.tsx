'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pieces = [
  {
    jp: '雲龍',
    name: 'Unryū',
    meaning: 'Cloud Dragon',
    detail: 'Tamahagane · 68cm · Suguha hamon',
  },
  {
    jp: '静月',
    name: 'Seigetsu',
    meaning: 'Still Moon',
    detail: 'Tamahagane · 71cm · Notare hamon',
  },
  {
    jp: '紅葉',
    name: 'Kōyō',
    meaning: 'Autumn Leaves',
    detail: 'Tamahagane · 69cm · Gunome hamon',
  },
]

function BladeMark({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 200 420"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`blade-grad-${index}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1a1c" />
          <stop offset="45%" stopColor="#3a3a3e" />
          <stop offset="52%" stopColor="#e8e4dc" />
          <stop offset="58%" stopColor="#3a3a3e" />
          <stop offset="100%" stopColor="#1a1a1c" />
        </linearGradient>
      </defs>
      <path
        d="M100 10 L112 280 L106 380 L100 410 L94 380 L88 280 Z"
        fill={`url(#blade-grad-${index})`}
        opacity="0.9"
      />
      <line x1="100" y1="20" x2="100" y2="380" stroke="rgba(201,168,76,0.18)" strokeWidth="0.5" />
    </svg>
  )
}

export function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="collection"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #0a0a0b 0%, #0d0d0f 100%)',
        padding: 'clamp(6rem, 12vh, 12rem) clamp(1.5rem, 8vw, 8rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 8vh, 6rem)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
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
                The Collection
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#f0ede8',
              }}
            >
              Three blades,
              <br />
              <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>one philosophy.</em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'Cormorant, serif',
              fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#6b6b72',
              maxWidth: '380px',
            }}
          >
            Each piece is made to order. From first hammer-fall to final
            polish, an atelier commission takes nine to fourteen months.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}
        >
          {pieces.map((piece, i) => (
            <motion.div
              key={piece.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 }}
            >
              <div
                className="img-mask"
                style={{
                  aspectRatio: '3 / 4',
                  background: 'linear-gradient(160deg, #14141600 0%, #1a1a1c 100%)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem 3.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <BladeMark index={i} />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                    fontWeight: 400,
                    color: '#f0ede8',
                  }}
                >
                  {piece.name}
                </h3>
                <span
                  style={{
                    fontFamily: 'Noto Serif JP, serif',
                    fontSize: '1.1rem',
                    color: 'rgba(201,168,76,0.5)',
                    fontWeight: 300,
                  }}
                >
                  {piece.jp}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Cormorant, serif',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: '#a8a8b0',
                  marginBottom: '0.5rem',
                }}
              >
                {piece.meaning}
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#6b6b72',
                  textTransform: 'uppercase',
                }}
              >
                {piece.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
