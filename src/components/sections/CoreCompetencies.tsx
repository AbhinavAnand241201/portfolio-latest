import React from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const competencies = [
  { name: 'DSA', level: 90 },
  { name: 'Swift UI', level: 95 },
  { name: 'GraphQL', level: 85 },
  { name: 'Java', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Golang', level: 80 },
];

const CoreCompetencies: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      const bars = document.querySelectorAll('.competency-bar');
      gsap.fromTo(
        bars,
        { width: 0 },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.2,
        }
      );
    }
  }, [inView]);

  return (
    <section id="core-competencies" ref={ref} className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Core Competencies</h2>
          <p className="text-white max-w-2xl mx-auto">
            My technical expertise and skills that drive successful project delivery.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {competencies.map((competency, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{competency.name}</span>
                <span className="text-white">{competency.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="competency-bar h-full bg-white rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies; 