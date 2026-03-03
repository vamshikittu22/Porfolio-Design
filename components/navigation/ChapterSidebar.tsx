/**
 * ChapterSidebar - Desktop Navigation Component
 * 
 * Vertical sidebar navigation for desktop viewports (>= md breakpoint).
 * Features auto-hide behavior based on scroll direction and icon-based chapter list.
 * 
 * Features:
 * - Auto-hide on scroll down, auto-show on scroll up
 * - Glass morphism styling with active state highlighting
 * - Icon-based chapter navigation with hover labels
 * - Fixed position on left side, vertically centered
 * - Only visible on md breakpoint and above
 * 
 * Usage:
 * ```tsx
 * <NavigationProvider>
 *   <ChapterSidebar />
 *   <App />
 * </NavigationProvider>
 * ```
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../contexts/NavigationContext';
import useScrollDirection from '../../hooks/useScrollDirection';
import { CHAPTERS } from '../../data/chapters';

export const ChapterSidebar: React.FC = () => {
  const { currentChapter, navigateToChapter, isMenuOpen } = useNavigation();
  const scrollDirection = useScrollDirection();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Visibility logic: Show when scrolling up OR menu is open
  const isVisible = scrollDirection === 'up' || scrollDirection === 'none' || isMenuOpen;

  return (
    <motion.nav
      initial={{ x: -40, opacity: 0 }}
      animate={{
        x: isVisible ? 0 : -40,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-[400] hidden md:flex flex-col items-center gap-6"
      role="navigation"
      aria-label="Chapter navigation"
    >
      {/* Chapter list */}
      <div className="flex flex-col gap-4">
        {CHAPTERS.map((chapter) => {
          const isActive = currentChapter === chapter.id;
          const isHovered = hoveredId === chapter.id;

          return (
            <div
              key={chapter.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredId(chapter.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Hover label - appears on right */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-16 whitespace-nowrap pointer-events-none"
                  >
                    <div className="bg-t-bg-el/95 backdrop-blur-xl border border-t-border px-4 py-2 rounded-xl shadow-2xl">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-t-accent mb-0.5 block">
                        Chapter {chapter.number}
                      </span>
                      <span className="text-[10px] font-bold text-t-fg uppercase tracking-tight">
                        {chapter.title}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation button */}
              <motion.button
                onClick={() => navigateToChapter(chapter.id, 'jump')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative w-12 h-12 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300 outline-none
                  ${
                    isActive
                      ? 'bg-t-accent/20 border-t-accent text-t-accent shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]'
                      : isHovered
                      ? 'bg-t-bg-el/50 border-t-accent/50 text-t-fg scale-105'
                      : 'bg-t-bg-el/50 border-t-border/30 text-t-fg/30 hover:border-t-border/50'
                  }
                  backdrop-blur-xl
                `}
                aria-label={`Navigate to ${chapter.title}`}
              >
                {/* Chapter number */}
                <span className="text-xs font-black font-mono">
                  {chapter.number}
                </span>

                {/* Icon placeholder - will be replaced with actual SVG icons */}
                {/* TODO: Replace with actual chapter icons from /icons/chapters/ */}

                {/* Active indicator pulse */}
                {isActive && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-t-accent/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
};
