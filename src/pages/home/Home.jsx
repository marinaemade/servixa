import FaqSection from "./FaqSection";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import ServicesSection from "./ServicesSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialSection";
import TrustSection from "./TrustSection";

const Home = () => {
  return (
    <>
      <div className="bg-[#E9F5FF]">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <ServicesSection />
        <TrustSection />
        <TestimonialsSection />
        <FaqSection />
      </div>
    </>
  );
};

export default Home;
