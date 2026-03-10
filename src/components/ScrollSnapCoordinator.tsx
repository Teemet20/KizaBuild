'use client'

/**
 * ScrollSnapCoordinator
 *
 * Invisible component rendered once on the home page (page.tsx).
 * Its job is to apply soft scroll-snapping to GSAP-pinned sections so the
 * page settles cleanly at the centre of each pinned panel rather than
 * stopping partway through.
 *
 * How it works:
 * 1. After a short delay (500 ms) it collects every active ScrollTrigger
 *    that has a `pin` set — these are the full-screen pinned sections.
 * 2. It calculates each pinned section's scroll range as a fraction of the
 *    total page scroll (0–1), so snapping is resolution-independent.
 * 3. A global ScrollTrigger with `snap` is created. The custom `snapTo`
 *    function only snaps when the scroll position is inside (or close to)
 *    a pinned range; unpinned content scrolls freely.
 * 4. On unmount all ScrollTrigger instances are killed to prevent memory
 *    leaks and stale triggers on hot-module replacement.
 *
 * The 500 ms delay allows section-level ScrollTriggers to register first,
 * since React renders child components before parent effects fire.
 */

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollSnapCoordinator() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Collect only pinned triggers, sorted by their start scroll position.
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)

      const maxScroll = ScrollTrigger.maxScroll(window)

      // If there's nothing to snap to, bail out early.
      if (!maxScroll || pinned.length === 0) return

      // Convert each pinned section's pixel range to a 0–1 scroll fraction.
      const pinnedRanges = pinned.map(st => ({
        start:  st.start / maxScroll,
        end:    (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      ScrollTrigger.create({
        snap: {
          /**
           * Only snap when the user is within ±2% of a pinned section's
           * range. Outside those ranges the scroll value is returned
           * unchanged, so free-scrolling sections behave normally.
           */
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            )
            if (!inPinned) return value

            // Snap to the centre of whichever pinned section is closest.
            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            )
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      })
    }, 500)

    return () => {
      clearTimeout(timer)
      // Kill all triggers to prevent stale state on HMR or page transitions.
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  // This component renders nothing — it's purely a side-effect coordinator.
  return null
}
