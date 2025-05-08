import React from 'react';
import { Download, Calendar, Smartphone, Code, Bitcoin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const RecruiterDashboard: React.FC = () => {
  return (
    <section id="recruiter-dashboard" className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Recruiter Dashboard</h2>
          <p className="text-white max-w-2xl mx-auto">
            A quick summary of my skills and experience for recruiters.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="dashboard-panel bg-black text-white border border-white rounded-xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6">Abhinav Anand at a Glance</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-4">
                <Smartphone size={24} className="text-white" />
                <div>
                  <span className="font-semibold">iOS App Developer</span>
                  <p className="text-white/80 text-sm">Proficient in Swift, SwiftUI, and iOS development practices with focus on blockchain applications.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Code size={24} className="text-white" />
                <div>
                  <span className="font-semibold">Problem Solver</span>
                  <p className="text-white/80 text-sm">700+ LeetCode problems solved with expertise in algorithms and data structures.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Bitcoin size={24} className="text-white" />
                <div>
                  <span className="font-semibold">Open-Source Contributor</span>
                  <p className="text-white/80 text-sm">Active contributor to LND and Bitcoin-Core, focusing on optimizing transaction mechanisms.</p>
                </div>
              </li>
            </ul>
            <div className="flex flex-col md:flex-row gap-4">
              <a href="https://drive.google.com/file/d/1oqa77ikJkqzqgUEOvufLZ9PkQzhSJE9C/view" className="btn flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Download size={18} /> Download Resume
              </a>
              <a href="#contact" className="btn flex items-center gap-2">
                <Calendar size={18} /> Schedule Interview
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterDashboard;