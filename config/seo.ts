/**
 * SEO Configuration
 * 
 * Centralized SEO metadata for portfolio site and all chapter pages.
 * Provides Open Graph, Twitter Card, and JSON-LD structured data.
 */

import { ChapterId } from '../types/chapters';

export const SITE_CONFIG = {
  name: 'Vamshi Krishna Pullaiahgari',
  title: 'Vamshi Krishna Pullaiahgari | Software Engineer Portfolio',
  description: 'AI-Native full-stack portfolio featuring React 19, .NET Core, and Gemini API integration. STEM OPT Software Engineer specializing in scalable web applications.',
  url: 'https://vamshikrishnapullaiahgariportfolio.vercel.app',
  ogImage: 'https://vamshikrishnapullaiahgariportfolio.vercel.app/og-image.png',
  author: {
    name: 'Vamshi Krishna Pullaiahgari',
    email: 'vamshikrishna2297@gmail.com',
    twitter: '@ki22u__',
    linkedin: 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/',
    github: 'https://github.com/vamshikittu22',
  },
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'TypeScript',
    'C#',
    '.NET Core',
    'Java',
    'Spring Boot',
    'AWS',
    'Google Cloud',
    'AI Integration',
    'Microservices',
    'Portfolio',
    'STEM OPT',
  ],
};

export interface ChapterSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export const CHAPTER_SEO: Record<ChapterId, ChapterSEO> = {
  '01-introduction': {
    title: 'The Introduction - Vamshi Krishna | Software Engineer',
    description: '5+ years of full-stack experience across CVS Health, Citadel, and Mphasis. Expertise in Java, Spring Boot, React, AWS, and cloud-native architectures. STEM OPT Software Engineer.',
    keywords: [
      'About Vamshi Krishna',
      'Software Engineer Bio',
      'Full Stack Developer',
      'Java Expert',
      'React Developer',
      'Cloud Engineer',
      'CVS Health',
      'Citadel',
    ],
    ogImage: '/og-chapter-01.png',
  },
  '02-learner': {
    title: 'The Learner - Certifications & Continuous Learning | Vamshi Krishna',
    description: 'Specialized certifications from Oracle Academy, Google Cloud, and AWS. Commitment to lifelong learning and staying at the forefront of software engineering technologies.',
    keywords: [
      'Certifications',
      'Oracle Certified',
      'Google Cloud Skills',
      'Continuous Learning',
      'Professional Development',
      'Technical Skills',
      'Lifelong Learner',
    ],
    ogImage: '/og-chapter-02.png',
  },
  '03-builder': {
    title: 'The Builder - Projects & Technical Showcase | Vamshi Krishna',
    description: 'Explore full-stack projects including AI-powered applications, microservices architectures, and cloud-native solutions. Live demos, case studies, and technical deep-dives.',
    keywords: [
      'Software Projects',
      'Portfolio Projects',
      'Full Stack Projects',
      'React Projects',
      'Java Projects',
      'Microservices',
      'Cloud Native',
      'Case Studies',
    ],
    ogImage: '/og-chapter-03.png',
  },
  '04-journey': {
    title: 'The Journey - Career Timeline & Education | Vamshi Krishna',
    description: 'Career progression from Mphasis to Citadel to CVS Health. Masters in Computer Science from University of Central Missouri. 5+ years of enterprise software development.',
    keywords: [
      'Career Timeline',
      'Work Experience',
      'CVS Health Engineer',
      'Citadel Engineer',
      'Mphasis',
      'University of Central Missouri',
      'Computer Science',
      'Career Path',
    ],
    ogImage: '/og-chapter-04.png',
  },
  '05-explorer': {
    title: 'The Explorer - Travel & Personal Adventures | Vamshi Krishna',
    description: 'Curiosity beyond code. Travel stories from Rishikesh to Coorg, personal adventures, and experiences that shape my perspective as an engineer.',
    keywords: [
      'Travel Stories',
      'Personal Blog',
      'Adventures',
      'Rishikesh',
      'Coorg',
      'Personal Growth',
      'Life Beyond Code',
    ],
    ogImage: '/og-chapter-05.png',
  },
  '06-thinker': {
    title: 'The Thinker - AI Playground & Problem Solving | Vamshi Krishna',
    description: 'Interactive games, AI experiments, and algorithmic thinking. Explore problem-solving approaches with hands-on demonstrations.',
    keywords: [
      'AI Experiments',
      'Problem Solving',
      'Interactive Games',
      'Algorithms',
      'AI Integration',
      'OpenAI',
      'Gemini AI',
      'Technical Challenges',
    ],
    ogImage: '/og-chapter-06.png',
  },
  '07-connection': {
    title: 'The Connection - Contact & Social Links | Vamshi Krishna',
    description: 'Get in touch via email, LinkedIn, GitHub, or schedule a call. Open to full-time software engineering opportunities, consulting, and collaboration.',
    keywords: [
      'Contact Vamshi Krishna',
      'Hire Software Engineer',
      'Get In Touch',
      'LinkedIn',
      'GitHub',
      'Email Contact',
      'Schedule Call',
      'Job Opportunities',
    ],
    ogImage: '/og-chapter-07.png',
  },
};

