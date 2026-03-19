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
    id: '02-learner',
    number: 2,
    title: 'The Learner',
    hash: '02-learner',
    icon: '/icons/chapters/explorer.svg', // Temporary icon, should use a more relevant one if available
    subtitle: 'Certifications & Continued Learning',
    description: 'Oracle Academy certifications, Google Skills Boost badges, and lifelong learning journey'
  },
  {
    id: '03-builder',
    number: 3,
    title: 'The Builder',
    hash: '03-builder',
    icon: '/icons/chapters/builder.svg',
    subtitle: 'Projects & Technical Showcase',
    description: 'Full-stack projects with case studies, architecture decisions, and live demos'
  },
  {
    id: '04-journey',
    number: 4,
    title: 'The Journey',
    hash: '04-journey',
    icon: '/icons/chapters/journey.svg',
    subtitle: 'Career Timeline & Education',
    description: 'Career path from Mphasis to Citadel to CVS Health, plus academic background'
  },
  {
    id: '05-explorer',
    number: 5,
    title: 'The Explorer',
    hash: '05-explorer',
    icon: '/icons/chapters/explorer.svg',
    subtitle: 'Travel & Personal Adventures',
    description: 'Curiosity beyond code — travel stories and personal explorations'
  },
  {
    id: '06-thinker',
    number: 6,
    title: 'The Thinker',
    hash: '06-thinker',
    icon: '/icons/chapters/thinker.svg',
    subtitle: 'Problem Solving & AI Playground',
    description: 'Interactive games, AI experiments, and algorithmic thinking'
  },
  {
    id: '07-connection',
    number: 7,
    title: 'The Connection',
    hash: '07-connection',
    icon: '/icons/chapters/connection.svg',
    subtitle: 'Contact & Social Links',
    description: 'Email, LinkedIn, GitHub, and scheduling links to connect'
  },
  {
    id: '08-architecture',
    number: 8,
    title: 'System Architecture',
    hash: '08-architecture',
    icon: '/icons/chapters/builder.svg',
    subtitle: 'Engineering Blueprint',
    description: 'Technical deep dive into the performance, scaling, and systems design of this portfolio.'
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
