'use client'

/**
 * StoriesHeroSection
 *
 * Full-viewport dark hero at the top of the /stories page.
 * Headline: "Transforming Lives, One Family at a Time."
 * Fades in on load (no ScrollTrigger — immediately visible on page entry).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function StoriesHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[58vh] bg-kiza-dark-blue overflow-hidden flex items-center justify-center bg-gradient-radial">
      <div className="absolute top-1/3 left-1/4 w-[45vw] h-[35vw] bg-kiza-cyan/7 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[25vw] bg-kiza-gold/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-28 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
          Stories of Impact
        </p>
        <h1 className="font-display font-bold text-display-1 text-white leading-[1.05]">
          Transforming Lives,{' '}
          <span className="text-gradient">One Family at a Time</span>.
        </h1>
        <p className="mt-8 text-lg text-kiza-text-secondary leading-relaxed max-w-2xl mx-auto">
          The heart of Kiza is the impact we make on families. Read real stories from
          members who replaced worry with certainty — and the families who felt the difference.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
