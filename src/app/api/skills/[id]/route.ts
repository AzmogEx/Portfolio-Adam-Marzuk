import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const SkillUpdateSchema = z.object({
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
}).partial()

// GET - Récupérer une compétence spécifique (public)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: params.id }
    })

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error fetching skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une compétence (admin uniquement)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = SkillUpdateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.issues
        },
        { status: 400 }
      )
    }

    // Vérifier que la compétence existe
    const existingSkill = await prisma.skill.findUnique({
      where: { id: params.id }
    })

    if (!existingSkill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: validation.data
    })

    // Revalidate pages that show skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Skill updated successfully',
      skill
    })

  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une compétence (admin uniquement)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Vérification d'authentification
    await requireAuth()

    // Vérifier que la compétence existe
    const existingSkill = await prisma.skill.findUnique({
      where: { id: params.id }
    })

    if (!existingSkill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }

    await prisma.skill.delete({
      where: { id: params.id }
    })

    // Revalidate pages that show skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Skill deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}