import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ProjectUpdateSchema } from '@/lib/validators'
import { safeJsonParse } from '@/lib/utils'

// GET - Fetch single project (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Parse technologies JSON string back to array
    const formattedProject = {
      ...project,
      technologies: safeJsonParse(project.technologies, [])
    }

    return NextResponse.json({ project: formattedProject })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update project (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth()

    const body = await request.json()
    
    // Validate input
    const validation = ProjectUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const { id } = await params

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: Record<string, unknown> = { ...data }
    if (data.technologies) {
      updateData.technologies = JSON.stringify(data.technologies)
    }
    if (data.githubUrl === '') updateData.githubUrl = null
    if (data.liveUrl === '') updateData.liveUrl = null

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })

    // Return project with parsed technologies
    const formattedProject = {
      ...project,
      technologies: safeJsonParse(project.technologies, [])
    }

    return NextResponse.json(
      { success: true, project: formattedProject }
    )
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth()

    const { id } = await params
    
    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json(
      { success: true, message: 'Project deleted successfully' }
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}