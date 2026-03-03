/**
 * ChapterProgress - Reading progress indicator
 * 
 * Fixed progress bar at top of viewport showing reading completion.
 * Uses GPU-accelerated scaleX transform for smooth 60fps performance.
 * Respects prefers-reduced-motion accessibility setting.
 * 
 * Features:
 * - Fixed positioning at viewport top
 * - Transform: scaleX (GPU-accelerated, not width)
 * - Spring-smoothed progress from useReadingProgress
 * - Reduced motion support
 * - z-index: 1000 to stay above all content
 */

import { motion, MotionValue } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * ChapterProgress Props
 */
interface ChapterProgressProps {
  /** Progress value from useReadingProgress (0-1) */
  progress: MotionValue<number>;
}

/**
 * ChapterProgress Component
 * 
 * Renders fixed progress bar driven by scroll position.
 * Uses transform: scaleX for GPU acceleration (NOT width-based animation).
 */
export function ChapterProgress({ progress }: ChapterProgressProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="chapter-progress-bar"
      style={{
        // Fixed positioning at top of viewport
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 1000,
        
        // Background color - uses Tailwind accent color
        backgroundColor: 'var(--accent-color, rgb(59, 130, 246))',
        
        // GPU-accelerated transform - scaleX driven by progress
        scaleX: progress,
        transformOrigin: '0%', // Scale from left to right
        
        // Performance hint for browser
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      // Disable animation if reduced motion preferred
      transition={
        prefersReducedMotion 
          ? { duration: 0 }
          : { duration: 0 } // Spring smoothing already applied in useReadingProgress
      }
    />
  );
}
