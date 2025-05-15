import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'PhoneSaver',
    description: 'PhoneSaver is a modern contact management app built with SwiftUI and Go (Gin framework). Features include contact tagging, one-tap communication, scheduled reminders, encrypted contacts, and cloud backups via Firebase. The app uses MySQL for secure data storage and integrates Firebase for backup functionality. With a clean, responsive UI and dark mode support, it provides a seamless way to manage and organize your contacts efficiently.',
    tags: ['Swift', 'SwiftUI', 'Go', 'MySQL', 'Firebase'],
    github: 'https://github.com/AbhinavAnand241201/phoneSaver',
    demo: 'https://github.com/AbhinavAnand241201/phoneSaver',
  },
  {
    title: 'AI-Powered Resume Matcher',
    description: 'AI-Resume Keyword Matcher is a Flask-powered web app that transforms job applications using advanced NLP. Upload your PDF resume and job description to get a highly accurate similarity score with highlighted keywords in under 10 seconds. Enhance your application strength with actionable insights on matching and missing keywords, all within a sleek Bootstrap interface. Seamlessly search jobs via Adzuna API, track progress with an analytics dashboard, and export results as PDFs. Resume Keyword Matcher: your key to unlocking career opportunities.',
    tags: ['Python', 'AI', 'Flask', 'NLP'],
    github: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
    demo: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
  },
  {
    title: 'Confession-X iOS App',
    description: 'Confession-X is an iOS app crafted with Swift and SwiftUI, leveraging MVVM for enhanced performance. Share anonymous confessions, multimedia stories, and polls with high reliability using Firebase, ensuring total privacy control. Experience dynamic feeds and private groups, designed for faster engagement via real-time interactions. Daily prompts spark more creative expression, all within a memory-efficient, visually appealing UI. Confession-X: where secrets ignite and connections flourish.',
    tags: ['Swift', 'SwiftUI', 'Firebase', 'Privacy'],
    github: 'https://github.com/AbhinavAnand241201/Confession-X-iOS',
    demo: 'https://github.com/AbhinavAnand241201/Confession-X-iOS',
  },
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
          y: 0, 
          opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
        }
    }
  };

  return (
    <section id="projects" ref={ref} className="section relative bg-black text-white">
      <div className="container-custom">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">Featured Projects</h2>
          <p className="text-white max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="project-card bg-black border border-white rounded-lg overflow-hidden transform-gpu"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-white"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80"
                    whileHover={{ scale: 1.05, color: "#fff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80"
                    whileHover={{ scale: 1.05, color: "#fff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink size={20} />
                    <span>Visit</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;