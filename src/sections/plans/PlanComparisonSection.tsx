'use client'

/**
 * PlanComparisonSection
 *
 * Full feature comparison table for the Premium and Premium Plus plans,
 * grouped into four care categories. Rendered on the /plans page below
 * the plan cards so users can see exactly what each tier includes.
 *
 * - `true`  → green check icon (feature included)
 * - `false` → muted dash icon (feature not included)
 */

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Check, Minus } from 'lucide-react';

/**
 * Feature comparison data grouped by care category.
 * Each feature specifies inclusion for Premium and Premium Plus independently.
 */
const categories = [
  {
    name: 'Primary Care',
    features: [
      { label: 'General consultations',           premium: true,  premiumPlus: true },
      { label: 'Primary care visits',             premium: true,  premiumPlus: true },
      { label: 'Annual wellness exam',            premium: true,  premiumPlus: true },
      { label: 'Malaria treatment & diagnostics', premium: true,  premiumPlus: true },
      { label: 'Emergency services (24/7)',        premium: true,  premiumPlus: true },
    ],
  },
  {
    name: 'Specialist & Advanced Care',
    features: [
      { label: 'Specialist referrals',            premium: false, premiumPlus: true },
      { label: 'Cardiology & ENT',                premium: false, premiumPlus: true },
      { label: 'Surgeries & procedures',          premium: false, premiumPlus: true },
      { label: 'Hospital admission (inpatient)',   premium: false, premiumPlus: true },
    ],
  },
  {
    name: 'Chronic Disease Management',
    features: [
      { label: 'Diabetes management program',     premium: false, premiumPlus: true },
      { label: 'Hypertension management',         premium: false, premiumPlus: true },
      { label: 'Personalised chronic care plan',  premium: false, premiumPlus: true },
    ],
  },
  {
    name: 'Support & Advocacy',
    features: [
      { label: 'Physical Kiza ID card',           premium: true,  premiumPlus: true },
      { label: '24/7 support line',               premium: true,  premiumPlus: true },
      { label: 'Appointment reminders',           premium: true,  premiumPlus: true },
      { label: 'Priority appointment booking',    premium: false, premiumPlus: true },
      { label: 'Dedicated care advocate',         premium: false, premiumPlus: true },
    ],
  },
];

/** Renders a check or dash icon in a table cell based on whether the feature is included. */
function Cell({ value }: { value: boolean }) {
  return value ? (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-kiza-gold/20 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-kiza-gold" />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Minus className="w-4 h-4 text-white/20" />
    </div>
  );
}

export default function PlanComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      // Heading and table fade up together as the section scrolls into view.
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
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
      className="relative w-full py-24 lg:py-32 bg-kiza-dark-blue overflow-hidden bg-gradient-radial"
    >
      {/* Ambient purple glow at the bottom-centre */}
      <div className="absolute bottom-0 left-1/4 w-[50vw] h-[40vh] bg-kiza-purple/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-5xl mx-auto">
        <div ref={contentRef}>

          {/* Section heading */}
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Full Comparison
            </p>
            <h2 className="font-display font-bold text-display-2 text-white">
              What's included in{' '}
              <span className="text-gradient">each plan</span>
            </h2>
          </div>

          {/* Comparison table — scrollable horizontally on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full">

              {/* Column headers: feature label | Premium | Premium Plus */}
              <thead>
                <tr>
                  <th className="text-left pb-6 w-1/2" />
                  <th className="pb-6 w-1/4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-kiza-cyan">Premium</span>
                      <span className="font-display font-bold text-2xl text-white">~$30<span className="text-sm font-normal text-kiza-text-secondary">/mo</span></span>
                    </div>
                  </th>
                  <th className="pb-6 w-1/4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-kiza-gold">Premium Plus</span>
                      <span className="font-display font-bold text-2xl text-white">Custom</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat, ci) => (
                  // React.Fragment with a key avoids the missing-key warning on adjacent rows.
                  <React.Fragment key={ci}>

                    {/* Category label row — spans all three columns */}
                    <tr>
                      <td colSpan={3} className="pt-8 pb-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-kiza-text-secondary">
                          {cat.name}
                        </span>
                      </td>
                    </tr>

                    {/* One row per feature in this category */}
                    {cat.features.map((feat, fi) => (
                      <tr
                        key={`feat-${ci}-${fi}`}
                        className="border-t border-white/6 hover:bg-white/3 transition-colors"
                      >
                        <td className="py-3.5 pr-4 text-sm text-kiza-text-secondary">
                          {feat.label}
                        </td>
                        <td className="py-3.5 text-center">
                          <Cell value={feat.premium} />
                        </td>
                        <td className="py-3.5 text-center">
                          <Cell value={feat.premiumPlus} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
