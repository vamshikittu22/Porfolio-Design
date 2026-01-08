
import { BlogPost, AccentColor } from './types';

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

// PHYSICAL FALLBACKS (Used when AI fails and no previous backup exists)
// Note: Users should place actual images at these paths in their public folder
export const PHYSICAL_FALLBACKS = {
  HERO_DARK: "/assets/fallbacks/hero-dark.webp",
  HERO_LIGHT: "/assets/fallbacks/hero-light.webp",
  TRAVEL_RISHIKESH: "/assets/fallbacks/travel-rishikesh.webp",
  TRAVEL_COORG: "/assets/fallbacks/travel-coorg.webp",
  AI_LAB_GENERIC: "/assets/fallbacks/ai-lab-placeholder.webp"
};

// RELIABLE REMOTE FALLBACKS (If physical files aren't found)
export const HERO_FALLBACK_DARK = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=75&w=1200&fm=webp";
export const HERO_FALLBACK_LIGHT = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1200&fm=webp";

export const HERO_PROMPT_DARK = "Abstract professional software engineering desk scene. Modern minimalist setup, high resolution, Swiss architectural style. Deep navy midnight atmosphere with electric purple and orange accents.";
export const HERO_PROMPT_LIGHT = "Abstract professional software engineering desk scene. Modern minimalist setup, high resolution, Swiss architectural style. Dreamy daylight atmosphere with soft grey tones and blue accents.";

export const VIBRANT_ACCENTS: AccentColor[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

export interface ResumeItem {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string[];
}

export const EDUCATION: ResumeItem[] = [
  {
    title: 'Master of Science, Computer Information Systems & Information Technology',
    subtitle: 'University of Central Missouri, Missouri',
    period: 'Aug 2023- Dec 2024',
    description: []
  },
  {
    title: 'Bachelor of Technology, Computer Science and Engineering',
    subtitle: 'Mahaveer Institute of Science and Technology, Hyderabad',
    period: '2015-19',
    description: []
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
      'Designing and implementing new components and API integrations, managing client-side state, validation rules, and robust error handling for production use.',
      'Driving features through the full SDLC: clarifying requirements with stakeholders, breaking down technical tasks, writing unit tests, and supporting UAT and releases.',
      'Working in an Agile/Scrum setup, contributing estimates, leading demos for completed features, and raising/mitigating risks during sprint planning and stand-ups.',
      'Leveraging generative AI tools to design and refine prompts that generate draft UI copy, validation messages, and test scenarios, then curating outputs to meet product and coding standards.'
    ]
  },
  {
    title: 'Software Developer Intern',
    subtitle: 'AI Labs Web LLC',
    location: 'Charlotte, USA',
    period: 'Aug 2024 - Dec 2024',
    description: [
      'Created a responsive and accessible user interface utilizing HTML, CSS, ReactJS, and Bootstrap to streamline billing, scheduling, client data management, and CRM operations for a small enterprise.',
      'Worked alongside various teams (designers, backend developers, and stakeholders) to incorporate key features while maintaining compatibility across platforms.',
      'Improved communication among team members and resolution of conflicts in a remote setting, adjusting to market changes and the evolving requirements of projects.',
      'Created interactive prototypes to facilitate initial design iterations and usability assessments, guaranteeing an exceptional user experience and adherence to accessibility standards.'
    ]
  },
  {
    title: 'Software Engineer',
    subtitle: 'Mphasis',
    location: 'Pune, India',
    period: 'Feb 2020 - July 2023',
    description: [
      'Collaborated effectively with cross-functional teams (mainframe engineers, ETL developers) to deliver results and achieve project goals.',
      'Maintained 100% system uptime through proactive monitoring, prompt patch/upgrade implementation, and effective collaboration with vendors to address issues.',
      'Demonstrated expertise in swiftly troubleshooting complex software issues while adhering to strict security protocols, minimizing downtime. Contributed to organizational growth through active knowledge sharing and comprehensive documentation.',
      'Skilled in maintaining and troubleshooting complex software systems, leveraging tools like Control-M, Solarwinds, Truesight Automation, ServiceNow, and Meraki Dashboard to ensure operational stability and security.'
    ]
  }
];

