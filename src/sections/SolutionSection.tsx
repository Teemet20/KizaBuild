'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Building2, HeadphonesIcon, CheckCircle } from 'lucide-react';

interface SolutionSectionProps {
  className?: string;
}

const benefits = [
  {
    icon: Shield,
    title: 'Verified Coverage',
    description: 'Your insurer settles bills directly with hospitals. You see exactly where your money went.',
    color: 'gold',
  },
  {
    icon: Building2,
    title: '2,000+ Hospitals',
    description: 'Access to accredited hospitals across Nigeria through our licensed insurer partners.',
    color: 'cyan',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Physical health cards and a local team that advocates for your family at every hospital visit.',
    color: 'purple',
  },
];

const beneficiaryFeatures = [
  { text: 'Physical Kiza health card', color: 'cyan' },
  { text: 'Hassle-free hospital access', color: 'cyan' },
  { text: 'Dashboard to track coverage', color: 'cyan' },
];

export default function SolutionSection({ className = '' }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(leftRef.current,
          { x: '-8vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' }
          }
        );
        gsap.fromTo(rightRef.current,
          { x: '8vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' }
          }
        );
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={`relative w-full bg-kiza-dark-blue overflow-hidden bg-gradient-radial py-24 lg:py-32 ${className}`}>
      <div className="relative px-6 lg:px-[6vw]">
        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: what YOU get */}
          <div ref={leftRef}>
            <h2 className="font-display font-bold text-display-3 text-white mb-2">
              We replace cash with <span className="text-gradient">real coverage</span>.
            </h2>
            <p className="mt-4 text-base lg:text-lg text-kiza-text-secondary leading-relaxed">
              Instead of sending money during a crisis, you pay a fixed monthly subscription. Your family is enrolled in a licensed health plan before any emergency happens.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    benefit.color === 'gold' ? 'bg-kiza-gold/20' :
                    benefit.color === 'cyan' ? 'bg-kiza-cyan/20' :
                    'bg-kiza-purple/20'
                  }`}>
                    <benefit.icon className={`w-5 h-5 ${
                      benefit.color === 'gold' ? 'text-kiza-gold' :
                      benefit.color === 'cyan' ? 'text-kiza-cyan' :
                      'text-kiza-purple'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white">{benefit.title}</h4>
                    <p className="text-sm text-kiza-text-secondary">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button onClick={scrollToPlans} className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group">
                Choose a plan <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right: what YOUR FAMILY gets */}
          <div ref={rightRef}>
            <div className="relative rounded-2xl overflow-hidden shadow-card h-[280px] lg:h-[320px] mb-8">
              <img src="/solution_portrait.jpg" alt="Healthcare access in Nigeria" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                What your family gets
              </h3>
              <p className="text-sm text-kiza-text-secondary mb-6">
                They walk into the hospital with a card, not a phone call asking you for money.
              </p>
              <ul className="space-y-3">
                {beneficiaryFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-kiza-cyan flex-shrink-0" />
                    <span className="text-sm text-white">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
