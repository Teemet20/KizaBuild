'use client'

/**
 * CoverageNetworkSection
 *
 * Two-column layout on the /plans page highlighting Kiza's healthcare
 * network in Nigeria. Left side: a portrait image. Right side: a headline,
 * three network stats (states, hospitals, specialists), and a tag cloud
 * of verified HMO/insurance partner names.
 *
 * The portrait slides in from the left while the content fades up from
 * the right as the section enters the viewport.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Stethoscope, ArrowRight } from 'lucide-react';

/** Network coverage statistics shown as an icon + number + label trio. */
const stats = [
  { icon: MapPin, value: '36', label: 'States covered', color: 'gold' },
  { icon: Building2, value: '750+', label: 'Verified hospitals', color: 'cyan' },
  { icon: Stethoscope, value: '50+', label: 'Specialist networks', color: 'purple' },
];

const providers = [
  'AXA Mansard', 'Hygeia HMO', 'Leadway Health', 'Reliance HMO',
  'Avon HMO', 'Clearline HMO', 'Fountain HMO', 'Ultimate Health',
];

export default function CoverageNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(portraitRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(contentRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="w-full aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden shadow-card-light"
          >
            <img
              src="/coverage_portrait.jpg"
              alt="Healthcare provider"
              className="w-full h-full object-cover grayscale"
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Our Network
            </p>

            <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
              750+ verified providers{' '}
              <span className="text-gradient">across Nigeria</span>.
            </h2>

            <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed">
              From Lagos to Abuja to Port Harcourt. Every hospital in our network is manually
              verified by our team. Your family never has to wonder if they'll be turned away.
            </p>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                    stat.color === 'gold' ? 'bg-kiza-gold/15' :
                    stat.color === 'cyan' ? 'bg-kiza-cyan/15' :
                    'bg-kiza-purple/15'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'gold' ? 'text-kiza-gold' :
                      stat.color === 'cyan' ? 'text-kiza-cyan' :
                      'text-kiza-purple'
                    }`} />
                  </div>
                  <p className="font-display font-bold text-2xl text-kiza-dark-blue">{stat.value}</p>
                  <p className="text-xs text-kiza-text-secondary-dark mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Provider logos (text) */}
            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-kiza-text-secondary-dark mb-4">
                Verified Partners Include
              </p>
              <div className="flex flex-wrap gap-2">
                {providers.map((p, i) => (
                  <span
                    key={i}
                    className="bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-kiza-dark-blue"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Button
                asChild
                className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
              >
                <Link href="/#plans">
                  Choose a plan
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
