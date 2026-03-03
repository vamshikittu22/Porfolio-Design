/**
 * ChapterFooter - Chapter navigation footer
 * 
 * Provides prev/next chapter navigation buttons.
 * Buttons only appear if prev/next chapters exist.
 * Includes keyboard shortcuts (arrow keys).
 * 
 * Features:
 * - Prev/next navigation buttons
 * - Keyboard shortcuts (← → arrow keys)
 * - Glass morphism styling
 * - Accessible aria-labels with chapter names
 * - Focus-visible indicators
 */

import { useEffect } from 'react';
import { ChapterId } from '../../../types/chapters';
import { getNextChapter, getPrevChapter } from '../../../data/chapters';
import { useNavigation } from '../../../contexts/NavigationContext';

/**
 * ChapterFooter Props
 */
interface ChapterFooterProps {
  /** Current chapter ID - used to find prev/next chapters */
  chapterId: ChapterId;
}

/**
 * ChapterFooter Component
 * 
 * Navigation footer with prev/next buttons and keyboard shortcuts.
 * Uses glass morphism styling matching ChapterHeader.
 */
export function ChapterFooter({ chapterId }: ChapterFooterProps) {
  const { navigateToChapter } = useNavigation();
  
  // Get prev/next chapters
  const prevChapter = getPrevChapter(chapterId);
  const nextChapter = getNextChapter(chapterId);
  
  /**
   * Keyboard navigation - Arrow keys for prev/next
   * ArrowLeft: Previous chapter
   * ArrowRight: Next chapter
   * Uses 'sequential' navigation type to preserve scroll position
   */
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Only handle arrow keys
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }
      
      // Prevent default scrolling behavior
      event.preventDefault();
      event.stopPropagation();
      
      // Navigate based on key
      if (event.key === 'ArrowLeft' && prevChapter) {
        navigateToChapter(prevChapter.id, 'sequential');
      } else if (event.key === 'ArrowRight' && nextChapter) {
        navigateToChapter(nextChapter.id, 'sequential');
      }
    };
    
    // Attach listener
    window.addEventListener('keydown', handleKeydown);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [chapterId, prevChapter, nextChapter, navigateToChapter]);
  
  return (
    <nav
      aria-label="Chapter navigation"
      className="chapter-footer glass-morphism"
      style={{
        background: 'rgba(var(--background-rgb), 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Chapter Button */}
          {prevChapter ? (
            <button
              onClick={() => navigateToChapter(prevChapter.id, 'sequential')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              style={{
                borderColor: 'rgba(var(--chapter-accent), 0.3)',
                backgroundColor: 'rgba(var(--chapter-accent), 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--chapter-accent), 0.6)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--chapter-accent), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--chapter-accent), 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--chapter-accent), 0.05)';
              }}
              aria-label={`Previous chapter: ${prevChapter.title}`}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">
                {prevChapter.title}
              </span>
              <span className="sm:hidden text-sm font-medium">Previous</span>
            </button>
          ) : (
            <div /> // Spacer to maintain layout
          )}
          
          {/* Keyboard hint - hidden on mobile */}
          <div className="hidden md:block text-xs text-t-secondary/60">
            Keyboard: ← → arrows
          </div>
          
          {/* Next Chapter Button */}
          {nextChapter ? (
            <button
              onClick={() => navigateToChapter(nextChapter.id, 'sequential')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
              style={{
                borderColor: 'rgba(var(--chapter-accent), 0.3)',
                backgroundColor: 'rgba(var(--chapter-accent), 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--chapter-accent), 0.6)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--chapter-accent), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--chapter-accent), 0.3)';
                e.currentTarget.style.backgroundColor = 'rgba(var(--chapter-accent), 0.05)';
              }}
              aria-label={`Next chapter: ${nextChapter.title}`}
            >
              <span className="hidden sm:inline text-sm font-medium">
                {nextChapter.title}
              </span>
              <span className="sm:hidden text-sm font-medium">Next</span>
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div /> // Spacer to maintain layout
          )}
        </div>
      </div>
      
      {/* Top border for visual separation */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent" 
        style={{
          backgroundImage: 'linear-gradient(to right, transparent, rgba(var(--chapter-accent), 0.3), transparent)',
        }}
      />
    </nav>
  );
}
