'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'

const AnalyticsTracker = () => {
  const { settings, trackEvent } = useAnalytics()
  const pathname = usePathname()
  const sessionId = useRef<string>()

  // Générer un ID de session unique
  useEffect(() => {
    if (!sessionId.current) {
      sessionId.current = Math.random().toString(36).substring(2) + Date.now().toString(36)
    }
  }, [])

  // Tracker les vues de page
  useEffect(() => {
    if (settings?.enabled && settings?.trackPageViews) {
      trackEvent({
        eventType: 'page_view',
        page: pathname,
        sessionId: sessionId.current
      })
    }
  }, [pathname, settings, trackEvent])

  // Tracker les clics sur les projets
  useEffect(() => {
    if (!settings?.enabled || !settings?.trackProjectClicks) return

    const handleProjectClick = (event: Event) => {
      const target = event.target as HTMLElement
      const projectLink = target.closest('[data-project-id]')

      if (projectLink) {
        const projectId = projectLink.getAttribute('data-project-id')
        const projectTitle = projectLink.getAttribute('data-project-title')

        trackEvent({
          eventType: 'project_click',
          page: pathname,
          projectId: projectId || undefined,
          sessionId: sessionId.current,
          metadata: {
            projectTitle,
            linkType: projectLink.getAttribute('data-link-type') || 'unknown'
          }
        })
      }
    }

    document.addEventListener('click', handleProjectClick)
    return () => document.removeEventListener('click', handleProjectClick)
  }, [settings, pathname, trackEvent])

  // Tracker les soumissions de formulaire de contact
  useEffect(() => {
    if (!settings?.enabled || !settings?.trackContactForm) return

    const handleContactFormSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement

      if (target.tagName === 'FORM' && target.closest('#contact')) {
        trackEvent({
          eventType: 'contact_form',
          page: pathname,
          sessionId: sessionId.current,
          metadata: {
            formId: target.id || 'contact-form'
          }
        })
      }
    }

    document.addEventListener('submit', handleContactFormSubmit)
    return () => document.removeEventListener('submit', handleContactFormSubmit)
  }, [settings, pathname, trackEvent])

  // Tracker les téléchargements
  useEffect(() => {
    if (!settings?.enabled || !settings?.trackDownloads) return

    const handleDownloadClick = (event: Event) => {
      const target = event.target as HTMLElement
      const downloadLink = target.closest('[data-download]')

      if (downloadLink) {
        const downloadType = downloadLink.getAttribute('data-download')
        const fileName = downloadLink.getAttribute('data-filename')

        trackEvent({
          eventType: 'download',
          page: pathname,
          sessionId: sessionId.current,
          metadata: {
            downloadType,
            fileName,
            url: (downloadLink as HTMLAnchorElement).href
          }
        })
      }
    }

    document.addEventListener('click', handleDownloadClick)
    return () => document.removeEventListener('click', handleDownloadClick)
  }, [settings, pathname, trackEvent])

  // Tracker les événements personnalisés
  useEffect(() => {
    if (!settings?.enabled || !settings?.customEvents?.length) return

    const handleCustomEvents = (event: Event) => {
      settings.customEvents.forEach(customEvent => {
        const target = event.target as HTMLElement

        if (customEvent.eventType === 'click' && event.type === 'click') {
          const element = target.closest(customEvent.selector)
          if (element) {
            trackEvent({
              eventType: 'custom',
              eventName: customEvent.name,
              page: pathname,
              sessionId: sessionId.current,
              metadata: {
                selector: customEvent.selector,
                description: customEvent.description,
                elementText: element.textContent?.trim().substring(0, 100)
              }
            })
          }
        }
      })
    }

    // Ajouter les listeners pour tous les types d'événements personnalisés
    const eventTypes = ['click', 'submit']
    eventTypes.forEach(eventType => {
      document.addEventListener(eventType, handleCustomEvents)
    })

    return () => {
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, handleCustomEvents)
      })
    }
  }, [settings, pathname, trackEvent])

  // Ce composant ne rend rien, il ne fait que tracker
  return null
}

export default AnalyticsTracker