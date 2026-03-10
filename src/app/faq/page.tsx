import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import FAQHeroSection from '@/sections/faq/FAQHeroSection';
import FAQCategoriesSection from '@/sections/faq/FAQCategoriesSection';
import StillNeedHelpSection from '@/sections/faq/StillNeedHelpSection';

export const metadata: Metadata = {
  title: 'FAQ — Kiza',
  description:
    'Answers to the most common questions about Kiza — how it works, what\'s covered, billing, and support.',
};

export default function FAQPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <div className="grain-overlay" />
      <InnerNavigation />
      <main className="relative">
        <FAQHeroSection />
        <FAQCategoriesSection />
        <StillNeedHelpSection />
      </main>
    </div>
  );
}
