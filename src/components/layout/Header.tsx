"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: 'About', href: '#about' },
  { title: 'Projects', href: '#projects' },
  { title: 'LeetCode', href: '#leetcode' },
  { title: 'Contributions', href: '#contributions' },
  { title: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black/90'
      }`}
    >
      <div className="container-custom flex justify-between items-center py-4">
        {/* Branding */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <h1 className="text-xl font-bold tracking-wider text-white">ABHINAV</h1>
          <div className="ml-3 h-7 w-0.5 bg-white/60"></div>
          <span className="ml-3 text-sm text-white/80">iOS App Developer</span>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
        </button>

        {/* Main Nav */}
        <nav className={`absolute md:relative top-full md:top-auto left-0 right-0 md:flex items-center gap-6 ${
          isOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row bg-black md:bg-transparent p-4 md:p-0`}>
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.a
              key={item.title} 
              href={item.href} 
                className="text-white/80 hover:text-white transition-colors duration-300 text-center md:text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </motion.a>
          ))}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;