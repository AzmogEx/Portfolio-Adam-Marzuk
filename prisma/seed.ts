import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: { password: hashedPassword },
    create: {
      username: adminUsername,
      password: hashedPassword,
    },
  })
  
  console.log(`Admin user created/updated: ${admin.username}`)
  
  // Migrate existing projects from static data to database
  const existingProjects = [
    {
      title: 'Projet E-commerce',
      description: 'Application e-commerce complète avec gestion des produits, panier, commandes et paiements. Interface moderne et responsive.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe']),
      githubUrl: 'https://github.com/AzmogEx',
      liveUrl: 'https://demo.adam-marzuk.fr',
      order: 1
    },
    {
      title: 'API REST Task Manager',
      description: 'API REST pour la gestion de tâches avec authentification JWT, CRUD complet et documentation Swagger.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      technologies: JSON.stringify(['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger']),
      githubUrl: 'https://github.com/AzmogEx',
      liveUrl: null,
      order: 2
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord analytique avec graphiques interactifs, filtres avancés et export de données.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      technologies: JSON.stringify(['Vue.js', 'Chart.js', 'Laravel', 'MySQL']),
      githubUrl: 'https://github.com/AzmogEx',
      liveUrl: 'https://analytics.adam-marzuk.fr',
      order: 3
    },
    {
      title: 'Application Mobile Fitness',
      description: 'Application mobile de suivi fitness avec tracking des exercices, objectifs et statistiques.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      technologies: JSON.stringify(['React Native', 'Firebase', 'Redux', 'Expo']),
      githubUrl: 'https://github.com/AzmogEx',
      liveUrl: null,
      order: 4
    }
  ]
  
  // Delete existing projects and create new ones
  await prisma.project.deleteMany()
  
  for (const projectData of existingProjects) {
    const project = await prisma.project.create({
      data: projectData
    })
    console.log(`Project created: ${project.title}`)
  }

  // Seeder les expériences
  console.log('Seeding experiences...')
  
  const existingExperiences = [
    {
      title: 'Développeur Full-Stack - Stagiaire',
      company: 'TechCorp Solutions',
      location: 'Paris, France',
      startDate: '2024-04',
      endDate: '2024-06',
      description: JSON.stringify([
        'Développement d\'une application web de gestion de projets en React et Node.js',
        'Mise en place d\'une API REST avec authentification JWT',
        'Intégration de tests unitaires avec Jest et React Testing Library',
        'Collaboration en équipe Agile avec participation aux daily stands et sprint reviews'
      ]),
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'MongoDB', 'Jest', 'Git']),
      type: 'work',
      order: 1
    },
    {
      title: 'Développeur Web - Stagiaire',
      company: 'Digital Agency Pro',
      location: 'Lyon, France',
      startDate: '2023-05',
      endDate: '2023-07',
      description: JSON.stringify([
        'Création de sites web responsives pour des clients variés',
        'Développement front-end avec Vue.js et intégration d\'APIs',
        'Optimisation SEO et performances web',
        'Maintenance et mise à jour de sites existants'
      ]),
      technologies: JSON.stringify(['Vue.js', 'JavaScript', 'SCSS', 'PHP', 'WordPress', 'Figma']),
      type: 'work',
      order: 2
    },
    {
      title: 'BUT Informatique - Réalisation d\'applications',
      company: 'IUT de Informatique',
      location: 'France',
      startDate: '2022-09',
      endDate: '2025-06',
      description: JSON.stringify([
        'Formation en développement d\'applications avec spécialisation en technologies web modernes, bases de données, et gestion de projet.'
      ]),
      technologies: JSON.stringify([]),
      type: 'education',
      order: 1
    },
    {
      title: 'Baccalauréat Scientifique',
      company: 'Lycée Victor Hugo',
      location: 'France',
      startDate: '2019-09',
      endDate: '2022-06',
      description: JSON.stringify([
        'Spécialité Mathématiques et Numérique et Sciences Informatiques (NSI)'
      ]),
      technologies: JSON.stringify([]),
      type: 'education',
      order: 2
    }
  ]

  // Supprimer les expériences existantes et créer les nouvelles
  await prisma.experience.deleteMany()
  
  for (const expData of existingExperiences) {
    const experience = await prisma.experience.create({
      data: expData
    })
    console.log(`Experience created: ${experience.title} (${experience.type})`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })