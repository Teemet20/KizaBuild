'use client'

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
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        loadTl
          .fromTo(portrait, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1 })
          .fromTo(headline.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, '-=0.6')
          .fromTo([subhead, cta], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
          .fromTo(trust, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section, start: 'top top', end: '+=130%',
            pin: true, scrub: 0.6,
            onLeaveBack: () => { gsap.set([portrait, headline, subhead, cta, trust], { opacity: 1, x: 0, y: 0 }); }
          }
        });
        scrollTl
          .fromTo(portrait, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo(headline, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .fromTo([subhead, cta], { y: 0, opacity: 1 }, { y: '6vh', opacity: 0, ease: 'power2.in' }, 0.75)
          .fromTo(trust, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.7);
      }, section);
      return () => ctx.revert();
    });
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const mobile = section.querySelector('.lg\\:hidden');
        if (!mobile) return;
        const textBlock = mobile.querySelector('.px-6');
        if (!textBlock) return;
        gsap.from(Array.from(textBlock.children), { opacity: 0, y: 24, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.3 });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={`relative w-full min-h-screen lg:h-screen bg-white overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial-light" />
      <div className="absolute left-0 top-0 lg:top-[8vh] w-full lg:w-[44vw] h-[50vh] lg:h-[84vh] bg-kiza-cyan/8 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile */}
      <div className="relative lg:hidden flex flex-col pt-20">
        <div ref={portraitRef} className="w-full h-[75vw] max-h-[480px] overflow-hidden">
          <img src="/hero_portrait.jpg" alt="Family protected by Kiza healthcare" className="w-full h-full object-cover object-center" />
        </div>
        <div className="px-6 pt-8 pb-16">
          <div ref={headlineRef}>
            <h1 className="font-display font-bold text-[clamp(2rem,8vw,3.5rem)] leading-[1.1] text-kiza-dark-blue">
              <span className="block">Health coverage</span>
              <span className="block mt-2">for your family <span className="text-gradient">back home</span></span>
            </h1>
          </div>
          <p ref={subheadRef} className="mt-5 text-base text-kiza-text-secondary-dark leading-relaxed">
            Affordable, verified health insurance for your loved ones in Nigeria. Pay monthly from wherever you are. They walk into the hospital covered.
          </p>
          <div ref={ctaRef} className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button onClick={scrollToPlans} className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group">
              See plans & pricing <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={scrollToHowItWorks} className="bg-white border border-kiza-cyan/40 text-kiza-cyan hover:bg-kiza-cyan/5 rounded-full px-8 py-6 text-base font-semibold">
              How it works
            </Button>
          </div>
          <div ref={trustRef} className="mt-8 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-kiza-gold" />
              <span className="text-xs text-kiza-text-secondary-dark">Licensed insurers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-kiza-cyan" />
              <span className="text-xs text-kiza-text-secondary-dark">Available in UK, US & Canada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        <div ref={portraitRef} className="absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card-light ring-1 ring-kiza-cyan/30">
          <img src="/hero_portrait.jpg" alt="Family protected by Kiza healthcare" className="w-full h-full object-cover" />
        </div>
        <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
          <div ref={headlineRef}>
            <h1 className="font-display font-bold text-display-1 text-kiza-dark-blue">
              <span className="block">Health coverage</span>
              <span className="block mt-2">for your family <span className="text-gradient">back home</span></span>
            </h1>
          </div>
          <p ref={subheadRef} className="mt-6 text-lg lg:text-xl text-kiza-text-secondary-dark max-w-md leading-relaxed">
            Affordable, verified health insurance for your loved ones in Nigeria. Pay monthly from wherever you are. They walk into the hospital covered.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Button onClick={scrollToPlans} className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group">
              See plans & pricing <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={scrollToHowItWorks} className="bg-white border border-kiza-cyan/40 text-kiza-cyan hover:bg-kiza-cyan/5 rounded-full px-8 py-6 text-base font-semibold">
              How it works
            </Button>
          </div>
          <div ref={trustRef} className="mt-12 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-kiza-gold" />
              <span className="text-xs text-kiza-text-secondary-dark">Licensed insurers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-kiza-cyan" />
              <span className="text-xs text-kiza-text-secondary-dark">Available in UK, US & Canada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
