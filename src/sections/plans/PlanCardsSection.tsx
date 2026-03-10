'use client'

/**
 * PlanCardsSection
 *
 * Displays the two Kiza membership plans (Premium and Premium Plus) as
 * side-by-side cards. Pricing is geo-aware: the `useRegion` hook detects
 * the visitor's country via IP on mount and selects either Nigeria or
 * International pricing. Users can manually override via the RegionToggle.
 *
 * NGN prices are placeholders — replace 'NGN __,___' once confirmed.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Users, Heart, MapPin } from 'lucide-react';
import { useRegion, type Region } from '@/hooks/useRegion';

// ─── PRICING — swap NGN __,___ for real amounts when confirmed ───────────────
const PRICING = {
  nigeria: {
    premium:     { amount: 'NGN __,___', period: '/ month', note: 'Billed monthly. Cancel anytime.' },
    premiumPlus: { amount: 'NGN __,___', period: '/ month', note: 'Tailored to your family needs.' },
  },
  international: {
    premium:     { amount: '~$30',   period: '/ month', note: 'Billed monthly. Cancel anytime.' },
    premiumPlus: { amount: 'Custom', period: 'quote',   note: 'Tailored to your family needs.' },
  },
} as const;
// ─────────────────────────────────────────────────────────────────────────────

/** Feature bullet items shown on the Premium plan card. */
const premiumFeatures = [
  { text: 'General consultations', note: 'Unlimited GP visits' },
  { text: 'Malaria treatment',     note: 'Including diagnostics' },
  { text: 'Basic health checks',   note: 'Annual wellness exams' },
  { text: 'Primary care visits',   note: 'At any partner facility' },
  { text: 'Emergency services',    note: '24/7 emergency access' },
  { text: 'Physical Kiza ID card', note: 'Shipped within 5 days' },
];

/** Feature bullet items shown on the Premium Plus plan card. */
const premiumPlusFeatures = [
  { text: 'Everything in Premium',                  note: 'Full Premium benefits included' },
  { text: 'Specialist care',                        note: 'Cardiologists, ENTs, and more' },
  { text: 'Diabetes and hypertension management',   note: 'Chronic condition programs' },
  { text: 'Surgeries and procedures',               note: 'Covered at partner hospitals' },
  { text: 'Hospital admission',                     note: 'Inpatient stays covered' },
  { text: 'Chronic disease management',             note: 'Personalised care plans' },
  { text: 'Priority appointment booking',           note: 'Skip the queue' },
  { text: 'Dedicated care advocate',                note: 'Your personal point of contact' },
];

/**
 * Pill-style toggle that lets users manually switch between Nigeria and
 * International pricing — overrides the auto-detected region from useRegion.
 */
