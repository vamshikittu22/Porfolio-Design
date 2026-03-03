/**
 * Chapter 02: The Builder
 * 
 * Second chapter showcasing technical projects and GitHub activity.
 * Demonstrates technical capabilities and creative output.
 * 
 * Sections:
 * - ProjectsSection: Portfolio projects and case studies
 * - GithubSection: GitHub stats and contribution activity
 * 
 * Theme: "What I create and build"
 * 
 * Performance Note:
 * Both sections are lazy loaded as they contain below-the-fold content
 * and maintain performance optimization pattern from App.tsx
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load sections for performance (below-the-fold content)
const ProjectsSection = lazy(() => import('../../../sections/projects/ProjectsSection'));
const GithubSection = lazy(() => import('../../../sections/github/GithubSection'));

/**
 * Chapter02Builder Component
 * 
 * Composes Projects and GitHub sections into "Builder" narrative.
 * Showcases technical projects and open source contributions.
 */
export function Chapter02Builder() {
  return (
    <ChapterContainer chapterId="02-builder">
      <article className="max-w-[1440px] mx-auto px-10 lg:px-32 py-20 space-y-20">
        {/* Projects Section - Portfolio projects and case studies */}
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        
        {/* GitHub Section - Contribution stats and activity */}
        <Suspense fallback={<SectionLoader />}>
          <GithubSection />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter02Builder;
