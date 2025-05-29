import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

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
    title: 'Pocket Butler - iOS',
    description: 'Pocket Butler is an iOS app that helps you keep track of your everyday items. It allows you to quickly log where you placed items and retrieve that information in seconds when you need them. Features include voice/one-tap logging, smart alerts, shared household log, favorites & history, and panic mode to help locate nearby items.',
    tags: ['Swift', 'SwiftUI', 'Node.js', 'MongoDB', 'JWT', 'APNs'],
    github: 'https://github.com/AbhinavAnand241201/pocketButtler',
    demo: 'https://github.com/AbhinavAnand241201/pocketButtler',
    images: [
      '/assets1/Home.png',
      '/assets1/Additems.png',
      '/assets1/History.png',
      '/assets1/MapView.png',
      '/assets1/PanicMode.png'
    ]
  },
  {
    title: 'WanderWise',
    description: 'WanderWise is an intelligent travel companion that revolutionizes trip planning using Gemini AI. It provides personalized travel recommendations, real-time navigation with Google Maps, and smart itinerary generation. The app suggests points of interest, estimates travel times, and helps users discover hidden gems at their destination, making every journey seamless and memorable.',
    tags: ['Next.js', 'Gemini AI', 'Google Maps API', 'Firebase', 'TypeScript'],
    github: 'https://github.com/AbhinavAnand241201/wanderWise',
    demo: 'https://wander-wise-1mse95y80-abhinav-anands-projects-05cac868.vercel.app'
  },
  {
    title: 'Fiscal Compass',
    description: 'Fiscal Compass is an AI-powered financial advisor and budget management application. It helps users manage their finances, track expenses, and receive personalized financial advice. The app uses AI to analyze spending patterns and provide intelligent recommendations for better budget management and financial planning.',
    tags: ['Next.js', 'Firebase', 'GenKit', 'Gemini AI', 'TypeScript'],
    github: 'https://github.com/AbhinavAnand241201/fiscal-Planner',
    demo: 'https://fiscal-planner.vercel.app',
  },
  {
    title: 'GoQuest',
    description: 'GoQuest is a standalone Go CLI tool and library that orchestrates concurrent task workflows defined in a simple Go-based script. It allows users to define tasks (e.g., HTTP requests, computations) and execute them in parallel with a configurable worker pool, leveraging Go\'s concurrency model (goroutines and channels). Try it out by following the installation instructions in the GitHub README!',
    tags: ['Go', 'Concurrency', 'CLI', 'DevOps'],
    github: 'https://github.com/AbhinavAnand241201/GoQuest',
    demo: 'https://github.com/AbhinavAnand241201/GoQuest',
  },
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show demo buttons instantly on mobile
  useEffect(() => {
    if (isMobile) {
      setShowDemoButton(0); // Show for first project
      const timer = setTimeout(() => {
        setShowDemoButton(1); // Show for second project
      }, 500);
      const timer2 = setTimeout(() => {
        setShowDemoButton(2); // Show for third project
      }, 1000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [isMobile]);

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

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeProject !== null && projects[activeProject].images) {
        const project = projects[activeProject];
        setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
    },
    onSwipedRight: () => {
      if (activeProject !== null && projects[activeProject].images) {
        const project = projects[activeProject];
        setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
      }
    },
    trackMouse: false
  });

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
                scale: isMobile ? 1 : 1.02,
                transition: { duration: 0.2 }
              }}
              onClick={() => project.images && setActiveProject(index)}
              onMouseEnter={() => !isMobile && setShowDemoButton(index)}
              onMouseLeave={() => !isMobile && setShowDemoButton(null)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-white"
                      whileHover={{ scale: isMobile ? 1 : 1.05 }}
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
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
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
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
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
                      opacity: isMobile || showDemoButton === index ? 1 : 0,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: isMobile || showDemoButton === index ? 1 : 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      View Demo
                    </motion.span>
                  </motion.div>
                ) : (
                  // Show direct link for projects with demo URLs
                  <motion.a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center no-underline"
                    initial={false}
                    animate={{ 
                      opacity: isMobile || showDemoButton === index ? 1 : 0,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: isMobile || showDemoButton === index ? 1 : 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      View Demo
                    </motion.span>
                  </motion.a>
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
              {...swipeHandlers}
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

              {/* Improved Mobile Navigation */}
              <div className="absolute inset-0 z-20">
                {/* Desktop navigation buttons - hidden on mobile */}
                <div className="hidden md:flex absolute inset-0 items-center justify-between px-4">
                  <motion.button
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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

              {/* Close button - moved to top right with more spacing */}
              <motion.button
                className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => setActiveProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-xl font-light">×</span>
              </motion.button>

              {/* Improved counter and dots with better spacing */}
              <motion.div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-white/80 text-sm font-medium">
                  {currentImageIndex + 1} / {projects[activeProject].images.length}
                </div>
                <div className="flex gap-3">
                  {projects[activeProject].images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 w-2 hover:bg-white/70'
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
                className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Swipe to navigate
              </motion.div>

              {/* Desktop keyboard hint - only shown on desktop */}
              <motion.div 
                className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs z-20"
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