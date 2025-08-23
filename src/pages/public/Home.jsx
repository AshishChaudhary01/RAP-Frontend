import FaqsSection from "../../components/public/sections/Faqs"
import FeaturesSection from "../../components/public/sections/Features"
import HeroSection from "../../components/public/sections/Hero"
import StatsSection from "../../components/public/sections/Stats"
import TestimonialSection from "../../components/public/sections/Testimonial"

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