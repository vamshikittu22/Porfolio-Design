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
    id: 'ai-specialist',
    title: 'Artificial Intelligence Specialist',
    issuer: 'Industry Certification',
    issuedOn: '2025-11-20',
    skills: ['Deep Learning', 'Neural Networks', 'AI Strategy'],
    summary: 'Comprehensive certification in artificial intelligence systems and deployment strategies.',
    url: '/assets/certificates/certificate Artificial Intelligence.pdf',
    image: 'https://www.svgrepo.com/show/303108/google-cloud-logo.svg'
  },
  {
    id: 'blockchain-expert',
    title: 'Blockchain Solutions Architect',
    issuer: 'Industry Certification',
    issuedOn: '2025-10-15',
    skills: ['Smart Contracts', 'Web3', 'Decentralized Apps'],
    summary: 'Expertise in designing and implementing secure blockchain-based infrastructure.',
    url: '/assets/certificates/certificate Blockchain.pdf',
    image: 'https://www.svgrepo.com/show/349346/ethereum.svg'
  },
  {
    id: 'nosql-master',
    title: 'NoSQL Database Professional',
    issuer: 'Industry Certification',
    issuedOn: '2025-08-10',
    skills: ['MongoDB', 'Cassandra', 'Data Modeling'],
    summary: 'Advanced proficiency in horizontally scaling database architectures.',
    url: '/assets/certificates/certificate Nosql.pdf',
    image: 'https://www.svgrepo.com/show/331488/mongodb.svg'
  },
  {
    id: 'db-security',
    title: 'Database Security Specialist',
    issuer: 'Industry Certification',
    issuedOn: '2025-07-05',
    skills: ['Encryption', 'SQL Injection', 'Audit Logging'],
    summary: 'Focused on hardening database layers against enterprise-level threats.',
    url: '/assets/certificates/certificate Database Security.pdf',
    image: 'https://www.svgrepo.com/show/443109/lock-security.svg'
  },
  {
    id: 'digital-exp',
    title: 'Digital Experience Designer',
    issuer: 'Industry Certification',
    issuedOn: '2025-05-12',
    skills: ['UI/UX', 'Interaction Design', 'Accessibility'],
    summary: 'Bridging the gap between engineering efficiency and high-fidelity user experiences.',
    url: '/assets/certificates/certificate Digital Experience.pdf',
    image: 'https://www.svgrepo.com/show/349354/figma.svg'
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
  }
];

export function getFeaturedBadges(count = 5) {
  return BADGES.slice(0, count);
}

export function getAllBadges() {
  return BADGES;
}
