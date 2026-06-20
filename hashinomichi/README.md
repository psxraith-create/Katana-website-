# Hashinomichi — 刃の道

A premium, cinematic marketing site for a Japanese katana atelier. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP/ScrollTrigger, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, skip link, film grain overlay
  page.tsx             Assembles the full page
  globals.css          Design tokens, keyframes, utility classes
components/
  nav/Navigation.tsx           Sticky nav with mobile drawer
  hero/
    ScrollVideoHero.tsx        Full-viewport scroll-scrubbed hero video
    HeroTypography.tsx         Reveal typography shown after the hero clip resolves
  atmosphere/
    CinematicOverlay.tsx       Vignette/gradient layers over the hero video
    SmokeEffect.tsx            Ambient smoke particles
    CherryBlossoms.tsx         Falling petal particles
  sections/
    HeritageSection.tsx        Brand story + stats
    CraftSection.tsx           Five-stage forging process
    CollectionSection.tsx      Product lineup
    AtelierSection.tsx         Commission enquiry form
  footer/Footer.tsx
  providers/SmoothScrollProvider.tsx   Mounts Lenis at the app root
hooks/useLenis.ts        Lenis instance + GSAP ticker sync + anchor-link routing
public/
  katana.mp4             Hero background video
  katana-poster.jpg       Poster frame (shown before the video can play)
```

## Notable implementation decisions

**Hero video and typography never overlap.** The source video already contains
its own animated title card, petals, and smoke, fading to black in its last
~10%. Rather than layering a second, independent title on top for the entire
scroll-scrub (which produced visibly doubled text and effects), the
React-driven `HeroTypography`/`CherryBlossoms`/`SmokeEffect` layer stays
hidden until `ScrollTrigger` reports the clip has substantially faded, then
cross-fades in. The handoff reads as one continuous beat instead of two
competing title cards.

**Three motion tiers**, selected automatically:
- **Desktop/tablet (pointer devices, ≥768px):** full GSAP ScrollTrigger pin +
  scroll-scrubbed video, smoothed through a `quickTo` proxy rather than
  setting `video.currentTime` directly on every tick (avoids seek-induced
  stutter).
- **Mobile (<768px):** scroll-scrubbing a video's `currentTime` is unreliable
  on mobile Safari/Chrome, and a 300%-tall pinned section fights with the
  address-bar show/hide viewport resize. Instead the clip autoplays once
  through normally and the typography reveals on the `ended` event (with a
  9s timeout fallback in case autoplay is blocked).
- **`prefers-reduced-motion: reduce`:** no scroll-jacking at all — the video
  loops gently in the background and the typography is shown immediately.

**Lenis + GSAP ScrollTrigger integration** follows the pattern documented by
the Lenis maintainers: Lenis is driven by `gsap.ticker` (not a separate
`requestAnimationFrame` loop) and `lenis.on('scroll', ScrollTrigger.update)`
keeps trigger positions in sync, avoiding the one-to-two-frame lag that comes
from two independent rAF loops both touching scroll position.

**In-page navigation** (nav links, footer links, the "Enquire" CTA) is routed
through `lenis.scrollTo` so anchor jumps animate with the same easing as the
rest of the page, instead of the browser's native instant jump.

**Accessibility:** skip-to-content link, semantic sectioning, visible focus
rings, `prefers-reduced-motion` support throughout (including disabling the
particle effects entirely), and a real `<form>` with labeled fields in the
Atelier section.

## Known limitations

- The enquiry form in `AtelierSection.tsx` simulates submission client-side.
  Wire `handleSubmit` to a real API route or third-party form service when
  one is available.
- Product imagery in `CollectionSection.tsx` uses CSS/SVG-rendered blade
  motifs rather than photography — swap in real product photos when
  available (the `img-mask` hover utility class in `globals.css` is already
  set up for `<img>` or `<video>` children).
