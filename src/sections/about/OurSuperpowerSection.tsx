'use client'

/**
 * OurSuperpowerSection
 *
 * White two-column section on the /about page — portrait right, content left.
 * Lists three defining traits (e.g. empathy, advocacy, network) as icon + copy
 * items, explaining what makes Kiza's approach different from traditional insurers.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Heart, PhoneCall, MapPin } from 'lucide-react';

/** The three traits that define Kiza's core advantage. */
const traits = [
  {
    icon: Heart,
    color: 'gold',
    title: 'Genuine Empathy',
    description: 'We understand what it means to worry about a parent 6,000 miles away. Every decision we make starts there.',
  },
  {
    icon: PhoneCall,
    color: 'cyan',
    title: 'Boots on the Ground',
    description: 'Our local teams actively coordinate care, speak to hospitals, and ensure your family member is never left to navigate alone.',
  },
  {
    icon: MapPin,
    color: 'purple',
    title: 'Relentless Follow-Through',
    description: 'We don\'t just issue a policy and disappear. We track, confirm, and advocate until care is delivered.',
  },
];

export default function OurSuperpowerSection() {
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
        { x: 40, opacity: 0 },
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
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Our Superpower
            </p>

            <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
              Empathy{' '}
              <span className="text-gradient">in Action</span>
            </h2>

            <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed">
              Our true strength lies in empathy. We genuinely understand the vital need for
              reliable healthcare and the trust required to deliver it. We are "boots on the ground,"
              actively connecting individuals to the precise care they need with a relentless
              commitment to quality service delivery.
            </p>

            <div className="mt-10 space-y-6">
              {traits.map((trait, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      trait.color === 'gold'
                        ? 'bg-kiza-gold/15'
                        : trait.color === 'cyan'
                        ? 'bg-kiza-cyan/15'
                        : 'bg-kiza-purple/15'
                    }`}
                  >
                    <trait.icon
                      className={`w-5 h-5 ${
                        trait.color === 'gold'
                          ? 'text-kiza-gold'
                          : trait.color === 'cyan'
                          ? 'text-kiza-cyan'
                          : 'text-kiza-purple'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-kiza-dark-blue">
                      {trait.title}
                    </h4>
                    <p className="text-sm text-kiza-text-secondary-dark mt-1 leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div
            ref={portraitRef}
            className="order-1 lg:order-2 w-full aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden shadow-card-light"
          >
            <img
              src="/support_portrait.jpg"
              alt="Kiza care team"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
