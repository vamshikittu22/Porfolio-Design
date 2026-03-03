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

import { motion } from 'framer-motion';
import { CHAPTERS } from '../../../data/chapters';
import useReducedMotion from '../../hooks/useReducedMotion';
import { ChapterCard } from './ChapterCard';
import '../../styles/landing.css';
import '../../styles/glass-cards.css';

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
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } // easeOut cubic-bezier
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
        >
          <ChapterCard chapter={chapter} />
        </motion.div>
      ))}
    </motion.div>
  );
}
