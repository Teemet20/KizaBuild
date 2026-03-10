'use client'

/**
 * OurStorySection
 *
 * White two-column section on the /about page narrating Kiza's founding story.
 * Left side: portrait image. Right side: copy explaining the origin of Kiza,
 * plus two stat callouts (e.g. founding year, countries served).
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
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
      id="our-story"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="w-full aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden shadow-card-light order-first lg:order-first"
          >
            <img
              src="/solution_portrait.jpg"
              alt="Kiza team members"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Our Story
            </p>

            <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
              Our Journey: Born from Understanding
            </h2>

            <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed">
              Kiza was born from the heartfelt understanding of fragmented healthcare in Africa.
              Millions face hurdles to reliable care, especially those supporting families across borders.
            </p>

            <p className="mt-4 text-lg text-kiza-text-secondary-dark leading-relaxed">
              We saw this challenge and built Kiza: a dedicated, technology-driven platform
              committed to making healthcare simpler, more accessible, and truly trustworthy
              for everyone. Our unwavering focus is always on the people we serve, ensuring
              their well-being and peace of mind.
            </p>

            {/* Stat callout */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-kiza-gold pl-4">
                <p className="font-display font-bold text-3xl text-kiza-dark-blue">750+</p>
                <p className="text-sm text-kiza-text-secondary-dark mt-1">Verified hospitals across Nigeria</p>
              </div>
              <div className="border-l-2 border-kiza-cyan pl-4">
                <p className="font-display font-bold text-3xl text-kiza-dark-blue">3 min</p>
                <p className="text-sm text-kiza-text-secondary-dark mt-1">Average time to enroll a beneficiary</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
