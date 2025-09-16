import { useState, useEffect } from 'react'

interface HeroContent {
  id: string
  greeting: string
  name: string
  title: string
  description: string
  location: string
  email: string
  profileImage: string | null
  ctaButton1: string
  ctaButton2: string
  scrollText: string
}

export const useHero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/hero?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setHeroContent(data)
          setError(null)
        } else if (response.status === 404) {
          // Pas de contenu trouvé, utiliser les valeurs par défaut
          const defaultContent: HeroContent = {
            id: 'default',
            greeting: "Bonjour, je suis",
            name: "Adam Marzuk",
            title: "Développeur Full-Stack",
            description: "Étudiant en Bachelor Informatique, spécialisé dans le développement d'applications. Passionné par les technologies web modernes et l'intelligence artificielle.",
            location: "France",
            email: "contact@adam-marzuk.fr",
            profileImage: "/assets/images/profile.png",
            ctaButton1: "Découvrir mon profil",
            ctaButton2: "Me contacter",
            scrollText: "Scroll"
          }
          setHeroContent(defaultContent)
          setError(null)
        } else {
          setError('Erreur lors du chargement du contenu')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('Error fetching hero content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroContent()
  }, [])

  return {
    heroContent,
    loading,
    error
  }
}