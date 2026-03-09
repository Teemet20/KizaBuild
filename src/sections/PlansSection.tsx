'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Users, Heart } from 'lucide-react';


interface PlansSectionProps {
  className?: string;
}

const standardFeatures = [
  'General consultations',
  'Malaria treatment',
  'Basic health checks',
  'Primary care visits',
  'Emergency services',
];

const goldFeatures = [
  'Everything in Standard',
  'Specialist care',
  'Diabetes/Hypertension management',
  'Surgeries & procedures',
  'Hospital admission',
  'Chronic disease management',
];

export default function PlansSection({ className = '' }: PlansSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation with stagger
      const cards = cardsRef.current?.querySelectorAll('.plan-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: '10vh', opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Feature bullets animation
      const bullets = cardsRef.current?.querySelectorAll('.feature-item');
      if (bullets) {
        gsap.fromTo(bullets,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plans"
      className={`relative w-full min-h-screen bg-white py-24 lg:py-32 overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-light" />
      
      <div className="relative px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Plans & Coverage
          </p>
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            Tailored Health Coverage for Every Family
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark max-w-2xl mx-auto">
            Quality coverage that fits your budget. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Plan Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {/* Standard Plan */}
          <div className="plan-card bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:border-kiza-gold/30 transition-colors shadow-card-light">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-kiza-cyan/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-kiza-cyan" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-kiza-dark-blue">
                  The Standard Plan
                </h3>
                <p className="text-sm text-kiza-text-secondary-dark">Best for younger siblings, students</p>
              </div>
            </div>

            <div className="mb-8">
              <span className="font-display font-bold text-4xl text-kiza-dark-blue">
                ~$30
              </span>
              <span className="text-kiza-text-secondary-dark ml-2">/ month</span>
            </div>

            <ul className="space-y-4 mb-10">
              {standardFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="feature-item flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-kiza-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-kiza-cyan" />
                  </div>
                  <span className="text-kiza-text-secondary-dark">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full bg-kiza-cyan text-kiza-dark-blue hover:bg-kiza-cyan/90 rounded-full py-6 text-base font-semibold group"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Gold Plan */}
          <div className="plan-card relative bg-gradient-to-br from-kiza-gold/10 to-kiza-gold/5 border border-kiza-gold/30 rounded-2xl p-8 lg:p-10 overflow-hidden">
            {/* Recommended Badge */}
            <div className="absolute -top-3 right-8">
              <span className="inline-flex items-center gap-1 bg-kiza-gold text-kiza-dark-blue text-xs font-bold px-3 py-1.5 rounded-full">
                <Star className="w-3 h-3" />
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-kiza-gold/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-kiza-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-kiza-dark-blue">
                  The Gold Plan
                </h3>
                <p className="text-sm text-kiza-text-secondary-dark">Best for aging parents, chronic care</p>
              </div>
            </div>

            <div className="mb-8">
              <span className="font-display font-bold text-4xl text-kiza-dark-blue">
                Custom
              </span>
              <span className="text-kiza-text-secondary-dark ml-2">quote</span>
            </div>

            <ul className="space-y-4 mb-10">
              {goldFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="feature-item flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-kiza-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-kiza-gold" />
                  </div>
                  <span className="text-kiza-text-secondary-dark">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full py-6 text-base font-semibold group animate-pulse-glow"
            >
              Request a quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-center text-xs text-kiza-dark-blue/40 max-w-2xl mx-auto">
          Kiza Inc. is a technology platform. All insurance benefits are underwritten by licensed local insurers.
        </p>
      </div>
    </section>
  );
}
