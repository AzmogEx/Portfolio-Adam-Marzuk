export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type Theme = 'light' | 'dark';