import { ChapterId } from '../types/chapters';

/**
 * Chapter Content Registry
 * Maps each chapter to its primary content sections and context prompts
 */

export interface ChapterContentMap {
  sections: string[];           // Associated content sections (e.g., "Hero", "Projects")
  theme: string;                // Chapter narrative theme
  contextPrompt: string;        // AI guidance for this chapter's context
}

export const CHAPTER_CONTENT: Record<ChapterId, ChapterContentMap> = {
  '01-introduction': {
    sections: ['Hero', 'About'],
    theme: 'First impressions and personal introduction',
    contextPrompt: 'Focus on Vamshi\'s background, elevator pitch, and core identity. Reference Hero section tagline and About section bio.'
  },
  '02-learner': {
    sections: ['Certifications', 'Learning'],
    theme: 'Lifelong learning and certifications',
    contextPrompt: 'Discuss Vamshi\'s certifications (Oracle, Google Cloud, AWS, Anthropic AI) and his approach to continuous technical learning and professional development.'
  },
  '03-builder': {
    sections: ['Projects', 'GitHub'],
    theme: 'Technical depth and what I create',
    contextPrompt: 'Emphasize project portfolio, technical skills, and GitHub contributions. Discuss specific projects with architecture details.'
  },
  '04-journey': {
    sections: ['Career', 'Resume'],
    theme: 'Career path and professional growth',
    contextPrompt: 'Highlight work experience, career progression, and professional achievements. Reference specific roles and companies.'
  },
  '05-explorer': {
    sections: ['Travel'],
    theme: 'Travel, curiosity, and learning adventures',
    contextPrompt: 'Discuss travel experiences, cultural exploration, and learning outside work. Connect to personal growth.'
  },
  '06-thinker': {
    sections: ['Game'],
    theme: 'Problem-solving, games, and AI playground',
    contextPrompt: 'Focus on analytical thinking, AI experimentation, and interactive demos. Mention Tic-Tac-Toe and AI capabilities.'
  },
  '07-connection': {
    sections: ['Contact'],
    theme: 'Contact, community, and staying in touch',
    contextPrompt: 'Guide users on how to connect, collaborate, or reach out. Provide contact information and encourage engagement.'
  }
};

/**
 * Get chapter-specific content context
 */
export function getChapterContext(chapterId: ChapterId | null): string {
  if (!chapterId) {
    return 'User is on the landing page viewing all chapters. Provide a general overview.';
  }

  const content = CHAPTER_CONTENT[chapterId];
  if (!content) return '';

  return `
    Current Chapter: "${chapterId}"
    Theme: ${content.theme}
    Sections: ${content.sections.join(', ')}
    Guidance: ${content.contextPrompt}
  `;
}
