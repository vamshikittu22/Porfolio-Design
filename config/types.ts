
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
  overview: string;
  useCases: string[];
  architecture: string;
  roleHighlights: string[];
  category: ProjectCategory;
  thumbnailUrl: string;
  secondaryImageUrl: string;
  tertiaryImageUrl?: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  narrative?: string;
  date: string;
  tag: string;
  location?: string;
  url: string;
  imageUrl?: string;
  illustrationUrl?: string;
  isPlaceholder?: boolean;
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