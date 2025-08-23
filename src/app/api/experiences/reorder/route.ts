import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

// Schema pour valider les données de réorganisation
const ReorderSchema = z.object({
  experiences: z.array(
    z.object({
      id: z.string(),
      order: z.number().int().min(0)
    })
  ).min(1)
})

// PUT - Réorganiser l'ordre des expériences (admin uniquement)
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = ReorderSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.issues 
        },
        { status: 400 }
      )
    }

    const { experiences } = validation.data

    // Utiliser une transaction pour mettre à jour tous les ordres
    await prisma.$transaction(
      experiences.map(exp => 
        prisma.experience.update({
          where: { id: exp.id },
          data: { order: exp.order }
        })
      )
    )

    return NextResponse.json({
      message: 'Experiences reordered successfully'
    })

  } catch (error) {
    console.error('Error reordering experiences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}