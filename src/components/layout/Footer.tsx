import React from 'react';
import { ChevronUp, Linkedin, Github, Twitter, Code2 } from 'lucide-react';

const socialItems = [
  { title: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com' },
  { title: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/AbhinavAnand241201' },
  { title: 'Twitter', icon: <Twitter size={20} />, href: 'https://twitter.com' },
  { title: 'LeetCode', icon: <Code2 size={20} />, href: 'https://leetcode.com' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-black py-10 border-t border-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-white opacity-80">
              © 2025 Abhinav Anand. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black border border-white hover:bg-white hover:text-black transition-all duration-300 transform-gpu hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-white" />
            </a>
            <a 
              href="https://github.com/AbhinavAnand241201" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black border border-white hover:bg-white hover:text-black transition-all duration-300 transform-gpu hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} className="text-white" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black border border-white hover:bg-white hover:text-black transition-all duration-300 transform-gpu hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={20} className="text-white" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={scrollToTop}
            className="glow btn bg-black border border-white text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2 group transform-gpu hover:scale-105"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ChevronUp 
              size={18} 
              className="transition-transform duration-300 group-hover:-translate-y-1 text-white group-hover:text-black" 
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;