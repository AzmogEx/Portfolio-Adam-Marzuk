import { Skill } from '@/types'

export const skills: Skill[] = [
  // Langages de programmation
  { name: 'JavaScript', category: 'language', level: 'advanced', icon: '🟨' },
  { name: 'TypeScript', category: 'language', level: 'advanced', icon: '🔷' },
  { name: 'Python', category: 'language', level: 'intermediate', icon: '🐍' },
  { name: 'Java', category: 'language', level: 'intermediate', icon: '☕' },
  { name: 'PHP', category: 'language', level: 'intermediate', icon: '🐘' },
  { name: 'C++', category: 'language', level: 'beginner', icon: '⚡' },

  // Frameworks & Libraries
  { name: 'React', category: 'framework', level: 'advanced', icon: '⚛️' },
  { name: 'Vue.js', category: 'framework', level: 'intermediate', icon: '💚' },
  { name: 'Node.js', category: 'framework', level: 'intermediate', icon: '🟢' },
  { name: 'Express.js', category: 'framework', level: 'intermediate', icon: '🚂' },
  { name: 'Laravel', category: 'framework', level: 'intermediate', icon: '🔴' },
  { name: 'Spring Boot', category: 'framework', level: 'beginner', icon: '🍃' },

  // Outils & Technologies
  { name: 'Git', category: 'tool', level: 'advanced', icon: '🔀' },
  { name: 'Docker', category: 'tool', level: 'intermediate', icon: '🐳' },
  { name: 'MySQL', category: 'tool', level: 'intermediate', icon: '🗄️' },
  { name: 'PostgreSQL', category: 'tool', level: 'intermediate', icon: '🐘' },
  { name: 'MongoDB', category: 'tool', level: 'intermediate', icon: '🍃' },
  { name: 'VS Code', category: 'tool', level: 'expert', icon: '💙' },
  { name: 'Figma', category: 'tool', level: 'intermediate', icon: '🎨' },
  { name: 'Postman', category: 'tool', level: 'intermediate', icon: '📮' },
  
  // Méthodologies & Gestion de projet
  { name: 'Agile/Scrum', category: 'other', level: 'intermediate', icon: '🔄' },
  { name: 'Kanban', category: 'other', level: 'intermediate', icon: '📋' },
  { name: 'Jira', category: 'tool', level: 'intermediate', icon: '🎯' },
  { name: 'Trello', category: 'tool', level: 'advanced', icon: '📌' },
]