/**
 * Chapter 01: The Introduction
 * 
 * First chapter of the portfolio narrative combining Hero and About sections.
 * Provides first impression and personal background introduction.
 * 
 * Sections:
 * - HeroSection: Visual introduction and hero card
 * - AboutSection: Skills matrix and personal background
 * 
 * Theme: "Who I am and why I'm here"
 */

import React, { Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import { HeroSection } from '../../../sections/hero/HeroSection';
import { AboutSection } from '../../../sections/about/AboutSection';
import SectionLoader from '../../../components/ui/SectionLoader';

/**
 * Chapter01Introduction Component
 * 
 * Composes Hero and About sections into first chapter narrative.
 * Uses ChapterContainer for consistent layout and navigation chrome.
 */
export function Chapter01Introduction() {
  // TODO: Wire up hero image state from navigation context in Plan 04
  const heroImage = null;
  const heroLoading = false;
  
  // Placeholder scroll handler - will be wired in Plan 04
  const handleScroll = (_id: string) => {
    console.log('Navigation scroll handler not yet implemented');
  };
  
  return (
    <ChapterContainer chapterId="01-introduction">
      <article className="space-y-20">
        {/* Hero Section - Above the fold introduction */}
        <Suspense fallback={<SectionLoader />}>
          <section>
            <HeroSection 
              image={heroImage}
              loading={heroLoading}
              onScroll={handleScroll}
            />
          </section>
        </Suspense>
        
        {/* About Section - Skills and background */}
        <Suspense fallback={<SectionLoader />}>
          <section>
            <AboutSection />
          </section>
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter01Introduction;
