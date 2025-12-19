
import React from 'react';
import { Project, ProjectCategory, BlogPost, SocialPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura Finance',
    tagline: 'AI-driven wealth management dashboard.',
    description: 'A comprehensive full-stack fintech platform utilizing predictive analytics for portfolio optimization. Built with a distributed microservices architecture.',
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://picsum.photos/seed/aura/800/600',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://demo.aurafinance.io',
    repoUrl: 'https://github.com/username/aura-finance',
    featured: true,
    bullets: [
      'Built a real-time data ingestion pipeline processing 10k+ transactions per minute.',
      'Designed a glassmorphism design system for high-net-worth individual personas.',
      'Implemented bank-grade OAuth2 and JWT-based authentication.'
    ]
  },
  {
    id: '2',
    title: 'Stratos Travel',
    tagline: 'Collaborative route planning for explorers.',
    description: 'A map-centric interface for real-time collaborative route planning. Features offline-first sync and intelligent itinerary generation.',
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://picsum.photos/seed/stratos/800/600',
    tech: ['Next.js', 'Go', 'MongoDB', 'Mapbox', 'WebSockets'],
    liveUrl: 'https://stratos-travel.app',
    repoUrl: 'https://github.com/username/stratos',
    featured: true,
    bullets: [
      'Implemented complex 3D map interactions using Mapbox and Custom Layers.',
      'Synchronized shared state via CRDTs for instantaneous multi-user editing.',
      'Optimized backend response times by 60% using Go-routines for concurrent API fetches.'
    ]
  },
  {
    id: '3',
    title: 'Nexus AI Engine',
    tagline: 'Visual playground for multimodal LLMs.',
    description: 'A developer tool for orchestrating generative AI workflows. Integrates Gemini Pro for reasoning and Nano Banana for image synthesis.',
    category: ProjectCategory.AI,
    thumbnailUrl: 'https://picsum.photos/seed/nexusai/800/600',
    tech: ['React', 'Python', 'FastAPI', 'Google Cloud', 'OpenAI'],
    liveUrl: 'https://nexus-ai.studio',
    repoUrl: 'https://github.com/username/nexus-engine',
    featured: true,
    bullets: [
      'Seamless integration with Gemini Flash for sub-second text generation.',
      'Custom image-to-video workflow using Veo APIs.',
      'Deployed on Google Cloud Run with auto-scaling based on GPU utilization.'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Chasing Sunsets in Santorini',
    summary: 'A digital nomad guide to finding the best Wi-Fi and the quietest blue domes.',
    date: 'Feb 12, 2025',
    tag: 'Travel',
    location: 'Greece'
  },
  {
    id: 'b2',
    title: 'Minimalism in Tokyo',
    summary: 'How Japanese aesthetic principles transformed my approach to UI/UX design.',
    date: 'Jan 05, 2025',
    tag: 'Design',
    location: 'Japan'
  },
  {
    id: 'b3',
    title: 'The Full-Stack Digital Nomad',
    summary: 'Tools and workflows for deploying from a hammock in Bali.',
    date: 'Dec 15, 2024',
    tag: 'Lifestyle',
    location: 'Indonesia'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 's1',
    platform: 'instagram',
    content: 'Current office view: Snowy peaks and clean code. 🏔️💻',
    imageUrl: 'https://picsum.photos/seed/mountains/400/400',
    date: '2 days ago',
    link: 'https://instagram.com/p/123'
  },
  {
    id: 's2',
    platform: 'x',
    content: 'Just deployed a new version of the Stratos Travel engine. Go is surprisingly elegant for concurrent spatial processing. #golang #buildinpublic',
    date: '5 hours ago',
    link: 'https://x.com/status/456'
  },
  {
    id: 's3',
    platform: 'instagram',
    content: 'Taco Tuesday but in CDMX. Best architecture inspiration ever.',
    imageUrl: 'https://picsum.photos/seed/taco/400/400',
    date: '1 week ago',
    link: 'https://instagram.com/p/789'
  }
];
