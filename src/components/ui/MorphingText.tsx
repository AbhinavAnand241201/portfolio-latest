import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';

interface MorphingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const MorphingText: React.FC<MorphingTextProps> = ({ text, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create character elements
    container.innerHTML = '';
    const chars = text.split('');
    
    chars.forEach((char, index) => {
      if (char === ' ') {
        const spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        spaceSpan.style.display = 'inline-block';
        container.appendChild(spaceSpan);
      } else {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.position = 'relative';
        charSpan.classList.add('char');
        container.appendChild(charSpan);
        
        // Create particle elements for each character
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('span');
          particle.classList.add('particle');
          particle.style.position = 'absolute';
          particle.style.top = '50%';
          particle.style.left = '50%';
          particle.style.width = '2px';
          particle.style.height = '2px';
          particle.style.borderRadius = '50%';
          particle.style.display = 'block';
          particle.style.opacity = '0';
          
          // Only use white for particles
          particle.style.backgroundColor = '#fff';
          particle.style.boxShadow = '0 0 10px rgba(255,255,255,0.7)';
          
          charSpan.appendChild(particle);
        }
      }
    });
    
    // Animate the morphing effect
    const chars2 = container.querySelectorAll('.char');
    const tl = gsap.timeline({ delay });
    
    // Initial state
    gsap.set(chars2, { opacity: 0, y: 20 });
    
    // Animate in characters one by one
    tl.to(chars2, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      stagger: 0.03,
      ease: "back.out(3)",
    });
    
    // Start the morphing animation after all characters are visible
    tl.add(() => {
      chars2.forEach((char, index) => {
        // Check if timeline is stopped before adding animations
        if (!tl.isActive()) return;
        
        // Get all particles for this character
        const particles = char.querySelectorAll('.particle');
        
        // Randomly animate the particles
        particles.forEach((particle, i) => {
          const delay = Math.random() * 0.5;
          const duration = 0.8 + Math.random() * 0.4;
          
          gsap.to(particle, {
            opacity: 0.7,
            duration: 0.3,
            delay: delay,
          });
          
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 30,
            duration: duration,
            delay: delay,
            ease: "power2.out",
          });
          
          gsap.to(particle, {
            opacity: 0,
            duration: 0.3,
            delay: delay + duration - 0.3,
          });
        });
        
        // Subtle shake of the characters
        gsap.to(char, {
          x: "random(-3, 3)",
          y: "random(-3, 3)",
          rotation: "random(-3, 3)",
          duration: 0.2,
          repeat: 1,
          yoyo: true,
          delay: 0.4 + index * 0.02,
        });
        
        // Return characters to normal
        gsap.to(char, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.4,
          delay: 0.8 + index * 0.02,
          ease: "elastic.out(1, 0.3)",
        });
      });
    }, 0.5);
    
    // Add glow effect
    tl.to(chars2, {
      textShadow: '0 0 8px rgba(90, 188, 234, 0.7)',
      duration: 0.8,
      stagger: 0.02,
    }, "-=0.8");
    
    // Fade glow back
    tl.to(chars2, {
      textShadow: 'none',
      duration: 1.2,
    }, "+=1");
    
    return () => {
      tl.kill();
    };
  }, [text, delay]);
  
  return (
    <div 
      ref={containerRef} 
      className={`inline-block relative ${className}`} 
      aria-label={text}
    >
      {text}
    </div>
  );
};

export default MorphingText;