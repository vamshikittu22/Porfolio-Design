/**
 * Chapter 03: The Journey
 * 
 * Third chapter depicting career progression and professional growth.
 * Shows career path from overview to detailed experience.
 * 
 * Sections:
 * - CareerSnapshot: High-level career overview and timeline stats
 * - ResumeSection: Detailed work history, education, and skills
 * 
 * Theme: "Career path and growth"
 * 
 * Content Flow:
 * CareerSnapshot → ResumeSection (progressive disclosure pattern)
 * Snapshot provides entry point, resume adds depth.
 * 
 * TODO (Phase 4): Add personal growth narrative text between sections
 * to fulfill CHAP-07 blended professional/personal requirement
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import CareerSnapshot from '../../../sections/career/CareerSnapshot';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load ResumeSection (detailed content, below-the-fold)
const ResumeSection = lazy(() => import('../../../sections/resume/ResumeSection'));

/**
 * Chapter03Journey Component
 * 
 * Composes Career and Resume sections into "Journey" narrative.
 * Progressive disclosure: overview → details.
 */
export function Chapter03Journey() {
  return (
    <ChapterContainer chapterId="03-journey">
      <article className="max-w-[1440px] mx-auto px-10 lg:px-32 py-20 space-y-20">
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

export default Chapter03Journey;
