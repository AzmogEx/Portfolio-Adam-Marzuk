import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET - Récupérer les statistiques analytics (admin uniquement)
export async function GET(request: NextRequest) {
  try {
    // Vérification d'authentification
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // Jours par défaut
    const periodDays = parseInt(period)

    // Date de début pour la période
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    // Statistiques générales
    const totalViews = await prisma.analyticsEvent.count({
      where: {
        eventType: 'page_view',
        timestamp: {
          gte: startDate
        }
      }
    })

    const totalProjectClicks = await prisma.analyticsEvent.count({
      where: {
        eventType: 'project_click',
        timestamp: {
          gte: startDate
        }
      }
    })

    const totalContactForms = await prisma.analyticsEvent.count({
      where: {
        eventType: 'contact_form',
        timestamp: {
          gte: startDate
        }
      }
    })

    // Statistiques par jour (pour les graphiques)
    const dailyViews = await prisma.analyticsEvent.groupBy({
      by: ['timestamp'],
      where: {
        eventType: 'page_view',
        timestamp: {
          gte: startDate
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        timestamp: 'asc'
      }
    })

    // Pages les plus visitées
    const topPages = await prisma.analyticsEvent.groupBy({
      by: ['page'],
      where: {
        eventType: 'page_view',
        page: {
          not: null
        },
        timestamp: {
          gte: startDate
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })

    // Projets les plus cliqués
    const topProjects = await prisma.analyticsEvent.groupBy({
      by: ['projectId'],
      where: {
        eventType: 'project_click',
        projectId: {
          not: null
        },
        timestamp: {
          gte: startDate
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })

    // Récupérer les infos des projets pour les noms
    const projectIds = topProjects.map(p => p.projectId).filter(Boolean) as string[]
    const projects = await prisma.project.findMany({
      where: {
        id: {
          in: projectIds
        }
      },
      select: {
        id: true,
        title: true
      }
    })

    const projectsWithNames = topProjects.map(tp => ({
      projectId: tp.projectId,
      title: projects.find(p => p.id === tp.projectId)?.title || 'Projet inconnu',
      clicks: tp._count.id
    }))

    // Technologies utilisées (basé sur les projets)
    const allProjects = await prisma.project.findMany({
      select: {
        technologies: true
      }
    })

    const techCount: { [key: string]: number } = {}
    allProjects.forEach(project => {
      const techs = JSON.parse(project.technologies || '[]')
      techs.forEach((tech: string) => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })

    const technologies = Object.entries(techCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / allProjects.length) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Pays les plus fréquents
    const topCountries = await prisma.analyticsEvent.groupBy({
      by: ['country'],
      where: {
        country: {
          not: null
        },
        timestamp: {
          gte: startDate
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })

    return NextResponse.json({
      period: periodDays,
      overview: {
        totalViews,
        totalProjectClicks,
        totalContactForms,
        totalProjects: allProjects.length
      },
      dailyViews: dailyViews.map(dv => ({
        date: dv.timestamp.toISOString().split('T')[0],
        views: dv._count.id
      })),
      topPages: topPages.map(tp => ({
        page: tp.page,
        views: tp._count.id
      })),
      topProjects: projectsWithNames,
      technologies,
      topCountries: topCountries.map(tc => ({
        country: tc.country,
        visits: tc._count.id
      }))
    })
  } catch (error) {
    console.error('Error fetching analytics stats:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}