/**
 * ChapterCard Component
 * 
 * Interactive chapter card with glass morphism styling and navigation.
 * Features hover/tap animations, keyboard accessibility, and reduced motion support.
 * 
 * Props:
 * - chapter: Chapter object with id, title, description, and number
 * 
 * Behavior:
 * - Click/tap navigates to chapter using 'jump' navigation (resets scroll)
 * - Hover triggers scale and lift animation (when motion enabled)
 * - Tap triggers press animation
 * - Keyboard accessible (Tab, Enter, Space)
 * - Respects prefers-reduced-motion
 */

import { motion } from 'framer-motion';
import { useNavigation } from '../../../contexts/NavigationContext';
import useReducedMotion from '../../hooks/useReducedMotion';
import type { Chapter } from '../../../types/chapters';

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { navigateToChapter } = useNavigation();
  const prefersReducedMotion = useReducedMotion();

  const handleNavigate = () => {
    // Use 'jump' navigation type to reset scroll to top when entering chapter
    navigateToChapter(chapter.id, 'jump');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter and Space for keyboard activation
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  };

  return (
    <motion.article
      className="glass-card chapter-card"
      // Framer Motion gestures - only active when motion is enabled
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onTap={handleNavigate}
      // Accessibility attributes
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Navigate to ${chapter.title}`}
      style={{
        cursor: 'pointer',
        minHeight: '200px', // Ensures adequate touch target (exceeds WCAG 44px minimum)
        position: 'relative', // For absolute positioned number
      }}
    >
      <div className="card-content">
        {/* Chapter number indicator - subtle watermark style */}
        <div className="card-number">
          <span className="text-4xl font-bold text-white/40">
            {chapter.number.toString().padStart(2, '0')}
          </span>
        </div>
        
        {/* Chapter icon placeholder - icons deferred per Phase 1 decision */}
        {/* TODO: Replace with actual icon when chapter icons created */}
        <div className="card-icon" aria-hidden="true">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-2xl">{chapter.number}</span>
          </div>
        </div>
        
        {/* Chapter title */}
        <h2 className="card-title text-2xl font-semibold mt-4">
          {chapter.title}
        </h2>
        
        {/* Chapter description */}
        <p className="card-description text-sm text-white/70 mt-2">
          {chapter.description}
        </p>
      </div>
    </motion.article>
  );
}
