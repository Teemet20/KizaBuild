import type { Metadata } from 'next';
import InnerNavigation from '@/components/InnerNavigation';
import StoriesHeroSection from '@/sections/stories/StoriesHeroSection';
import FeaturedStorySection from '@/sections/stories/FeaturedStorySection';
import StoriesGridSection from '@/sections/stories/StoriesGridSection';
import ShareYourStorySection from '@/sections/stories/ShareYourStorySection';

export const metadata: Metadata = {
  title: 'Stories of Impact — Kiza',
  description:
    'Real stories from Kiza members who replaced worry with certainty — and the families who felt the difference.',
};

export default function StoriesPage() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <div className="grain-overlay" />
      <InnerNavigation />
      <main className="relative">
        <StoriesHeroSection />
        <FeaturedStorySection />
        <StoriesGridSection />
        <ShareYourStorySection />
      </main>
    </div>
  );
}
