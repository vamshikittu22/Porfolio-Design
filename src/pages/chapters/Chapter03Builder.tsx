/**
 * Chapter 03: The Builder
 * 
 * Third chapter showcasing technical projects and GitHub activity.
 * Demonstrates technical capabilities and creative output.
 * 
 * Sections:
 * - ProjectsSection: Portfolio projects and case studies
 * - GithubSection: GitHub stats and contribution activity
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load sections for performance (below-the-fold content)
const ProjectsSection = lazy(() => import('../../../sections/projects/ProjectsSection'));
const GithubSection = lazy(() => import('../../../sections/github/GithubSection'));

/**
 * Chapter03Builder Component
 * 
 * Composes Projects and GitHub sections into "Builder" narrative.
 */
export function Chapter03Builder() {
  return (
    <ChapterContainer chapterId="03-builder">
      <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 space-y-24">
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

export default Chapter03Builder;
