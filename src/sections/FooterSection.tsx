'use client'

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, Mail, MessageCircle, Clock, Send, ArrowRight } from 'lucide-react';

interface FooterSectionProps {
  className?: string;
}

const faqs = [
  {
    question: 'Is Kiza an insurance company?',
    answer: 'No. Kiza is a technology platform and care membership community. We use the collective power of our members to purchase group insurance policies from licensed providers. You pay us for the platform and management; the insurer holds the risk.',
  },
  {
    question: 'Can I use this for myself if I live in the US?',
    answer: 'No. The healthcare benefits are strictly for beneficiaries residing in our coverage areas (currently Nigeria). The Kiza platform is for you to manage that coverage from abroad.',
  },
  {
    question: 'How do I know the premium is actually paid?',
    answer: 'That is our core promise. Our "Verified" badge is backed by real-time confirmation from the insurer. You can see the validity dates right in your dashboard.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'We provide a grace period, but continuous coverage requires an active membership. If your subscription lapses, the insurance coverage for your beneficiary will pause.',
  },
  {
    question: 'Which hospitals can my family visit?',
    answer: 'Your family will have access to over 2,000 accredited hospitals across Nigeria through our licensed insurer partners.',
  },
  {
    question: 'What happens if my family member loses their physical card?',
    answer: 'Every beneficiary has a Digital Health ID accessible via the Kiza platform. They can show this on any smartphone to gain entry. You can also request a replacement physical card through your dashboard.',
  },
];

export default function FooterSection({ className = '' }: FooterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(ctaRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
        gsap.fromTo(contactRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
        const formFields = contactRef.current?.querySelectorAll('.form-field');
        if (formFields) {
          gsap.fromTo(formFields,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: contactRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
            }
          );
        }
        gsap.fromTo(faqRef.current,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: faqRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
        gsap.fromTo(footerRef.current,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        );
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`relative w-full bg-kiza-dark-blue py-20 lg:py-28 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="relative px-6 lg:px-[6vw]">
        {/* Final CTA Block */}
        <div ref={ctaRef} className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-display font-bold text-display-2 text-white mb-6">
            Protect what matters — <span className="text-gradient">starting today</span>.
          </h2>
          <p className="text-lg text-kiza-text-secondary leading-relaxed mb-8">
            Join the growing community replacing emergency cash with real coverage.
            Turn healthcare from a favour into a right.
          </p>
          <Button
            onClick={scrollToPlans}
            className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-10 py-6 text-base font-semibold group animate-pulse-glow"
          >
            See plans & pricing
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-6 text-xs text-kiza-text-secondary uppercase tracking-widest">
            Takes minutes. No hidden fees.
          </p>
        </div>

        {/* Contact Block */}
        <div ref={contactRef} className="mb-20">
          <h3 className="font-display font-semibold text-2xl text-white mb-10">
            Questions? We're here.
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-kiza-gold/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-kiza-gold" />
                </div>
                <div>
                  <p className="text-sm text-kiza-text-secondary">Member Support</p>
                  <p className="text-white">support@kiza.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-kiza-cyan/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-kiza-cyan" />
                </div>
                <div>
                  <p className="text-sm text-kiza-text-secondary">Live Chat</p>
                  <p className="text-white">Available 9am – 5pm CST</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-kiza-purple/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-kiza-purple" />
                </div>
                <div>
                  <p className="text-sm text-kiza-text-secondary">Urgent Matters</p>
                  <p className="text-white">24/7 emergency line</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div className="form-field">
                <Input
                  placeholder="Your name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-kiza-text-secondary focus:border-kiza-gold rounded-lg"
                />
              </div>
              <div className="form-field">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-kiza-text-secondary focus:border-kiza-gold rounded-lg"
                />
              </div>
              <div className="form-field">
                <Textarea
                  placeholder="Your message"
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-kiza-text-secondary focus:border-kiza-gold rounded-lg resize-none"
                />
              </div>
              <div className="form-field">
                <Button className="bg-kiza-gold text-kiza-dark-blue hover:bg-kiza-gold/90 rounded-full px-6 py-5 font-semibold group w-full sm:w-auto">
                  Send message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="max-w-3xl mx-auto mb-20">
          <h3 className="font-display font-semibold text-2xl text-white mb-8 text-center">
            Frequently Asked Questions
          </h3>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span className="text-white font-medium pr-4 group-hover:text-kiza-gold transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-kiza-text-secondary flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-kiza-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="border-t border-white/10 pt-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <img
                src="/logo-white.png"
                alt="Kiza"
                className="h-8 w-auto mb-2"
              />
              <p className="text-sm text-kiza-text-secondary">
                Verified healthcare for your family in Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-sm text-kiza-text-secondary hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-kiza-text-secondary hover:text-white transition-colors">
                Terms
              </a>
              <a href="#plans" className="text-sm text-kiza-text-secondary hover:text-white transition-colors">
                Plans
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-kiza-text-secondary/60 leading-relaxed">
              Kiza Tech LLC is a US-based technology company (Houston, TX) providing a digital platform for cross-border
              care management. Kiza is not an insurance carrier, broker, or underwriter. All healthcare
              coverage benefits are fulfilled by our local administrator, Kiza Nigeria Ltd, through
              Master Group Policies underwritten by licensed insurance partners.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-kiza-text-secondary/40">
              © {new Date().getFullYear()} Kiza Tech LLC. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
