'use client'

/**
 * FAQCategoriesSection
 *
 * Displays all FAQ content on the /faq page, organised into four themed
 * categories (About Kiza, Plans & Billing, Coverage & Care, Support).
 * Each category renders as a card with an expandable accordion for each
 * question — implemented with CSS max-height toggling via local state.
 *
 * The `FAQItem` sub-component manages its own open/closed state so
 * multiple questions can be open simultaneously.
 */

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Plus, Minus } from 'lucide-react';

/** FAQ questions and answers grouped by topic area. */
const categories = [
  {
    label: 'About Kiza',
    color: 'gold',
    faqs: [
      {
        question: 'What is Kiza and who can use it?',
        answer:
          'Kiza is a health care membership platform that lets people in the diaspora pay for health coverage for their family members in Africa. Anyone living abroad who wants to secure quality, affordable healthcare for a loved one in Nigeria can use Kiza.',
      },
      {
        question: 'Is Kiza an insurance company?',
        answer:
          'No. Kiza is a technology company and membership community. We use the collective power of our members to purchase group insurance policies from licensed local providers. You pay us for the platform and care management — the licensed insurer holds the risk.',
      },
      {
        question: 'Can I use Kiza for myself if I live abroad?',
        answer:
          'The healthcare benefits are for beneficiaries residing in our coverage areas (currently Nigeria). As the account holder, you live abroad and manage everything through the Kiza app or web platform.',
      },
      {
        question: 'Is Kiza available outside Nigeria?',
        answer:
          'We currently operate in Nigeria and are actively expanding to other African countries. If you have family in Ghana, Kenya, or elsewhere, sign up for our waitlist and we\'ll notify you when your country is live.',
      },
    ],
  },
  {
    label: 'Plans & Billing',
    color: 'cyan',
    faqs: [
      {
        question: 'How do I sign up for a plan?',
        answer:
          'Visit our Plans page, choose Premium or Premium Plus, create your account, add your beneficiary\'s details, and complete payment via Stripe. The whole process takes under 3 minutes.',
      },
      {
        question: 'What currencies can I pay in?',
        answer:
          'We accept USD, GBP, CAD, and EUR through Stripe. All payments are processed securely and you\'ll always see the exact amount in your local currency before confirming.',
      },
      {
        question: 'Can I cancel or change my plan at any time?',
        answer:
          'Yes. You can upgrade, downgrade, or cancel at any time from your dashboard. Cancellations take effect at the end of your current billing cycle with no penalty fees.',
      },
      {
        question: 'What happens if I miss a payment?',
        answer:
          'We provide a grace period, but continuous coverage requires an active subscription. If your plan lapses, your beneficiary\'s coverage will pause until the next successful payment.',
      },
      {
        question: 'How do I know my premium is actually being paid to the insurer?',
        answer:
          'This is our core promise. The "Verified" badge on your dashboard is backed by real-time confirmation from our insurance partner. You can see exact validity dates and coverage status at any time.',
      },
    ],
  },
  {
    label: 'Coverage & Care',
    color: 'purple',
    faqs: [
      {
        question: 'What healthcare services are covered?',
        answer:
          'The Premium plan covers general consultations, malaria treatment, basic health checks, primary care visits, and emergency services. Premium Plus adds specialist care, surgeries, hospital admission, and chronic disease management. See our Plans page for the full comparison.',
      },
      {
        question: 'Which hospitals can my family visit?',
        answer:
          'Your beneficiary gets access to 750+ verified private and public hospitals across all 36 states in Nigeria, including premium networks like AXA Mansard, Hygeia, and Reliance HMO.',
      },
      {
        question: 'How does my family member access care?',
        answer:
          'They present their physical Kiza ID card (or Digital Health ID on their phone) at any partner hospital. The hospital verifies coverage directly with our system — no cash required at the point of care.',
      },
      {
        question: 'What if my family member is in a rural area?',
        answer:
          'Our network spans all 36 states, including rural and semi-urban areas. If the nearest partner hospital isn\'t convenient, our support team will help locate the closest verified facility.',
      },
      {
        question: 'How quickly does coverage start?',
        answer:
          'Coverage is active as soon as your payment is confirmed — typically within seconds. The physical Kiza ID card is shipped and arrives within 5 business days.',
      },
    ],
  },
  {
    label: 'Support',
    color: 'gold',
    faqs: [
      {
        question: 'What happens if a hospital turns my family member away?',
        answer:
          'Call our 24/7 support line immediately. Our advocacy team will contact the hospital directly on your behalf and resolve the situation in real time. Being turned away should never happen — but we\'re ready if it does.',
      },
      {
        question: 'What happens if my family member loses their Kiza card?',
        answer:
          'Every beneficiary has a Digital Health ID accessible via any smartphone. They can use this as proof of coverage immediately. Request a replacement physical card through your dashboard at no extra cost.',
      },
      {
        question: 'How do I contact customer support?',
        answer:
          'Email us at support@kiza.app, use the live chat available 9am–5pm CST, or call our emergency line 24/7 for urgent matters. You can also submit a message through our Contact page.',
      },
    ],
  },
];

const colorMap: Record<string, string> = {
  gold: 'text-kiza-gold border-kiza-gold/30 bg-kiza-gold/8',
  cyan: 'text-kiza-cyan border-kiza-cyan/30 bg-kiza-cyan/8',
  purple: 'text-kiza-purple border-kiza-purple/30 bg-kiza-purple/8',
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display font-medium text-kiza-dark-blue group-hover:text-kiza-gold transition-colors text-sm lg:text-base">
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-kiza-gold">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <p className="pb-5 text-kiza-text-secondary-dark leading-relaxed text-sm lg:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      const blocks = contentRef.current?.querySelectorAll('.faq-category');
      if (blocks) {
        gsap.fromTo(blocks,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
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

      <div className="relative px-6 lg:px-[6vw] max-w-4xl mx-auto">
        <div ref={contentRef} className="space-y-14">
          {categories.map((cat, ci) => (
            <div key={ci} className="faq-category">
              {/* Category label */}
              <div className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 mb-6 text-xs font-mono uppercase tracking-widest ${colorMap[cat.color]}`}>
                {cat.label}
              </div>

              {/* FAQ list */}
              <div className="bg-white border border-gray-100 rounded-2xl px-6 lg:px-8 shadow-sm">
                {cat.faqs.map((faq, fi) => (
                  <FAQItem key={fi} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
