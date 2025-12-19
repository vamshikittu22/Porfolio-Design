
export enum ProjectCategory {
  FRONTEND = 'Frontend',
  FULLSTACK = 'Full-stack',
  AI = 'AI',
  EXPERIMENTS = 'Experiments'
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  bullets?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag: string;
  location?: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'x';
  content: string;
  imageUrl?: string;
  date: string;
  link: string;
}

export type AccentColor = 'blue' | 'green' | 'red';
