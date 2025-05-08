import React from 'react';
import { Github } from 'lucide-react';

const contributions = [
  {
    title: 'Lightning Network Daemon',
    description: 'Contributing to the Lightning Network implementation, focusing on performance optimization and bug fixes.',
    link: 'https://github.com/AbhinavAnand241201/lnd_fork'
  }
];

const OpenSource: React.FC = () => {
  return (
    <section id="contributions" className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Open Source Contributions</h2>
          <p className="text-white max-w-2xl mx-auto">
            My contributions to open source projects.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="bg-black border border-white rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-white">{contribution.title}</h3>
              <p className="text-white/80 mb-4">{contribution.description}</p>
              <a
                href={contribution.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white"
              >
                <Github size={20} />
                <span>View Contribution</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource; 