'use client'

/**
 * FeaturedStorySection
 *
 * Hero story on the /stories page — Amara O. (London → Lagos).
 * Two-column layout: grayscale portrait on the left, long-form story copy
 * with a pull-quote block on the right. The portrait slides in from the left
 * while the content staggered-fades in from below.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Quote } from 'lucide-react';

export default function FeaturedStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(portraitRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(contentRef.current?.children ?? [],
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
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-light" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        {/* Featured label */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 bg-kiza-gold/10 border border-kiza-gold/20 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-kiza-gold">
            Featured Story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="w-full aspect-[4/5] max-h-[580px] rounded-2xl overflow-hidden shadow-card-light relative"
          >
            <img
              src="/hero_portrait.jpg"
              alt="Amara O."
              className="w-full h-full object-cover grayscale"
            />
            {/* Name tag */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-sm">
              <p className="font-display font-semibold text-kiza-dark-blue">Amara O.</p>
              <p className="text-xs text-kiza-text-secondary-dark">London, UK — covering family in Lagos</p>
            </div>
          </div>

          {/* Story content */}
          <div ref={contentRef}>
            <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
              Member since 2024
            </p>

            <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue leading-[1.1]">
              How Amara Secured His Mother's Care from 4,000 Miles Away
            </h2>

            <p className="mt-6 text-lg text-kiza-text-secondary-dark leading-relaxed">
              For years, Amara handled his mother's health the only way he knew how — bank transfers
              and phone calls, hoping the money arrived before the emergency did.
            </p>

            <p className="mt-4 text-lg text-kiza-text-secondary-dark leading-relaxed">
              When his mother was diagnosed with hypertension in early 2024, the 2 AM calls became
              weekly. He needed something more than cash. He needed certainty. That's when he
              found Kiza.
            </p>

            <p className="mt-4 text-lg text-kiza-text-secondary-dark leading-relaxed">
              Within three minutes, his mother was enrolled on the Gold Plan. She received her
              physical Kiza ID card within the week and walked into a verified specialist clinic
              in Lagos without paying a naira at the door.
            </p>

            {/* Pull quote */}
            <div className="mt-10 relative bg-gradient-to-br from-kiza-gold/8 to-transparent border border-kiza-gold/20 rounded-2xl p-8">
              <Quote className="w-8 h-8 text-kiza-gold/40 mb-4" />
              <blockquote className="font-display text-xl text-kiza-dark-blue leading-relaxed">
                "I used to wire money and just hope for the best. With Kiza, I saw the
                confirmation the moment my mum's appointment was booked.{' '}
                <span className="text-kiza-gold">That changed everything.</span>"
              </blockquote>
              <cite className="not-italic block mt-4 text-sm text-kiza-text-secondary-dark">
                — Amara O., London UK
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
