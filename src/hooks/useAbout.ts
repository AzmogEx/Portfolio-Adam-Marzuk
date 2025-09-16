import { useState, useEffect } from 'react'

interface AboutContent {
  id: string
  sectionTitle: string
  sectionSubtitle: string
  parcourTitle: string
  parcourText1: string
  parcourText2: string
  skillsTitle: string
}

export const useAbout = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/about?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          console.log('useAbout - API response success:', data)
          setAboutContent(data)
          setError(null)
        } else if (response.status === 404) {
          // Pas de contenu trouvé, utiliser les valeurs par défaut
          const defaultContent: AboutContent = {
            id: 'default',
            sectionTitle: "À propos de moi",
            sectionSubtitle: "Découvrez mon parcours, mes compétences et ma passion pour l'informatique",
            parcourTitle: "Mon parcours",
            parcourText1: "Étudiant en Bachelor informatique au CESI Orléans je me spécialise dans le développement d'applications. Ma passion pour les technologies web et l'intelligence artificielle m'a conduit à explorer diverses technologies et frameworks modernes.",
            parcourText2: "J'ai acquis une expérience pratique grâce à des stages en entreprise et des projets personnels, me permettant de développer une approche complète du développement full-stack.",
            skillsTitle: "Compétences principales"
          }
          setAboutContent(defaultContent)
          setError(null)
        } else {
          setError('Erreur lors du chargement du contenu')
        }
      } catch (err) {
        setError('Erreur de connexion')
        console.error('useAbout - Error fetching about content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  return {
    aboutContent,
    loading,
    error
  }
}