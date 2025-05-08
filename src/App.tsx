import React, { useEffect } from 'react';
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
import { useScrollSmoother } from './hooks/useScrollSmoother';

function App() {
  const { scrollContainerRef } = useScrollSmoother();

  useEffect(() => {
    document.title = "Abhinav Anand | iOS Developer & Open-Source Contributor";
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Header />
      
      <main ref={scrollContainerRef} className="relative">
        <Hero />
        <About />
        <Projects />
        <LeetCode />
        <Contributions />
        <RecruiterDashboard />
        <Contact />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;