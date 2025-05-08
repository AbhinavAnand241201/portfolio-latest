import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Github, GitFork, GitCommit, GitPullRequest } from 'lucide-react';

const Contributions: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView && cardRef.current) {
      const card = cardRef.current;
      
      // Initial setup with 3D transform
      gsap.set(card, { 
        y: -50, 
        opacity: 0,
        rotationX: 15,
        transformPerspective: 1000
      });
      
      // Enhanced entrance animation
      const tl = gsap.timeline();
      
      tl.to(card, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
      
      // Enhanced hover effect with 3D tilt
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          rotationY: 5,
          rotationX: -2,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        // Glowing border effect
        const glow = document.createElement('div');
        glow.className = 'absolute inset-0 rounded-xl opacity-0';
        glow.style.background = 'linear-gradient(45deg, #5abcea, #2db397)';
        glow.style.filter = 'blur(8px)';
        card.appendChild(glow);
        
        gsap.to(glow, {
          opacity: 0.15,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(glow, {
              opacity: 0,
              duration: 0.3,
              delay: 0.2,
              onComplete: () => glow.remove()
            });
          }
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    }
  }, [inView]);
  
  return (
    <section 
      id="contributions" 
      ref={ref}
      className="section relative bg-black text-white"
    >
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Open-Source Contributions</h2>
          <p className="text-white max-w-2xl mx-auto">
            Contributing to the future of web3 and blockchain technologies.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={cardRef}
            className="card p-8 md:p-10 relative overflow-hidden transform-gpu bg-black text-white"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-black border border-white flex items-center justify-center">
                    <Github size={60} className="text-white" />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-white">Active Contributor</h3>
                  
                  <p className="mb-4 text-white">
                    Active contributor to web3 and Bitcoin tech, including LND and Bitcoin-Core, focusing on optimizing transaction mechanisms.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <GitFork size={20} className="text-white" />
                      <span>LND Fee Optimization Improvements</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <GitCommit size={20} className="text-white" />
                      <span>Bitcoin-Core Transaction Batching</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <GitPullRequest size={20} className="text-white" />
                      <span>Web3 Authentication Libraries</span>
                    </div>
                    
                    <a 
                      href="https://github.com/AbhinavAnand241201"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-5 py-2 rounded-lg bg-white text-black border border-white hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      View GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/30">
                <h4 className="text-xl font-semibold mb-4 text-white">Recent Contributions</h4>
                
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">Bitcoin-Core</div>
                      <div className="text-xs px-2 py-1 rounded-full bg-white text-black">Merged</div>
                    </div>
                    <p className="text-sm text-white">
                      Improved transaction fee estimation algorithm for congested network periods.
                    </p>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-white">LND</div>
                      <div className="text-xs px-2 py-1 rounded-full bg-white text-black">In Review</div>
                    </div>
                    <p className="text-sm text-white">
                      Added batching support for safer and more efficient channel opening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contributions;