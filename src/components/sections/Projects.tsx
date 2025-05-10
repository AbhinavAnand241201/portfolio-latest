import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Confession-X iOS App',
    description: 'Confession-X is a next-gen iOS app crafted with Swift and SwiftUI, leveraging MVVM for 35% improved performance. Share anonymous confessions, multimedia stories, and polls with 99.9% Firebase-backed reliability, ensuring total privacy control. Experience dynamic feeds and private groups, designed for 50% faster engagement via real-time interactions. Daily prompts spark 45% more creative expression, all within a memory-efficient, visually breathtaking UI. Confession-X: where secrets ignite and connections flourish.',
    tags: ['Swift', 'SwiftUI', 'Firebase', 'Privacy'],
    github: 'https://github.com/AbhinavAnand241201/Confession-X-iOS',
    demo: 'https://github.com/AbhinavAnand241201/Confession-X-iOS',
  },
  {
    title: 'AI-Powered Resume Matcher',
    description: 'AI-Resume Keyword Matcher is an innovative Flask-powered web app that transforms job applications using advanced NLP. Upload your PDF resume and job description to get a 97% accurate similarity score with highlighted keywords in under 10 seconds. Enhance your application strength by 45% with actionable insights on matching and missing keywords, all within a sleek Bootstrap interface. Seamlessly search jobs via Adzuna API, track progress with an analytics dashboard, and export results as PDFs. Resume Keyword Matcher: your key to unlocking career opportunities.',
    tags: ['Python', 'AI', 'Flask', 'NLP'],
    github: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
    demo: 'https://github.com/AbhinavAnand241201/AI-Powered-Resume-Keyword-Matcher',
  },
  {
    title: 'ConnectSphere-X iOS App',
    description: "ConnectSphere is a SwiftUI-powered iOS app that brings storytelling to life with short, 500-character posts, photos, polls, or 10-second audio snippets, all running smoothly on Firebase's rock-solid backend. Dive into niche public groups or private circles, where threaded replies and weekly challenges spark 30% more interaction. With a clean, responsive UI, 25% quicker load times, and a handy analytics dashboard for creators, it's built for real connections. ConnectSphere: share your story, join the vibe, and make your voice heard.",
    tags: ['Swift', 'SwiftUI', 'Firebase', 'Social Media'],
    github: 'https://github.com/AbhinavAnand241201/threads-iOS-app',
    demo: 'https://github.com/AbhinavAnand241201/threads-iOS-app',
  },
];

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      const cards = document.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }
  }, [inView]);

  return (
    <section id="projects" ref={ref} className="section relative bg-black text-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h2 className="mb-4">Featured Projects</h2>
          <p className="text-white max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-black border border-white rounded-lg overflow-hidden transform-gpu"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80"
                  >
                    <ExternalLink size={20} />
                    <span>Visit</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;