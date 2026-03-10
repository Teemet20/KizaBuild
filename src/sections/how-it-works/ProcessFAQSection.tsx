'use client'

/**
 * ProcessFAQSection
 *
 * Dark accordion FAQ section on the /how-it-works page covering six
 * process-specific questions (enrollment time, cancellation, ID card
 * delivery, etc.). Uses the same CSS max-height accordion pattern as
 * FAQCategoriesSection — each item manages its own open state.
 */

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Plus, Minus } from 'lucide-react';

/** Process-specific FAQs displayed in this section. */
const faqs = [
  {
    question: 'How quickly does coverage start?',
    answer:
      'Coverage is active as soon as your payment is confirmed — typically within seconds. Your beneficiary can start using their coverage at any of our partner hospitals right away while their physical card is being printed and shipped.',
  },
  {
    question: 'Can I cover more than one family member?',
    answer:
      'Yes. You can add multiple beneficiaries under one account. Each person gets their own Kiza ID card and individual coverage. You manage and pay for all of them from a single dashboard.',
  },
  {
    question: 'What if my family member is in a rural area?',
    answer:
      'Our network spans all 36 states in Nigeria, including rural and semi-urban areas. We continuously expand our partner provider list. If your specific area isn\'t covered, our support team will work with you to find the nearest verified facility.',
  },
  {
    question: 'What currencies can I pay in?',
    answer:
      'We accept USD, GBP, CAD, and EUR through Stripe. All payments are processed securely and converted at live exchange rates. You will always see the exact amount charged before confirming.',
  },
  {
    question: 'What happens if a hospital refuses my beneficiary?',
    answer:
      'This should never happen, but if it does, call our 24/7 support line immediately. Our advocacy team will contact the hospital directly on your behalf and resolve the situation in real time.',
  },
  {
    question: 'Can I cancel or change my plan at any time?',
    answer:
      'Yes. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard. Cancellations take effect at the end of your current billing cycle. No penalty fees.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display font-medium text-white group-hover:text-kiza-gold transition-colors">
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-kiza-gold">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div
        ref={bodyRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="pb-5 text-kiza-text-secondary leading-relaxed text-sm lg:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function ProcessFAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
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
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-kiza-dark-blue overflow-hidden bg-gradient-radial"
    >
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-kiza-purple/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-3xl mx-auto">
        <div ref={contentRef}>
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Common Questions
          </p>
          <h2 className="font-display font-bold text-display-2 text-white mb-12">
            Good questions deserve{' '}
            <span className="text-gradient">clear answers</span>.
          </h2>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
