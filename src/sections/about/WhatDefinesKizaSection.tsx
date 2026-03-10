'use client'

/**
 * WhatDefinesKizaSection
 *
 * Dark closing section on the /about page. Three brand-pillar cards
 * (Accessible, Innovative, Empowering) followed by a primary CTA linking
 * to the /plans page. Acts as the brand summary and conversion point for
 * visitors who have read through the full About story.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Zap, Users, ArrowRight } from 'lucide-react';


const pillars = [
  {
    icon: Globe,
    color: 'gold',
    title: 'Accessible',
    description:
      'We ensure our affordable health plans are easy to reach through straightforward mobile tools, no matter where you live or what your income is.',
  },
  {
    icon: Zap,
    color: 'cyan',
    title: 'Innovative',
    description:
      'We use smart solutions to give you smooth, effortless experiences — from sign-up to claims. Technology that works for you, not against you.',
  },
  {
    icon: Users,
    color: 'purple',
    title: 'Empowering',
    description:
      'We foster genuine connections through strong support and inspiring stories of impact — building healthier communities together.',
  },
];

export default function WhatDefinesKizaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { y: 24, opacity: 0 },
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

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
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
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-kiza-cyan/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Kiza Difference
          </p>
          <h2 className="font-display font-bold text-display-2 text-white leading-[1.1]">
            Our Promise to You
          </h2>
          <p className="mt-5 text-lg text-kiza-text-secondary max-w-2xl mx-auto leading-relaxed">
            Three principles guide every product decision, every support call, and
            every hospital visit we coordinate on your behalf.
          </p>
        </div>

        {/* Pillar Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden group hover:bg-white/8 transition-colors"
            >
              {/* Accent glow */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 ${
                  pillar.color === 'gold'
                    ? 'bg-kiza-gold'
                    : pillar.color === 'cyan'
                    ? 'bg-kiza-cyan'
                    : 'bg-kiza-purple'
                }`}
              />

              <div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  pillar.color === 'gold'
                    ? 'bg-kiza-gold/20'
                    : pillar.color === 'cyan'
                    ? 'bg-kiza-cyan/20'
                    : 'bg-kiza-purple/20'
                }`}
              >
                <pillar.icon
                  className={`w-6 h-6 ${
                    pillar.color === 'gold'
                      ? 'text-kiza-gold'
                      : pillar.color === 'cyan'
                      ? 'text-kiza-cyan'
                      : 'text-kiza-purple'
                  }`}
                />
              </div>

              <h3 className="relative font-display font-semibold text-xl text-white mb-3">
                {pillar.title}
              </h3>
              <p className="relative text-sm text-kiza-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 text-center">
          <Button
            asChild
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-10 py-6 text-base font-semibold group"
          >
            <Link href="/#plans">
              Find your plan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-kiza-text-secondary">
            Takes 3 minutes. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