function RegionToggle({ region, setRegion }: { region: Region; setRegion: (r: Region) => void }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1 text-sm font-medium">
      <button
        onClick={() => setRegion('nigeria')}
        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
          region === 'nigeria'
            ? 'bg-white text-kiza-dark-blue shadow-sm'
            : 'text-kiza-text-secondary-dark hover:text-kiza-dark-blue'
        }`}
      >
        <MapPin className="w-3.5 h-3.5" />
        Nigeria
      </button>
      <button
        onClick={() => setRegion('international')}
        className={`px-4 py-1.5 rounded-full transition-all ${
          region === 'international'
            ? 'bg-white text-kiza-dark-blue shadow-sm'
            : 'text-kiza-text-secondary-dark hover:text-kiza-dark-blue'
        }`}
      >
        International
      </button>
    </div>
  );
}

export default function PlanCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  // Geo-detected region and manual override setter.
  const { region, loading, setRegion } = useRegion();
  // Derive the correct price strings for the active region.
  const pricing = PRICING[region];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      // Heading lines fade up on scroll into view.
      gsap.fromTo(
        headingRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      // Cards tilt slightly in and slide up with a stagger between them.
      const cards = cardsRef.current?.querySelectorAll('.plan-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, rotate: -0.5 },
          {
            y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.14, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Feature bullets cascade in after the cards are visible.
      const bullets = cardsRef.current?.querySelectorAll('.feature-item');
      if (bullets) {
        gsap.fromTo(bullets,
          { y: 10, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
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
      {/* Radial gradient background wash */}
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">

        {/* Section heading + region toggle */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Choose Your Plan
          </p>
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            Two plans. One mission.
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark max-w-xl mx-auto">
            Both plans include a physical ID card, 24/7 support, and cashless care at 750+ hospitals.
          </p>

          {/* Geo-detection status + manual region override */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs text-kiza-text-secondary-dark">
              {loading ? 'Detecting your location...' : 'Showing prices for:'}
            </p>
            <RegionToggle region={region} setRegion={setRegion} />
          </div>
        </div>

        {/* Plan cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* ── Premium ─────────────────────────────────────────────────── */}
          <div className="plan-card bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 shadow-card-light hover:border-kiza-cyan/30 transition-colors flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-kiza-cyan/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-kiza-cyan" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-xl text-kiza-dark-blue">Premium</h3>
                <p className="text-sm text-kiza-text-secondary-dark">Best for younger siblings, students</p>
              </div>
            </div>

            {/* Geo-aware price */}
            <div className="mb-2">
              <span className="font-display font-bold text-5xl text-kiza-dark-blue">{pricing.premium.amount}</span>
              <span className="text-kiza-text-secondary-dark ml-2">{pricing.premium.period}</span>
            </div>
            <p className="text-xs text-kiza-text-secondary-dark mb-8">{pricing.premium.note}</p>

            <ul className="space-y-4 mb-10 flex-1">
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="feature-item flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-kiza-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-kiza-cyan" />
                  </div>
                  <div>
                    <span className="text-kiza-dark-blue font-medium text-sm">{feature.text}</span>
                    <span className="text-kiza-text-secondary-dark text-xs ml-2">— {feature.note}</span>
                  </div>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-kiza-cyan text-kiza-dark-blue hover:bg-kiza-cyan/90 rounded-full py-6 text-base font-semibold group">
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* ── Premium Plus ─────────────────────────────────────────────── */}
          <div className="plan-card relative bg-gradient-to-br from-kiza-gold/10 to-kiza-gold/5 border border-kiza-gold/30 rounded-2xl p-8 lg:p-10 overflow-hidden flex flex-col">
            {/* "Most Popular" badge — floats above the top border */}
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
                <h3 className="font-display font-semibold text-xl text-kiza-dark-blue">Premium Plus</h3>
                <p className="text-sm text-kiza-text-secondary-dark">Best for aging parents, chronic care</p>
              </div>
            </div>

            {/* Geo-aware price */}
            <div className="mb-2">
              <span className="font-display font-bold text-5xl text-kiza-dark-blue">{pricing.premiumPlus.amount}</span>
              <span className="text-kiza-text-secondary-dark ml-2">{pricing.premiumPlus.period}</span>
            </div>
            <p className="text-xs text-kiza-text-secondary-dark mb-8">{pricing.premiumPlus.note}</p>

            <ul className="space-y-4 mb-10 flex-1">
              {premiumPlusFeatures.map((feature, i) => (
                <li key={i} className="feature-item flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-kiza-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-kiza-gold" />
                  </div>
                  <div>
                    <span className="text-kiza-dark-blue font-medium text-sm">{feature.text}</span>
                    <span className="text-kiza-text-secondary-dark text-xs ml-2">— {feature.note}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA label differs by region: Nigeria gets "Get started", international gets "Request a quote" */}
            <Button className="w-full bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full py-6 text-base font-semibold group animate-pulse-glow">
              {region === 'nigeria' ? 'Get started' : 'Request a quote'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-10 text-center text-xs text-kiza-dark-blue/40 max-w-2xl mx-auto">
          Kiza Inc. is a technology platform. All insurance benefits are underwritten by licensed local insurers.
        </p>
      </div>
    </section>
  );
}
