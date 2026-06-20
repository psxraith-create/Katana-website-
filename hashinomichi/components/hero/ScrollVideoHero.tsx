'use client'

import { useEffect, useRef, useState } from 'react'
import { CherryBlossoms } from '@/components/atmosphere/CherryBlossoms'
import { SmokeEffect } from '@/components/atmosphere/SmokeEffect'
import { CinematicOverlay } from '@/components/atmosphere/CinematicOverlay'
import { HeroTypography } from '@/components/hero/HeroTypography'

export function ScrollVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<any>(null)
  // Becomes true once the embedded video sequence has visually resolved
  // (faded to near-black, per the source clip) — this is the cue to bring
  // in the React-driven typography/atmosphere layer so the two never overlap.
  const [revealOverlay, setRevealOverlay] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [simplifiedMode, setSimplifiedMode] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    // Scroll-scrubbing a <video>'s currentTime is unreliable on mobile
    // Safari/Chrome (seeking is throttled/blocked without continuous user
    // gesture, and a 300%-tall pinned section fights with the address bar
    // show/hide resizing the viewport). Below the md breakpoint, play the
    // clip through normally instead and reveal the typography on a simple
    // timer keyed to its real duration.
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches
    setSimplifiedMode(isSmallScreen)
  }, [])

  useEffect(() => {
    if (!simplifiedMode) return
    const video = videoRef.current
    if (!video) return

    const onEnded = () => setRevealOverlay(true)
    video.addEventListener('ended', onEnded)
    // Safety fallback in case 'ended' never fires (e.g. autoplay blocked).
    const fallback = window.setTimeout(() => setRevealOverlay(true), 9000)

    return () => {
      video.removeEventListener('ended', onEnded)
      window.clearTimeout(fallback)
    }
  }, [simplifiedMode])

  useEffect(() => {
    if (reducedMotion || simplifiedMode) {
      // With reduced motion or on small/touch screens, skip scroll-scrubbing
      // entirely: play the clip once normally, then settle into the
      // typography layer (handled by the effects above).
      if (reducedMotion) setRevealOverlay(true)
      return
    }

    let ctx: any = null
    let localRevealOverlay = false

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const video = videoRef.current
      const container = containerRef.current
      if (!video || !container) return

      // Lenis (mounted by SmoothScrollProvider at the app root) already
      // drives gsap.ticker and keeps ScrollTrigger in sync — see
      // hooks/useLenis.ts. Nothing further to wire up here.
      gsap.ticker.lagSmoothing(0)

      const onMetadata = () => {
        const duration = video.duration || 8

        ctx = gsap.context(() => {
          // Drive currentTime through a tweened proxy rather than setting it
          // directly on every scroll tick — quickTo gives us inertia so the
          // seek requests are smoothed rather than firing on every pixel of
          // scroll, which avoids the stutter/dropped-frame seeking on most
          // browsers (especially mobile Safari/Chrome).
          const proxy = { time: 0 }
          const setTime = gsap.quickTo(proxy, 'time', {
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => {
              if (Number.isFinite(proxy.time)) {
                video.currentTime = proxy.time
              }
            },
          })

          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: '+=300%',
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            onUpdate: (self) => {
              setTime(self.progress * duration)
              // Reveal the React typography/atmosphere once the embedded
              // clip has substantially faded (its final ~12% is a fade to
              // near-black), so the handoff reads as one continuous beat
              // instead of two title cards fighting for attention.
              if (self.progress > 0.9 && !localRevealOverlay) {
                localRevealOverlay = true
                setRevealOverlay(true)
              } else if (self.progress <= 0.85 && localRevealOverlay) {
                localRevealOverlay = false
                setRevealOverlay(false)
              }
            },
          })
        }, container)
      }

      if (video.readyState >= 1) {
        onMetadata()
      } else {
        video.addEventListener('loadedmetadata', onMetadata, { once: true })
      }
    }

    init()

    return () => {
      if (ctx) ctx.revert()
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, simplifiedMode])

  return (
    <div
      ref={containerRef}
      className="scroll-video-container relative w-full"
      style={{
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0b',
      }}
    >
      {/* Full-viewport scroll-scrubbed video */}
      <video
        ref={videoRef}
        src="/katana.mp4"
        poster="/katana-poster.jpg"
        muted
        playsInline
        autoPlay={reducedMotion || simplifiedMode}
        loop={reducedMotion}
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Cinematic overlays & vignette — always present, frames the video */}
      <CinematicOverlay />

      {/* Atmosphere + typography layer: held back while the embedded video
          sequence is still showing its own title/petals/smoke, then faded
          in once that sequence resolves to black, so the two never double up. */}
      <div
        aria-hidden={!revealOverlay}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: revealOverlay ? 1 : 0,
          transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: revealOverlay ? 'auto' : 'none',
        }}
      >
        <SmokeEffect />
        <CherryBlossoms />
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 30 }}>
          <HeroTypography active={revealOverlay} />
        </div>
      </div>

      {/* Thin gold vertical accent line */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '8%',
          top: '15%',
          bottom: '15%',
          width: '1px',
          background:
            'linear-gradient(to bottom, transparent, rgba(201,168,76,0.25), rgba(201,168,76,0.08), transparent)',
          zIndex: 28,
        }}
        aria-hidden="true"
      />

      {/* Bottom brand mark */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between pointer-events-none"
        style={{
          zIndex: 35,
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 8vw, 8rem)',
        }}
      >
        <div
          style={{
            fontFamily: 'Cormorant SC, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: 'rgba(168,168,176,0.35)',
            fontWeight: 300,
          }}
        >
          © HASHINOMICHI JAPAN
        </div>
        <div
          style={{
            fontFamily: 'Noto Serif JP, serif',
            fontSize: '0.8rem',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.4)',
            letterSpacing: '0.2em',
          }}
        >
          橋の道
        </div>
      </div>
    </div>
  )
}
