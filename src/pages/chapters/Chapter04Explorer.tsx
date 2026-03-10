/**
 * Chapter 4: The Explorer
 * 
 * Travel blog content showing curiosity-driven learning and adventures.
 * Fulfills CHAP-04 requirement: compose TravelSection into narrative chapter.
 * 
 * Content strategy:
 * - TravelSection provides substantial travel blog content
 * - Single-section focus allows deep dive into exploration narrative
 * - Future enhancement (CHAP-07): Add section intro text linking travel → learning
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load TravelSection for performance (already lazy loaded in App.tsx)
const TravelSection = lazy(() => import('../../../sections/travel/TravelSection'));

/**
 * Chapter04Explorer - Fourth chapter in the portfolio narrative
 * 
 * Theme: "The Explorer" - curiosity, learning through travel, adventures
 * 
 * Uses ChapterContainer wrapper for:
 * - Consistent header/footer navigation chrome
 * - Reading progress tracking
 * - Keyboard navigation support
 * - Accessibility features (skip links, auto-focus)
 */
export function Chapter04Explorer() {
  return (
    <ChapterContainer chapterId="04-explorer">
      <div className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
        {/* TODO (CHAP-07): Add section intro text about travel → learning connection */}
        {/* Blending professional/personal growth narrative */}

        <Suspense fallback={<SectionLoader />}>
          <TravelSection />
        </Suspense>
      </div>
    </ChapterContainer>
  );
}
