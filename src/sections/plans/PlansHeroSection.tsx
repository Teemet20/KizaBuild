'use client'

/**
 * PlansHeroSection
 *
 * Full-viewport dark hero at the top of the /plans page.
 * Headline: "Tailored Coverage for Every Family."
 * Includes two trust-signal pills (cashless care, cancel anytime).
 * Fades in on load (no ScrollTrigger — immediately visible on page entry).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Shield, Clock } from 'lucide-react';

export default function PlansHeroSection() {
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
    <section className="relative w-full min-h-[65vh] bg-kiza-dark-blue overflow-hidden flex items-center justify-center bg-gradient-radial">
      <div className="absolute top-1/3 right-1/4 w-[45vw] h-[35vw] bg-kiza-gold/6 rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-28 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
          Plans & Coverage
        </p>
        <h1 className="font-display font-bold text-display-1 text-white leading-[1.05]">
          Tailored Coverage for{' '}
          <span className="text-gradient">Every Family</span>.
        </h1>
        <p className="mt-8 text-lg lg:text-xl text-kiza-text-secondary leading-relaxed max-w-xl mx-auto">
          Two plans. Clear pricing. No hidden fees. Choose the level of care your family
          deserves — and change it anytime.
        </p>

        {/* Trust pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 text-sm text-kiza-text-secondary">
            <Clock className="w-4 h-4 text-kiza-gold" />
            Takes 3 minutes to enroll
          </div>
          <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 text-sm text-kiza-text-secondary">
            <Shield className="w-4 h-4 text-kiza-cyan" />
            Coverage starts immediately
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
