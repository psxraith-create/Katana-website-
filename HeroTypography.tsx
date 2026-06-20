'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
}

const subtleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
}

interface HeroTypographyProps {
  /** Controls whether the reveal animation plays. Defaults to true so the
   * component still works if mounted standalone. */
  active?: boolean
}

export function HeroTypography({ active = true }: HeroTypographyProps) {
  return (
    <motion.div
      className="relative z-30 flex flex-col items-start justify-center w-full md:max-w-[55%]"
      style={{
        paddingLeft: 'clamp(1.5rem, 8vw, 8rem)',
        paddingRight: 'clamp(1.5rem, 8vw, 8rem)',
        paddingTop: 'clamp(2rem, 5vh, 6rem)',
      }}
      variants={containerVariants}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
    >
      {/* Eyebrow — Japanese craft mark */}
      <motion.div
        variants={subtleVariants}
        className="flex items-center gap-3 mb-4 md:mb-6"
      >
        <div
          style={{
            width: '28px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #c9a84c)',
          }}
        />
        <span
          style={{
            fontFamily: 'Cormorant SC, serif',
            fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
            letterSpacing: '0.3em',
            color: '#c9a84c',
            fontWeight: 300,
          }}
        >
          TAMAHAGANE FORGED · SINCE 1887
        </span>
      </motion.div>

      {/* Japanese Title */}
      <motion.h1
        variants={itemVariants}
        style={{
          fontFamily: 'Noto Serif JP, serif',
          fontSize: 'clamp(3.5rem, 16vw, 14rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 0.9,
          color: '#f0ede8',
          textShadow: '0 0 80px rgba(201,168,76,0.12), 0 2px 40px rgba(0,0,0,0.8)',
          writingMode: 'horizontal-tb',
          userSelect: 'none',
        }}
      >
        刃の道
      </motion.h1>

      {/* Separator line */}
      <motion.div
        variants={lineVariants}
        style={{
          width: 'clamp(100px, 20vw, 240px)',
          height: '1px',
          background: 'linear-gradient(to right, #c9a84c, transparent)',
          marginTop: 'clamp(1rem, 2.5vw, 2rem)',
          marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
          transformOrigin: 'left center',
        }}
        aria-hidden="true"
      />

      {/* English subtitle */}
      <motion.p
        variants={itemVariants}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(0.9rem, 2.2vw, 2rem)',
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: '#a8a8b0',
          textTransform: 'uppercase',
          fontStyle: 'italic',
          lineHeight: 1.2,
          textShadow: '0 1px 20px rgba(0,0,0,0.6)',
          userSelect: 'none',
        }}
      >
        The Way of the Blade
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        variants={subtleVariants}
        className="flex items-center gap-3 mt-10 md:mt-16"
        style={{ marginTop: 'clamp(1.5rem, 6vh, 5rem)' }}
      >
        <ScrollCue />
      </motion.div>
    </motion.div>
  )
}

function ScrollCue() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span
        style={{
          fontFamily: 'Cormorant SC, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          color: 'rgba(168,168,176,0.5)',
          fontWeight: 400,
        }}
      >
        SCROLL TO REVEAL
      </span>
      <div className="flex items-center gap-2">
        <motion.div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #c9a84c, transparent)',
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
