import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Code, Award } from 'lucide-react';

const LeetCode: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView && cardRef.current) {
      // Create 3D cube unfolding animation
      const card = cardRef.current;
      
      // Initial setup
      gsap.set(card, {
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        rotationX: -90,
        rotationY: 0,
        scale: 0.5,
        opacity: 0
      });
      
      // Unfold animation (reverse direction)
      const tl = gsap.timeline();
      
      tl.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.to(card, {
            y: '+=8',
            repeat: -1,
            yoyo: true,
            duration: 2.2,
            ease: 'sine.inOut',
          });
        }
      });
      
      // Unique glow effect (color shift)
      tl.fromTo(
        card,
        { boxShadow: '0 0 0 2px #5abcea, 0 0 20px 4px #3791b3' },
        { 
          boxShadow: '0 10px 30px -10px #2db397', 
          duration: 2,
          delay: 0.5
        }
      );
    }
  }, [inView]);
  
  return (
    <section 
      id="leetcode" 
      ref={ref}
      className="section relative bg-black text-white"
      style={{ background: 'url(/leet.png) center/cover no-repeat, #000' }}
    >
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">LeetCode Profile</h2>
          <p className="text-white max-w-2xl mx-auto">
            Demonstrating my problem-solving skills through consistent practice and mastery.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={cardRef}
            className="card p-8 md:p-10 bg-black text-white border border-white"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-black border border-white flex items-center justify-center">
                  <Code size={60} className="text-white" />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 text-white">700+ Problems Solved</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-white" />
                    <span>Consistent Problem Solver</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-black border border-white rounded-lg p-3 text-center">
                      <div className="text-sm text-white">Easy</div>
                      <div className="text-xl font-bold text-white">240+</div>
                    </div>
                    <div className="bg-black border border-white rounded-lg p-3 text-center">
                      <div className="text-sm text-white">Medium</div>
                      <div className="text-xl font-bold text-white">380+</div>
                    </div>
                    <div className="bg-black border border-white rounded-lg p-3 text-center">
                      <div className="text-sm text-white">Hard</div>
                      <div className="text-xl font-bold text-white">80+</div>
                    </div>
                  </div>
                  
                  <a 
                    href="https://leetcode.com/u/abhinav9834/"
                    className="inline-block mt-4 px-5 py-2 rounded-lg bg-white text-black border border-white hover:bg-black hover:text-white transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View LeetCode Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCode;