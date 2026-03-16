'use client'

/**
 * HeroSection  (home page)
 *
 * Full-viewport opening section of the home page. Contains the primary
 * headline, sub-copy, trust pills (Shield, Globe), and the main CTA.
 * Animates in on load without ScrollTrigger since it is the first thing
 * visitors see.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Globe } from 'lucide-react';


interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;

    if (!section || !portrait || !headline || !subhead || !cta || !trust) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      // Auto-play entrance animation on load (all screen sizes)
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(portrait,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(headline.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          '-=0.6'
        )
        .fromTo([subhead, cta],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(trust,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );

      // Scroll-driven exit animation — desktop only
      const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([portrait, headline, subhead, cta, trust], {
                opacity: 1, x: 0, y: 0
              });
            }
          }
        });

        scrollTl
          .fromTo(portrait,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(headline,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo([subhead, cta],
            { y: 0, opacity: 1 },
            { y: '6vh', opacity: 0, ease: 'power2.in' },
            0.75
          )
          .fromTo(trust,
            { opacity: 1 },
            { opacity: 0, ease: 'power2.in' },
            0.7
          );
    }, section);

    return () => ctx.revert();
    });
    // Mobile: load-time entrance animation (hero is always above the fold — no ScrollTrigger needed)
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const mobile = section.querySelector('.lg\\:hidden');
        if (!mobile) return;
        const textBlock = mobile.querySelector('.px-6');
        if (!textBlock) return;
        gsap.from(Array.from(textBlock.children), {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.3,
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen lg:h-screen bg-white overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-light" />
      {/* Cyan glow accent behind portrait */}
      <div className="absolute left-0 top-0 lg:top-[8vh] w-full lg:w-[44vw] h-[50vh] lg:h-[84vh] bg-kiza-cyan/8 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile layout */}
      <div className="relative lg:hidden flex flex-col pt-20">
        <div
          ref={portraitRef}
          className="w-full h-[75vw] max-h-[480px] overflow-hidden"
        >
          <img
            src="/hero_portrait.jpg"
            alt="Kiza Healthcare"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <div ref={headlineRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              The Care Membership
            </p>
            <h1 className="font-display font-bold text-[clamp(2rem,8vw,3.5rem)] leading-[1.1] text-kiza-dark-blue">
              <span className="block">For the Global</span>
              <span className="block mt-2">African Family</span>
            </h1>
          </div>
          <p
            ref={subheadRef}
            className="mt-5 text-base text-kiza-text-secondary-dark leading-relaxed"
          >
            Reliable, affordable health coverage for your family back home. Delivered with care, verified by technology.
          </p>
          <div ref={ctaRef} className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => scrollToSection('plans')}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('how-it-works')}
              className="bg-white border border-kiza-cyan/40 text-kiza-cyan hover:bg-kiza-cyan/5 hover:text-kiza-cyan rounded-full px-8 py-6 text-base font-semibold"
            >
              See how it works
            </Button>
          </div>
          <div ref={trustRef} className="mt-8 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-kiza-gold" />
              <span className="text-xs text-kiza-text-secondary-dark">Licensed Tier-1 Insurers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-kiza-cyan" />
              <span className="text-xs text-kiza-text-secondary-dark">Trusted in UK, US & Canada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        {/* Left Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card-light ring-1 ring-kiza-cyan/30"
        >
          <img
            src="/hero_portrait.jpg"
            alt="Kiza Healthcare"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Right Typography Block */}
        <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
          <div ref={headlineRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              The Care Membership
            </p>
            <h1 className="font-display font-bold text-display-1 text-kiza-dark-blue">
              <span className="block">For the Global</span>
              <span className="block mt-2">African Family</span>
            </h1>
          </div>

          <p
            ref={subheadRef}
            className="mt-6 text-lg lg:text-xl text-kiza-text-secondary-dark max-w-md leading-relaxed"
          >
            Reliable, affordable health coverage for your family back home. Delivered with care, verified by technology.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => scrollToSection('plans')}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('how-it-works')}
              className="bg-white border border-kiza-cyan/40 text-kiza-cyan hover:bg-kiza-cyan/5 hover:text-kiza-cyan rounded-full px-8 py-6 text-base font-semibold"
            >
              See how it works
            </Button>
          </div>

          {/* Trust Signals */}
          <div ref={trustRef} className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-kiza-gold" />
              <span className="text-xs text-kiza-text-secondary-dark">Licensed Tier-1 Insurers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-kiza-cyan" />
              <span className="text-xs text-kiza-text-secondary-dark">Trusted in UK, US & Canada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
