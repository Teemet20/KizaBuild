'use client'

/**
 * ShareYourStorySection
 *
 * Closing CTA on the /stories page. Invites members to submit their own
 * story via the /contact form. Includes a reassurance note that stories
 * are only published with explicit member consent.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

export default function ShareYourStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children ?? [],
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
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-3xl mx-auto text-center">
        <div ref={contentRef}>
          <div className="w-14 h-14 rounded-2xl bg-kiza-gold/15 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-7 h-7 text-kiza-gold" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Your Story Matters
          </p>

          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
            Has Kiza made a difference{' '}
            <span className="text-gradient">for your family?</span>
          </h2>

          <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed max-w-xl mx-auto">
            We'd love to hear it. Every story shared helps another family in the diaspora
            find the certainty they're searching for. Your experience could be the one
            that changes someone else's life.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-10 py-6 text-base font-semibold group"
            >
              <Link href="/contact">
                Share your story
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-kiza-dark-blue/20 text-kiza-dark-blue hover:bg-kiza-dark-blue/5 bg-transparent"
            >
              <Link href="/plans">Get started with Kiza</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-kiza-text-secondary-dark">
            Stories are shared with your permission only. We never publish without consent.
          </p>
        </div>
      </div>
    </section>
  );
}
