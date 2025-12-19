
import React from 'react';
import { Project, ProjectCategory, BlogPost, SocialPost } from './types';

export const GITHUB_USERNAME = 'vamshikittu22';
export const INSTAGRAM_HANDLE = 'vamshi._.ki22u';
export const X_HANDLE = 'ki22u__';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/';
export const BLOG_URL = 'https://travelsofvk.blogspot.com';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura Finance',
    tagline: 'AI-driven wealth management dashboard.',
    description: 'A comprehensive full-stack fintech platform utilizing predictive analytics for portfolio optimization. Built with a distributed microservices architecture using Node.js and PostgreSQL.',
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://picsum.photos/seed/aura/800/600',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://demo.aurafinance.io',
    repoUrl: 'https://github.com/vamshikittu22/aura-finance',
    featured: true,
  },
  {
    id: '2',
    title: 'Stratos Travel',
    tagline: 'Collaborative route planning for explorers.',
    description: 'A map-centric interface for real-time collaborative route planning. Features offline-first sync and intelligent itinerary generation with Go backend.',
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://picsum.photos/seed/stratos/800/600',
    tech: ['Next.js', 'Go', 'MongoDB', 'Mapbox', 'WebSockets'],
    liveUrl: 'https://stratos-travel.app',
    repoUrl: 'https://github.com/vamshikittu22/stratos',
    featured: true,
  },
  {
    id: '3',
    title: 'Nexus AI Engine',
    tagline: 'Visual playground for multimodal LLMs.',
    description: 'A developer tool for orchestrating generative AI workflows. Integrates Gemini for reasoning and Nano Banana for image synthesis.',
    category: ProjectCategory.AI,
    thumbnailUrl: 'https://picsum.photos/seed/nexusai/800/600',
    tech: ['React', 'Python', 'FastAPI', 'Google Cloud'],
    liveUrl: 'https://nexus-ai.studio',
    repoUrl: 'https://github.com/vamshikittu22/nexus-engine',
    featured: true,
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Wanderlust: The Santorini Chapter',
    summary: 'A digital nomad guide to finding the best Wi-Fi and the quietest blue domes in Oia.',
    date: 'Feb 12, 2025',
    tag: 'Travel',
    location: 'Greece'
  },
  {
    id: 'b2',
    title: 'Swiss Minimalism in Web Design',
    summary: 'How my travels through the Alps influenced my focus on whitespace and typography.',
    date: 'Jan 05, 2025',
    tag: 'Design',
    location: 'Switzerland'
  },
  {
    id: 'b3',
    title: 'The Nomad Stack 2025',
    summary: 'Tools and workflows for deploying full-stack apps from a hammock in Bali.',
    date: 'Dec 15, 2024',
    tag: 'Lifestyle',
    location: 'Indonesia'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 's1',
    platform: 'instagram',
    content: 'Coding with a view! 🏔️ Minimalist setup amidst the clouds.',
    imageUrl: 'https://picsum.photos/seed/mountains/400/400',
    date: '2d ago',
    link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
  },
  {
    id: 's2',
    platform: 'x',
    content: 'Just shipped a new update to the AI Playground. The response times on Gemini 2.5 Flash are insane. #buildinpublic #genai',
    date: '5h ago',
    link: `https://x.com/${X_HANDLE}`
  },
  {
    id: 's3',
    platform: 'instagram',
    content: 'Taco Tuesday but in CDMX. Best architecture inspiration ever.',
    imageUrl: 'https://picsum.photos/seed/taco/400/400',
    date: '1w ago',
    link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
  },
  {
    id: 's4',
    platform: 'x',
    content: 'Rust + WASM is the future of performant web tools. Change my mind.',
    date: '1d ago',
    link: `https://x.com/${X_HANDLE}`
  },
  {
    id: 's5',
    platform: 'instagram',
    content: 'Exploring the backstreets of Kyoto. The geometry here is perfection.',
    imageUrl: 'https://picsum.photos/seed/kyoto/400/400',
    date: '3d ago',
    link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
  }
];
