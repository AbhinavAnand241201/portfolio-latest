import React, { useEffect, useRef } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import LeetCode from './components/sections/LeetCode';
import Contributions from './components/sections/Contributions';
import RecruiterDashboard from './components/sections/RecruiterDashboard';
import Contact from './components/sections/Contact';
import Chatbot from './components/Chatbot';
import CustomCursor from './components/CustomCursor';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInstance = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    document.title = "Abhinav Anand | iOS Developer & Open-Source Contributor";
    
    // Initialize Locomotive Scroll with better options
    scrollInstance.current = new LocomotiveScroll({
      el: scrollRef.current as HTMLElement,
      smooth: true,
      lerp: 0.1,
      multiplier: 1
    });

    // Make scroll instance available globally for the chatbot
    (window as any).locomotiveScroll = scrollInstance.current;

    // Add cursor interaction styles
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      a, button, [role="button"], input, textarea, select {
        cursor: none !important;
      }
      .chatbot-container * {
        cursor: auto !important;
      }
      @media (max-width: 768px) {
        * {
          cursor: auto !important;
        }
      }
      /* Hide default cursor */
      body {
        cursor: none !important;
      }
      /* Ensure cursor is visible on all elements */
      *:hover {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Handle smooth scrolling for navigation
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.hash) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash) as HTMLElement;
        if (targetElement && scrollInstance.current) {
          scrollInstance.current.scrollTo(targetElement);
        }
      }
    };

    document.addEventListener('click', handleNavClick);
    
    return () => {
      document.head.removeChild(style);
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }
      document.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <CustomCursor />
      <Header />
      
      <main ref={scrollRef} data-scroll-container className="relative">
        <div data-scroll-section>
        <Hero />
        </div>
        <div data-scroll-section>
        <About />
        </div>
        <div data-scroll-section>
        <Projects />
        </div>
        <div data-scroll-section>
        <LeetCode />
        </div>
        <div data-scroll-section>
        <Contributions />
        </div>
        <div data-scroll-section>
        <RecruiterDashboard />
        </div>
        <div data-scroll-section>
        <Contact />
        </div>
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;