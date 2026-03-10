/**
 * Chapter 04: The Journey
 * 
 * Fourth chapter depicting career progression and professional growth.
 * Shows career path from overview to detailed experience.
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import CareerSnapshot from '../../../sections/career/CareerSnapshot';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load ResumeSection (detailed content, below-the-fold)
const ResumeSection = lazy(() => import('../../../sections/resume/ResumeSection'));

/**
 * Chapter04Journey Component
 * 
 * Composes Career and Resume sections into "Journey" narrative.
 */
export function Chapter04Journey() {
  return (
    <ChapterContainer chapterId="04-journey">
      <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 space-y-32">
        {/* Career Snapshot - Above the fold overview */}
        <CareerSnapshot />

        {/* Resume Section - Detailed work history and experience */}
        <Suspense fallback={<SectionLoader />}>
          <ResumeSection />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter04Journey;
