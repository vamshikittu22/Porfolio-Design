
import { Project, ProjectCategory, BlogPost, SocialPost } from './types';

export const GITHUB_USERNAME = 'vamshikittu22';
export const INSTAGRAM_HANDLE = 'vamshi._.ki22u';
export const X_HANDLE = 'ki22u__';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/';
export const BLOG_URL = 'https://travelsofvk.blogspot.com';

export const PROJECTS: Project[] = [
  {
    id: 'future-job-fit',
    title: 'Future Job Fit',
    tagline: 'AI-Powered Resume Builder.',
    description: 'A modern, AI-assisted resume builder with a guided wizard, live preview, and Google Generative AI integration for ATS-optimized content.',
    overview: 'future-job-fit is an AI-assisted resume builder that guides users through creating modern resumes, uses Google Generative AI to optimize content, and supports live preview with export options.',
    useCases: [
      'Multi-step wizard to capture experience, education, skills, and projects.',
      'AI suggestions to rewrite bullet points and tailor content to job descriptions.',
      'Real-time resume preview with multiple templates and themes.',
      'Export in JSON (current) and planned PDF/DOCX support.'
    ],
    architecture: 'React + TypeScript SPA built with Vite and a design system using Tailwind CSS and shadcn/ui. Node/Next.js backend routes proxy calls to Google Gemini for scoring and rewriting.',
    roleHighlights: [
      'Led the full frontend architecture and design system (Swiss-style).',
      'Integrated Google Generative AI for ATS scoring and content rewriting.',
      'Implemented multi-step wizard UX, validation, and live preview.'
    ],
    category: ProjectCategory.AI,
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    tech: ['React', 'TypeScript', 'Gemini API', 'Tailwind', 'Node.js'],
    liveUrl: 'https://future-job-fit.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/future-job-fit',
    featured: true,
  },
  {
    id: 'wanderlust-trails',
    title: 'Wanderlusttrails',
    tagline: 'Premium Travel Booking Platform.',
    description: 'A full‑stack travel booking platform to search destinations, plan trips, and manage bookings end‑to‑end.',
    overview: 'Wanderlusttrails is a modular travel booking platform with a dedicated frontend and a PHP backend, handling destination discovery, trip planning, and booking management.',
    useCases: [
      'Browse and filter travel options (destinations, trips, or packages).',
      'Create, view, and update bookings with traveler details.',
      'Sign up, log in, and view personal trip history.',
      'Admin-style tasks for managing listings and availability.'
    ],
    architecture: 'Split Frontend (JS/HTML/CSS) and Backend (PHP) directories. Relational database with clear foreign-key relationships for users, trips, and bookings.',
    roleHighlights: [
      'Designed the booking flows and data model for trips and users.',
      'Implemented frontend pages and integrated them with PHP backend endpoints.',
      'Focused on clear separation between presentation and business logic.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://wanderlust-trails.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/Wanderlusttrails',
    featured: true,
  },
  {
    id: 'movie-booking',
    title: 'Movie-Booking-Website',
    tagline: 'Cinematic Discovery Platform.',
    description: 'A PHP-driven movie ticket booking platform covering discovery, seat selection, and booking confirmation.',
    overview: 'Movie-Booking-Website is a PHP-based platform focused on movie discovery and seamless seat booking, mirroring commercial ticketing portals.',
    useCases: [
      'List movies, theatres, and showtimes with metadata.',
      'Interactive seat selection and showtime filtering.',
      'Integrated booking information storage and retrieval.',
      'Review and feedback flows for listed movies.'
    ],
    architecture: 'Multiple PHP entry points coordinate flow. JavaScript manages client-side interactions like seat selection and validation. MySQL schema defines core entities.',
    roleHighlights: [
      'Designed end-to-end booking flow from movie selection to payment.',
      'Implemented dynamic seat selection logic in JavaScript.',
      'Integrated MySQL for real-time booking persistence.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    liveUrl: 'https://cinematic-discovery.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/Movie-Booking-Website',
    featured: false,
  },
  {
    id: 'ticket-sales',
    title: 'PullaiahgariTicketSales',
    tagline: 'Event Booking System.',
    description: 'A robust event ticketing system to publish events, sell tickets, and track bookings.',
    overview: 'PullaiahgariTicketSales allows organizers to list events and users to purchase tickets, with C# handling core logic and a web-style UI.',
    useCases: [
      'Create events with title, venue, and ticket capacity.',
      'Browse upcoming events and select ticket types.',
      'Secure booking records in a relational database.',
      'Admin operations for event management and sales inspection.'
    ],
    architecture: 'C# solution with business logic and data access layers. HTML/CSS/JS frontend connects to C# backend. Database persists events and transactions.',
    roleHighlights: [
      'Implemented C# logic for event and ticket operations.',
      'Connected UI forms to backend methods and data store.',
      'Ensured data consistency for ticket availability vs sales.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    tech: ['C#', '.NET', 'MySQL', 'JavaScript', 'HTML'],
    liveUrl: 'https://pullaiahgari-tickets.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/PullaiahgariTicketSales',
    featured: false,
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
    imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=400',
    date: '2d ago',
    link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
  },
  {
    id: 's2',
    platform: 'x',
    content: 'Just shipped Future Job Fit. The response times on Gemini 2.5 Flash are insane for resume scoring. #buildinpublic #genai',
    date: '5h ago',
    link: `https://x.com/${X_HANDLE}`
  },
  {
    id: 's3',
    platform: 'instagram',
    content: 'Taco Tuesday but in CDMX. Best architecture inspiration ever.',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
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
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400',
    date: '3d ago',
    link: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
  }
];
