import React from 'react';
import MorphingText from '../ui/MorphingText';
import HeroParticles from '../ui/HeroParticles';
import FloatingIcons from '../ui/FloatingIcons';
import { ArrowRight } from 'lucide-react';
import { LampContainer } from '../ui/lamp';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle background */}
      <HeroParticles />
      
      {/* 3D Floating Icons */}
      <FloatingIcons />
      
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-4xl mx-auto pt-20 pb-10">
          {/* Lamp Effect Heading */}
          <LampContainer>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
              className="mt-8 bg-gradient-to-br from-white to-black py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              <span className="block text-5xl md:text-8xl font-extrabold text-white mb-2">Abhinav Anand</span>
              <span className="block mt-2">iOS Developer & Open-Source Contributor</span>
            </motion.h1>
          </LampContainer>
          
          <p className="text-md md:text-lg text-gray-300 mb-2 max-w-2xl mx-auto">
            3rd yr B.Tech undergrad at NIT-Durgapur
          </p>
          <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto">
            Building the Future of Tech with Web3 and iOS Innovation
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#contact" 
              className="btn btn-primary glow flex items-center gap-2 group"
            >
              Hire Me
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1 text-black" size={18} />
            </a>
            
            <a 
              href="#projects" 
              className="btn bg-black hover:bg-white text-white hover:text-black border border-white"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;