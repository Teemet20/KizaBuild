import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import ContactHeroSection from '@/sections/contact/ContactHeroSection';
import ContactFormSection from '@/sections/contact/ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact Us — Kiza',
  description:
    'Get in touch with the Kiza team. Email, phone, live chat, or 24/7 emergency support — we\'re here whenever you need us.',
};

export default function ContactPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <div className="grain-overlay" />
      <InnerNavigation />
      <main className="relative">
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </div>
  );
}
