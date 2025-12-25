import { BlogPost } from './types';

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
