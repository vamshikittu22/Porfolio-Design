/**
 * Badge + Certification Registry
 * Powered by Google Developers Profile + Professional Certs
 */

export interface BadgeHighlight {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  credentialId?: string;
  skills: string[];
  summary?: string;
  url: string;
  image: string;
}

export const BADGES: BadgeHighlight[] = [
  {
    id: 'gemini-agent',
    title: 'Gemini Enterprise Agent Ready',
    issuer: 'Google Developers',
    issuedOn: '2026-03-10',
    skills: ['Gemini', 'AI Agents', 'Enterprise AI'],
    summary: 'Mastered deployment and orchestration of Gemini-powered agents for enterprise workflows.',
    url: 'https://g.dev/VamshiKi22u',
    image: 'https://developers.google.com/static/profile/badges/community/gear/badge.svg'
  },
  {
    id: 'claude-101',
    title: 'Claude 101',
    issuer: 'Anthropic',
    issuedOn: '2026-03-09',
    skills: ['Claude AI', 'Prompt Engineering', 'AI Fundamentals'],
    summary: 'Mastered foundational concepts of Claude AI models and advanced prompting techniques.',
    url: 'https://verify.skilljar.com/c/82icwb5fsrhj',
    image: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/anthropic.svg'
  },
  {
    id: 'claude-code',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    issuedOn: '2026-03-09',
    skills: ['Claude Code', 'AI Development', 'Autonomous Coding'],
    summary: 'Practical implementation of autonomous coding workflows using the Claude Code environment.',
    url: 'https://verify.skilljar.com/c/ewamyseus64t',
    image: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/anthropic.svg'
  },
  {
    id: 'cert-ai',
    title: 'Artificial Intelligence',
    issuer: 'Oracle Academy',
    issuedOn: '2024-12-01',
    skills: ['AI', 'Machine Learning', 'Neural Networks'],
    summary: 'Comprehensive certification covering fundamental AI concepts and practical implementation.',
    url: '/assets/certificates/certificate Artificial Intelligence.pdf',
    image: '/icons/oracle.svg'
  },
  {
    id: 'cert-blockchain',
    title: 'Blockchain Technology',
    issuer: 'Oracle Academy',
    issuedOn: '2024-11-15',
    skills: ['Blockchain', 'Smart Contracts', 'Web3'],
    summary: 'Mastery of blockchain architecture, consensus mechanisms, and decentralized applications.',
    url: '/assets/certificates/certificate Blockchain.pdf',
    image: '/icons/oracle.svg'
  },
  {
    id: 'cert-db-security',
    title: 'Database Security',
    issuer: 'Oracle Academy',
    issuedOn: '2024-10-20',
    skills: ['Security', 'SQL', 'Database Protection'],
    summary: 'Advanced security protocols for safeguarding relational and non-relational database systems.',
    url: '/assets/certificates/certificate Database Security.pdf',
    image: '/icons/oracle.svg'
  },
  {
    id: 'cert-digital-exp',
    title: 'Digital Experience',
    issuer: 'Oracle Academy',
    issuedOn: '2024-09-10',
    skills: ['UX/UI', 'Digital Transformation', 'User Experience'],
    summary: 'Strategy and execution of multi-channel digital experiences centered around the user.',
    url: '/assets/certificates/certificate Digital Experience.pdf',
    image: '/icons/oracle.svg'
  },
  {
    id: 'cert-nosql',
    title: 'NoSQL Database Mastery',
    issuer: 'Oracle Academy',
    issuedOn: '2024-08-05',
    skills: ['NoSQL', 'MongoDB', 'Scalability'],
    summary: 'Expertise in architecting and managing high-scale NoSQL data environments.',
    url: '/assets/certificates/certificate Nosql.pdf',
    image: '/icons/oracle.svg'
  },
  {
    id: 'gd-premium',
    title: 'Google Developer Program Premium',
    issuer: 'Google Developers',
    issuedOn: '2026-02-10',
    skills: ['Google Cloud', 'Innovator Plus', 'Cloud Credits'],
    summary: 'Premium tier member of the Google Cloud Innovators program.',
    url: 'https://g.dev/VamshiKi22u',
    image: 'https://developers.google.com/static/profile/badges/community/innovators/cloud/innovators_plus/badge.svg'
  },
  {
    id: 'google-skills-compute',
    title: 'Level 1: Compute, Storage and Monitoring',
    issuer: 'Google Cloud Skills Boost',
    issuedOn: '2026-01-23',
    skills: ['Compute Engine', 'Cloud Storage', 'Cloud Monitoring'],
    summary: 'Demonstrated foundational knowledge in managing Google Cloud infrastructure and monitoring services.',
    url: 'https://www.skills.google/public_profiles/b45b93dd-7d1d-4dda-b666-71ac228c075c',
    image: 'https://cdn.qwiklabs.com/s2Z%2FNVvCyvqdC7YjLTIWb1hG4x%2BQ7NzrqC7x5g2gXU0%3D'
  },
  {
    id: 'google-skills',
    title: 'Google Skills Boost',
    issuer: 'Google Cloud',
    issuedOn: '2025-09-13',
    skills: ['Cloud Computing', 'GCP Fundamentals'],
    summary: 'Demonstrated proficiency in core Google Cloud services and architectural patterns.',
    url: 'https://g.dev/VamshiKi22u',
    image: 'https://developers.google.com/static/profile/badges/skillsboost/earned-badge/badge.svg'
  },
  {
    id: 'firebase-studio',
    title: 'Firebase Studio Developer',
    issuer: 'Google Developers',
    issuedOn: '2025-09-13',
    skills: ['Firebase', 'App Development', 'Real-time Data'],
    summary: 'Active contributor to the Firebase developer community.',
    url: 'https://g.dev/VamshiKi22u',
    image: 'https://developers.google.com/static/profile/badges/community/firebasestudio/firebase-studio/badge.svg'
  },
  {
    id: 'intro-responsible-ai',
    title: 'Introduction to Responsible AI',
    issuer: 'Google Cloud Skills Boost',
    issuedOn: '2025-09-13',
    skills: ['Generative AI', 'Responsible AI', 'Ethics'],
    summary: 'Explored the principles and best practices for developing and deploying AI responsibly.',
    url: 'https://www.skills.google/public_profiles/b45b93dd-7d1d-4dda-b666-71ac228c075c',
    image: 'https://cdn.qwiklabs.com/RV0XLMKJOc1vq9CQ6rcMquorhDw4XasPcP2QRT3iuVA%3D'
  }
];

export function getFeaturedBadges(count = 5) {
  return BADGES.slice(0, count);
}

export function getAllBadges() {
  return BADGES;
}
