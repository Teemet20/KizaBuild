'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';


interface IntroductionSectionProps {
  className?: string;
}

export default function IntroductionSection({ className = '' }: IntroductionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full py-24 lg:py-32 bg-white overflow-hidden ${className}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-kiza-purple/5 to-transparent" />
      
      <div className="relative px-6 lg:px-[10vw]">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
            The "Why"
          </p>

          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue mb-8">
            Distance Shouldn't Mean{' '}
            <span className="text-gradient">Disconnection</span>
          </h2>

          <div className="space-y-6 text-lg text-kiza-text-secondary-dark leading-relaxed">
            <p>
              At Kiza, we understand the challenges of getting reliable healthcare in Africa.
              We're a trusted platform dedicated to making health coverage simpler, more accessible,
              and truly dependable for everyone.
            </p>
            <p>
              <span className="text-kiza-dark-blue font-medium">We believe in providing peace of mind</span>—knowing your loved ones are cared for,{' '}
              <span className="text-kiza-gold">no matter where you are.</span>
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-bold text-kiza-gold">750+</p>
              <p className="mt-2 text-sm text-kiza-text-secondary-dark">Verified Hospitals</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-bold text-kiza-cyan">$30</p>
              <p className="mt-2 text-sm text-kiza-text-secondary-dark">Starting per month</p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-bold text-kiza-purple">3</p>
              <p className="mt-2 text-sm text-kiza-text-secondary-dark">Minutes to enroll</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
