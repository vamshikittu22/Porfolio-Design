/**
 * ChapterTransition - Framer Motion wrapper for chapter content transitions
 * 
 * Provides smooth fade animations when navigating between chapters.
 * Manages scroll position based on navigation type and respects
 * user's motion preferences for accessibility.
 * 
 * Features:
 * - Fade in/out animation with AnimatePresence
 * - Respects prefers-reduced-motion (instant transition when reduced motion enabled)
 * - Scroll management: reset to top on jump navigation, preserve on sequential
 * - Prevents user interaction during transition
 * 
 * Usage:
 * ```tsx
 * <ChapterTransition>
 *   <ChapterContent />
 * </ChapterTransition>
 * ```
 */

import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '../../../contexts/NavigationContext';
import useReducedMotion from '../../hooks/useReducedMotion';

interface ChapterTransitionProps {
  /** Content to animate */
  children: ReactNode;
}

/**
 * ChapterTransition component
 * Wraps chapter content with fade animation and scroll management
 */
export function ChapterTransition({ children }: ChapterTransitionProps) {
  const { currentChapter, navigationType, isTransitioning } = useNavigation();
  const prefersReducedMotion = useReducedMotion();

  /**
   * Scroll management based on navigation type
   * - Jump navigation (menu, URL): Reset scroll to top
   * - Sequential navigation (next/prev): Preserve scroll position
   */
  useEffect(() => {
    if (navigationType === 'jump') {
      // Reset to top for menu navigation or direct URL changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // For 'sequential', do nothing - preserve current scroll position
  }, [currentChapter, navigationType]);

  /**
   * Animation configuration
   * Respects user's motion preferences
   */
  const transition = prefersReducedMotion 
    ? { duration: 0 } // Instant transition when reduced motion enabled
    : { duration: 0.3, ease: 'easeInOut' }; // Smooth 300ms fade when motion allowed

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentChapter || 'landing'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className={isTransitioning ? 'pointer-events-none' : ''}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
