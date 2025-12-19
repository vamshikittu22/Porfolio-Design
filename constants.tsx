import { Project, ProjectCategory, BlogPost, SocialPost } from './types';

export const FULL_NAME = 'Vamshi Krishna Pullaiahgari';
export const GITHUB_USERNAME = 'vamshikittu22';
export const INSTAGRAM_HANDLE = 'vamshi._.ki22u';
export const X_HANDLE = 'ki22u__';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/';
export const BLOG_URL = 'https://travelsofvk.blogspot.com';
export const RESUME_URL = '#'; // Placeholder for resume link

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
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
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
    thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
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
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
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
    thumbnailUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    tech: ['C#', '.NET', 'MySQL', 'JavaScript', 'HTML'],
    liveUrl: 'https://pullaiahgari-tickets.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/PullaiahgariTicketSales',
    featured: false,
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Swiss Minimalism in Web Architecture',
    summary: 'Exploring how intentional whitespace and typographic grid systems define modern engineering.',
    date: 'Feb 15, 2025',
    tag: 'Design',
  },
  {
    id: 'b2',
    title: 'The Evolution of Gemini 2.5',
    summary: 'A technical deep-dive into utilizing Flash models for high-performance generative UI.',
    date: 'Jan 28, 2025',
    tag: 'AI',
  },
  {
    id: 'b3',
    title: 'Architecture over Hype',
    summary: 'Why foundational system design outlasts the rapid cycle of JavaScript frameworks.',
    date: 'Jan 10, 2025',
    tag: 'Engineering',
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 's1',
    platform: 'instagram',
    content: 'Exploring the intersection of Swiss typography and modern frontend architectures. Minimalist design is a language of its own.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 10, 2025',
    link: 'https://instagram.com'
  },
  {
    id: 's2',
    platform: 'x',
    content: 'Just deployed the new Synthesis Lab module. Gemini 2.5 Flash is incredibly fast for multi-modal reasoning. #AI #GenAI #TypeScript',
    date: 'Feb 12, 2025',
    link: 'https://x.com'
  },
  {
    id: 's3',
    platform: 'instagram',
    content: 'Neural networks are the new brushes. Coding is the new canvas. Architecture is the frame.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 05, 2025',
    link: 'https://instagram.com'
  }
];