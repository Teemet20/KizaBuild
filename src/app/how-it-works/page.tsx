import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import HowItWorksHeroSection from '@/sections/how-it-works/HowItWorksHeroSection';
import StepsSection from '@/sections/how-it-works/StepsSection';
import ProcessFAQSection from '@/sections/how-it-works/ProcessFAQSection';
import HowItWorksCTASection from '@/sections/how-it-works/HowItWorksCTASection';

export const metadata: Metadata = {
  title: 'How It Works — Kiza',
  description:
    'From registration to cashless care in 5 simple steps. See exactly how Kiza covers your family back home.',
};

export default function HowItWorksPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <div className="grain-overlay" />
      <InnerNavigation />
      <main className="relative">
        <HowItWorksHeroSection />
        <StepsSection />
        <ProcessFAQSection />
        <HowItWorksCTASection />
      </main>
    </div>
  );
}
