import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { FooterContentUpdateSchema } from '@/lib/validators'

// GET - Récupérer le contenu du footer (public)
export async function GET() {
  try {
    let footerContent = await prisma.footerContent.findFirst()

    // Si aucun contenu n'existe, retourner les valeurs par défaut
    if (!footerContent) {
      const defaultContent = {
        id: 'default',
        name: 'Adam Marzuk',
        description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
        email: 'contact@adam-marzuk.fr',
        githubUrl: 'https://github.com/AzmogEx',
        linkedinUrl: 'https://www.linkedin.com/in/adam-marzuk-93804828a/',
        copyrightText: `© ${new Date().getFullYear()} Adam Marzuk. Tous droits réservés.`,
        quickLinks: [
          { name: 'Accueil', href: '#hero' },
          { name: 'À propos', href: '#about' },
          { name: 'Projets', href: '#projects' },
          { name: 'Parcours', href: '#experiences' },
          { name: 'Contact', href: '#contact' }
        ]
      }

      return NextResponse.json(defaultContent)
    }

    // Parser les quickLinks depuis JSON
    const response = {
      ...footerContent,
      quickLinks: JSON.parse(footerContent.quickLinks || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching footer content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour le contenu du footer (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validatedData = FooterContentUpdateSchema.parse(body)

    // Convertir quickLinks en JSON string
    const dataToSave = {
      ...validatedData,
      quickLinks: JSON.stringify(validatedData.quickLinks || [])
    }

    let footerContent = await prisma.footerContent.findFirst()

    if (!footerContent) {
      // Créer le premier contenu
      footerContent = await prisma.footerContent.create({
        data: {
          name: dataToSave.name || 'Adam Marzuk',
          description: dataToSave.description || 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
          email: dataToSave.email || 'contact@adam-marzuk.fr',
          githubUrl: dataToSave.githubUrl || 'https://github.com/AzmogEx',
          linkedinUrl: dataToSave.linkedinUrl || 'https://www.linkedin.com/in/adam-marzuk-93804828a/',
          copyrightText: dataToSave.copyrightText || `© ${new Date().getFullYear()} Adam Marzuk. Tous droits réservés.`,
          quickLinks: dataToSave.quickLinks || JSON.stringify([])
        }
      })
    } else {
      // Mettre à jour le contenu existant
      footerContent = await prisma.footerContent.update({
        where: { id: footerContent.id },
        data: dataToSave
      })
    }

    // Retourner avec quickLinks parsé
    const response = {
      ...footerContent,
      quickLinks: JSON.parse(footerContent.quickLinks || '[]')
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating footer content:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}