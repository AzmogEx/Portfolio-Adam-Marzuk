import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Remplace ces données par tes vrais projets
const yourProjects = [
  // {
  //   title: 'Mon Projet 1',
  //   description: 'Description du projet...',
  //   image: 'URL de l\'image',
  //   technologies: ['React', 'TypeScript', 'etc'],
  //   githubUrl: 'https://github.com/...',
  //   liveUrl: 'https://...',
  //   order: 1
  // },
  // Ajoute tes autres projets ici...
]

async function restoreProjects() {
  console.log('Restoration des projets...')

  // Supprimer les projets existants (optionnel)
  await prisma.project.deleteMany()
  console.log('Projets existants supprimés')

  // Ajouter tes projets
  for (const projectData of yourProjects) {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        technologies: JSON.stringify(projectData.technologies)
      }
    })
    console.log(`Projet restauré: ${project.title}`)
  }

  console.log('Restoration terminée!')
}

restoreProjects()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })