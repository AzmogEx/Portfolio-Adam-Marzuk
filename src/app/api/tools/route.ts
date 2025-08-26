import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { ToolSchema } from '@/lib/validators'

// GET - Récupérer tous les outils (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // Filtrer par catégorie si nécessaire

    const tools = await prisma.tool.findMany({
      where: {
        ...(category && { category })
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    const response = NextResponse.json({ tools })
    
    // Disable caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouvel outil (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const body = await request.json()
    const validation = ToolSchema.safeParse(body)

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
      const lastTool = await prisma.tool.findFirst({
        where: { category: data.category },
        orderBy: { order: 'desc' }
      })
      data.order = (lastTool?.order || 0) + 1
    }

    const tool = await prisma.tool.create({
      data
    })

    // Revalidate pages that show tools
    revalidatePath('/')
    revalidatePath('/admin')

    return NextResponse.json({
      message: 'Tool created successfully',
      tool
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating tool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}