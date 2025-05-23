import React, { useRef, useState, useEffect } from 'react';
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
    title: 'GoQuest',
    description: 'GoQuest is a standalone Go CLI tool and library that orchestrates concurrent task workflows defined in a simple Go-based script. It allows users to define tasks (e.g., HTTP requests, computations) and execute them in parallel with a configurable worker pool, leveraging Go\'s concurrency model (goroutines and channels). Try it out by following the installation instructions in the GitHub README!',
    tags: ['Go', 'Concurrency', 'CLI', 'DevOps'],
    github: 'https://github.com/AbhinavAnand241201/GoQuest',
    demo: 'https://github.com/AbhinavAnand241201/GoQuest',
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
  const [showDemoButton, setShowDemoButton] = useState<number | null>(null);

  // Auto-show demo button on mobile after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDemoButton(0); // Show for first project initially
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              className="project-card bg-black border border-white rounded-lg overflow-hidden transform-gpu relative group"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => project.images && setActiveProject(index)}
              onMouseEnter={() => setShowDemoButton(index)}
              onMouseLeave={() => setShowDemoButton(null)}
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
                <div className="flex gap-4 relative z-10">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
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
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                    <span>Visit</span>
                  </motion.a>
                </div>
                {project.images ? (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                    initial={false}
                    animate={{ 
                      opacity: showDemoButton === index ? 1 : 0,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: showDemoButton === index ? 1 : 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      View Demo
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                    initial={false}
                    animate={{ 
                      opacity: showDemoButton === index ? 1 : 0,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => {
                      alert('Rendering Error: Please check your internet connection and try again.');
                    }}
                  >
                    <motion.span 
                      className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: showDemoButton === index ? 1 : 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      View Demo
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Improved Mobile-Friendly Carousel Modal */}
      <AnimatePresence>
        {activeProject !== null && projects[activeProject].images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[280px] md:max-w-[320px] bg-black rounded-[40px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* iPhone frame */}
              <div className="relative w-full pt-[216.67%]">
                <div className="absolute inset-0">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[5%] bg-black rounded-b-[20px] z-10" />
                  
                  {/* Image container */}
                  <div className="absolute inset-[10%] rounded-[30px] overflow-hidden">
                    <motion.img
                      key={currentImageIndex}
                      src={projects[activeProject].images[currentImageIndex]}
                      alt={`Screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Simplified Mobile Navigation */}
              <div className="absolute inset-0 z-20">
                {/* Swipe areas for mobile */}
                <div className="absolute inset-y-0 left-0 w-1/3" onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage(e);
                }} />
                <div className="absolute inset-y-0 right-0 w-1/3" onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage(e);
                }} />

                {/* Desktop navigation buttons - hidden on mobile */}
                <div className="hidden md:flex absolute inset-0 items-center justify-between px-2">
                  <motion.button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage(e);
                    }}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage(e);
                    }}
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={24} className="text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setActiveProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-xl font-light">×</span>
              </motion.button>

              {/* Simplified counter and dots */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-white/80 text-sm font-medium mb-2">
                  {currentImageIndex + 1} / {projects[activeProject].images.length}
                </div>
                <div className="flex gap-2">
                  {projects[activeProject].images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 w-1.5 hover:bg-white/70'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Mobile swipe hint - only shown on mobile */}
              <motion.div 
                className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Swipe to navigate
              </motion.div>

              {/* Desktop keyboard hint - only shown on desktop */}
              <motion.div 
                className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Use ← → arrow keys to navigate
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* See More Projects Button */}
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.a
          href="https://github.com/AbhinavAnand241201"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
          <span>See More Projects</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Projects;