'use client'

/**
 * AboutHeroSection
 *
 * Full-viewport dark hero at the top of the /about page.
 * Headline: "Born from Understanding, Built for Impact."
 * Includes a scroll-down CTA and a secondary link to /plans.
 * Fades in on load (no ScrollTrigger — immediately visible on page entry).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function AboutHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen bg-kiza-dark-blue overflow-hidden flex items-center justify-center bg-gradient-radial">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-kiza-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-kiza-cyan/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6"
        >
          About Us
        </p>

        <h1
          ref={headlineRef}
          className="font-display font-bold text-display-1 text-white leading-[1.05]"
        >
          Born from Understanding,{' '}
          <span className="text-gradient">Built for Impact</span>.
        </h1>

        <p
          ref={bodyRef}
          className="mt-8 text-lg lg:text-xl text-kiza-text-secondary leading-relaxed max-w-2xl mx-auto"
        >
          Kiza was founded on a simple belief: every family deserves reliable healthcare,
          no matter where in the world they live or where their loved ones call home.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={scrollToStory}
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
          >
            Our story
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent group"
          >
            <Link href="/#plans">
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kiza-dark-blue to-transparent pointer-events-none" />
    </section>
  );
}
