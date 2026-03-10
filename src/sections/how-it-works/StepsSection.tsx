'use client'

/**
 * StepsSection
 *
 * Renders the 5-step onboarding flow on the /how-it-works page:
 * Register → Add a Beneficiary → Choose a Plan → Pay → Relax.
 *
 * On desktop the steps are displayed in a horizontal 5-column grid with
 * gradient connector lines between cards. On mobile they stack vertically.
 * Each step card includes a step number, icon, summary, detail copy, and
 * a small callout badge.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { UserPlus, Users, ClipboardList, CreditCard, CheckCircle } from 'lucide-react';

/** The five onboarding steps, in order. */
const steps = [
  {
    number: '01',
    title: 'Register',
    icon: UserPlus,
    color: 'gold',
    summary: 'Create your account in seconds.',
    detail:
      'Sign up with your email, set a password, and verify your identity. The entire registration takes under two minutes. No paperwork, no waiting room.',
    callout: 'Available on web and mobile',
  },
  {
    number: '02',
    title: 'Add a Beneficiary',
    icon: Users,
    color: 'cyan',
    summary: 'Tell us who you\'re covering.',
    detail:
      'Enter your beneficiary\'s name, date of birth, and location in Nigeria or Ghana. Our system instantly creates their profile and queues them for coverage.',
    callout: 'Add multiple family members',
  },
  {
    number: '03',
    title: 'Choose a Plan',
    icon: ClipboardList,
    color: 'purple',
    summary: 'Pick the coverage that fits.',
    detail:
      'Browse our Premium and Premium Plus plans, compare coverage levels, and select what best fits your family\'s needs. No jargon — just clear benefits.',
    callout: 'Premium from ~$30/month',
  },
  {
    number: '04',
    title: 'Pay',
    icon: CreditCard,
    color: 'gold',
    summary: 'Pay securely in your currency.',
    detail:
      'Complete your subscription via Stripe using USD, GBP, CAD, or EUR. Your payment is encrypted end-to-end. Monthly or annual billing — your choice.',
    callout: 'No hidden fees, ever',
  },
  {
    number: '05',
    title: 'Relax',
    icon: CheckCircle,
    color: 'cyan',
    summary: 'We handle everything from here.',
    detail:
      'Your dashboard shows a "Verified" badge. Your beneficiary receives a physical Kiza ID card and can walk into any of our 750+ partner hospitals for cashless care.',
    callout: 'Physical card shipped within 5 days',
  },
];

const colorMap = {
  gold: {
    number: 'text-kiza-gold',
    icon: 'bg-kiza-gold/15 text-kiza-gold',
    border: 'border-kiza-gold/30',
    callout: 'bg-kiza-gold/10 text-kiza-gold',
    connector: 'from-kiza-gold/40',
  },
  cyan: {
    number: 'text-kiza-cyan',
    icon: 'bg-kiza-cyan/15 text-kiza-cyan',
    border: 'border-kiza-cyan/30',
    callout: 'bg-kiza-cyan/10 text-kiza-cyan',
    connector: 'from-kiza-cyan/40',
  },
  purple: {
    number: 'text-kiza-purple',
    icon: 'bg-kiza-purple/15 text-kiza-purple',
    border: 'border-kiza-purple/30',
    callout: 'bg-kiza-purple/10 text-kiza-purple',
    connector: 'from-kiza-purple/40',
  },
};

export default function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const items = stepsRef.current?.querySelectorAll('.step-card');
      if (items) {
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.14, ease: 'power2.out',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Process
          </p>
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            The 5-Step Peace of Mind Flow
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark max-w-xl mx-auto">
            From registration to relaxation — in minutes, not days.
          </p>
        </div>

        {/* Steps — vertical on mobile, custom layout on desktop */}
        <div ref={stepsRef} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4">
          {steps.map((step, index) => {
            const c = colorMap[step.color as keyof typeof colorMap];
            return (
              <div key={index} className="step-card relative">
                {/* Connector line (desktop only, between cards) */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-9 left-full w-full h-[2px] bg-gradient-to-r ${c.connector} to-transparent z-0`} />
                )}

                <div className={`relative z-10 bg-white border ${c.border} rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow`}>
                  {/* Number */}
                  <span className={`font-mono text-4xl font-bold block mb-4 ${c.number}`}>
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${c.icon.split(' ')[0]}`}>
                    <step.icon className={`w-5 h-5 ${c.icon.split(' ')[1]}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg text-kiza-dark-blue mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-kiza-text-secondary-dark mb-3">
                    {step.summary}
                  </p>
                  <p className="text-sm text-kiza-text-secondary-dark leading-relaxed">
                    {step.detail}
                  </p>

                  {/* Callout badge */}
                  <div className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-mono ${c.callout}`}>
                    {step.callout}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
