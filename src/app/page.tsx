import ScrollSnapCoordinator from '@/components/ScrollSnapCoordinator'
import Navigation from '@/sections/Navigation'
import HeroSection from '@/sections/HeroSection'
import ProblemSection from '@/sections/ProblemSection'
import SolutionSection from '@/sections/SolutionSection'
import HowItWorksSection from '@/sections/HowItWorksSection'
import PlansSection from '@/sections/PlansSection'
import CareSection from '@/sections/CareSection'
import FooterSection from '@/sections/FooterSection'

export default function Page() {
  return (
    <div className="relative bg-kiza-dark-blue">
      <ScrollSnapCoordinator />
      <Navigation />
      <main className="relative">
        <HeroSection className="z-10" />
        <ProblemSection className="z-20" />
        <SolutionSection className="z-30" />
        <HowItWorksSection className="z-40" />
        <PlansSection className="z-50" />
        <CareSection className="z-60" />
        <FooterSection className="z-70" />
      </main>
    </div>
  )
}
