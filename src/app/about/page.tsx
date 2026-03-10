import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import AboutHeroSection from '@/sections/about/AboutHeroSection';
import OurStorySection from '@/sections/about/OurStorySection';
import WhyWeExistSection from '@/sections/about/WhyWeExistSection';
import OurSuperpowerSection from '@/sections/about/OurSuperpowerSection';
import WhatDefinesKizaSection from '@/sections/about/WhatDefinesKizaSection';

export const metadata: Metadata = {
  title: 'About Us — Kiza',
  description:
    'Born from the heartfelt understanding of fragmented healthcare in Africa. Learn the story, purpose, and values behind Kiza.',
};

export default function AboutPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      <InnerNavigation />

      <main className="relative">
        <AboutHeroSection />
        <OurStorySection />
        <WhyWeExistSection />
        <OurSuperpowerSection />
        <WhatDefinesKizaSection />
      </main>
    </div>
  );
}
