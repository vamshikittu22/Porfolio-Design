/**
 * ChapterContainer - Reusable wrapper for all chapter pages
 * 
 * Provides consistent layout structure with header, footer, and progress tracking.
 * All 6 chapters use this container for uniform navigation chrome.
 * 
 * Features:
 * - Skip link for keyboard accessibility
 * - Chapter header with title and description
 * - Chapter footer with prev/next navigation
 * - Progress bar integration
 * - Auto-focus main content on mount
 * 
 * Usage:
 * ```tsx
 * <ChapterContainer chapterId="01-introduction">
 *   <YourChapterContent />
 * </ChapterContainer>
 * ```
 */

import { ReactNode, useRef, useEffect } from 'react';
import { ChapterId } from '../../../types/chapters';
import { getChapterById } from '../../../data/chapters';
import { useNavigation } from '../../../contexts/NavigationContext';
import { ChapterHeader } from './ChapterHeader';
import { ChapterFooter } from './ChapterFooter';
import { ChapterProgress } from './ChapterProgress';
import { useReadingProgress } from '../../hooks/useReadingProgress';

/**
 * ChapterContainer Props
 */
interface ChapterContainerProps {
  /** Chapter ID - must match one of the 6 defined chapters */
  chapterId: ChapterId;

  /** Chapter content - rendered between header and footer */
  children: ReactNode;
}

/**
 * ChapterContainer Component
 * 
 * Provides:
 * - Consistent layout wrapper (min-height: 100vh)
 * - Skip link for keyboard users
 * - Chapter header (sticky)
 * - Main content area (focusable)
 * - Chapter footer with navigation
 * - Progress bar tracking
 */
export function ChapterContainer({ chapterId, children }: ChapterContainerProps) {
  const { currentChapter } = useNavigation();
  const mainRef = useRef<HTMLElement>(null);
  const { containerRef, progress } = useReadingProgress();

  // Get chapter metadata from registry
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    console.error(`Invalid chapter ID: ${chapterId}`);
    return null;
  }

  /**
   * Focus main content on mount for accessibility
   * Ensures keyboard users land in the right place after navigation
   */
  useEffect(() => {
    if (mainRef.current && currentChapter === chapterId) {
      mainRef.current.focus();
    }
  }, [currentChapter, chapterId]);

  return (
    <div
      ref={containerRef}
      className="chapter-container min-h-screen flex flex-col"
      data-chapter={chapterId}
    >
      {/* Progress bar - fixed at top of viewport */}
      <ChapterProgress progress={progress} />

      {/* Skip link for keyboard accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-t-background focus:text-t-foreground focus:rounded-md focus-visible:ring-2 focus-visible:ring-t-accent"
      >
        Skip to main content
      </a>

      {/* Chapter Header - sticky at top */}
      <ChapterHeader
        title={chapter.title}
        description={chapter.description}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
        className="flex-1 focus:outline-none"
      >
        <div className="chapter-content-wrap">
          {children}
        </div>
      </main>

      {/* Chapter Footer - prev/next navigation */}
      <ChapterFooter chapterId={chapterId} />
    </div>
  );
}
