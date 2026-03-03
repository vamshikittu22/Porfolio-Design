/**
 * ChapterCardGrid Component
 * 
 * Responsive grid layout that displays all 6 chapters with Framer Motion stagger animations.
 * Uses CSS Grid auto-fit pattern for automatic column adjustment across breakpoints.
 * 
 * Features:
 * - Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Stagger animation with 100ms delay between cards
 * - Respects prefers-reduced-motion for accessibility
 * - Stable React keys using chapter.id (not index)
 * 
 * Animation pattern:
 * - Container: opacity fade-in with staggerChildren
 * - Cards: opacity + translateY fade-up effect
 * - Duration: 300ms per card, 100ms stagger delay
 * - Reduced motion: instant appearance (no animation)
 */

import { motion } from 'motion/react';
import { CHAPTERS } from '../../../data/chapters';
import useReducedMotion from '../../hooks/useReducedMotion';
import '../../styles/landing.css';

export function ChapterCardGrid() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Container animation variants
   * Controls stagger timing for child cards
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,  // 100ms delay between cards
        delayChildren: 0.2     // Start after 200ms
      }
    }
  };

  /**
   * Card animation variants
   * Fade-up effect: opacity 0→1, y 20→0
   */
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className="chapter-card-grid"
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
    >
      {CHAPTERS.map(chapter => (
        <motion.div 
          key={chapter.id}
          variants={prefersReducedMotion ? {} : cardVariants}
          className="chapter-card-placeholder"
        >
          {/* Placeholder content - actual ChapterCard in 02-02 */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold text-t-accent">
                {chapter.number}
              </span>
              <h3 className="text-xl font-semibold text-t-primary">
                {chapter.title}
              </h3>
            </div>
            <p className="text-sm text-t-secondary">
              {chapter.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
