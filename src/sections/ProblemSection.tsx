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
  const ctaRef = useRef<HTMLButtonElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        // Desktop pinned scroll animation
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
            { y: '8vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.05
          )
          .fromTo(ctaRef.current,
            { y: '8vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1
          )
          .fromTo(accentRef.current,
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, ease: 'none' },
            0
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
            { y: '4vh', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(ctaRef.current,
            { y: '4vh', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(accentRef.current,
            { scaleY: 0, opacity: 0, ease: 'power2.in' },
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

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen lg:h-screen bg-kiza-dark-blue overflow-hidden bg-gradient-radial ${className}`}
    >
      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col pt-20">
        <div
          ref={portraitRef}
          className="w-full h-[75vw] max-h-[480px] overflow-hidden"
        >
          <img
            src="/problem_portrait.jpg"
            alt="Concerned family member on phone"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <div
            ref={accentRef}
            className="w-[6px] h-[28px] bg-kiza-gold origin-top mb-4"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Problem
          </p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-white"
          >
            Don't just send cash.{' '}
            <span className="text-gradient">Send certainty.</span>
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 text-base text-kiza-text-secondary leading-relaxed"
          >
            Every immigrant knows the 2:00 AM phone call. A family member is ill,
            and they need cash—fast. But cash isn't care. Money meant for medicine
            often gets diverted. You send the money, but you never truly know if
            your loved ones received the quality of treatment they deserved.
          </p>
          <button
            ref={ctaRef}
            onClick={scrollToHowItWorks}
            className="mt-8 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group"
          >
            <span className="text-base font-medium">See how Kiza works</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        {/* Accent Block */}
        <div
          ref={accentRef}
          className="absolute left-[7vw] top-[22vh] w-[6px] h-[28px] bg-kiza-gold origin-top"
        />

        {/* Left Typography Block */}
        <div className="absolute left-[7vw] top-[26vh] w-[46vw]">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Problem
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-white"
          >
            Don't just send cash.{' '}
            <span className="text-gradient">Send certainty.</span>
          </h2>

          <p
            ref={bodyRef}
            className="mt-6 text-lg text-kiza-text-secondary max-w-lg leading-relaxed"
          >
            Every immigrant knows the 2:00 AM phone call. A family member is ill,
            and they need cash—fast. But cash isn't care. Money meant for medicine
            often gets diverted. You send the money, but you never truly know if
            your loved ones received the quality of treatment they deserved.
          </p>

          <button
            ref={ctaRef}
            onClick={scrollToHowItWorks}
            className="mt-10 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group"
          >
            <span className="text-base font-medium">See how Kiza works</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card"
        >
          <img
            src="/problem_portrait.jpg"
            alt="Concerned family member on phone"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
