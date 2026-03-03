/**
 * useReadingProgress - Reading progress tracking hook
 * 
 * Wraps Framer Motion's useScroll with spring smoothing for polished UX.
 * Tracks scroll position from 0 (top) to 1 (bottom) with smooth animation.
 * 
 * Features:
 * - useScroll for scroll position tracking
 * - useSpring for smooth progress animation
 * - Container-based tracking (not window scroll)
 * - GPU-accelerated rendering with scaleX transform
 * 
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { containerRef, progress } = useReadingProgress();
 *   
 *   return (
 *     <div ref={containerRef}>
 *       <ProgressBar progress={progress} />
 *       {content}
 *     </div>
 *   );
 * }
 * ```
 */

import { useRef } from 'react';
import { useScroll, useSpring, MotionValue } from 'framer-motion';

/**
 * useReadingProgress Return Type
 */
interface UseReadingProgressReturn {
  /** Container ref - attach to scrollable element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  
  /** Progress value (0-1) with spring smoothing */
  progress: MotionValue<number>;
}

/**
 * useReadingProgress Hook
 * 
 * Provides scroll progress tracking with smooth spring animation.
 * 
 * @returns Container ref and smooth progress value (0-1)
 */
export function useReadingProgress(): UseReadingProgressReturn {
  // Container reference for scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  
  /**
   * useScroll - Track scroll position within container
   * offset: ["start start", "end end"] means 0 when container top hits viewport top,
   * 1 when container bottom hits viewport bottom
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  /**
   * useSpring - Smooth the progress value
   * Prevents jittery progress bar during scroll
   * 
   * stiffness: 100 - moderate spring responsiveness
   * damping: 30 - smooth deceleration
   * restDelta: 0.001 - high precision for final value
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return {
    containerRef,
    progress: smoothProgress
  };
}