export const PERSONAL_PROJECTS: ResumeItem[] = [
  {
    title: 'WanderlustTrails - Travel Booking System',
    subtitle: 'Full Stack Development',
    period: 'June 2024 - Present',
    description: [
      'Developed a travel planning website for trip planning, bookings, itineraries, and role-based admin management.',
      'Implemented user authentication with role-based access for travelers and admins, enabling secure bookings and itinerary management.',
      'Designed an admin dashboard for managing travel packages, user reviews, and travel blogs, ensuring seamless content updates.',
      'Integrated dynamic destination browsing, hotel and flight booking, and a database-driven image management system.',
      'Technology used: PHP, React.js (Vite), MySQL, Tailwind CSS, Bootstrap, Axios.'
    ]
  },
  {
    title: 'Event Management System',
    subtitle: 'Backend Focused',
    period: 'May - June 2024',
    description: [
      'Developed a functional event ticket sales web application, enabling users to browse and purchase event tickets.',
      'Features: Event browsing and filtering, detailed event views with descriptions and images, secure ticket purchase with input validation, dynamic price calculation including discounts, and order confirmation.',
      'Designed and implemented user interfaces and application logic for event browsing, details, and ticket purchasing. Managed data models, ensuring data consistency and structure. Implemented validation for user input and calculation logic for pricing.',
      'Technology used: .NET MVC CORE, C#, Razor markup, Tag Helpers, Data Annotations.'
    ]
  },
  {
    title: 'Movie Ticketing System',
    subtitle: 'Dynamic Web App',
    period: 'Jan - Apr 2024',
    description: [
      'Developed a dynamic movie booking website where customers can easily select seats, and manage bookings.',
      'Features: Real-time seat selection, age-based pricing, movie categories, customer management, ticket retrieval, booking deletion.',
      'Implemented dynamic seat selection, developed pricing logic, and managed customer details, Data Validation and booking data.',
      'Technology used: PHP, JavaScript, HTML/CSS, MySQL.'
    ]
  },
  {
    title: 'An Integrity Analysis System for assessing information on Twitter',
    subtitle: 'Information Integrity',
    period: 'Dec 2018 - April 2019',
    description: [
      "The project aims to improve Tweet analysis efficiency by utilizing an Integrity analysis system.",
      "This project's main goal is to boost the efficiency of the Tweet analysis system by actively sending tweets to people who are able and willing to retweet.",
      "Technology used: Java, MySQL, HTML/CSS."
    ]
  }
];

export const SKILLS_RESUME = {
  languages: ['C', 'Python', 'Core Java', 'C#', '.NET', 'PHP', 'JavaScript', 'HTML5', 'CSS3'],
  frameworks: ['Reactjs', '.NET MVC CORE Framework', '.NET MVC Entity Framework'],
  cloud_db: ['MySQL', 'Azure'],
  tools: ['Visual Studio', 'Eclipse', 'VSCode', 'Tomcat', 'Xampp', 'Putty', 'Git', 'Github'],
  coursework: ['Software Engineering', 'Advance Analysis & Design', 'Internet for Enterprise', 'Datacom and Distributed Data Processing', 'Serverside Internet Resource', 'Data Structures & Algorithms', 'Object Oriented Programming', 'Operating Systems', 'Advance Systems Project'],
  interests: ['Web Design and Development'],
  soft_skills: ['Problem Solving', 'Self-learning', 'Time Management', 'Adaptability', 'Constructive-feedback']
};

export const AWARDS: ResumeItem[] = [
  {
    title: 'Top Performer Q3',
    subtitle: 'Mphasis: Recognized for excellent client service, agility, and KPI delivery.',
    period: 'Dec 2022',
    description: []
  },
  {
    title: 'Attended Android Application Development Workshop',
    subtitle: 'organised by KT WEB ACADEMY.',
    period: 'Jan 2019',
    description: []
  },
  {
    title: 'Participated in Fundamentals of Programming workshop',
    subtitle: 'organised by CSIT FORUM MIST.',
    period: 'Sept 2018',
    description: []
  },
  {
    title: 'Certified Certified Adventurer',
    subtitle: 'for achieving India’s highest bungee jump at Jumpin Heights, Rishikesh.',
    period: 'Dec 2018',
    description: []
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
