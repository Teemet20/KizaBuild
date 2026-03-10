import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import PlansHeroSection from '@/sections/plans/PlansHeroSection';
import PlanCardsSection from '@/sections/plans/PlanCardsSection';
import PlanComparisonSection from '@/sections/plans/PlanComparisonSection';
import CoverageNetworkSection from '@/sections/plans/CoverageNetworkSection';

export const metadata: Metadata = {
  title: 'Plans & Coverage — Kiza',
  description:
    'Two plans. Clear pricing. No hidden fees. Affordable health coverage for your family in Nigeria — starting from ~$30/month.',
};

export default function PlansPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <div className="grain-overlay" />
      <InnerNavigation />
      <main className="relative">
        <PlansHeroSection />
        <PlanCardsSection />
        <PlanComparisonSection />
        <CoverageNetworkSection />
      </main>
    </div>
  );
}
