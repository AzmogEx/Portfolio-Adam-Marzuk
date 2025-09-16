'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useSeoSettings } from '@/hooks/useSeoSettings'

const Analytics = () => {
  const { seoSettings } = useSeoSettings()

  useEffect(() => {
    // Si Google Analytics est configuré, initialiser gtag
    if (seoSettings?.googleAnalyticsId && typeof window !== 'undefined') {
      // Fonction gtag pour Google Analytics
      const gtag = function (...args: any[]) {
        // @ts-ignore
        window.dataLayer = window.dataLayer || []
        // @ts-ignore
        window.dataLayer.push(arguments)
      }

      // @ts-ignore
      window.gtag = gtag

      // Initialiser avec la configuration
      gtag('js', new Date())
      gtag('config', seoSettings.googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [seoSettings?.googleAnalyticsId])

  // Ne pas rendre les scripts si pas d'Analytics ID
  if (!seoSettings?.googleAnalyticsId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalyticsId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${seoSettings.googleAnalyticsId}', {
              page_title: document.title,
              page_location: window.location.href
            });
          `,
        }}
      />
    </>
  )
}

export default Analytics