'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ArrowRight, MapPin, Building2, Stethoscope } from 'lucide-react';


interface CoverageSectionProps {
  className?: string;
}

const networkStats = [
  { icon: MapPin, value: '36', label: 'States covered' },
  { icon: Building2, value: '750+', label: 'Verified hospitals' },
  { icon: Stethoscope, value: '50+', label: 'Specialist networks' },
];

export default function CoverageSection({ className = '' }: CoverageSectionProps) {
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
          .fromTo(statsRef.current?.children || [],
            { y: '4vh', opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
            0.1
          )
          .fromTo(ctaRef.current,
            { y: '8vh', opacity: 0 },
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
          .to(statsRef.current?.children || [],
            { y: '2vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          )
          .to(ctaRef.current,
            { y: '4vh', opacity: 0, ease: 'power2.in' },
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
            src="/coverage_portrait.jpg"
            alt="Mother and child"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Our Network
          </p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-kiza-dark-blue"
          >
            750+ verified providers{' '}
            <span className="text-gradient">across Nigeria</span>.
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 text-base text-kiza-text-secondary-dark leading-relaxed"
          >
            From Lagos to Abuja to Port Harcourt. Your family gets access to quality
            care—without you calling around. We verify every hospital in our network.
          </p>
          <div className="mt-8 flex gap-6 flex-wrap">
            {networkStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 rounded-lg bg-kiza-gold/20 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-kiza-gold" />
                </div>
                <p className="font-display text-2xl font-bold text-kiza-dark-blue">{stat.value}</p>
                <p className="text-xs text-kiza-text-secondary-dark">{stat.label}</p>
              </div>
            ))}
          </div>
          <button
            ref={ctaRef}
            className="mt-8 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group"
          >
            <span className="text-base font-medium">View hospital network</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        {/* Left Typography Block */}
        <div className="absolute left-[7vw] top-[18vh] w-[46vw]">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Our Network
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-kiza-dark-blue"
          >
            750+ verified providers{' '}
            <span className="text-gradient">across Nigeria</span>.
          </h2>

          <p
            ref={bodyRef}
            className="mt-6 text-lg text-kiza-text-secondary-dark max-w-lg leading-relaxed"
          >
            From Lagos to Abuja to Port Harcourt. Your family gets access to quality
            care—without you calling around. We verify every hospital in our network.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="mt-8 flex gap-8">
            {networkStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 rounded-lg bg-kiza-gold/20 flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-kiza-gold" />
                </div>
                <p className="font-display text-2xl font-bold text-kiza-dark-blue">{stat.value}</p>
                <p className="text-xs text-kiza-text-secondary-dark">{stat.label}</p>
              </div>
            ))}
          </div>

          <button
            ref={ctaRef}
            className="mt-10 inline-flex items-center gap-2 text-kiza-gold hover:text-kiza-gold/80 transition-colors group"
          >
            <span className="text-base font-medium">View hospital network</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute right-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card-light"
        >
          <img
            src="/coverage_portrait.jpg"
            alt="Mother and child"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
