import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

export const useScrollSmoother = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize smooth scrolling
    let ctx = gsap.context(() => {
      // Create scroll triggers for parallax effects
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const background = section.querySelector('.parallax-bg');
        const content = section.querySelector('.parallax-content');
        
        if (background && content) {
          // Create parallax effect
          gsap.to(background, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
          
          gsap.to(content, {
            y: '-10%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }
      });
      
      // Create scroll-triggered animations for sections
      gsap.utils.toArray<HTMLElement>('.animate-on-scroll').forEach((element) => {
        gsap.fromTo(
          element,
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, scrollContainerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, [theme]); // Re-initialize when theme changes

  return { scrollContainerRef };
};