'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    n: '01',
    jp: '玉鋼',
    title: 'Smelting the tamahagane',
    body: 'Iron sand and charcoal are layered into a clay tatara furnace and fired for three days and three nights, yielding a bloom of jewel steel of varying carbon content.',
  },
  {
    n: '02',
    jp: '折り返し鍛錬',
    title: 'Folding, seventy-two times',
    body: 'The steel is hammered flat, folded, and welded again and again, expelling impurities and laminating thousands of microscopic layers into the blade.',
  },
  {
    n: '03',
    jp: '土置き',
    title: 'Clay tempering line',
    body: 'A precise mixture of clay, ash, and powdered stone is brushed along the spine, thinner near the edge — the asymmetry that gives the hamon its character.',
  },
  {
    n: '04',
    jp: '焼き入れ',
    title: 'The single quench',
    body: 'Heated to a precise glow and plunged into water once. The edge cools faster than the spine, curving the blade and crystallizing the hamon forever.',
  },
  {
    n: '05',
    jp: '研ぎ',
    title: 'Polishing, by hand',
    body: 'A sequence of progressively finer stones, over two weeks, reveals the steel\u2019s grain and the hamon\u2019s pattern — work that cannot be rushed without ruining it.',
  },
]

export function CraftSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="craft"
      ref={ref}
      style={{
        background: '#0a0a0b',
        padding: 'clamp(6rem, 12vh, 12rem) clamp(1.5rem, 8vw, 8rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 8vh, 6rem)', maxWidth: '620px' }}
        >
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
              The Craft
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
            Five stages,
            <br />
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>two months.</em>
          </h2>
        </motion.div>

        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'clamp(1.25rem, 3vw, 3rem)',
                padding: 'clamp(1.75rem, 4vh, 2.75rem) 0',
                borderTop: i === 0 ? '1px solid rgba(201,168,76,0.15)' : 'none',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                alignItems: 'start',
              }}
            >
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  color: 'rgba(201,168,76,0.4)',
                  lineHeight: 1,
                  minWidth: '2.5ch',
                }}
                aria-hidden="true"
              >
                {step.n}
              </span>

              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                      fontWeight: 400,
                      color: '#f0ede8',
                    }}
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'Noto Serif JP, serif',
                      fontSize: '0.9rem',
                      color: 'rgba(201,168,76,0.5)',
                      fontWeight: 300,
                    }}
                  >
                    {step.jp}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'Cormorant, serif',
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: '#6b6b72',
                    maxWidth: '620px',
                  }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
