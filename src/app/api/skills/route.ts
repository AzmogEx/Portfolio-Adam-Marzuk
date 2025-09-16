import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const SkillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  category: z.enum(['language', 'framework', 'tool', 'other'], {
    message: 'Category must be language, framework, tool, or other'
  }),
  level: z.enum(['expert', 'advanced', 'intermediate', 'beginner'], {
    message: 'Level must be expert, advanced, intermediate, or beginner'
  }),
  icon: z.string().min(1, 'Icon is required').max(10, 'Icon is too long'),
  description: z.string().max(500, 'Description is too long').optional().nullable(),
  type: z.enum(['main', 'workflow', 'soft'], {
    message: 'Type must be main, workflow, or soft'
  }).optional().default('main'),
  order: z.number().int().min(0).optional().default(0),
})

const SkillUpdateSchema = SkillSchema.partial()

// GET - Récupérer toutes les compétences (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'main', 'workflow', 'soft' ou null pour tout
    const category = searchParams.get('category') // filtrer par catégorie

    const skills = await prisma.skill.findMany({
      where: {
        ...(type && { type }),
        ...(category && { category })
      },
      orderBy: [
        { type: 'asc' }, // main, soft, workflow
        { order: 'asc' },
        { name: 'asc' }
      ]
    })

    const response = NextResponse.json({ skills })

    // Disable caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle compétence (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = SkillSchema.safeParse(body)

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
      const lastSkill = await prisma.skill.findFirst({
        where: { type: data.type },
        orderBy: { order: 'desc' }
      })
      data.order = (lastSkill?.order || 0) + 1
    }

    const skill = await prisma.skill.create({
      data
    })

    // Revalidate pages that show skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Skill created successfully',
      skill
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}