import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  
  const code = `const DummyComponent = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fights Counter</h2>
      <p className="mb-2">Fight Club Fights Count: {count}</p>
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};`;
  
  return (
    <section 
      id="about" 
      ref={ref}
      className="section relative bg-black text-white"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-2/5 flex justify-center items-center">
            <div className="w-full max-w-lg bg-black rounded-xl shadow-lg p-6 border border-white overflow-x-auto">
              <div className="text-xs text-white mb-2">DummyComponent.jsx</div>
              <SyntaxHighlighter language="jsx" style={{}} customStyle={{background: 'transparent', color: '#fff', fontSize: '1em', borderRadius: '0.5rem', padding: 0, minWidth: '400px', border: 'none'}} showLineNumbers>
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
          
          <div className="w-full md:w-3/5">
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
      </div>
    </section>
  );
};

export default About;