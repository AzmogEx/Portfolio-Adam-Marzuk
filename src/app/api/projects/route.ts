import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ProjectSchema } from '@/lib/validators'
import { safeJsonParse } from '@/lib/utils'

// GET - Fetch all projects (public)
export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    // Parse technologies JSON string back to array
    const formattedProjects = projects.map(project => ({
      ...project,
      technologies: safeJsonParse(project.technologies, [])
    }))

    const response = NextResponse.json({ projects: formattedProjects })
    
    // Disable caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    await requireAuth()

    const body = await request.json()
    
    // Validate input
    const validation = ProjectSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data

    // Convert technologies array to JSON string
    const projectData = {
      ...data,
      technologies: JSON.stringify(data.technologies),
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
    }

    const project = await prisma.project.create({
      data: projectData
    })

    // Return project with parsed technologies
    const formattedProject = {
      ...project,
      technologies: safeJsonParse(project.technologies, [])
    }

    // Revalidate pages that show projects
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json(
      { success: true, project: formattedProject },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}