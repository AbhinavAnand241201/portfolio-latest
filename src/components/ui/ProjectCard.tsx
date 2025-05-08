import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  year: string;
  imageSrc?: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tags, 
  year, 
  imageSrc, 
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView && cardRef.current) {
      // Create the portal effect animation
      const tl = gsap.timeline();
      
      // Initial setup - card is invisible
      gsap.set(cardRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        transformOrigin: 'center center'
      });
      
      // Create particles
      const particleCount = 20;
      const particles: HTMLDivElement[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-0';
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `hsl(${Math.random() * 40 + 170}, 80%, 60%)`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        if (cardRef.current) {
          cardRef.current.appendChild(particle);
          particles.push(particle);
        }
      }
      
      // Animate particles to create portal effect
      tl.to(particles, {
        opacity: 0.8,
        duration: 0.5,
        stagger: 0.02,
      }).to(particles, {
        scale: 5,
        opacity: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power2.out',
      }, '-=0.3');
      
      // Animate card to appear from portal
      tl.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        clearProps: 'opacity,scale',
      }, '-=0.5');
      
      // Clean up particles after animation
      tl.add(() => {
        particles.forEach(p => p.remove());
      });
    }
  }, [inView, index]);
  
  return (
    <div 
      ref={ref} 
      className="w-full md:w-[calc(50%-1rem)] mb-10"
    >
      <div 
        ref={cardRef}
        className="card hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
      >
        <div className="relative p-6 md:p-8 h-full flex flex-col">
          {/* Year tag */}
          <span className="absolute top-6 right-6 text-xs py-1 px-3 bg-light-background dark:bg-dark-background rounded-full">
            {year}
          </span>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
          
          <p className="text-light-muted dark:text-dark-muted mb-6">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Mock device display - only show on larger screens */}
          {imageSrc && (
            <div className="hidden md:block absolute -bottom-12 -right-10 w-36 h-36 transform rotate-12">
              <div className="w-full h-full rounded-2xl border-4 border-light-muted/20 dark:border-dark-muted/20 bg-light-background dark:bg-dark-background p-1 shadow-xl overflow-hidden">
                <div className="w-full h-full bg-accent-100 dark:bg-accent-900 rounded-lg overflow-hidden">
                  <img 
                    src={imageSrc} 
                    alt={`${title} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;