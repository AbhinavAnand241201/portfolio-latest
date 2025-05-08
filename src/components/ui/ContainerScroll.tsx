import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useInView } from 'react-intersection-observer';

interface ContainerScrollProps {
  children: React.ReactNode;
  titleComponent?: React.ReactNode;
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({ children, titleComponent }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full flex flex-col items-center mb-8">
      {titleComponent && <div className="mb-4">{titleComponent}</div>}
      <div ref={cardRef} className="w-full">
        {children}
      </div>
    </div>
  );
}; 