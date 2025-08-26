export interface Project {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
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
  endDate?: string | null;
  description: string[];
  technologies: string[];
  type: 'work' | 'education';
  order: number;
  createdAt: string;
  updatedAt: string;
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

