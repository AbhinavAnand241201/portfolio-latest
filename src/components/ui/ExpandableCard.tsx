import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ExpandableCardProject {
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: React.ReactNode;
}

export function ExpandableCardDemo({ projects }: { projects: ExpandableCardProject[] }) {
  const [active, setActive] = useState<ExpandableCardProject | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActive(null);
      }
    }
    if (active) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 h-full w-full z-40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 items-center justify-center bg-white text-black border border-white rounded-full h-8 w-8"
              onClick={() => setActive(null)}
            >
              <span style={{fontWeight: 'bold', fontSize: 18}}>×</span>
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-black text-white border border-white rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeInOut' } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeInOut' } }}
              transition={{ layout: { duration: 0.35, ease: 'easeInOut' } }}
            >
              <motion.div layoutId={`image-${active.title}-${id}`}
                className="overflow-hidden rounded-t-3xl border-b border-white">
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-bold text-white">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-white/80">
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-white text-black border border-white hover:bg-black hover:text-white transition-colors"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/80 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full flex flex-col gap-4">
        {projects.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center bg-black border border-white rounded-xl cursor-pointer transition-all hover:bg-white hover:text-black w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ layout: { duration: 0.35, ease: 'easeInOut' }, scale: { duration: 0.2 } }}
          >
            <div className="flex flex-col w-full">
              <motion.h3 layoutId={`title-${card.title}-${id}`} className="font-medium text-lg md:text-xl text-white text-left group-hover:text-black mb-1">
                {card.title}
              </motion.h3>
              <motion.p layoutId={`description-${card.description}-${id}`} className="text-white/80 text-left group-hover:text-black mb-2">
                {card.description}
              </motion.p>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-white text-black border border-white hover:bg-black hover:text-white mt-4 md:mt-0 transition-colors"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
} 