import React, { useEffect, useRef } from 'react';
import { Smartphone, Bitcoin, Code } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';

const FloatingIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const icons = container.querySelectorAll('.floating-icon');
    
    // Set initial positions in 3D space
    gsap.set(icons, {
      x: (i) => 100 * Math.cos(2 * Math.PI * i / icons.length),
      y: (i) => 100 * Math.sin(2 * Math.PI * i / icons.length),
      z: (i) => Math.random() * 100 - 50,
      opacity: 0.7,
    });
    
    // Create orbit animations
    icons.forEach((icon, i) => {
      // Orbit animation
      gsap.to(icon, {
        duration: 10 + i * 2,
        x: () => {
          return gsap.utils.wrap(
            [-100, 100],
            gsap.getProperty(icon, 'x') as number + 200
          );
        },
        y: () => {
          return gsap.utils.wrap(
            [-100, 100],
            gsap.getProperty(icon, 'y') as number + 200
          );
        },
        repeat: -1,
        ease: 'none',
      });
      
      // Floating animation
      gsap.to(icon, {
        y: '+=20',
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      // Rotation animation
      gsap.to(icon, {
        rotationY: 360,
        rotationX: 360,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        ease: 'none',
      });
      
      // Hover effect
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.5,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
          zIndex: 10,
          boxShadow: '0 0 20px rgba(90, 188, 234, 0.9)',
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          opacity: 0.7,
          duration: 0.3,
          ease: 'power2.out',
          zIndex: 1,
          boxShadow: 'none',
        });
      });
    });
    
    // Animation for showing the icons
    gsap.fromTo(
      icons,
      { opacity: 0, scale: 0 },
      { 
        opacity: 0.7, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'back.out(1.7)',
        delay: 1 
      }
    );
    
    return () => {
      gsap.killTweensOf(icons);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none perspective-800"
      aria-hidden="true"
    >
      <div className="floating-icon pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2">
        <Smartphone 
          size={40} 
          className="text-white filter drop-shadow-lg" 
        />
      </div>
      <div className="floating-icon pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2">
        <Bitcoin 
          size={40} 
          className="text-white filter drop-shadow-lg" 
        />
      </div>
      <div className="floating-icon pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2">
        <Code 
          size={40} 
          className="text-white filter drop-shadow-lg" 
        />
      </div>
    </div>
  );
};

export default FloatingIcons;