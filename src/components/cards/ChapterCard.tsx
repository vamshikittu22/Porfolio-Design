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
      className="glass-card chapter-card group"
      // Framer Motion gestures - only active when motion is enabled
      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -6 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      onTap={handleNavigate}
      // Accessibility attributes
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Navigate to ${chapter.title}`}
      style={{
        cursor: 'pointer',
        minHeight: '200px',
        position: 'relative',
      }}
    >
      <div className="card-content">
        {/* Chapter number - accent-colored */}
        <div className="card-number">
          <span className="text-5xl font-black text-t-accent/30 group-hover:text-t-accent/60 transition-colors duration-500">
            {chapter.number.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Subtitle badge */}
        {chapter.subtitle && (
          <div className="mb-3">
            <span className="text-[9px] font-mono font-bold text-t-accent-2 uppercase tracking-[0.3em] bg-t-accent-2/10 px-3 py-1 rounded-full">
              {chapter.subtitle}
            </span>
          </div>
        )}

        {/* Chapter title */}
        <h2 className="card-title text-2xl font-black mt-3 group-hover:text-t-accent transition-colors duration-300">
          {chapter.title}
        </h2>

        {/* Chapter description */}
        <p className="card-description text-sm text-white/50 mt-2 group-hover:text-white/70 transition-colors duration-300">
          {chapter.description}
        </p>

        {/* Explore CTA */}
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold text-t-accent/50 uppercase tracking-widest group-hover:text-t-accent transition-all duration-300">
          <span>Explore</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path d="M14 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}
