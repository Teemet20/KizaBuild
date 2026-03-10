'use client'

/**
 * ContactHeroSection
 *
 * Full-viewport dark hero at the top of the /contact page.
 * Headline: "We're here to help."
 * Fades in on load (no ScrollTrigger — immediately visible on page entry).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function ContactHeroSection() {
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
    <section className="relative w-full min-h-[52vh] bg-kiza-dark-blue overflow-hidden flex items-center justify-center bg-gradient-radial">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[35vw] bg-kiza-gold/6 rounded-full blur-[130px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-2xl mx-auto pt-28 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
          Contact Us
        </p>
        <h1 className="font-display font-bold text-display-1 text-white leading-[1.05]">
          We're here{' '}
          <span className="text-gradient">to help</span>.
        </h1>
        <p className="mt-8 text-lg text-kiza-text-secondary leading-relaxed">
          Have questions, need support, or just want to learn more?
          Our caring team is ready to assist you — wherever you are in the world.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
