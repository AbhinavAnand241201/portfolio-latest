import React from 'react';

const experiences = [
  {
    role: 'iOS App Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Developing iOS applications using Swift and SwiftUI, focusing on user experience and performance optimization.',
    technologies: ['Swift', 'SwiftUI', 'Firebase', 'Core Data']
  },
  {
    role: 'Software Development Intern',
    company: 'Tech Company',
    period: '2023',
    description: 'Worked on full-stack development projects, implementing new features and optimizing existing codebase.',
    technologies: ['Java', 'TypeScript', 'React', 'Node.js']
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Experience</h2>
          <p className="text-white max-w-2xl mx-auto">
            My professional journey and work experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-black border border-white rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-white">{exp.role}</h3>
              <p className="text-white mb-2">{exp.company}</p>
              <p className="text-white/80 mb-3">{exp.period}</p>
              <p className="text-white/80 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-sm bg-white/10 rounded-full text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 