import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { SoftSkillUpdateSchema } from '@/lib/validators'

// GET - Récupérer une soft skill spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const softSkill = await prisma.softSkill.findUnique({
      where: { id }
    })

    if (!softSkill) {
      return NextResponse.json(
        { error: 'Soft skill not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ softSkill })
  } catch (error) {
    console.error('Error fetching soft skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Modifier une soft skill (admin uniquement)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = await params
    const body = await request.json()
    
    const validation = SoftSkillUpdateSchema.safeParse(body)

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

    // Vérifier que la soft skill existe
    const existingSoftSkill = await prisma.softSkill.findUnique({
      where: { id }
    })

    if (!existingSoftSkill) {
      return NextResponse.json(
        { error: 'Soft skill not found' },
        { status: 404 }
      )
    }

    const updatedSoftSkill = await prisma.softSkill.update({
      where: { id },
      data
    })

    // Revalidate pages that show soft skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Soft skill updated successfully',
      softSkill: updatedSoftSkill
    })

  } catch (error) {
    console.error('Error updating soft skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une soft skill (admin uniquement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = await params

    // Vérifier que la soft skill existe
    const existingSoftSkill = await prisma.softSkill.findUnique({
      where: { id }
    })

    if (!existingSoftSkill) {
      return NextResponse.json(
        { error: 'Soft skill not found' },
        { status: 404 }
      )
    }

    await prisma.softSkill.delete({
      where: { id }
    })

    // Revalidate pages that show soft skills
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Soft skill deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting soft skill:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}