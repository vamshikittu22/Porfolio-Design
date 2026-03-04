/**
 * Chapter Metadata Registry
 * 
 * Single source of truth for all 6 portfolio chapters.
 * Defines chapter metadata, navigation helpers, and sequential navigation logic.
 * Modeled after sections/case-study/CaseStudyData.ts pattern.
 */

import { Chapter, ChapterId } from '../types/chapters';

/**
 * CHAPTERS - Complete registry of all 6 chapters
 * Each chapter represents a thematic section of the portfolio narrative
 */
export const CHAPTERS: Chapter[] = [
  {
    id: '01-introduction',
    number: 1,
    title: 'The Introduction',
    hash: '01-introduction',
    icon: '/icons/chapters/introduction.svg',
    subtitle: 'Bio, Skills & Executive Profile',
    description: '5+ years of experience, 40+ technologies, and the story behind the engineer'
  },
  {
    id: '02-builder',
    number: 2,
    title: 'The Builder',
    hash: '02-builder',
    icon: '/icons/chapters/builder.svg',
    subtitle: 'Projects & Technical Showcase',
    description: 'Full-stack projects with case studies, architecture decisions, and live demos'
  },
  {
    id: '03-journey',
    number: 3,
    title: 'The Journey',
    hash: '03-journey',
    icon: '/icons/chapters/journey.svg',
    subtitle: 'Career Timeline & Education',
    description: 'Career path from Mphasis to Citadel to CVS Health, plus academic background'
  },
  {
    id: '04-explorer',
    number: 4,
    title: 'The Explorer',
    hash: '04-explorer',
    icon: '/icons/chapters/explorer.svg',
    subtitle: 'Travel & Personal Adventures',
    description: 'Curiosity beyond code — travel stories and personal explorations'
  },
  {
    id: '05-thinker',
    number: 5,
    title: 'The Thinker',
    hash: '05-thinker',
    icon: '/icons/chapters/thinker.svg',
    subtitle: 'Problem Solving & AI Playground',
    description: 'Interactive games, AI experiments, and algorithmic thinking'
  },
  {
    id: '06-connection',
    number: 6,
    title: 'The Connection',
    hash: '06-connection',
    icon: '/icons/chapters/connection.svg',
    subtitle: 'Contact & Social Links',
    description: 'Email, LinkedIn, GitHub, and scheduling links to connect'
  }
];

/**
 * getChapterByHash - Lookup chapter by URL hash
 * @param hash - URL hash string (with or without leading #)
 * @returns Chapter object if found, undefined otherwise
 * 
 * Usage:
 * - Parse window.location.hash and find matching chapter
 * - Validate hash-based navigation targets
 */
export function getChapterByHash(hash: string): Chapter | undefined {
  // Strip leading # if present
  const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;

  return CHAPTERS.find(chapter => chapter.hash === cleanHash);
}

/**
 * getNextChapter - Get the next chapter in sequence
 * @param currentId - Current chapter ID
 * @returns Next chapter or null if at the end
 * 
 * Usage:
 * - Implement "Next" button navigation
 * - Sequential reading flow
 */
export function getNextChapter(currentId: ChapterId): Chapter | null {
  const currentIndex = CHAPTERS.findIndex(chapter => chapter.id === currentId);

  if (currentIndex === -1 || currentIndex === CHAPTERS.length - 1) {
    return null; // Not found or already at last chapter
  }

  return CHAPTERS[currentIndex + 1];
}

/**
 * getPrevChapter - Get the previous chapter in sequence
 * @param currentId - Current chapter ID
 * @returns Previous chapter or null if at the beginning
 * 
 * Usage:
 * - Implement "Previous" button navigation
 * - Sequential reading flow
 */
export function getPrevChapter(currentId: ChapterId): Chapter | null {
  const currentIndex = CHAPTERS.findIndex(chapter => chapter.id === currentId);

  if (currentIndex <= 0) {
    return null; // Not found or already at first chapter
  }

  return CHAPTERS[currentIndex - 1];
}

/**
 * getChapterById - Direct lookup by chapter ID
 * @param id - Chapter ID
 * @returns Chapter object if found, undefined otherwise
 * 
 * Usage:
 * - Quick lookups when ID is already known
 * - Type-safe chapter access
 */
export function getChapterById(id: ChapterId): Chapter | undefined {
  return CHAPTERS.find(chapter => chapter.id === id);
}
