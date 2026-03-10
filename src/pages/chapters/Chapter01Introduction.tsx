/**
 * Chapter 01: The Introduction
 * 
 * First chapter of the portfolio narrative focused on the About section.
 * Provides personal background and a deep dive into skills.
 * 
 * Sections:
 * - AboutSection: Skills matrix and personal background
 * 
 * Theme: "Who I am and why I'm here"
 */

import React, { Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import { AboutSection } from '../../../sections/about/AboutSection';
import SectionLoader from '../../../components/ui/SectionLoader';

/**
 * Chapter01Introduction Component
 * 
 * Renders the About section within the the first chapter narrative.
 * Uses ChapterContainer for consistent layout and navigation chrome.
 */
export function Chapter01Introduction() {
  return (
    <ChapterContainer chapterId="01-introduction">
      <article>
        {/* About Section - Constrained width with padding */}
        <Suspense fallback={<SectionLoader />}>
          <div className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
            <header className="mb-16">
              <span className="inline-block text-[10px] font-mono font-black uppercase tracking-[0.5em] text-t-accent mb-4">
                Chapter 01
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black font-heading text-t-fg tracking-tight mb-6 leading-[1.1]">
                The Architect<span className="text-t-accent">'</span>s Introduction
              </h1>
              <div className="h-1 w-20 bg-t-accent" />
            </header>
            <AboutSection />
          </div>
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter01Introduction;
