'use client'

/**
 * StoriesGridSection
 *
 * A 3-column masonry-style grid of member impact stories on the /stories page.
 * Each card shows who the member is, where they live, who they're covering,
 * which plan they're on, a headline, a short excerpt, and a pull quote.
 *
 * Plan colour-coding: gold = Premium Plus, cyan = Premium.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Quote } from 'lucide-react';

/** Member impact stories displayed in the grid. */
const stories = [
  {
    name: 'Chisom N.',
    location: 'Houston, TX',
    covering: 'Father in Abuja',
    plan: 'Premium Plus',
    planColor: 'gold',
    headline: "How Chisom Put Her Father's Diabetes Under Control From Texas",
    excerpt:
      "Her father had been managing Type 2 diabetes with market-bought medicine and occasional clinic visits. After enrolling him on Kiza's Premium Plus plan, he now sees a specialist monthly — without Chisom having to wire emergency funds.",
    quote: 'He called me last week just to say thank you — not because something went wrong, but because something finally went right.',
  },
  {
    name: 'Taiwo A.',
    location: 'Toronto, Canada',
    covering: 'Parents in Ibadan',
    plan: 'Premium',
    planColor: 'cyan',
    headline: "Two Parents, One Plan — Taiwo's Story",
    excerpt:
      "Taiwo's parents are both in their 70s. He was spending over $400 a month reacting to health emergencies. With Kiza, he enrolled both of them and now pays a fraction of that — predictably, every month.",
    quote: 'The peace of mind alone is worth more than what I pay. I actually sleep through the night now.',
  },
  {
    name: 'Ngozi K.',
    location: 'Manchester, UK',
    covering: 'Grandmother in Port Harcourt',
    plan: 'Premium',
    planColor: 'cyan',
    headline: "Ngozi's 80-Year-Old Grandmother Got Her Kiza Card — and Used It Within a Week",
    excerpt:
      "Ngozi's grandmother had never had health insurance in her life. Seven days after enrollment, she walked into a Kiza-verified clinic with her physical card. No cash. No drama. Just care.",
    quote: "She didn't even know what insurance was before. Now she carries that card like a trophy.",
  },
  {
    name: 'Emeka B.',
    location: 'Dubai, UAE',
    covering: 'Sister in Enugu',
    plan: 'Premium',
    planColor: 'cyan',
    headline: "How Emeka Helped His Sister Navigate Pregnancy Care Stress-Free",
    excerpt:
      "When his sister became pregnant, Emeka wanted to make sure she had access to consistent antenatal care — not just emergency visits. Kiza's network in Enugu gave her exactly that, every step of the way.",
    quote: 'I was in Dubai for the birth of my nephew. But I was there for every step of his journey into the world.',
  },
  {
    name: 'Adaeze M.',
    location: 'Atlanta, GA',
    covering: 'Uncle in Lagos',
    plan: 'Premium Plus',
    planColor: 'gold',
    headline: "Adaeze's Uncle Had a Heart Scare — Kiza Had a Cardiologist Ready",
    excerpt:
      "Her uncle collapsed at work. In the past, that would have meant a frantic search for cash and a hospital that would admit him. With Kiza Premium Plus, a cardiologist was ready within hours at a verified partner hospital.",
    quote: "The advocacy team called the hospital before he even arrived. I didn't have to do anything except pray.",
  },
];

const planColors: Record<string, string> = {
  gold: 'bg-kiza-gold/10 text-kiza-gold border-kiza-gold/20',
  cyan: 'bg-kiza-cyan/10 text-kiza-cyan border-kiza-cyan/20',
};

export default function StoriesGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.story-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-kiza-dark-blue overflow-hidden bg-gradient-radial">
      <div className="absolute top-0 left-0 w-[40vw] h-[40vh] bg-kiza-purple/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw] max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            More Stories
          </p>
          <h2 className="font-display font-bold text-display-2 text-white">
            Every family has a story.{' '}
            <span className="text-gradient">Here are a few.</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="story-card flex flex-col bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors"
            >
              {/* Plan badge */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-display font-semibold text-white">{story.name}</p>
                  <p className="text-xs text-kiza-text-secondary mt-0.5">{story.location}</p>
                </div>
                <span className={`text-xs font-mono border rounded-full px-3 py-1 ${planColors[story.planColor]}`}>
                  {story.plan}
                </span>
              </div>

              <p className="text-xs text-kiza-text-secondary mb-4 font-mono uppercase tracking-widest">
                Covering: {story.covering}
              </p>

              <h3 className="font-display font-semibold text-white text-base leading-snug mb-4">
                {story.headline}
              </h3>

              <p className="text-sm text-kiza-text-secondary leading-relaxed mb-6 flex-1">
                {story.excerpt}
              </p>

              {/* Quote */}
              <div className="border-t border-white/10 pt-5">
                <Quote className="w-5 h-5 text-kiza-gold/50 mb-2" />
                <p className="text-sm text-kiza-text-secondary italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
