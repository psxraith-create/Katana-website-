'use client'

export function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0b',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: 'clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 8vw, 8rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'Noto Serif JP, serif',
              fontSize: '1rem',
              fontWeight: 300,
              color: '#f0ede8',
            }}
          >
            刃
          </span>
          <div style={{ width: '1px', height: '16px', background: 'rgba(201,168,76,0.4)' }} />
          <span
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.7)',
              textTransform: 'uppercase',
            }}
          >
            Hashinomichi
          </span>
        </div>

        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', gap: 'clamp(1.25rem, 3vw, 2.5rem)', flexWrap: 'wrap' }}
        >
          {[
            { label: 'Heritage', href: '#heritage' },
            { label: 'Craft', href: '#craft' },
            { label: 'Collection', href: '#collection' },
            { label: 'Atelier', href: '#atelier' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline"
              style={{
                fontFamily: 'Cormorant SC, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(168,168,176,0.6)',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p
          style={{
            fontFamily: 'Cormorant SC, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(168,168,176,0.35)',
          }}
        >
          © {new Date().getFullYear()} Hashinomichi Japan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
