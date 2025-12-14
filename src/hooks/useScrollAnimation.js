import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal, .slide-left, .slide-right, .slide-up');
      const windowHeight = window.innerHeight;
      const elementVisible = 120;

      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        } else {
          // Optional: Remove else block if you want animation to happen only once
          el.classList.remove('active'); 
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollAnimation;