import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('scroll-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.classList.toggle('hidden');
  });
});


export default useScrollAnimation;
