import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import TrendingServicesSection from './TrendingService';
import HowItWorksSection from './HowItWorks';
import FindGreatWork from './FindGreatWork';
import Hero from './Hero';
import FreelancerCarousel from './FreelancerCarousel';
import Footer from './Footer';
import TestimonialSection from './TestimonialSection';
import { motion } from 'framer-motion';
import { useInViewAnimation } from '../animation/useInViewAnimation';

const HomePage = () => {

  const heroAnim = useInViewAnimation();
  const serviceAnim = useInViewAnimation();
  const trendingAnim = useInViewAnimation();
  const howItWorksAnim = useInViewAnimation();
  const carouselAnim = useInViewAnimation();
  const findWorkAnim = useInViewAnimation();
  const testimonialAnim = useInViewAnimation();


// // Hero section: Slide down with fade-in
//   const heroAnim = useInViewAnimation(
//     { opacity: 0, y: -50 }, // Initial (slide down)
//     { opacity: 1, y: 0, transition: { duration: 1.2 } } // Animate (smooth fade-in)
//   );

//   // Service section: Slide left with fade-in
//   const serviceAnim = useInViewAnimation(
//     { opacity: 0, x: -50 }, // Slide left
//     { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } // Animate with delay
//   );

//   // Trending services section: Slide right
//   const trendingAnim = useInViewAnimation(
//     { opacity: 0, x: 50 }, // Slide right
//     { opacity: 1, x: 0, transition: { duration: 1 } }
//   );

//   // How It Works section: Scale up with fade-in
//   const howItWorksAnim = useInViewAnimation(
//     { opacity: 0, scale: 0.9 }, // Scale down slightly
//     { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.1 } }
//   );

  return (
    <div>
      <Navbar />

     
        <HeroSection />
      

      <motion.div ref={serviceAnim.ref} {...serviceAnim.animationProps}>
        <ServiceSection />
      </motion.div>

      <motion.div ref={trendingAnim.ref} {...trendingAnim.animationProps}>
        <TrendingServicesSection />
      </motion.div>

      <motion.div ref={howItWorksAnim.ref} {...howItWorksAnim.animationProps}>
        <HowItWorksSection />
      </motion.div>

      <motion.div ref={carouselAnim.ref} {...carouselAnim.animationProps}>
        <FreelancerCarousel />
      </motion.div>

      <motion.div ref={findWorkAnim.ref} {...findWorkAnim.animationProps}>
        <FindGreatWork />
      </motion.div>

      <motion.div ref={heroAnim.ref} {...heroAnim.animationProps}>
        <Hero />
      </motion.div>

      <motion.div ref={testimonialAnim.ref} {...testimonialAnim.animationProps}>
        <TestimonialSection />
      </motion.div>

      <Footer /> 
    </div>
  );
};

export default HomePage;

