'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function AtelierSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section
      id="atelier"
      ref={ref}
      style={{
        background: 'linear-gradient(to bottom, #0d0d0f 0%, #0a0a0b 100%)',
        padding: 'clamp(6rem, 12vh, 12rem) clamp(1.5rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-8%',
          bottom: '-10%',
          fontFamily: 'Noto Serif JP, serif',
          fontSize: 'clamp(14rem, 26vw, 32rem)',
          fontWeight: 700,
          color: 'rgba(201,168,76,0.025)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        匠
      </div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gap: 'clamp(3rem, 8vw, 8rem)',
          position: 'relative',
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
              The Atelier
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#f0ede8',
              marginBottom: '2rem',
            }}
          >
            Begin a
            <br />
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>commission.</em>
          </h2>

          <p
            style={{
              fontFamily: 'Cormorant, serif',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#6b6b72',
              maxWidth: '440px',
              marginBottom: '2.5rem',
            }}
          >
            The atelier accepts a limited number of commissions each year.
            Tell us about the piece you envision, and a master artisan will
            respond within five business days.
          </p>

          <address
            style={{
              fontFamily: 'Cormorant SC, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: 'rgba(168,168,176,0.7)',
              lineHeight: 2,
              fontStyle: 'normal',
            }}
          >
            <div>SEKI, GIFU PREFECTURE, JAPAN</div>
            <div>
              <a href="mailto:atelier@hashinomichi.jp" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>
                ATELIER@HASHINOMICHI.JP
              </a>
            </div>
            <div>
              <a href="tel:+81575123456" className="link-underline" style={{ color: 'inherit', textDecoration: 'none' }}>
                +81 575 12 3456
              </a>
            </div>
          </address>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {submitted ? (
            <div
              role="status"
              style={{
                border: '1px solid rgba(201,168,76,0.25)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.4rem',
                  fontStyle: 'italic',
                  color: '#c9a84c',
                  marginBottom: '0.75rem',
                }}
              >
                Your enquiry has been received.
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant, serif',
                  fontSize: '1rem',
                  color: '#6b6b72',
                }}
              >
                A member of the atelier will write to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Field id="name" label="Full name" type="text" required />
              <Field id="email" label="Email address" type="email" required />
              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontFamily: 'Cormorant SC, serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    color: 'rgba(168,168,176,0.6)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Tell us about the piece
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#f0ede8',
                    fontFamily: 'Cormorant, serif',
                    fontSize: '1.05rem',
                    padding: '0.75rem 0',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '0.5rem',
                  fontFamily: 'Cormorant SC, serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: '#0a0a0b',
                  background: sending
                    ? 'rgba(201,168,76,0.5)'
                    : 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                  padding: '0.85rem 2.25rem',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  border: '1px solid rgba(201,168,76,0.6)',
                  cursor: sending ? 'wait' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {sending ? 'Sending…' : 'Submit Enquiry'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  type,
  required,
}: {
  id: string
  label: string
  type: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'Cormorant SC, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          color: 'rgba(168,168,176,0.6)',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(201,168,76,0.25)',
          color: '#f0ede8',
          fontFamily: 'Cormorant, serif',
          fontSize: '1.05rem',
          padding: '0.5rem 0',
          outline: 'none',
        }}
      />
    </div>
  )
}
