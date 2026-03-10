'use client'

/**
 * HowItWorksHeroSection
 *
 * Full-viewport dark hero at the top of the /how-it-works page.
 * Headline: "Simple, Fast, Secure."
 * Includes a primary CTA linking to /plans.
 * Fades in on load (no ScrollTrigger — immediately visible on page entry).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HowItWorksHeroSection() {
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
    <section className="relative w-full min-h-[70vh] bg-kiza-dark-blue overflow-hidden flex items-center justify-center bg-gradient-radial">
      <div className="absolute top-1/3 left-1/3 w-[50vw] h-[40vw] bg-kiza-cyan/8 rounded-full blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-28 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
          How It Works
        </p>
        <h1 className="font-display font-bold text-display-1 text-white leading-[1.05]">
          Simple, Fast,{' '}
          <span className="text-gradient">Secure</span>.
        </h1>
        <p className="mt-8 text-lg lg:text-xl text-kiza-text-secondary leading-relaxed max-w-xl mx-auto">
          From your first click to your family member walking into a hospital with their
          Kiza card — the whole journey takes minutes, not weeks.
        </p>
        <div className="mt-10">
          <Button
            asChild
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
          >
            <Link href="/#plans">
              See our plans
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
