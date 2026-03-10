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
  },
  {
    id: 'intro-llm',
    title: 'Introduction to Large Language Models',
    issuer: 'Google Cloud Skills Boost',
    issuedOn: '2025-09-13',
    skills: ['LLM', 'NLU', 'Deep Learning'],
    summary: 'Mastered foundational concepts behind Large Language Models and their practical applications.',
    url: 'https://www.skills.google/public_profiles/b45b93dd-7d1d-4dda-b666-71ac228c075c',
    image: 'https://cdn.qwiklabs.com/T7axgDk%2BIsxSCt0WQg0Dfx8E0%2FoSv0E7UE2QF1C7eHU%3D'
  },
  {
    id: 'intro-genai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    issuedOn: '2025-09-13',
    skills: ['Generative AI', 'Machine Learning', 'Cloud AI'],
    summary: 'Explored the core concepts of Generative AI and how it works within the Google Cloud ecosystem.',
    url: 'https://www.skills.google/public_profiles/b45b93dd-7d1d-4dda-b666-71ac228c075c',
    image: 'https://cdn.qwiklabs.com/1IjA1paFzxAwvhaEuCNYzcrZkNyM%2FRWnfSQue%2BwKv3M%3D'
  }
];

export function getFeaturedBadges(count = 5) {
  return BADGES.slice(0, count);
}

export function getAllBadges() {
  return BADGES;
}
