import { useState, useEffect } from 'react'

interface ContactSettings {
  id: string
  successMessage: string
  errorMessage: string
  emailSubject: string
  emailTemplate: string
  autoReplyEnabled: boolean
  autoReplySubject?: string | null
  autoReplyTemplate?: string | null
  adminEmail: string
  ccEmails: string[]
}

export const useContactSettings = () => {
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/contact-settings?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setContactSettings(data)
          setError(null)
        } else if (response.status === 404) {
          // Pas de paramètres trouvés, utiliser les valeurs par défaut
          const defaultSettings: ContactSettings = {
            id: 'default',
            successMessage: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
            errorMessage: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou me contacter directement.',
            emailSubject: 'Nouveau message depuis votre portfolio',
            emailTemplate: 'Template par défaut',
            autoReplyEnabled: false,
            autoReplySubject: 'Merci pour votre message',
            autoReplyTemplate: 'Template de réponse automatique par défaut',
            adminEmail: 'contact@adam-marzuk.fr',
            ccEmails: []
          }
          setContactSettings(defaultSettings)
          setError(null)
        } else {
          setError('Erreur lors du chargement des paramètres')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching contact settings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContactSettings()
  }, [])

  const updateContactSettings = async (settings: Partial<ContactSettings>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        const updatedSettings = await response.json()
        setContactSettings(updatedSettings)
        setError(null)
        return updatedSettings
      } else {
        throw new Error('Erreur lors de la mise à jour')
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    contactSettings,
    loading,
    error,
    updateContactSettings
  }
}