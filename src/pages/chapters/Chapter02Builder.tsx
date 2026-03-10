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
 * Scalability: Projects are data-driven from PROJECTS_CONFIG.
 * Add new projects to config/projects.ts and they auto-appear.
 * Set featured: true on one project for the hero card treatment.
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load sections for performance (below-the-fold content)
const ProjectsSection = lazy(() => import('../../../sections/projects/ProjectsSection'));
const GithubSection = lazy(() => import('../../../sections/github/GithubSection'));
const BadgeHighlights = lazy(() => import('../../../sections/badges/BadgeHighlights'));

/**
 * Chapter02Builder Component
 * 
 * Composes Projects and GitHub sections into "Builder" narrative.
 * Showcases technical projects and open source contributions.
 */
export function Chapter02Builder() {
  return (
    <ChapterContainer chapterId="02-builder">
      <article className="max-w-[1440px] mx-auto px-10 lg:px-32 py-20 space-y-12">
        {/* Projects Section - Portfolio projects and case studies */}
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        {/* Badges & Certifications - credibility layer */}
        <Suspense fallback={<SectionLoader />}>
          <BadgeHighlights />
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
