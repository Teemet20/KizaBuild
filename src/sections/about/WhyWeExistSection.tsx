'use client'

/**
 * WhyWeExistSection
 *
 * Dark centred section on the /about page articulating Kiza's mission.
 * Two value-proposition cards side-by-side: one for the diaspora member
 * (peace of mind abroad) and one for the family back home (access to care).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function WhyWeExistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-kiza-dark-blue overflow-hidden bg-gradient-radial"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-kiza-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-4xl mx-auto text-center">
        <div ref={contentRef}>
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Our Purpose
          </p>

          <h2 className="font-display font-bold text-display-2 text-white leading-[1.1]">
            Democratizing{' '}
            <span className="text-gradient">Health in Africa</span>
          </h2>

          <p className="mt-8 text-lg lg:text-xl text-kiza-text-secondary leading-relaxed">
            Kiza exists to make quality health insurance accessible to everyone in Africa.
            We are driven by a passion to make healthcare affordable and straightforward
            for both the diaspora and local communities who deserve reliable care without
            financial stress or confusing paperwork.
          </p>

          {/* Two-column value statements */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-kiza-cyan mb-4">
                For the Diaspora
              </p>
              <h3 className="font-display font-semibold text-xl text-white mb-3">
                Control from anywhere
              </h3>
              <p className="text-kiza-text-secondary leading-relaxed">
                Manage your family's health coverage from London, Houston, or Toronto.
                Real-time visibility. Zero guesswork. One steady monthly payment.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
                For Local Communities
              </p>
              <h3 className="font-display font-semibold text-xl text-white mb-3">
                Dignity at the door
              </h3>
              <p className="text-kiza-text-secondary leading-relaxed">
                Walk into any of 750+ verified hospitals with your Kiza card.
                No cash, no hassle. Care delivered with dignity, every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
