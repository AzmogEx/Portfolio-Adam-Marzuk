import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AboutContentUpdateSchema } from '@/lib/validators'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const aboutContent = await prisma.aboutContent.findFirst()

    if (!aboutContent) {
      return NextResponse.json(
        { error: 'About content not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AboutContentUpdateSchema.parse(body)

    // Chercher le premier enregistrement (il ne devrait y en avoir qu'un)
    let aboutContent = await prisma.aboutContent.findFirst()

    if (!aboutContent) {
      // Si aucun contenu n'existe, créer le premier avec les valeurs par défaut
      const {
        sectionTitle = "À propos de moi",
        sectionSubtitle = "Découvrez mon parcours, mes compétences et ma passion pour l'informatique",
        parcourTitle = "Mon parcours",
        parcourText1 = "Étudiant en Bachelor informatique au CESI Orléans je me spécialise dans le développement d'applications. Ma passion pour les technologies web et l'intelligence artificielle m'a conduit à explorer diverses technologies et frameworks modernes.",
        parcourText2 = "J'ai acquis une expérience pratique grâce à des stages en entreprise et des projets personnels, me permettant de développer une approche complète du développement full-stack.",
        skillsTitle = "Compétences principales"
      } = validatedData

      aboutContent = await prisma.aboutContent.create({
        data: {
          sectionTitle,
          sectionSubtitle,
          parcourTitle,
          parcourText1,
          parcourText2,
          skillsTitle,
        }
      })
    } else {
      // Mettre à jour l'enregistrement existant
      aboutContent = await prisma.aboutContent.update({
        where: { id: aboutContent.id },
        data: validatedData
      })
    }

    return NextResponse.json(aboutContent)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating about content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}