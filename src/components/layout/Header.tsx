"use client";

import React from "react";
import { User, Folder, Code2, GitBranch, Mail } from 'lucide-react';

const navItems = [
  { title: 'About', icon: <User size={20} />, href: '#about' },
  { title: 'Projects', icon: <Folder size={20} />, href: '#projects' },
  { title: 'LeetCode', icon: <Code2 size={20} />, href: '#leetcode' },
  { title: 'Contributions', icon: <GitBranch size={20} />, href: '#contributions' },
  { title: 'Contact', icon: <Mail size={20} />, href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-black/90">
      <div className="container-custom flex justify-between items-center py-4">
        {/* Branding */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold tracking-wider text-white">ABHINAV</h1>
          <div className="ml-3 h-7 w-0.5 bg-white/60"></div>
          <span className="ml-3 text-sm text-white/80">iOS App Developer</span>
        </div>
        {/* Main Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map(item => (
            <a 
              key={item.title} 
              href={item.href} 
              className="text-white/80 flex items-center gap-1"
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </a>
          ))}
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90">
          <nav className="flex flex-col items-center py-4">
            {navItems.map(item => (
              <a 
                key={item.title} 
                href={item.href} 
                className="text-white/80 flex items-center gap-1 py-2"
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;