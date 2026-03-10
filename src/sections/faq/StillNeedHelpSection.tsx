'use client'

/**
 * StillNeedHelpSection
 *
 * Closing CTA section on the /faq page. Displays three contact channel cards
 * (Email, Live Chat, Emergency line) and a primary button linking to /contact.
 * Encourages users who didn't find their answer in the FAQ to reach out directly.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';

/** Summary of the three main support channels shown as info cards. */
const channels = [
  {
    icon: Mail,
    color: 'gold',
    label: 'Email support',
    value: 'support@kiza.app',
    note: 'Response within 24 hours',
  },
  {
    icon: MessageCircle,
    color: 'cyan',
    label: 'Live chat',
    value: 'Available 9am – 5pm CST',
    note: 'Fastest for quick questions',
  },
  {
    icon: Clock,
    color: 'purple',
    label: 'Emergency line',
    value: '24/7 for urgent matters',
    note: 'Active hospitalisation support',
  },
];

export default function StillNeedHelpSection() {
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
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
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
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-kiza-cyan/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-4xl mx-auto">
        <div ref={contentRef}>
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Still need help?
            </p>
            <h2 className="font-display font-bold text-display-2 text-white leading-[1.1]">
              We're one message{' '}
              <span className="text-gradient">away</span>.
            </h2>
            <p className="mt-5 text-lg text-kiza-text-secondary max-w-xl mx-auto leading-relaxed">
              Our team is real people who genuinely care. Reach us on whatever channel works best for you.
            </p>
          </div>

          {/* Contact channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {channels.map((ch, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  ch.color === 'gold' ? 'bg-kiza-gold/20' :
                  ch.color === 'cyan' ? 'bg-kiza-cyan/20' :
                  'bg-kiza-purple/20'
                }`}>
                  <ch.icon className={`w-5 h-5 ${
                    ch.color === 'gold' ? 'text-kiza-gold' :
                    ch.color === 'cyan' ? 'text-kiza-cyan' :
                    'text-kiza-purple'
                  }`} />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-kiza-text-secondary mb-1">
                  {ch.label}
                </p>
                <p className="font-medium text-white mb-1">{ch.value}</p>
                <p className="text-xs text-kiza-text-secondary">{ch.note}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-10 py-6 text-base font-semibold group"
            >
              <Link href="/contact">
                Send us a message
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
