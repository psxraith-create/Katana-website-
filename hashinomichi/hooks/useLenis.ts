'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    __lenis?: any
  }
}

export function useLenis() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Respect reduced-motion preference: skip the custom easing entirely and
    // fall back to native scroll behavior.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let lenis: any = null
    let cancelled = false
    let onAnchorClick: ((e: MouseEvent) => void) | null = null
    let tickerFn: ((time: number) => void) | null = null
    let gsapRef: any = null

    const initLenis = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('@studio-freight/lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      gsapRef = gsap

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis
      // Exposed so other scroll-driven components (e.g. the GSAP
      // ScrollTrigger-based hero) can subscribe to the same scroll source
      // instead of fighting it for control of the page position.
      window.__lenis = lenis

      // Keep ScrollTrigger's internal scroll position in sync with Lenis's
      // virtualized scroll on every Lenis scroll tick.
      lenis.on('scroll', ScrollTrigger.update)

      // Drive Lenis from GSAP's own ticker rather than a separate
      // requestAnimationFrame loop — this is the integration pattern Lenis
      // documents for ScrollTrigger, and it avoids the forced-reflow/jitter
      // that comes from two independent rAF loops both touching scroll
      // position on the same frame.
      tickerFn = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)

      // Route in-page anchor clicks (nav, footer, CTAs) through Lenis so
      // they animate with the same easing as the rest of the page instead
      // of the browser's native instant jump. External links, mailto:,
      // tel:, and links with modifier keys (new-tab intent) are untouched.
      onAnchorClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

        const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
        if (!target) return

        const hash = target.getAttribute('href')
        if (!hash || hash === '#') return

        if (hash === '#top') {
          e.preventDefault()
          lenis.scrollTo(0, { duration: 1.4 })
          return
        }

        const destination = document.querySelector(hash)
        if (destination) {
          e.preventDefault()
          lenis.scrollTo(destination as HTMLElement, { duration: 1.4, offset: -80 })
        }
      }
      document.addEventListener('click', onAnchorClick)

      // Recalculate all ScrollTrigger positions now that Lenis is driving
      // scroll — triggers created before this point (e.g. the hero's pin)
      // may have measured against the pre-Lenis scroll state.
      ScrollTrigger.refresh()
    }

    initLenis()

    return () => {
      cancelled = true
      if (onAnchorClick) document.removeEventListener('click', onAnchorClick)
      if (gsapRef && tickerFn) gsapRef.ticker.remove(tickerFn)
      if (lenis) {
        lenis.destroy()
      }
      if (window.__lenis === lenis) {
        window.__lenis = undefined
      }
    }
  }, [])

  return lenisRef
}
