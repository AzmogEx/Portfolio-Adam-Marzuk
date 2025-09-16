import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { HeroContentUpdateSchema } from '@/lib/validators'
import { ZodError } from 'zod'

export async function GET() {
  try {
    const heroContent = await prisma.heroContent.findFirst()

    if (!heroContent) {
      return NextResponse.json(
        { error: 'Hero content not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(heroContent)
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = HeroContentUpdateSchema.parse(body)

    // Chercher le premier enregistrement (il ne devrait y en avoir qu'un)
    let heroContent = await prisma.heroContent.findFirst()

    if (!heroContent) {
      // Si aucun contenu n'existe, créer le premier
      const {
        greeting = "Bonjour, je suis",
        name = "Adam Marzuk",
        title = "Développeur Full-Stack",
        description = "Étudiant en Bachelor Informatique, spécialisé dans le développement d'applications. Passionné par les technologies web modernes et l'intelligence artificielle.",
        location = "France",
        email = "contact@adam-marzuk.fr",
        profileImage = "/assets/images/profile.png",
        ctaButton1 = "Découvrir mon profil",
        ctaButton2 = "Me contacter",
        scrollText = "Scroll"
      } = validatedData

      heroContent = await prisma.heroContent.create({
        data: {
          greeting,
          name,
          title,
          description,
          location,
          email,
          profileImage,
          ctaButton1,
          ctaButton2,
          scrollText,
        }
      })
    } else {
      // Mettre à jour l'enregistrement existant
      heroContent = await prisma.heroContent.update({
        where: { id: heroContent.id },
        data: validatedData
      })
    }

    return NextResponse.json(heroContent)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error updating hero content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}