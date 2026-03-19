/**
 * Chapter 08: System Architecture
 * 
 * Eighth chapter in the portfolio narrative detailing Case Study metrics
 * and the specific modular engineering blueprint built for the site.
 */

import React, { Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';
import PortfolioCaseStudy from '../../../sections/case-study/PortfolioCaseStudy';

/**
 * Chapter08Architecture Component
 */
export function Chapter08Architecture() {
  return (
    <ChapterContainer chapterId="08-architecture">
      <article className="w-full">
        <Suspense fallback={<SectionLoader />}>
          {/* Sets the hash to empty string to return to Landing Page */}
          <PortfolioCaseStudy onBack={() => { window.location.hash = ''; }} />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter08Architecture;
