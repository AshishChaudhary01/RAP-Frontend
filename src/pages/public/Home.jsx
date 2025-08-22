import FaqsSection from "../../components/public/FaqsSection"
import FeaturesSection from "../../components/public/FeaturesSection"
import HeroSection from "../../components/public/HeroSection"
import StatsSection from "../../components/public/StatsSection"
import TestimonialSection from "../../components/public/TestimonialSection"

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <StatsSection />
      <FaqsSection />
    </>
  )
}

export default Home