import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const About: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power2.inOut' }
        );
      }
      
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { rotationY: 90, opacity: 0, transformPerspective: 2000, transformOrigin: 'center center', z: -100 },
          { rotationY: 0, opacity: 1, z: 0, duration: 1.7, ease: 'power4.inOut', onComplete: () => {
            gsap.to(imageRef.current, {
              y: '+=10',
              repeat: -1,
              yoyo: true,
              duration: 2.5,
              ease: 'sine.inOut',
            });
          }}
        );
      }
    }
  }, [inView]);
  
  return (
    <section 
      id="about" 
      ref={ref}
      className="section relative bg-black text-white"
    >
      <div className="container-custom">
        <div className="w-full">
          <h2 
            ref={headingRef}
            className="mb-6 text-center md:text-left"
          >
            About Me
          </h2>
          
          <div className="space-y-4">
            <p className="text-lg text-white">
              iOS developer, open-source contributor, and blockchain enthusiast. Passionate about building impactful products and solving real-world problems with code.
            </p>
            <p className="text-white">
              Skilled in Swift, SwiftUI, and Web3. Always learning, always shipping.
            </p>
            <div className="pt-4">
              <h3 className="text-xl mb-4">Core Competencies</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">iOS Development</span>
                </div>
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">Swift/SwiftUI</span>
                </div>
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">Web3</span>
                </div>
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">Blockchain</span>
                </div>
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">Problem Solving</span>
                </div>
                <div className="bg-black border border-white rounded-lg px-4 py-2 text-center">
                  <span className="font-medium text-white">Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;