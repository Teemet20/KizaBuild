import ScrollSnapCoordinator from '@/components/ScrollSnapCoordinator'
import Navigation from '@/sections/Navigation'
import HeroSection from '@/sections/HeroSection'
import IntroductionSection from '@/sections/IntroductionSection'
import ProblemSection from '@/sections/ProblemSection'
import SolutionSection from '@/sections/SolutionSection'
import WhoWeServeSection from '@/sections/WhoWeServeSection'
import HowItWorksSection from '@/sections/HowItWorksSection'
import PlansSection from '@/sections/PlansSection'
import CoverageSection from '@/sections/CoverageSection'
import SupportSection from '@/sections/SupportSection'
import FinalCTASection from '@/sections/FinalCTASection'
import FooterSection from '@/sections/FooterSection'

export default function Page() {
  return (
    <div className="relative bg-kiza-dark-blue">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Global scroll snap coordinator */}
      <ScrollSnapCoordinator />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <IntroductionSection className="z-20" />
        <ProblemSection className="z-30" />
        <SolutionSection className="z-40" />
        <WhoWeServeSection className="z-50" />
        <HowItWorksSection className="z-60" />
        <PlansSection className="z-70" />
        <CoverageSection className="z-80" />
        <SupportSection className="z-90" />
        <FinalCTASection className="z-100" />
        <FooterSection className="z-110" />
      </main>
    </div>
  )
}
