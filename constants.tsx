import { BlogPost, SocialPost } from './types';

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
    title: 'Software Engineer',
    subtitle: 'CVS Health',
    location: 'Texas, USA',
    period: 'Feb 2025 – Present',
    description: [
      'Engineered Java Spring Boot REST and GraphQL APIs to support claims processing workflows, enabling scalable feature delivery across sprint-based releases.',
      'Implemented Angular and Vue.js dashboards using reusable components and structured state management, improving UI consistency and reducing rework across features.',
      'Deployed containerized Spring Boot services on AWS ECS using CI/CD pipelines, improving deployment reliability and operational visibility.',
      'Orchestrated Kafka-based event-driven communication and WebSocket real-time updates, enabling timely claim status updates.',
      'Integrated AI-assisted claim analysis using OpenAI APIs, reducing manual review effort through automated summarization.',
      'Hardened application security by implementing JWT-based role-based access control integrated with AWS IAM.'
    ]
  },
  {
    title: 'Software Engineer',
    subtitle: 'Citadel (Financial Services)',
    location: 'Florida, USA',
    period: 'Aug 2024 – Dec 2024',
    description: [
      'Developed Java Spring Boot microservices with REST APIs and Kafka-based streaming pipelines, supporting real-time processing of trading and risk data.',
      'Provisioned containerized services on Azure Kubernetes Service (AKS) using Azure Container Registry, ensuring controlled rollouts.',
      'Enabled asynchronous event ingestion using Azure Functions and Azure Event Hubs to improve scalability.',
      'Constructed React.js components with optimized Webpack builds, improving frontend performance and maintainability.',
      'Applied anomaly detection and predictive analytics features with monitoring via Azure Monitor.'
    ]
  },
  {
    title: 'Software Engineer',
    subtitle: 'Mphasis',
    location: 'Pune, India',
    period: 'Feb 2021 – July 2023',
    description: [
      'Authored Java Spring Boot REST APIs and implemented business logic using C# (.NET Core), supporting integration across multiple internal banking systems.',
      'Assembled Angular UI modules with state-driven components and responsive layouts, supporting consistent user experiences.',
      'Secured application access by implementing OAuth 2.0 and JWT-based authentication in compliance-driven environments.',
      'Refined SQL queries for reporting and data retrieval, improving data access efficiency.',
      'Supported Oracle and PostgreSQL databases on Amazon RDS with containerized deployments via Jenkins CI/CD.'
    ]
  },
  {
    title: 'Associate Software Engineer',
    subtitle: 'Covantech Pvt Ltd',
    location: 'Hyderabad, India',
    period: 'Aug 2019 – Jan 2021',
    description: [
      'Created a Python-based Selenium WebDriver automation framework, reducing manual regression testing effort and improving test repeatability.',
      'Automated REST API validation using Python Requests and unittest, improving backend service verification coverage.',
      'Validated Kafka message streams by verifying event flow and data consistency across distributed services.',
      'Embedded smoke and regression test suites into Jenkins pipelines, supporting Docker-based deployments on AWS ECS.'
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