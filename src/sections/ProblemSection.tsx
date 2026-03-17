'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  className?: string;
}

export default function ProblemSection({ className = '' }: ProblemSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 }
        });
        scrollTl
          .fromTo(portraitRef.current, { x: '50vw', opacity: 0, scale: 1.06 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0)
          .fromTo(headlineRef.current, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(bodyRef.current, { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05)
          .fromTo(statsRef.current?.children || [], { y: '6vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.08)
          .fromTo(ctaRef.current, { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
          .to(portraitRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(headlineRef.current, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(bodyRef.current, { y: '4vh', opacity: 0, ease: 'power2.in' }, 0.7)
          .to(statsRef.current?.children || [], { y: '2vh', opacity: 0, stagger: 0.02, ease: 'power2.in' }, 0.7)
          .to(ctaRef.current, { y: '4vh', opacity: 0, ease: 'power2.in' }, 0.7);
      }, section);
      return () => ctx.revert();
    });
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const mobile = section.querySelector('.lg\\:hidden');
        if (!mobile) return;
        const textBlock = mobile.querySelector('.px-6');
        if (!textBlock) return;
        gsap.from(Array.from(textBlock.children), { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: textBlock, start: 'top 88%', once: true } });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const statsMarkup = (
    <div ref={statsRef} className="mt-10 flex gap-8 flex-wrap">
      <div className="text-center">
        <p className="font-display text-3xl lg:text-4xl font-bold text-kiza-gold">2,000+</p>
        <p className="mt-1 text-xs text-kiza-text-secondary">Partner hospitals</p>
      </div>
      <div className="text-center">
        <p className="font-display text-3xl lg:text-4xl font-bold text-kiza-cyan">$30</p>
        <p className="mt-1 text-xs text-kiza-text-secondary">Starting per month</p>
      </div>
      <div className="text-center">
        <p className="font-display text-3xl lg:text-4xl font-bold text-kiza-purple">Minutes</p>
        <p className="mt-1 text-xs text-kiza-text-secondary">To enroll online</p>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="about" className={`relative w-full min-h-screen lg:h-screen bg-kiza-dark-blue overflow-hidden bg-gradient-radial ${className}`}>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col pt-20">
        <div ref={portraitRef} className="w-full h-[75vw] max-h-[480px] overflow-hidden">
          <img src="/problem_portrait.jpg" alt="Concerned family member" className="w-full h-full object-cover object-center grayscale" />
        </div>
        <div className="px-6 pt-8 pb-16">
          <h2 ref={headlineRef} className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-white">
            You know the feeling. <span className="text-gradient">The 2 AM phone call.</span>
          </h2>
          <p ref={bodyRef} className="mt-5 text-base text-kiza-text-secondary leading-relaxed">
            A family member is ill, and they need cash — fast. But cash isn't care. Money meant for medicine often gets diverted. You send the transfer, but you never truly know if your loved ones received the treatment they deserved. Kiza exists to end that uncertainty.
          </p>
          {statsMarkup}
          <button ref={ctaRef} onClick={scrollToHowItWorks} className="mt-8 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group">
            <span className="text-base font-medium">See how it works</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        <div className="absolute left-[7vw] top-[18vh] w-[46vw]">
          <h2 ref={headlineRef} className="font-display font-bold text-display-2 text-white">
            You know the feeling. <span className="text-gradient">The 2 AM phone call.</span>
          </h2>
          <p ref={bodyRef} className="mt-6 text-lg text-kiza-text-secondary max-w-lg leading-relaxed">
            A family member is ill, and they need cash — fast. But cash isn't care. Money meant for medicine often gets diverted. You send the transfer, but you never truly know if your loved ones received the treatment they deserved. Kiza exists to end that uncertainty.
          </p>
          {statsMarkup}
          <button ref={ctaRef} onClick={scrollToHowItWorks} className="mt-10 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group">
            <span className="text-base font-medium">See how it works</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div ref={portraitRef} className="absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card">
          <img src="/problem_portrait.jpg" alt="Concerned family member" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
    </section>
  );
}
