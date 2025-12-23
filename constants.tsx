
import { Project, ProjectCategory, BlogPost, SocialPost } from './types';

export const FULL_NAME = 'Vamshi Krishna Pullaiahgari';
export const EMAIL = 'krishnavamshi.2297@gmail.com';
export const PHONE = '+1-(913) 326 7373';
export const GITHUB_USERNAME = 'vamshikittu22';
export const INSTAGRAM_HANDLE = 'vamshi._.ki22u';
export const INSTAGRAM_URL = `https://www.instagram.com/vamshi._.ki22u/`;
export const X_HANDLE = 'ki22u__';
export const X_URL = `https://x.com/ki22u__`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/';
export const BLOG_URL = 'https://travelsofvk.blogspot.com';
export const RESUME_URL = '#resume-section'; 

export interface ResumeItem {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string[];
}

export const EDUCATION: ResumeItem[] = [
  {
    title: 'Master of Science, Computer Information Systems & IT',
    subtitle: 'University of Central Missouri',
    location: 'Warrensburg, MO',
    period: 'Aug 2023 - Dec 2024',
    description: ['Focus on advanced information systems, cloud architecture, and modern software engineering practices.']
  },
  {
    title: 'Bachelor of Technology, Computer Science and Engineering',
    subtitle: 'Mahaveer Institute of Science and Technology',
    location: 'Hyderabad, India',
    period: '2015 - 2019',
    description: ['Foundational study in algorithms, data structures, and operating systems.']
  }
];

export const EXPERIENCE: ResumeItem[] = [
  {
    title: 'Software Developer',
    subtitle: 'AI Labs Web LLC',
    location: 'Charlotte, USA',
    period: 'Feb 2025 - Present',
    description: [
      'Owning end-to-end development of modules for billing, appointment scheduling, and client CRM workflows using ReactJS, HTML/CSS, Bootstrap, and .NET/REST APIs.',
      'Designing and implementing new components and API integrations, managing client-side state, validation rules, and robust error handling.',
      'Driving features through full SDLC: clarifying requirements, breaking down technical tasks, and supporting UAT.',
      'Leveraging generative AI tools to design and refine prompts for UI copy and test scenarios.'
    ]
  },
  {
    title: 'Software Developer Intern',
    subtitle: 'AI Labs Web LLC',
    location: 'Charlotte, USA',
    period: 'Aug 2024 - Dec 2024',
    description: [
      'Created responsive and accessible user interfaces utilizing HTML, CSS, ReactJS, and Bootstrap to streamline operations for a small enterprise.',
      'Collaborated with designers and backend developers to incorporate key features across platforms.',
      'Created interactive prototypes for design iterations and usability assessments.'
    ]
  },
  {
    title: 'Software Engineer',
    subtitle: 'Mphasis',
    location: 'Pune, India',
    period: 'Feb 2020 - July 2023',
    description: [
      'Collaborated with cross-functional teams to deliver enterprise-grade results and achieve project goals.',
      'Maintained 100% system uptime through proactive monitoring and prompt patch implementation.',
      'Troubleshot complex software issues under strict security protocols.',
      'Utilized Control-M, Solarwinds, and ServiceNow for operational stability.'
    ]
  }
];

export const SKILLS_RESUME = {
  languages: ['C', 'Python', 'Core Java', 'C#', '.NET', 'PHP', 'JavaScript', 'HTML5', 'CSS3'],
  frameworks: ['Reactjs', '.NET MVC CORE', '.NET MVC Entity Framework'],
  cloud_db: ['MySQL', 'Azure', 'PostgreSQL'],
  tools: ['VS Code', 'Visual Studio', 'Eclipse', 'Xampp', 'Putty', 'ServiceNow']
};

export const AWARDS: ResumeItem[] = [
  {
    title: 'Top Performer Q3',
    subtitle: 'Mphasis',
    period: 'Dec 2022',
    description: ['Recognized for excellent client service, agility, and KPI delivery.']
  },
  {
    title: 'Certified Adventurer',
    subtitle: 'Jumpin Heights',
    period: 'Dec 2018',
    description: ["Certified for achieving India's highest bungee jump at Rishikesh."]
  }
];

export const PROJECTS: Project[] = [
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
    thumbnailUrl: 'https://images.unsplash.com/photo-1635332396679-751005b491ce?auto=format&fit=crop&q=80&w=1000',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'rishikesh-story',
    title: 'Rishikesh – The Holy Thrill',
    summary: 'Spiritual Ganga Aarti on the sacred river banks mixed with the roar of white water rafting.',
    date: '2019',
    tag: 'Adventure',
    url: 'https://travelsofvk.blogspot.com/2019/09/my-travel-story-rishikesh.html',
    imageUrl: 'images/ganga_aarti.jpg',
  },
  {
    id: 'coorg-story',
    title: 'Coorg – Coffee & Elephants',
    summary: 'A journey through coffee estates to find the elephants of Dubare and the peace of Tibetan temples.',
    date: '2020',
    tag: 'Road Trip',
    url: 'https://travelsofvk.blogspot.com/2020/04/coorg-3-year-old-dream.html',
    imageUrl: 'images/elephant_camp.jpg',
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 's1',
    platform: 'instagram',
    content: 'Exploring the intersection of travel and technology. Every destination is a new dataset.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 10, 2025',
    link: INSTAGRAM_URL
  },
  {
    id: 's2',
    platform: 'x',
    content: 'Just deployed the new Synthesis Lab module. Gemini 2.5 Flash is incredibly fast for multi-modal reasoning. #AI #GenAI #TypeScript',
    date: 'Feb 12, 2025',
    link: X_URL
  }
];
