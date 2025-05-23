import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: 'Vibe_LINK',
    description: 'Vibe_LINK is a next-generation dating application designed specifically for Gen Z users, focusing on creating meaningful connections through location-based interactions and ephemeral content sharing. The platform encourages users to meet in real life by highlighting nearby potential matches and facilitating spontaneous encounters through its innovative "Moments" feature.',
    tags: ['Swift', 'SwiftUI', 'Node.js', 'MongoDB', 'Firebase'],
    github: 'https://github.com/AbhinavAnand241201/Vibe_LINK',
    demo: 'https://github.com/AbhinavAnand241201/Vibe_LINK',
    images: [
      '/assets/launch.png',
      '/assets/login.png',
      '/assets/signup.png',
      '/assets/map.png',
      '/assets/nearby.png',
      '/assets/matches.png',
      '/assets/post.png',
      '/assets/loading.png',
      '/assets/error.png'
    ]
  },
  {
    title: 'AI-Powered Resume Matcher',
    description: 'AI-Resume Keyword Matcher is a Flask-powered web app that transforms job applications using advanced NLP. Upload your PDF resume and job description to get a highly accurate similarity score with highlighted keywords in under 10 seconds. Enhance your application strength with actionable insights on matching and missing keywords, all within a sleek Bootstrap interface. Seamlessly search jobs via Adzuna API, track progress with an analytics dashboard, and export results as PDFs. Resume Keyword Matcher: your key to unlocking career opportunities.',
    tags: ['Python', 'AI', 'Flask', 'NLP'],
    github: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
    demo: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
  },
  {
    title: 'PhoneSaver',
    description: 'PhoneSaver is a modern contact management app built with SwiftUI and Go (Gin framework). Features include contact tagging, one-tap communication, scheduled reminders, encrypted contacts, and cloud backups via Firebase. The app uses MySQL for secure data storage and integrates Firebase for backup functionality. With a clean, responsive UI and dark mode support, it provides a seamless way to manage and organize your contacts efficiently.',
    tags: ['Swift', 'SwiftUI', 'Go', 'MySQL', 'Firebase'],
    github: 'https://github.com/AbhinavAnand241201/phoneSaver',
    demo: 'https://github.com/AbhinavAnand241201/phoneSaver',
  }
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProject !== null && projects[activeProject].images) {
      const project = projects[activeProject];
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProject !== null && projects[activeProject].images) {
      const project = projects[activeProject];
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
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
              className="project-card bg-black border border-white rounded-lg overflow-hidden transform-gpu relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => project.images && setActiveProject(index)}
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
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
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

      {/* Image Carousel Modal */}
      <AnimatePresence>
        {activeProject !== null && projects[activeProject].images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -left-12 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                onClick={handlePrevImage}
              >
                <ChevronLeft size={40} />
              </button>
              <motion.img
                key={currentImageIndex}
                src={projects[activeProject].images[currentImageIndex]}
                alt={`Screenshot ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />
              <button
                className="absolute -right-12 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                onClick={handleNextImage}
              >
                <ChevronRight size={40} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {projects[activeProject].images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;