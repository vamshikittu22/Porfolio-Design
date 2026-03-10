/**
 * Chapter 5: The Thinker
 * 
 * Game and AI playground content showcasing problem-solving and algorithms.
 * Fulfills CHAP-05 requirement: compose GameSection into narrative chapter.
 * 
 * Content strategy:
 * - GameSection includes Tic-Tac-Toe minimax game
 * - PROJECT.md lists "AI playground features" as existing (may be in GameSection)
 * - Fulfills "The Thinker" theme: algorithmic thinking and problem-solving
 * 
 * Note: If AI playground is separate from GameSection, may need enhancement in Phase 4
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load GameSection for performance (already lazy loaded in App.tsx)
// Interactive content (game) benefits from lazy loading
const GameSection = lazy(() => import('../../../sections/game/GameSection'));

/**
 * Chapter05Thinker - Fifth chapter in the portfolio narrative
 * 
 * Theme: "The Thinker" - problem-solving approach, algorithms, game AI
 * 
 * Uses ChapterContainer wrapper for:
 * - Consistent header/footer navigation chrome
 * - Reading progress tracking
 * - Keyboard navigation support
 * - Accessibility features (skip links, auto-focus)
 */
export function Chapter05Thinker() {
  return (
    <ChapterContainer chapterId="05-thinker">
      <div className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
        {/* TODO: Verify AI playground is included in GameSection */}
        {/* If separate, add component in future enhancement */}

        <Suspense fallback={<SectionLoader />}>
          <GameSection />
        </Suspense>
      </div>
    </ChapterContainer>
  );
}
