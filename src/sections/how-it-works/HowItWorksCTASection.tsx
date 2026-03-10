'use client'

/**
 * HowItWorksCTASection
 *
 * Closing white section on the /how-it-works page. Displays two trust-signal
 * pills (instant coverage, cancel anytime) and primary + secondary CTAs
 * linking to /plans and /contact respectively.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Shield } from 'lucide-react';


export default function HowItWorksCTASection() {
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
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-4xl mx-auto text-center">
        <div ref={contentRef}>
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-6">
            Ready to start?
          </p>

          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
            Your family's peace of mind{' '}
            <span className="text-gradient">starts here</span>.
          </h2>

          <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed max-w-xl mx-auto">
            Join thousands of families who've replaced the 2 AM panic call with a
            steady plan and a team that answers every time.
          </p>

          {/* Trust signals */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-kiza-text-secondary-dark">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-kiza-gold" />
              <span>Takes 3 minutes to enroll</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-kiza-cyan" />
              <span>Cancel anytime, no penalty</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-10 py-6 text-base font-semibold group"
            >
              <Link href="/#plans">
                Explore plans
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-kiza-dark-blue/20 text-kiza-dark-blue hover:bg-kiza-dark-blue/5 bg-transparent group"
            >
              <Link href="/about">Learn about us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
