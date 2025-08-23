import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ExperienceUpdateSchema } from '@/lib/validators'

// GET - Récupérer une expérience spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const experience = await prisma.experience.findUnique({
      where: { id }
    })

    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      experience: {
        ...experience,
        description: JSON.parse(experience.description),
        technologies: JSON.parse(experience.technologies)
      }
    })
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Modifier une expérience (admin uniquement)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = params
    const body = await request.json()
    
    const validation = ExperienceUpdateSchema.safeParse(body)

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

    // Vérifier que l'expérience existe
    const existingExperience = await prisma.experience.findUnique({
      where: { id }
    })

    if (!existingExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Préparer les données pour la mise à jour
    const updateData: any = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.company !== undefined) updateData.company = data.company
    if (data.location !== undefined) updateData.location = data.location
    if (data.startDate !== undefined) updateData.startDate = data.startDate
    if (data.endDate !== undefined) {
      updateData.endDate = data.endDate === '' ? null : data.endDate
    }
    if (data.description !== undefined) {
      updateData.description = JSON.stringify(data.description)
    }
    if (data.technologies !== undefined) {
      updateData.technologies = JSON.stringify(data.technologies)
    }
    if (data.type !== undefined) updateData.type = data.type
    if (data.featured !== undefined) updateData.featured = data.featured
    if (data.order !== undefined) updateData.order = data.order

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      message: 'Experience updated successfully',
      experience: {
        ...updatedExperience,
        description: JSON.parse(updatedExperience.description),
        technologies: JSON.parse(updatedExperience.technologies)
      }
    })

  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une expérience (admin uniquement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = params

    // Vérifier que l'expérience existe
    const existingExperience = await prisma.experience.findUnique({
      where: { id }
    })

    if (!existingExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    await prisma.experience.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Experience deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}