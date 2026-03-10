'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';


interface FinalCTASectionProps {
  className?: string;
}

export default function FinalCTASection({ className = '' }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          }
        });

        scrollTl
          .fromTo(portraitRef.current,
            { x: '50vw', opacity: 0, scale: 1.06 },
            { x: 0, opacity: 1, scale: 1, ease: 'none' },
            0
          )
          .fromTo(headlineRef.current,
            { x: '-40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(bodyRef.current,
            { x: '-40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.05
          )
          .fromTo(ctaRef.current,
            { y: '8vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1
          )
          .fromTo(microRef.current,
            { y: '4vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15
          )
          .to(portraitRef.current,
            { x: '18vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(headlineRef.current,
            { x: '-10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(bodyRef.current,
            { x: '-10vw', opacity: 0, ease: 'power2.in' },
            0.72
          )
          .to(ctaRef.current,
            { y: '4vh', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(microRef.current,
            { opacity: 0, ease: 'power2.in' },
            0.7
          );
      }, section);

      return () => ctx.revert();
    });
    // Mobile: scroll-triggered entrance animations (no pin/scrub)
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const mobile = section.querySelector('.lg\\:hidden');
        if (!mobile) return;
        const textBlock = mobile.querySelector('.px-6');
        if (!textBlock) return;
        gsap.from(Array.from(textBlock.children), {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 88%',
            once: true,
          },
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToPlans = () => {
    const element = document.getElementById('plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen lg:h-screen bg-white overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-radial-light" />

      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col pt-20">
        <div className="w-full h-[75vw] max-h-[480px] overflow-hidden">
          <img
            src="/closing_portrait.jpg"
            alt="Happy family"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Join the Community
          </p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-kiza-dark-blue"
          >
            Protect what matters—{' '}
            <span className="text-gradient">without the 2:00 AM panic</span>.
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 text-base text-kiza-text-secondary-dark leading-relaxed"
          >
            Join thousands of immigrants who replaced emergency cash with real coverage.
            Turn healthcare from a 'favor' into a 'right.'
          </p>
          <div ref={ctaRef} className="mt-8">
            <Button
              onClick={scrollToPlans}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group animate-pulse-glow"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p
            ref={microRef}
            className="mt-6 font-mono text-xs text-kiza-text-secondary-dark uppercase tracking-widest"
          >
            Takes 3 minutes. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        {/* Left Typography Block */}
        <div className="absolute left-[7vw] top-[18vh] w-[46vw]">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Join the Community
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-kiza-dark-blue"
          >
            Protect what matters—{' '}
            <span className="text-gradient">without the 2:00 AM panic</span>.
          </h2>

          <p
            ref={bodyRef}
            className="mt-6 text-lg text-kiza-text-secondary-dark max-w-lg leading-relaxed"
          >
            Join thousands of immigrants who replaced emergency cash with real coverage.
            Turn healthcare from a 'favor' into a 'right.'
          </p>

          <div ref={ctaRef} className="mt-10">
            <Button
              onClick={scrollToPlans}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group animate-pulse-glow"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p
            ref={microRef}
            className="mt-8 font-mono text-xs text-kiza-text-secondary-dark uppercase tracking-widest"
          >
            Takes 3 minutes. Cancel anytime.
          </p>
        </div>

        {/* Right Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card-light"
        >
          <img
            src="/closing_portrait.jpg"
            alt="Happy family"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
