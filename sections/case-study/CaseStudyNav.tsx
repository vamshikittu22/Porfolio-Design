
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudyChapter } from './types';

interface CaseStudyNavProps {
  chapters: CaseStudyChapter[];
  activeId: string | null;
  onNavigate: (id: string) => void;
}

export const CaseStudyNav: React.FC<CaseStudyNavProps> = ({ chapters, activeId, onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-[400] flex flex-col items-center gap-8 print:hidden">
      {/* Vertical Rail */}
      <div className="absolute top-0 bottom-0 w-px bg-t-border/30 -z-10" />

      {chapters.map((chapter, idx) => {
        const isActive = activeId === chapter.id;
        const isHovered = hoveredId === chapter.id;

        return (
          <div 
            key={chapter.id} 
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setHoveredId(chapter.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Label - Appears on Left */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  className="absolute right-12 whitespace-nowrap pointer-events-none"
                >
                  <div className="bg-t-bg-el/95 backdrop-blur-xl border border-t-border px-4 py-2 rounded-xl shadow-2xl flex flex-col items-end">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] text-${chapter.color}-500 mb-0.5`}>
                      Module 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-t-fg uppercase tracking-tight">
                      {chapter.title}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav Node */}
            <button
              onClick={() => onNavigate(chapter.id)}
              className={`
                relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 outline-none
                ${isActive 
                  ? `bg-${chapter.color}-500 border-${chapter.color}-500 text-t-bg shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]` 
                  : isHovered 
                    ? 'bg-t-bg-el border-t-accent text-t-fg' 
                    : 'bg-t-bg-el border-t-border text-t-fg/30'}
              `}
              aria-label={`Jump to ${chapter.title}`}
            >
              <span className="text-[9px] font-black font-mono">
                {idx + 1}
              </span>
              
              {/* Active Indicator Pulse */}
              {isActive && (
                <motion.div 
                  layoutId="nav-active-glow"
                  className={`absolute -inset-2 rounded-full border border-${chapter.color}-500/20`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
