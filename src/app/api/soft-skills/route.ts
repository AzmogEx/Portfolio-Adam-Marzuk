import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { SoftSkillSchema } from '@/lib/validators'

// GET - Récupérer toutes les soft skills (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // Filtrer par catégorie si nécessaire

    const softSkills = await prisma.softSkill.findMany({
      where: {
        ...(category && { category })
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    const response = NextResponse.json({ softSkills })
    
    // Disable caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching soft skills:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle soft skill (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = SoftSkillSchema.safeParse(body)

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
      const lastSkill = await prisma.softSkill.findFirst({
        where: { category: data.category },
        orderBy: { order: 'desc' }
      })
      data.order = (lastSkill?.order || 0) + 1
    }

    const softSkill = await prisma.softSkill.create({
      data
    })

    // Revalidate pages that show soft skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Soft skill created successfully',
      softSkill
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating soft skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}