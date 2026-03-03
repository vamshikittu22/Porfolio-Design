/**
 * ChapterBottomSheet - Mobile Navigation Component
 * 
 * Bottom sheet navigation for mobile viewports (< md breakpoint).
 * Features slide-up animation and horizontal scrollable chapter grid.
 * 
 * Features:
 * - Toggle button shows current chapter icon + number
 * - Bottom sheet slides up from bottom when opened
 * - Glass morphism background with backdrop blur
 * - Horizontal scrollable chapter cards
 * - Active chapter highlighted
 * - Closes on chapter selection or outside tap
 * - 44px minimum touch targets (WCAG compliance)
 * 
 * Usage:
 * ```tsx
 * <NavigationProvider>
 *   <ChapterBottomSheet />
 *   <App />
 * </NavigationProvider>
 * ```
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../contexts/NavigationContext';
import { CHAPTERS } from '../../data/chapters';

export const ChapterBottomSheet: React.FC = () => {
  const { currentChapter, navigateToChapter, isMenuOpen, toggleMenu, closeMenu } = useNavigation();

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, closeMenu]);

  // Get current chapter data for toggle button
  const currentChapterData = CHAPTERS.find(ch => ch.id === currentChapter);

  return (
    <>
      {/* Toggle button - fixed at bottom center */}
      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] flex md:hidden items-center justify-center
                   w-14 h-14 min-w-[44px] min-h-[44px]
                   bg-t-bg-el/95 backdrop-blur-xl border-2 border-t-border rounded-full
                   shadow-lg transition-all duration-300
                   hover:border-t-accent hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]"
        aria-label={isMenuOpen ? 'Close chapter menu' : 'Open chapter menu'}
      >
        {currentChapterData ? (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-black font-mono text-t-accent">
              {currentChapterData.number}
            </span>
            <span className="text-[6px] font-bold uppercase tracking-wider text-t-fg/50">
              Menu
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg text-t-accent">☰</span>
            <span className="text-[6px] font-bold uppercase tracking-wider text-t-fg/50">
              Chapters
            </span>
          </div>
        )}
      </motion.button>

      {/* Bottom sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[450] flex md:hidden"
              aria-hidden="true"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed bottom-0 left-0 right-0 z-[500] flex md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Chapter navigation menu"
            >
              <div className="w-full max-h-[60vh] bg-t-bg-el/95 backdrop-blur-xl border-t-2 border-t-border rounded-t-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-t-border/30">
                  <h2 className="text-sm font-black uppercase tracking-wider text-t-fg">
                    Chapters
                  </h2>
                  <button
                    onClick={closeMenu}
                    className="w-8 h-8 flex items-center justify-center rounded-full
                             bg-t-bg/50 border border-t-border/50 text-t-fg/50
                             hover:bg-t-accent/20 hover:border-t-accent hover:text-t-accent
                             transition-all duration-200"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Chapter grid - horizontal scrollable */}
                <div className="px-6 py-6 overflow-x-auto">
                  <div className="grid grid-flow-col auto-cols-[140px] gap-4">
                    {CHAPTERS.map((chapter) => {
                      const isActive = currentChapter === chapter.id;

                      return (
                        <motion.button
                          key={chapter.id}
                          onClick={() => {
                            navigateToChapter(chapter.id, 'jump');
                            closeMenu();
                          }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            relative flex flex-col items-center justify-center
                            p-4 rounded-2xl border-2 min-h-[120px] min-w-[44px]
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-t-accent/20 border-t-accent shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]'
                                : 'bg-t-bg/50 border-t-border/30 hover:border-t-accent/50 hover:bg-t-bg-el/50'
                            }
                          `}
                          aria-label={`Navigate to ${chapter.title}`}
                        >
                          {/* Chapter number */}
                          <div className={`
                            w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3
                            ${
                              isActive
                                ? 'border-t-accent bg-t-accent/20 text-t-accent'
                                : 'border-t-border/50 bg-t-bg-el/50 text-t-fg/50'
                            }
                          `}>
                            <span className="text-lg font-black font-mono">
                              {chapter.number}
                            </span>
                          </div>

                          {/* Icon placeholder */}
                          {/* TODO: Replace with actual chapter icons from /icons/chapters/ */}

                          {/* Chapter title */}
                          <span className={`
                            text-[9px] font-bold uppercase tracking-wider text-center
                            ${isActive ? 'text-t-accent' : 'text-t-fg/70'}
                          `}>
                            {chapter.title}
                          </span>

                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              className="absolute -inset-1 rounded-2xl border-2 border-t-accent/20"
                              animate={{
                                scale: [1, 1.05, 1],
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
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
