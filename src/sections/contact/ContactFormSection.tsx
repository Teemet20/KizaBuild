'use client'

/**
 * ContactFormSection
 *
 * Two-column layout for the /contact page:
 * - Left  : four contact channel cards (Email, Phone, Live Chat, Emergency)
 *           plus a link to the FAQ page.
 * - Right : a contact form with a topic dropdown and a success state.
 *
 * The form submission is currently simulated with a 1.2-second timeout.
 * Replace the `handleSubmit` body with a real API call (e.g. Resend, SendGrid)
 * before going to production.
 */

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Clock, Phone, Send, CheckCircle } from 'lucide-react';

/** Contact channels displayed in the left column. */
const channels = [
  {
    icon: Mail,
    color: 'gold',
    label: 'Email',
    value: 'support@kiza.app',
    note: 'We respond within 24 hours',
    href: 'mailto:support@kiza.app',
  },
  {
    icon: Phone,
    color: 'cyan',
    label: 'Phone',
    value: '+1 (800) KIZ-AAPP',
    note: 'Mon – Fri, 9am – 5pm CST',
    href: 'tel:+18005492277',
  },
  {
    icon: MessageCircle,
    color: 'purple',
    label: 'Live Chat',
    value: 'Chat with us',
    note: 'Available 9am – 5pm CST',
    href: '#',
  },
  {
    icon: Clock,
    color: 'gold',
    label: 'Emergency Support',
    value: '24/7 for urgent care',
    note: 'Active hospitalisation situations',
    href: '#',
  },
];

/** Topic options for the form's subject dropdown. */
const topics = [
  'General enquiry',
  'Account & billing',
  'Coverage question',
  'Adding a beneficiary',
  'Emergency support',
  'Partnership',
  'Other',
];

/** Tracks the lifecycle of a form submission. */
type FormState = 'idle' | 'submitting' | 'success';

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [topic, setTopic]         = useState(topics[0]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      // Left column slides in from the left; right column from the right.
      gsap.fromTo(leftRef.current?.children ?? [],
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(rightRef.current?.children ?? [],
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  /**
   * Handles form submission.
   * Currently simulates a network request with a 1.2 s delay.
   * TODO: replace with a real API call before launch.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1200);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      {/* Radial gradient background wash */}
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left column: contact channels ───────────────────────────── */}
          <div ref={leftRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Get in Touch
            </p>
            <h2 className="font-display font-bold text-display-3 text-kiza-dark-blue leading-[1.1] mb-6">
              Real people.<br />Real answers.
            </h2>
            <p className="text-lg text-kiza-text-secondary-dark leading-relaxed mb-10">
              Whether you have a quick question or a complex care situation, we're ready.
              Choose the channel that works best for you.
            </p>

            {/* Channel cards */}
            <div className="space-y-5">
              {channels.map((ch, i) => (
                <a
                  key={i}
                  href={ch.href}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-kiza-gold/30 hover:shadow-sm transition-all group"
                >
                  {/* Icon coloured by channel type */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    ch.color === 'gold'   ? 'bg-kiza-gold/15'   :
                    ch.color === 'cyan'   ? 'bg-kiza-cyan/15'   :
                    'bg-kiza-purple/15'
                  }`}>
                    <ch.icon className={`w-5 h-5 ${
                      ch.color === 'gold'   ? 'text-kiza-gold'   :
                      ch.color === 'cyan'   ? 'text-kiza-cyan'   :
                      'text-kiza-purple'
                    }`} />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-kiza-text-secondary-dark mb-0.5">
                      {ch.label}
                    </p>
                    <p className="font-medium text-kiza-dark-blue group-hover:text-kiza-gold transition-colors">
                      {ch.value}
                    </p>
                    <p className="text-xs text-kiza-text-secondary-dark mt-0.5">{ch.note}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* FAQ link */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-sm text-kiza-text-secondary-dark">
                Looking for answers first?{' '}
                <Link href="/faq" className="text-kiza-gold hover:underline font-medium">
                  Browse our FAQ
                </Link>
              </p>
            </div>
          </div>

          {/* ── Right column: contact form ───────────────────────────────── */}
          <div ref={rightRef}>
            <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 shadow-card-light">

              {/* Success state — replaces the form once submission completes */}
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-kiza-gold/15 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-kiza-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-kiza-dark-blue mb-3">
                    Message sent!
                  </h3>
                  <p className="text-kiza-text-secondary-dark leading-relaxed">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-sm text-kiza-gold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* Idle / submitting state — the actual form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="font-display font-semibold text-xl text-kiza-dark-blue mb-1">
                      Send us a message
                    </p>
                    <p className="text-sm text-kiza-text-secondary-dark">
                      We typically respond within one business day.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      required
                      placeholder="First name"
                      className="bg-gray-50 border-gray-100 text-kiza-dark-blue placeholder:text-kiza-text-secondary-dark focus:border-kiza-gold rounded-xl"
                    />
                    <Input
                      required
                      placeholder="Last name"
                      className="bg-gray-50 border-gray-100 text-kiza-dark-blue placeholder:text-kiza-text-secondary-dark focus:border-kiza-gold rounded-xl"
                    />
                  </div>

                  <Input
                    required
                    type="email"
                    placeholder="Email address"
                    className="bg-gray-50 border-gray-100 text-kiza-dark-blue placeholder:text-kiza-text-secondary-dark focus:border-kiza-gold rounded-xl"
                  />

                  {/* Topic dropdown — helps route the message internally */}
                  <div>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 text-kiza-dark-blue rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-kiza-gold transition-colors"
                    >
                      {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <Textarea
                    required
                    placeholder="How can we help?"
                    rows={5}
                    className="bg-gray-50 border-gray-100 text-kiza-dark-blue placeholder:text-kiza-text-secondary-dark focus:border-kiza-gold rounded-xl resize-none"
                  />

                  {/* Submit button — disabled while request is in-flight */}
                  <Button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full py-6 text-base font-semibold group disabled:opacity-70"
                  >
                    {formState === 'submitting' ? 'Sending…' : (
                      <>
                        Send message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-kiza-text-secondary-dark text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="underline hover:text-kiza-dark-blue">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
