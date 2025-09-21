import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AnalyticsEventSchema } from '@/lib/validators'
import crypto from 'crypto'

// POST - Enregistrer un événement analytics (public mais limité)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = AnalyticsEventSchema.parse(body)

    // Vérifier si les analytics sont activés
    const settings = await prisma.analyticsSettings.findFirst()
    if (!settings?.enabled) {
      return NextResponse.json({ success: false, message: 'Analytics disabled' })
    }

    // Récupérer les informations de la requête
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(', ')[0] : 'unknown'
    const userAgent = request.headers.get('user-agent') || null
    const referer = request.headers.get('referer') || null

    // Hasher l'IP pour la privacy
    const hashedIp = ip !== 'unknown' ? crypto.createHash('sha256').update(ip).digest('hex') : null

    // Vérifier le type d'événement selon les paramètres
    const shouldTrack = () => {
      switch (validatedData.eventType) {
        case 'page_view':
          return settings.trackPageViews
        case 'project_click':
          return settings.trackProjectClicks
        case 'contact_form':
          return settings.trackContactForm
        case 'download':
          return settings.trackDownloads
        case 'custom':
          return true // Les événements custom sont toujours trackés s'ils sont envoyés
        default:
          return false
      }
    }

    if (!shouldTrack()) {
      return NextResponse.json({ success: false, message: 'Event type not tracked' })
    }

    // Exclure les vues admin si configuré
    if (settings.excludeAdminViews && request.cookies.get('admin-token')) {
      return NextResponse.json({ success: false, message: 'Admin views excluded' })
    }

    // Créer l'événement analytics
    await prisma.analyticsEvent.create({
      data: {
        eventType: validatedData.eventType,
        eventName: validatedData.eventName,
        page: validatedData.page,
        projectId: validatedData.projectId,
        userAgent,
        ipAddress: hashedIp,
        country: null, // TODO: Ajouter la géolocalisation IP si nécessaire
        referrer: referer,
        sessionId: validatedData.sessionId,
        metadata: validatedData.metadata ? JSON.stringify(validatedData.metadata) : null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking analytics event:', error)

    // Ne pas exposer les erreurs internes pour le tracking
    return NextResponse.json({ success: false, message: 'Failed to track event' })
  }
}