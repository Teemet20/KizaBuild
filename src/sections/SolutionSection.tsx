'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Building2, HeadphonesIcon } from 'lucide-react';


interface SolutionSectionProps {
  className?: string;
}

const benefits = [
  {
    icon: Shield,
    title: 'Verified Care',
    description: 'We settle bills directly with hospitals. You know exactly where your money went.',
    color: 'gold',
  },
  {
    icon: Building2,
    title: '750+ Elite Hospitals',
    description: 'Access to the best facilities in Nigeria, including AXA Mansard and Hygeia.',
    color: 'cyan',
  },
  {
    icon: HeadphonesIcon,
    title: 'Active Advocacy',
    description: 'Physical health cards and 24/7 support. We ensure they are never turned away.',
    color: 'purple',
  },
];

export default function SolutionSection({ className = '' }: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // Animate on desktop only (>= 1024 px). On mobile, elements render at their natural opacity.
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
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
          .fromTo(benefitsRef.current?.children || [],
            { y: '6vh', opacity: 0 },
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
          .to(benefitsRef.current?.children || [],
            { y: '4vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          )
          .to(ctaRef.current,
            { y: '6vh', opacity: 0, ease: 'power2.in' },
            0.7
          );
      }, section);

      return () => ctx.revert();
    });
    // Mobile: scroll-triggered entrance animations (no pin/scrub)
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const mobile = section.querySelector('.lg\\:hidden');
        if (!mobile) return;
        const textBlock = mobile.querySelector('.px-6');
        if (!textBlock) return;
        gsap.from(Array.from(textBlock.children), {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 88%',
            once: true,
          },
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollToPlans = () => {
    const element = document.getElementById('plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefitsMarkup = (
    <div ref={benefitsRef} className="mt-8 space-y-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            benefit.color === 'gold' ? 'bg-kiza-gold/20' :
            benefit.color === 'cyan' ? 'bg-kiza-cyan/20' :
            'bg-kiza-purple/20'
          }`}>
            <benefit.icon className={`w-5 h-5 ${
              benefit.color === 'gold' ? 'text-kiza-gold' :
              benefit.color === 'cyan' ? 'text-kiza-cyan' :
              'text-kiza-purple'
            }`} />
          </div>
          <div>
            <h4 className="font-display font-semibold text-white">{benefit.title}</h4>
            <p className="text-sm text-kiza-text-secondary">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen lg:h-screen bg-kiza-dark-blue overflow-hidden bg-gradient-radial ${className}`}
    >
      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col pt-20">
        <div
          ref={portraitRef}
          className="w-full h-[75vw] max-h-[480px] overflow-hidden"
        >
          <img
            src="/solution_portrait.jpg"
            alt="Healthcare professional"
            className="w-full h-full object-cover object-center grayscale"
          />
        </div>
        <div className="px-6 pt-8 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Solution
          </p>
          <h2
            ref={headlineRef}
            className="font-display font-bold text-[clamp(2rem,8vw,3rem)] leading-[1.1] text-white"
          >
            We replace reactive cash with{' '}
            <span className="text-gradient">proactive coverage</span>.
          </h2>
          <p
            ref={bodyRef}
            className="mt-5 text-base text-kiza-text-secondary leading-relaxed"
          >
            We verify every provider and settle bills directly. You get proof of care,
            not guesswork. Replace a $1,500 emergency bill with a steady, manageable
            $30/month subscription.
          </p>
          {benefitsMarkup}
          <div ref={ctaRef} className="mt-8">
            <Button
              onClick={scrollToPlans}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Choose a plan
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
          className="absolute left-[6vw] top-[18vh] w-[34vw] h-[64vh] rounded-2xl overflow-hidden shadow-card"
        >
          <img
            src="/solution_portrait.jpg"
            alt="Healthcare professional"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Right Typography Block */}
        <div className="absolute left-[46vw] top-[18vh] w-[48vw]">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            The Solution
          </p>

          <h2
            ref={headlineRef}
            className="font-display font-bold text-display-2 text-white"
          >
            We replace reactive cash with{' '}
            <span className="text-gradient">proactive coverage</span>.
          </h2>

          <p
            ref={bodyRef}
            className="mt-6 text-lg text-kiza-text-secondary max-w-lg leading-relaxed"
          >
            We verify every provider and settle bills directly. You get proof of care,
            not guesswork. Replace a $1,500 emergency bill with a steady, manageable
            $30/month subscription.
          </p>

          {benefitsMarkup}

          <div ref={ctaRef} className="mt-10">
            <Button
              onClick={scrollToPlans}
              className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-8 py-6 text-base font-semibold group"
            >
              Choose a plan
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
