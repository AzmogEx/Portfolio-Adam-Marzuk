import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ExperienceSchema } from '@/lib/validators'
import { safeJsonParse } from '@/lib/utils'

// GET - Récupérer toutes les expériences (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'work', 'education' ou null pour tout

    const experiences = await prisma.experience.findMany({
      where: {
        ...(type && { type })
      },
      orderBy: [
        { startDate: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    // Parse des champs JSON en arrays
    const formattedExperiences = experiences.map(exp => ({
      ...exp,
      description: safeJsonParse(exp.description, []),
      technologies: safeJsonParse(exp.technologies, [])
    }))

    const response = NextResponse.json({ experiences: formattedExperiences })
    
    // Disable caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle expérience (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = ExperienceSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.issues 
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Si aucun ordre spécifié, prendre le prochain ordre disponible
    if (data.order === 0) {
      const lastExperience = await prisma.experience.findFirst({
        where: { type: data.type },
        orderBy: { order: 'desc' }
      })
      data.order = (lastExperience?.order || 0) + 1
    }

    const experience = await prisma.experience.create({
      data: {
        ...data,
        description: JSON.stringify(data.description),
        technologies: JSON.stringify(data.technologies),
        endDate: data.endDate === '' ? null : data.endDate,
      }
    })

    // Revalidate pages that show experiences
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Experience created successfully',
      experience: {
        ...experience,
        description: safeJsonParse(experience.description, []),
        technologies: safeJsonParse(experience.technologies, [])
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}