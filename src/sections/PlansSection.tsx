'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Users, Heart, Shield } from 'lucide-react';

interface PlansSectionProps {
  className?: string;
}

const plans = [
  {
    name: 'Premium',
    subtitle: 'For younger family members',
    price: '$29.99',
    period: '/month',
    icon: Users,
    iconColor: 'cyan',
    accent: false,
    features: [
      'General consultations',
      'Malaria & infection treatment',
      'Basic health checks',
      'Primary care visits',
      'Emergency services',
    ],
    cta: 'Get started',
  },
  {
    name: 'Premium Senior',
    subtitle: 'For parents over 60',
    price: '$39.99',
    period: '/month',
    icon: Heart,
    iconColor: 'gold',
    accent: true,
    badge: 'For Parents',
    features: [
      'Everything in Premium',
      'Age-specific screening',
      'Senior specialist access',
      'Chronic disease monitoring',
      'Hospital admission',
    ],
    cta: 'Get started',
  },
  {
    name: 'Premium Plus',
    subtitle: 'Comprehensive chronic care',
    price: '$59.99',
    period: '/month',
    icon: Shield,
    iconColor: 'purple',
    accent: false,
    features: [
      'Everything in Premium Senior',
      'Specialist referrals',
      'Diabetes & hypertension mgmt',
      'Surgeries & procedures',
      'Chronic disease management',
    ],
    cta: 'Get started',
  },
];

export default function PlansSection({ className = '' }: PlansSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(headingRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
        const cards = cardsRef.current?.querySelectorAll('.plan-card');
        if (cards) {
          gsap.fromTo(cards,
            { y: '10vh', opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
              scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="plans" className={`relative w-full bg-white py-24 lg:py-32 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial-light" />
      <div className="relative px-6 lg:px-[6vw]">
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            Choose the right plan for your family
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark max-w-2xl mx-auto">
            Real prices. Real coverage. No hidden fees.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`plan-card relative rounded-2xl p-8 lg:p-10 overflow-hidden transition-colors ${
              plan.accent
                ? 'bg-gradient-to-br from-kiza-gold/10 to-kiza-gold/5 border border-kiza-gold/30'
                : 'bg-white border border-gray-100 hover:border-kiza-gold/30 shadow-card-light'
            }`}>
              {plan.badge && (
                <div className="absolute -top-3 right-8">
                  <span className="inline-flex items-center gap-1 bg-kiza-gold text-kiza-dark-blue text-xs font-bold px-3 py-1.5 rounded-full">
                    <Star className="w-3 h-3" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  plan.iconColor === 'cyan' ? 'bg-kiza-cyan/20' :
                  plan.iconColor === 'gold' ? 'bg-kiza-gold/20' :
                  'bg-kiza-purple/20'
                }`}>
                  <plan.icon className={`w-5 h-5 ${
                    plan.iconColor === 'cyan' ? 'text-kiza-cyan' :
                    plan.iconColor === 'gold' ? 'text-kiza-gold' :
                    'text-kiza-purple'
                  }`} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-kiza-dark-blue">{plan.name}</h3>
                  <p className="text-sm text-kiza-text-secondary-dark">{plan.subtitle}</p>
                </div>
              </div>

              <div className="mb-8">
                <span className="font-display font-bold text-4xl text-kiza-dark-blue">{plan.price}</span>
                <span className="text-kiza-text-secondary-dark ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.accent ? 'bg-kiza-gold/20' : 'bg-kiza-cyan/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.accent ? 'text-kiza-gold' : 'text-kiza-cyan'}`} />
                    </div>
                    <span className="text-kiza-text-secondary-dark">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className={`w-full rounded-full py-6 text-base font-semibold group ${
                plan.accent
                  ? 'bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 animate-pulse-glow'
                  : 'bg-kiza-cyan text-kiza-dark-blue hover:bg-kiza-cyan/90'
              }`}>
                {plan.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-kiza-dark-blue/40 max-w-2xl mx-auto">
          Kiza Tech LLC is a technology platform. All insurance benefits are underwritten by licensed local insurers. No hidden fees. Cancel anytime, subject to plan terms.
        </p>
      </div>
    </section>
  );
}
