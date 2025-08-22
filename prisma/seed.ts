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
      image: '/assets/images/project1.jpg',
      technologies: JSON.stringify(['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe']),
      githubUrl: 'https://github.com/adammarzuk',
      liveUrl: 'https://demo.adam-marzuk.fr',
      featured: true,
      order: 1
    },
    {
      title: 'API REST Task Manager',
      description: 'API REST pour la gestion de tâches avec authentification JWT, CRUD complet et documentation Swagger.',
      image: '/assets/images/project2.jpg',
      technologies: JSON.stringify(['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger']),
      githubUrl: 'https://github.com/adammarzuk',
      liveUrl: null,
      featured: true,
      order: 2
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord analytique avec graphiques interactifs, filtres avancés et export de données.',
      image: '/assets/images/project3.jpg',
      technologies: JSON.stringify(['Vue.js', 'Chart.js', 'Laravel', 'MySQL']),
      githubUrl: 'https://github.com/adammarzuk',
      liveUrl: 'https://analytics.adam-marzuk.fr',
      featured: false,
      order: 3
    },
    {
      title: 'Application Mobile Fitness',
      description: 'Application mobile de suivi fitness avec tracking des exercices, objectifs et statistiques.',
      image: '/assets/images/project4.jpg',
      technologies: JSON.stringify(['React Native', 'Firebase', 'Redux', 'Expo']),
      githubUrl: 'https://github.com/adammarzuk',
      liveUrl: null,
      featured: false,
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