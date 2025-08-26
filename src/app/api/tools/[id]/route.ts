import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ToolUpdateSchema } from '@/lib/validators'

// GET - Récupérer un outil spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const tool = await prisma.tool.findUnique({
      where: { id }
    })

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ tool })
  } catch (error) {
    console.error('Error fetching tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Modifier un outil (admin uniquement)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = await params
    const body = await request.json()
    
    const validation = ToolUpdateSchema.safeParse(body)

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

    // Vérifier que l'outil existe
    const existingTool = await prisma.tool.findUnique({
      where: { id }
    })

    if (!existingTool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    const updatedTool = await prisma.tool.update({
      where: { id },
      data
    })

    // Revalidate pages that show tools
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Tool updated successfully',
      tool: updatedTool
    })

  } catch (error) {
    console.error('Error updating tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un outil (admin uniquement)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { id } = await params

    // Vérifier que l'outil existe
    const existingTool = await prisma.tool.findUnique({
      where: { id }
    })

    if (!existingTool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      )
    }

    await prisma.tool.delete({
      where: { id }
    })

    // Revalidate pages that show tools
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Tool deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}