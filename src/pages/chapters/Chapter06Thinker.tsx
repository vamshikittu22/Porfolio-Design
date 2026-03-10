/**
 * Chapter 06: The Thinker
 * 
 * Sixth chapter in the portfolio narrative featuring game and AI playground content.
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load GameSection for performance
const GameSection = lazy(() => import('../../../sections/game/GameSection'));

/**
 * Chapter06Thinker - Sixth chapter focusing on algorithmic thinking and interactive demos.
 */
export function Chapter06Thinker() {
  return (
    <ChapterContainer chapterId="06-thinker">
      <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
        <Suspense fallback={<SectionLoader />}>
          <GameSection />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter06Thinker;
