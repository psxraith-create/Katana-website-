'use client'

import { useLenis } from '@/hooks/useLenis'

/**
 * Mounts Lenis smooth-scroll for the page. Rendered once near the root —
 * it has no visual output, it just activates the `useLenis` side effect
 * for as long as it stays mounted.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis()
  return <>{children}</>
}
