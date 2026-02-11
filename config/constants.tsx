import { BlogPost, AccentColor } from './types';

export const FULL_NAME = 'Vamshi Krishna Pullaiahgari';
export const EMAIL = 'vamshikrishna2297@gmail.com';
export const PHONE = '+1 (913) 326-7373';
export const GITHUB_USERNAME = 'vamshikittu22';
export const INSTAGRAM_HANDLE = 'vamshi._.ki22u';
export const INSTAGRAM_URL = `https://www.instagram.com/vamshi._.ki22u/`;
export const X_HANDLE = 'ki22u__';
export const X_URL = `https://x.com/ki22u__`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/';
export const BLOG_URL = 'https://travelsofvk.blogspot.com';
export const RESUME_URL = '#resume-section';

export const PHYSICAL_FALLBACKS = {
  HERO_DARK: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=75&w=1200&fm=webp",
  HERO_LIGHT: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1200&fm=webp",
  TRAVEL_RISHIKESH: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=75&w=1200&fm=webp",
  TRAVEL_COORG: "https://images.unsplash.com/photo-1616781296174-884ec811776b?auto=format&fit=crop&q=75&w=1200&fm=webp",
  AI_LAB_GENERIC: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=75&w=1200&fm=webp"
};

export const HERO_FALLBACK_DARK = PHYSICAL_FALLBACKS.HERO_DARK;
export const HERO_FALLBACK_LIGHT = PHYSICAL_FALLBACKS.HERO_LIGHT;

export const HERO_PROMPT_DARK = "Abstract software engineering desk scene, high resolution, Swiss minimalist style. Deep navy atmosphere with electric purple and orange accents, emphasizing cloud infrastructure and Java microservices.";
export const HERO_PROMPT_LIGHT = "Abstract software engineering desk scene, high resolution, Swiss architectural style. Daylight atmosphere with soft blue accents, suggesting clean enterprise application design.";

export const VIBRANT_ACCENTS: AccentColor[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

export const SKILLS_RESUME = {
  languages: ['Java (8-17)', 'Python', 'JavaScript', 'TypeScript', 'C#', 'SQL', 'PHP', 'C'],
  frameworks: ['Spring Boot', 'Spring Framework', 'Node.js', 'React.js', 'Angular', 'Vue.js', '.NET Core'],
  backend_apis: ['RESTful APIs', 'Microservices Architecture', 'GraphQL', 'Event-Driven Systems', 'Apache Kafka', 'Apache Pulsar'],
  data_db: ['Oracle', 'MySQL', 'PostgreSQL', 'DynamoDB', 'BigQuery', 'Data Modeling', 'Hibernate', 'JPA', 'JDBC'],
  cloud_infra: ['AWS (EC2/ECS/EKS/Lambda)', 'Google Cloud (GCP)', 'Azure (AKS/Functions)', 'Docker', 'Kubernetes'],
  devops_ops: ['CI/CD', 'Jenkins', 'GitHub Actions', 'Terraform', 'Monitoring', 'Observability', 'CloudWatch', 'Azure Monitor'],
  testing_quality: ['JUnit', 'Mockito', 'Integration Testing', 'Postman', 'Test-Driven Development', 'Code Reviews'],
  tools_collab: ['Git', 'GitHub', 'Maven', 'Gradle', 'SonarQube', 'JIRA', 'Confluence'],
  ai_analytics: ['OpenAI API', 'LLM Integration', 'Python Pipelines', 'Power BI'],
  coursework: ['Distributed Systems', 'Cloud Computing', 'AI', 'Data Warehousing', 'Information Security']
};

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