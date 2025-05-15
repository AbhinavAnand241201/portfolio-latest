import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorBorderPos, setCursorBorderPos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'pointer2'>('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute('data-cursor');
      if (cursorType === 'pointer') {
        setCursorState('pointer');
      } else if (cursorType === 'pointer2') {
        setCursorState('pointer2');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseOut = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Animation loop for cursor border
    let animationFrameId: number;
    const animate = () => {
      const easting = 8;
      setCursorBorderPos(prev => ({
        x: prev.x + (mousePosition.x - prev.x) / easting,
        y: prev.y + (mousePosition.y - prev.y) / easting
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const getCursorStyles = () => {
    switch (cursorState) {
      case 'pointer':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          width: '30px',
          height: '30px'
        };
      case 'pointer2':
        return {
          backgroundColor: 'white',
          width: '80px',
          height: '80px'
        };
      default:
        return {
          backgroundColor: 'transparent',
          width: '50px',
          height: '50px'
        };
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Cursor border */}
      <motion.div
        className={`fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9998] ${
          cursorState === 'pointer2' ? 'mix-blend-difference' : ''
        }`}
        style={{
          x: cursorBorderPos.x,
          y: cursorBorderPos.y,
          translateX: '-50%',
          translateY: '-50%',
          ...getCursorStyles()
        }}
      />
    </>
  );
};

export default CustomCursor; 