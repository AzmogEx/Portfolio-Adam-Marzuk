import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Projet E-commerce',
    description: 'Application e-commerce complète avec gestion des produits, panier, commandes et paiements. Interface moderne et responsive.',
    image: '/assets/images/project1.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/adammarzuk',
    liveUrl: 'https://demo.adam-marzuk.fr',
    featured: true
  },
  {
    id: '2',
    title: 'API REST Task Manager',
    description: 'API REST pour la gestion de tâches avec authentification JWT, CRUD complet et documentation Swagger.',
    image: '/assets/images/project2.jpg',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/adammarzuk',
    featured: true
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Tableau de bord analytique avec graphiques interactifs, filtres avancés et export de données.',
    image: '/assets/images/project3.jpg',
    technologies: ['Vue.js', 'Chart.js', 'Laravel', 'MySQL'],
    githubUrl: 'https://github.com/adammarzuk',
    liveUrl: 'https://analytics.adam-marzuk.fr',
    featured: false
  },
  {
    id: '4',
    title: 'Application Mobile Fitness',
    description: 'Application mobile de suivi fitness avec tracking des exercices, objectifs et statistiques.',
    image: '/assets/images/project4.jpg',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    githubUrl: 'https://github.com/adammarzuk',
    featured: false
  }
]