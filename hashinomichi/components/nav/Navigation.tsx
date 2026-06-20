'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Heritage', href: '#heritage' },
  { label: 'Craft', href: '#craft' },
  { label: 'Collection', href: '#collection' },
  { label: 'Atelier', href: '#atelier' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', menuOpen)
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(1.2rem, 2.5vw, 2rem) clamp(1.5rem, 6vw, 6rem)',
          background:
            scrolled || menuOpen
              ? 'linear-gradient(to bottom, rgba(10,10,11,0.92) 0%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(10,10,11,0.5) 0%, transparent 100%)',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease',
        }}
        aria-label="Main navigation"
      >
        {/* Logo mark */}
        <a
          href="#top"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
          aria-label="Hashinomichi — back to top"
        >
          <span
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontWeight: 300,
              color: '#f0ede8',
              letterSpacing: '0.05em',
            }}
          >
            刃
          </span>
          <div
            style={{
              width: '1px',
              height: '20px',
              background: 'rgba(201,168,76,0.4)',
            }}
          />
          <span
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
              letterSpacing: '0.3em',
              color: '#c9a84c',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          >
            Hashinomichi
          </span>
        </a>

        {/* Links — hidden on mobile */}
        <div
          className="hidden md:flex"
          style={{ gap: 'clamp(1.5rem, 3vw, 3rem)', alignItems: 'center' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline"
              style={{
                fontFamily: 'Cormorant SC, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'rgba(212,212,220,0.7)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = '#c9a84c'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = 'rgba(212,212,220,0.7)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA — desktop only, mobile gets it in the drawer */}
        <motion.a
          href="#collection"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:inline-block"
          style={{
            fontFamily: 'Cormorant SC, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#0a0a0b',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            padding: '0.6rem 1.4rem',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 500,
            border: '1px solid rgba(201,168,76,0.6)',
            transition: 'all 0.3s ease',
          }}
        >
          Enquire
        </motion.a>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '6px',
            width: '32px',
            height: '32px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <motion.span
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 6 : 0,
            }}
            style={{ width: '100%', height: '1px', background: '#f0ede8', transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            style={{ width: '100%', height: '1px', background: '#f0ede8' }}
          />
          <motion.span
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -6 : 0,
            }}
            style={{ width: '100%', height: '1px', background: '#f0ede8', transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 75,
              background: 'rgba(10,10,11,0.97)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#f0ede8',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#collection"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant SC, serif',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#0a0a0b',
                background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                padding: '0.8rem 2rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginTop: '1rem',
              }}
            >
              Enquire
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
