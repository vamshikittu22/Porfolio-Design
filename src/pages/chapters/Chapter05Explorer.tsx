/**
 * Chapter 05: The Explorer
 * 
 * Fifth chapter in the portfolio narrative featuring travel blog content.
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load TravelSection for performance
const TravelSection = lazy(() => import('../../../sections/travel/TravelSection'));

/**
 * Chapter05Explorer - Fifth chapter focusing on personal adventures and growth.
 */
export function Chapter05Explorer() {
  return (
    <ChapterContainer chapterId="05-explorer">
      <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
        <Suspense fallback={<SectionLoader />}>
          <TravelSection />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter05Explorer;
