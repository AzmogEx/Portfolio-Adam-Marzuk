import { useState, useEffect } from 'react'

interface FooterContent {
  id: string
  name: string
  description: string
  email: string
  githubUrl: string
  linkedinUrl: string
  copyrightText: string
  quickLinks: { name: string; href: string }[]
}

export const useFooter = () => {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/footer?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setFooterContent(data)
          setError(null)
        } else if (response.status === 404) {
          // Pas de contenu trouvé, utiliser les valeurs par défaut
          const defaultContent: FooterContent = {
            id: 'default',
            name: 'Adam Marzuk',
            description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
            email: 'contact@adam-marzuk.fr',
            githubUrl: 'https://github.com/AzmogEx',
            linkedinUrl: 'https://www.linkedin.com/in/adam-marzuk-93804828a/',
            copyrightText: `© ${new Date().getFullYear()} Adam Marzuk. Tous droits réservés.`,
            quickLinks: [
              { name: 'Accueil', href: '#hero' },
              { name: 'À propos', href: '#about' },
              { name: 'Projets', href: '#projects' },
              { name: 'Parcours', href: '#experiences' },
              { name: 'Contact', href: '#contact' }
            ]
          }
          setFooterContent(defaultContent)
          setError(null)
        } else {
          setError('Erreur lors du chargement du contenu')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching footer content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterContent()
  }, [])

  return {
    footerContent,
    loading,
    error
  }
}