/**
 * Generate page title for specific chapter
 */
export function getPageTitle(chapterId: ChapterId | null): string {
  if (!chapterId) {
    return SITE_CONFIG.title;
  }
  return CHAPTER_SEO[chapterId]?.title || SITE_CONFIG.title;
}

/**
 * Generate meta description for specific chapter
 */
export function getPageDescription(chapterId: ChapterId | null): string {
  if (!chapterId) {
    return SITE_CONFIG.description;
  }
  return CHAPTER_SEO[chapterId]?.description || SITE_CONFIG.description;
}

/**
 * Generate keywords for specific chapter
 */
export function getPageKeywords(chapterId: ChapterId | null): string {
  const baseKeywords = SITE_CONFIG.keywords;
  if (!chapterId) {
    return baseKeywords.join(', ');
  }
  const chapterKeywords = CHAPTER_SEO[chapterId]?.keywords || [];
  return [...chapterKeywords, ...baseKeywords].join(', ');
}

/**
 * Generate canonical URL for specific chapter
 */
export function getCanonicalUrl(chapterId: ChapterId | null): string {
  if (!chapterId) {
    return SITE_CONFIG.url;
  }
  return `${SITE_CONFIG.url}#${chapterId}`;
}

/**
 * Generate Open Graph image for specific chapter
 */
export function getOgImage(chapterId: ChapterId | null): string {
  if (!chapterId) {
    return SITE_CONFIG.ogImage;
  }
  const chapterImage = CHAPTER_SEO[chapterId]?.ogImage;
  return chapterImage ? `${SITE_CONFIG.url}${chapterImage}` : SITE_CONFIG.ogImage;
}

/**
 * Generate JSON-LD structured data for Person schema
 */
export function getPersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    jobTitle: 'Software Engineer',
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.author.email,
    sameAs: [
      SITE_CONFIG.author.linkedin,
      SITE_CONFIG.author.github,
      `https://x.com/${SITE_CONFIG.author.twitter.replace('@', '')}`,
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'C#',
      '.NET Core',
      'Java',
      'Spring Boot',
      'AWS',
      'Google Cloud',
      'AI Integration',
      'Full-Stack Development',
      'Microservices Architecture',
      'Cloud-Native Development',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Central Missouri',
      },
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'CVS Health',
      },
    ],
  };
}

/**
 * Generate JSON-LD structured data for ProfilePage schema
 */
export function getProfilePageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: getPersonStructuredData(),
  };
}

/**
 * Generate JSON-LD structured data for WebSite schema
 */
export function getWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: getPersonStructuredData(),
  };
}

/**
 * Generate breadcrumb structured data for chapters
 */
export function getBreadcrumbStructuredData(chapterId: ChapterId | null) {
  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.url,
    },
  ];

  if (chapterId) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: CHAPTER_SEO[chapterId]?.title || 'Chapter',
      item: getCanonicalUrl(chapterId),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
