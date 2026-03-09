'use client'

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { UserPlus, Users, ClipboardList, CreditCard, CheckCircle } from 'lucide-react';


interface HowItWorksSectionProps {
  className?: string;
}

const steps = [
  {
    number: '01',
    title: 'Register',
    description: 'Sign up for a Kiza Care Membership in seconds. It is designed to be seamless.',
    icon: UserPlus,
    color: 'gold',
  },
  {
    number: '02',
    title: 'Add Beneficiary',
    description: 'Create a profile for your Mom, Dad, or Uncle in Nigeria or Ghana. Our system instantly secures their details.',
    icon: Users,
    color: 'cyan',
  },
  {
    number: '03',
    title: 'Choose Care Option',
    description: 'Select the HMO plan that fits their specific needs—whether it\'s standard coverage or premium care.',
    icon: ClipboardList,
    color: 'purple',
  },
  {
    number: '04',
    title: 'Pay',
    description: 'Complete your subscription payment via Stripe using your local currency (USD/GBP/CAD).',
    icon: CreditCard,
    color: 'gold',
  },
  {
    number: '05',
    title: 'Relax',
    description: 'We handle the rest. You get a \'Verified\' badge on your dashboard; they get a physical ID card and access to cashless care.',
    icon: CheckCircle,
    color: 'cyan',
  },
];

export default function HowItWorksSection({ className = '' }: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Steps animation with stagger
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');
      if (stepItems) {
        gsap.fromTo(stepItems,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Numbers animation
      const numbers = stepsRef.current?.querySelectorAll('.step-number');
      if (numbers) {
        gsap.fromTo(numbers,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`relative w-full py-24 lg:py-32 bg-white overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial-light" />
      
      <div className="relative px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-kiza-gold mb-4">
            How It Works
          </p>
          <h2 className="font-display font-bold text-display-2 text-kiza-dark-blue">
            The 5-Step Peace of Mind Flow
          </h2>
          <p className="mt-4 text-lg text-kiza-text-secondary-dark">
            From registration to relaxation in minutes, not days.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item relative"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-kiza-gold/30 to-transparent" />
              )}
              
              <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full hover:border-kiza-gold/30 transition-colors shadow-sm">
                {/* Number */}
                <span className={`step-number font-mono text-4xl font-bold block mb-4 ${
                  step.color === 'gold' ? 'text-kiza-gold' :
                  step.color === 'cyan' ? 'text-kiza-cyan' :
                  'text-kiza-purple'
                }`}>
                  {step.number}
                </span>
                
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  step.color === 'gold' ? 'bg-kiza-gold/20' :
                  step.color === 'cyan' ? 'bg-kiza-cyan/20' :
                  'bg-kiza-purple/20'
                }`}>
                  <step.icon className={`w-5 h-5 ${
                    step.color === 'gold' ? 'text-kiza-gold' :
                    step.color === 'cyan' ? 'text-kiza-cyan' :
                    'text-kiza-purple'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-kiza-dark-blue mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-kiza-text-secondary-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
