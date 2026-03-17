'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { MapPin, Building2, Stethoscope, CreditCard, HeadphonesIcon, ShieldCheck, Users } from 'lucide-react';

interface CareSectionProps {
  className?: string;
}

const networkStats = [
  { icon: MapPin, value: '36', label: 'States covered' },
  { icon: Building2, value: '2,000+', label: 'Accredited hospitals' },
  { icon: Stethoscope, value: '50+', label: 'Specialist networks' },
];

const supportFeatures = [
  {
    icon: CreditCard,
    title: 'Physical Cards',
    description: 'Your family receives a Kiza health card delivered to their doorstep.',
    color: 'gold',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    description: 'Our local team is available to help your family navigate care.',
    color: 'cyan',
  },
  {
    icon: ShieldCheck,
    title: 'Active Advocacy',
    description: 'We advocate for your family at every hospital visit.',
    color: 'gold',
  },
];

export default function CareSection({ className = '' }: CareSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(networkRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: networkRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
          }
        );
        gsap.fromTo(supportRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: supportRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
          }
        );
        gsap.fromTo(testimonialRef.current,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: testimonialRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="community" className={`relative w-full bg-white py-24 lg:py-32 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial-light" />
      <div className="relative px-6 lg:px-[6vw]">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            What your family gets
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark max-w-2xl mx-auto">
            We don't just provide a policy. We make sure the care is delivered.
          </p>
        </div>

        {/* Network + Coverage */}
        <div ref={networkRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: portrait + stats */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-card-light h-[280px] lg:h-[360px] mb-8">
              <img src="/coverage_portrait.jpg" alt="Mother and child in Nigeria" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-8 flex-wrap justify-center lg:justify-start">
              {networkStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-kiza-gold/20 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-5 h-5 text-kiza-gold" />
                  </div>
                  <p className="font-display text-2xl font-bold text-kiza-dark-blue">{stat.value}</p>
                  <p className="text-xs text-kiza-text-secondary-dark">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-kiza-text-secondary-dark text-center lg:text-left">
              Through our licensed insurer partners across Nigeria
            </p>
          </div>

          {/* Right: support features */}
          <div ref={supportRef}>
            <div className="rounded-2xl overflow-hidden shadow-card-light h-[280px] lg:h-[360px] mb-8">
              <img src="/support_portrait.jpg" alt="Elderly woman receiving care" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5">
              {supportFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    feature.color === 'gold' ? 'bg-kiza-gold/20' : 'bg-kiza-cyan/20'
                  }`}>
                    <feature.icon className={`w-5 h-5 ${
                      feature.color === 'gold' ? 'text-kiza-gold' : 'text-kiza-cyan'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-kiza-dark-blue">{feature.title}</h4>
                    <p className="text-sm text-kiza-text-secondary-dark">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial placeholder */}
        <div ref={testimonialRef} className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-kiza-gold/10 to-transparent border border-kiza-gold/20 rounded-2xl p-8 lg:p-12">
            <Users className="w-8 h-8 text-kiza-gold mx-auto mb-6" />
            <p className="text-xs uppercase tracking-widest text-kiza-gold mb-4">What peace of mind sounds like</p>
            <blockquote className="text-lg lg:text-xl text-kiza-dark-blue leading-relaxed mb-6">
              "Kiza made it incredibly easy to get health coverage for my parents in Nigeria.
              <span className="text-kiza-gold"> Knowing they're covered gives me so much peace of mind.</span>"
            </blockquote>
            <cite className="not-italic">
              <span className="text-kiza-text-secondary-dark text-sm">— Kiza member</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
