'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Smartphone, Heart, CheckCircle, Users } from 'lucide-react';


interface WhoWeServeSectionProps {
  className?: string;
}

export default function WhoWeServeSection({ className = '' }: WhoWeServeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.serve-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-24 lg:py-32 bg-white overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-light" />
      
      <div className="relative px-6 lg:px-[6vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Dual Promise
          </p>
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            Who We Serve
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* For You (The Diaspora Payer) */}
          <div className="serve-card relative bg-white border border-gray-100 shadow-card-light rounded-2xl p-8 lg:p-10 overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-kiza-gold/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-kiza-gold/20 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-kiza-gold" />
              </div>
              
              <h3 className="font-display font-semibold text-2xl text-kiza-dark-blue mb-2">
                For You
              </h3>
              <p className="text-kiza-gold text-sm font-medium mb-4">
                The Diaspora Payer
              </p>
              
              <h4 className="font-display font-semibold text-xl text-kiza-dark-blue mb-4">
                Control & Peace of Mind
              </h4>
              
              <p className="text-kiza-text-secondary-dark leading-relaxed mb-6">
                For African professionals living abroad, Kiza offers a seamless way to secure
                affordable and reliable health insurance for your cherished family members back home.
                You can ensure their well-being from miles away, without any worry.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-gold flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Real-time dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-gold flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Verified care notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-gold flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Payment confirmation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* For Them (The Local Beneficiary) */}
          <div className="serve-card relative bg-white border border-gray-100 shadow-card-light rounded-2xl p-8 lg:p-10 overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-kiza-cyan/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-kiza-cyan/20 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-kiza-cyan" />
              </div>
              
              <h3 className="font-display font-semibold text-2xl text-kiza-dark-blue mb-2">
                For Them
              </h3>
              <p className="text-kiza-cyan text-sm font-medium mb-4">
                The Local Beneficiary
              </p>
              
              <h4 className="font-display font-semibold text-xl text-kiza-dark-blue mb-4">
                Dignity & Access
              </h4>
              
              <p className="text-kiza-text-secondary-dark leading-relaxed mb-6">
                For communities across Africa, in both bustling cities and remote rural areas,
                Kiza provides access to quality health coverage that fits your budget.
                We remove complexity, so dependable care is always within reach.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-cyan flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Physical Kiza ID card</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-cyan flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Cashless hospital visits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-kiza-cyan flex-shrink-0" />
                  <span className="text-sm text-kiza-text-secondary-dark">Priority treatment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-kiza-gold/10 to-transparent border border-kiza-gold/20 rounded-2xl p-8 lg:p-12">
            <Users className="w-8 h-8 text-kiza-gold mx-auto mb-6" />
            <blockquote className="text-lg lg:text-xl text-kiza-dark-blue leading-relaxed mb-6">
              "Kiza made it incredibly easy to get health coverage for my parents in Ghana.
              <span className="text-kiza-gold"> Knowing they're covered gives me so much peace of mind.</span>"
            </blockquote>
            <cite className="not-italic">
              <span className="text-kiza-dark-blue font-medium">Hear From Our Community</span>
              <span className="text-kiza-text-secondary-dark"> — Real stories from Kiza members</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
