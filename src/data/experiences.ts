import { Experience, Education } from '@/types'

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Développeur Full-Stack - Stagiaire',
    company: 'TechCorp Solutions',
    location: 'Paris, France',
    startDate: '2024-04',
    endDate: '2024-06',
    description: [
      'Développement d\'une application web de gestion de projets en React et Node.js',
      'Mise en place d\'une API REST avec authentification JWT',
      'Intégration de tests unitaires avec Jest et React Testing Library',
      'Collaboration en équipe Agile avec participation aux daily stands et sprint reviews'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Jest', 'Git']
  },
  {
    id: '2',
    title: 'Développeur Web - Stagiaire',
    company: 'Digital Agency Pro',
    location: 'Lyon, France',
    startDate: '2023-05',
    endDate: '2023-07',
    description: [
      'Création de sites web responsives pour des clients variés',
      'Développement front-end avec Vue.js et intégration d\'APIs',
      'Optimisation SEO et performances web',
      'Maintenance et mise à jour de sites existants'
    ],
    technologies: ['Vue.js', 'JavaScript', 'SCSS', 'PHP', 'WordPress', 'Figma']
  }
]

export const education: Education[] = [
  {
    id: '1',
    degree: 'BUT Informatique - Réalisation d\'applications',
    school: 'IUT de Informatique',
    location: 'France',
    startDate: '2022-09',
    endDate: '2025-06',
    description: 'Formation en développement d\'applications avec spécialisation en technologies web modernes, bases de données, et gestion de projet.'
  },
  {
    id: '2',
    degree: 'Baccalauréat Scientifique',
    school: 'Lycée Victor Hugo',
    location: 'France',
    startDate: '2019-09',
    endDate: '2022-06',
    description: 'Spécialité Mathématiques et Numérique et Sciences Informatiques (NSI)'
  }
]