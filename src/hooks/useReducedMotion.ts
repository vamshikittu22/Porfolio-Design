/**
 * useReducedMotion Hook
 * 
 * Detects user's motion preference for accessibility.
 * Respects the prefers-reduced-motion media query and updates dynamically
 * if the user toggles the setting during a session.
 * 
 * Returns:
 * - true: User prefers reduced motion (animations should be disabled/instant)
 * - false: User allows motion (normal animations enabled)
 * 
 * Usage:
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * const transition = prefersReducedMotion 
 *   ? { duration: 0 } 
 *   : { duration: 0.3, ease: 'easeInOut' };
 * ```
 */

import { useState, useEffect } from 'react';

/**
 * Check if user prefers reduced motion
 * @returns boolean - true if reduced motion preferred
 */
export default function useReducedMotion(): boolean {
  // Initialize state from media query (SSR-safe check)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // Server-side safety: default to false if window doesn't exist
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Check if matchMedia is available (older browsers may not support it)
    if (!window.matchMedia) {
      return false;
    }
    
    // Query the user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  });

  useEffect(() => {
    // Server-side safety
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    /**
     * Update state when preference changes
     * User can toggle this in OS settings during session
     */
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers: addEventListener
    // Legacy browsers: addListener (deprecated but still needed for Safari < 14)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup listener on unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
