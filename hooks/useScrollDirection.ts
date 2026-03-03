/**
 * useScrollDirection Hook
 * 
 * Detects scroll direction for auto-hide sidebar behavior.
 * Returns 'up', 'down', or 'none' based on user scroll activity.
 * 
 * Features:
 * - 10px threshold to prevent jitter on small movements
 * - 50ms debounce to reduce state updates
 * - Returns 'none' at top of page or on initial mount
 * - Cleans up listeners on unmount
 * 
 * Usage:
 * ```tsx
 * function Sidebar() {
 *   const scrollDirection = useScrollDirection();
 *   const isVisible = scrollDirection === 'up' || scrollDirection === 'none';
 *   return <div style={{ display: isVisible ? 'block' : 'none' }}>...</div>;
 * }
 * ```
 */

import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('none');
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    // Initialize last scroll position
    lastScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // At top of page - always return 'up' or 'none'
      if (currentScrollY < 50) {
        setScrollDirection('none');
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      // Calculate difference with threshold to prevent jitter
      const difference = currentScrollY - lastScrollY.current;
      const threshold = 10;

      if (Math.abs(difference) < threshold) {
        // Movement too small, ignore
        ticking.current = false;
        return;
      }

      // Determine direction
      if (difference > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      // Update last position
      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      // Debounce using requestAnimationFrame (better than setTimeout for scroll)
      if (!ticking.current) {
        ticking.current = true;
        
        // Add 50ms delay for additional debouncing
        setTimeout(() => {
          window.requestAnimationFrame(updateScrollDirection);
        }, 50);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollDirection;
}

export default useScrollDirection;
