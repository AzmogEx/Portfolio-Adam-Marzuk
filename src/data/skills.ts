import { Skill } from '@/types'

export const skills: Skill[] = [
  // Langages de programmation
  { name: 'JavaScript', category: 'language', level: 'advanced', icon: '🟨' },
  { name: 'TypeScript', category: 'language', level: 'advanced', icon: '🔷' },
  { name: 'C#', category: 'language', level: 'expert', icon: '⚡' },
  { name: 'Python', category: 'language', level: 'intermediate', icon: '🐍' },
  { name: 'Java', category: 'language', level: 'advanced', icon: '☕' },
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
  { name: 'Figma', category: 'tool', level: 'intermediate', icon: '🎨' },
  { name: 'Proxmox', category: 'tool', level: 'advanced', icon: '💻' },

  // Méthodologies & Gestion de projet
  { name: 'Agile/Scrum', category: 'other', level: 'intermediate', icon: '🔄' },
  { name: 'Kanban', category: 'other', level: 'intermediate', icon: '📋' },
]

// Outils de travail et workflow
export const workflowTools: Skill[] = [
  // IDEs & Éditeurs
  { name: 'VS Code', category: 'tool', level: 'expert', icon: '💻' },
  { name: 'IntelliJ IDEA', category: 'tool', level: 'advanced', icon: '🧠' },
  { name: 'PhpStorm', category: 'tool', level: 'intermediate', icon: '⚡' },

  // Outils de collaboration
  { name: 'GitHub', category: 'tool', level: 'advanced', icon: '🐙' },
  { name: 'GitLab', category: 'tool', level: 'intermediate', icon: '🦊' },
  { name: 'Slack', category: 'tool', level: 'advanced', icon: '💬' },
  { name: 'Discord', category: 'tool', level: 'expert', icon: '🎮' },
  { name: 'Trello', category: 'tool', level: 'advanced', icon: '📋' },
  { name: 'Notion', category: 'tool', level: 'intermediate', icon: '📝' },

  // Outils de test et débogage
  { name: 'Postman', category: 'tool', level: 'advanced', icon: '📬' },
  { name: 'Jest', category: 'tool', level: 'intermediate', icon: '🧪' },
  { name: 'Cypress', category: 'tool', level: 'beginner', icon: '🌲' },

  // Outils DevOps
  { name: 'GitHub Actions', category: 'tool', level: 'intermediate', icon: '⚙️' },
  { name: 'Vercel', category: 'tool', level: 'advanced', icon: '🚀' },
  { name: 'Netlify', category: 'tool', level: 'intermediate', icon: '🌐' },
]

// Soft Skills et méthodes de travail
export const softSkills: Skill[] = [
  // Compétences relationnelles
  { name: 'Travail en équipe', category: 'other', level: 'expert', icon: '👥' },
  { name: 'Communication', category: 'other', level: 'advanced', icon: '💬' },
  { name: 'Cohésion de groupe', category: 'other', level: 'advanced', icon: '🤝' },
  { name: 'Leadership', category: 'other', level: 'intermediate', icon: '👨‍💼' },

  // Organisation et méthodes
  { name: 'Gestion de projet', category: 'other', level: 'advanced', icon: '📊' },
  { name: 'Planification', category: 'other', level: 'advanced', icon: '📅' },
  { name: 'Résolution de problèmes', category: 'other', level: 'expert', icon: '🔍' },
  { name: 'Esprit critique', category: 'other', level: 'advanced', icon: '🎯' },

  // Adaptabilité et apprentissage
  { name: 'Adaptabilité', category: 'other', level: 'expert', icon: '🔄' },
  { name: 'Apprentissage continu', category: 'other', level: 'expert', icon: '📚' },
  { name: 'Veille technologique', category: 'other', level: 'advanced', icon: '🔭' },
  { name: 'Créativité', category: 'other', level: 'advanced', icon: '💡' },
]
