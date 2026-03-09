'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Headphones, Bell, ShieldCheck } from 'lucide-react';


interface SupportSectionProps {
  className?: string;
}

const supportFeatures = [
  {
    icon: CreditCard,
    title: 'Physical Cards',
    description: 'Your family receives a Kiza ID card delivered to their doorstep.',
    color: 'gold',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our local team is always available to help your family.',
    color: 'cyan',
  },
  {
    icon: Bell,
    title: 'Appointment Reminders',
    description: 'We ensure they never miss a checkup or follow-up.',
    color: 'purple',
  },
  {
    icon: ShieldCheck,
    title: 'Never Turned Away',
    description: 'We advocate for your family at every hospital visit.',
    color: 'gold',
  },
];

export default function SupportSection({ className = '' }: SupportSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          }
        });

        scrollTl
          .fromTo(portraitRef.current,
            { x: '-50vw', opacity: 0, scale: 1.06 },
            { x: 0, opacity: 1, scale: 1, ease: 'none' },
            0
          )
          .fromTo(headlineRef.current,
            { x: '40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(bodyRef.current,
            { x: '40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.05
          )
          .fromTo(featuresRef.current?.children || [],
            { y: '4vh', opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
            0.1
          )
          .fromTo(ctaRef.current,
            { y: '10vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15
          )
          .to(portraitRef.current,
            { x: '-18vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(headlineRef.current,
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .to(bodyRef.current,
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.72
          )
          .to(featuresRef.current?.children || [],
            { y: '2vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          )
          .to(ctaRef.current,
            { y: '6vh', opacity: 0, ease: 'power2.in' },
            0.7
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const featureItems = supportFeatures.map((feature, index) => (
    <div key={index} className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        feature.color === 'gold' ? 'bg-kiza-gold/20' :
        feature.color === 'cyan' ? 'bg-kiza-cyan/20' :
        'bg-kiza-purple/20'
      }`}>
        <feature.icon className={`w-4 h-4 ${
          feature.color === 'gold' ? 'text-kiza-gold' :
          feature.color === 'cyan' ? 'text-kiza-cyan' :
          'text-kiza-purple'
        }`} />
      </div>
      <div>
        <h4 className="font-display font-semibold text-sm text-kiza-dark-blue">{feature.title}</h4>
        <p className="text-xs text-kiza-text-secondary-dark">{feature.description}</p>
      </div>
    </div>
  ));

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen lg:h-screen bg-white overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-radial-light" />

      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col pt-20">
        <div className="w-full h-[75vw] max-h-[480px] overflow-hidden">
          <img
            src="/support_portrait.jpg"
            alt="Elderly woman with dignified expression"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Our Promise
          </p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-kiza-dark-blue"
          >
            We don't just provide a policy.{' '}
            <span className="text-gradient">We manage the care.</span>
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 text-base text-kiza-text-secondary-dark leading-relaxed"
          >
            We are powered by code but driven by empathy. Our technology handles the
            payments and verification, but our local operations teams ensure the service
            is delivered.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {featureItems}
          </div>
          <div ref={ctaRef} className="mt-8">
            <Button
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Talk to support
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex relative w-full h-full items-center">
        {/* Left Portrait Card */}
        <div
          ref={portraitRef}
          className="absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card-light"
        >
          <img
            src="/support_portrait.jpg"
            alt="Elderly woman with dignified expression"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Right Typography Block */}
        <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            Our Promise
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-kiza-dark-blue"
          >
            We don't just provide a policy.{' '}
            <span className="text-gradient">We manage the care.</span>
          </h2>

          <p
            ref={bodyRef}
            className="mt-6 text-lg text-kiza-text-secondary-dark max-w-lg leading-relaxed"
          >
            We are powered by code but driven by empathy. Our technology handles the
            payments and verification, but our local operations teams ensure the service
            is delivered.
          </p>

          {/* Features Grid */}
          <div ref={featuresRef} className="mt-8 grid grid-cols-2 gap-4">
            {featureItems}
          </div>

          <div ref={ctaRef} className="mt-10">
            <Button
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Talk to support
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
