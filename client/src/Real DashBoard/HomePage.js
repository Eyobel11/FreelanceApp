import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import TrendingServicesSection from './TrendingService';
import HowItWorksSection from './HowItWorks';
import FindGreatWork from './FindGreatWork';
import Hero from './Hero';
import FreelancerCarousel from './FreelancerCarousel';
// import WhyUsSection from './WhyUsSection';
// import GetStartedSection from './GetStartedSection';
import Footer from './Footer';
import TestimonialSection from './TestimonialSection';

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <ServiceSection />

      <TrendingServicesSection />

      <HowItWorksSection />

      <FreelancerCarousel />

      <FindGreatWork />

      <Hero />

      <TestimonialSection/>

      {/* <WhyUsSection />

      <GetStartedSection />
*/}
      <Footer /> 
    </div>
  );
};

export default HomePage;
