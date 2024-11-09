import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export const useInViewAnimation = (initialProps = {}, animateProps = {}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationProps = {
    initial: { opacity: 0, y: 50, ...initialProps }, // Start values
    animate: inView ? { opacity: 1, y: 0, ...animateProps } : initialProps, // End values
    transition: { duration: 1.8, ...animateProps.transition }, // Add more control over timing
  };

  return { ref, animationProps };
};
