import { Project, ProjectCategory } from '../types';

export const PROJECTS_CONFIG: Project[] = [
  {
    id: 'future-job-fit',
    title: 'Future Job Fit',
    tagline: 'AI-Powered Resume Builder.',
    description: 'A modern, AI-assisted resume builder with a guided wizard, live preview, and Google Generative AI integration for ATS-optimized content.',
    overview: 'FutureJobFit is an AI-assisted resume architect designed to optimize candidate profiles through neural content scoring and Swiss-grid layouts. It prioritizes low-latency interactivity and data integrity.',
    useCases: [
      'Neural Content Engine for automated bullet point refinement.',
      'High-integrity preview system with real-time CSS injection.',
      'Multi-protocol data export supporting complex JSON schemas.',
      'Intelligent ATS scoring based on dynamic keyword analysis.'
    ],
    architecture: 'Vite-powered React SPA utilizing a custom Tailwind-based design system. Serverless Node.js middleware handles secure Google Gemini orchestration and prompt optimization.',
    roleHighlights: [
      'Architected the core UI/UX using high-integrity glassmorphism patterns.',
      'Engineered the AI scoring logic to increase profile visibility by 40%.',
      'Developed a custom JSON-to-PDF engine with pixel-perfect precision.'
    ],
    category: ProjectCategory.AI,
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    tech: ['React', 'TypeScript', 'Gemini API', 'Tailwind', 'Node.js'],
    liveUrl: 'https://future-job-fit.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/future-job-fit',
    featured: true,
  },
  {
    id: 'wanderlust-trails',
    title: 'Wanderlust Trails',
    tagline: 'Global Logistics & Discovery.',
    description: 'A full‑stack travel ecosystem for destination logistics, planning, and real-time booking management.',
    overview: 'WanderlustTrails represents a high-integrity logistics platform for international travel coordination. It integrates complex inventory management with a modular user interface for seamless discovery.',
    useCases: [
      'Inventory synchronization across global travel nodes.',
      'User authentication protocol with session persistence.',
      'Dynamic trip routing and modular package construction.',
      'Real-time booking audit logs for administrative oversight.'
    ],
    architecture: 'Modular PHP backend leveraging a relational MySQL cluster. The presentation layer is decoupled for maximum latency optimization and browser compatibility.',
    roleHighlights: [
      'Designed the relational database schema supporting 10k+ concurrent entities.',
      'Implemented secure authentication layers for sensitive user datasets.',
      'Optimized query performance to reduce initial load times by 50%.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Tailwind', 'REST'],
    liveUrl: 'https://wanderlust-trails.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/Wanderlusttrails',
    featured: true,
  },
  {
    id: 'movie-booking',
    title: 'Cinematic Discovery',
    tagline: 'Multimedia Asset Management.',
    description: 'A cinematic ticketing platform covering asset discovery, interactive spatial mapping, and transaction flows.',
    overview: 'CinematicDiscovery is an enterprise-scale media management and ticketing platform. It focuses on spatial seat selection logic and real-time transaction state synchronization.',
    useCases: [
      'Spatial coordinate mapping for interactive seat selection.',
      'Asynchronous showtime discovery across multiple theater nodes.',
      'High-fidelity media asset delivery and metadata indexing.',
      'Transaction integrity verification for concurrent bookings.'
    ],
    architecture: 'PHP-orchestrated backend with a dynamic JS frontend. Uses WebSocket-style polling to ensure seat availability is synchronized in real-time across user sessions.',
    roleHighlights: [
      'Developed the custom coordinate-based seat selection engine.',
      'Engineered the database transaction locks to prevent double-booking.',
      'Integrated external movie metadata APIs for automated listing updates.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Ajax'],
    liveUrl: 'https://cinematic-discovery.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/Movie-Booking-Website',
    featured: false,
  },
  {
    id: 'ticket-sales',
    title: 'Event Node Pro',
    tagline: 'Transactional Event Infrastructure.',
    description: 'A robust .NET event system to publish infrastructure-level events, manage ticket inventory, and track metrics.',
    overview: 'EventNodePro is a C#-powered infrastructure for event coordination. It provides deep-level inventory tracking and administrative dashboards for high-volume sales management.',
    useCases: [
      'High-volume ticket inventory tracking and threshold alerts.',
      'Administrative metric dashboard for sales analysis.',
      'Secure transaction nodes for payment processing.',
      'Automated event publishing workflows for verified partners.'
    ],
    architecture: '.NET Core architecture with a decoupled C# business logic layer. Persisted through an enterprise-grade SQL server instance for maximum ACID compliance.',
    roleHighlights: [
      'Architected the backend business logic using C# and .NET core.',
      'Implemented the SQL Data Access Layer for high-integrity transactions.',
      'Developed the admin dashboard metrics using advanced LINQ queries.'
    ],
    category: ProjectCategory.FULLSTACK,
    thumbnailUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    tech: ['C#', '.NET Core', 'SQL Server', 'HTML5', 'CSS3'],
    liveUrl: 'https://pullaiahgari-tickets.vercel.app',
    repoUrl: 'https://github.com/vamshikittu22/PullaiahgariTicketSales',
    featured: false,
  }
];