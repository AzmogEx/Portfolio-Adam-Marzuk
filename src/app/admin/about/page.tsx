'use client'

import { motion } from 'framer-motion'
import { Save, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AboutContentUpdateSchema, type AboutContentUpdateInput } from '@/lib/validators'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'

interface AboutContent {
  id: string
  sectionTitle: string
  sectionSubtitle: string
  parcourTitle: string
  parcourText1: string
  parcourText2: string
  skillsTitle: string
}

const AboutPage = () => {
  const [_aboutContent, _setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toasts, showSuccess, showError, hideToast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<AboutContentUpdateInput>({
    resolver: zodResolver(AboutContentUpdateSchema)
  })

  const formData = watch()

  // Charger le contenu existant
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('/api/about')
        if (response.ok) {
          const data = await response.json()
          _setAboutContent(data)

          // Préremplir le formulaire
          Object.keys(data).forEach((key) => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              setValue(key as keyof AboutContentUpdateInput, data[key])
            }
          })
        } else if (response.status === 404) {
          // Pas de contenu existant, utiliser les valeurs par défaut
          const defaultValues = {
            sectionTitle: "À propos de moi",
            sectionSubtitle: "Découvrez mon parcours, mes compétences et ma passion pour l'informatique",
            parcourTitle: "Mon parcours",
            parcourText1: "Étudiant en Bachelor informatique au CESI Orléans je me spécialise dans le développement d'applications. Ma passion pour les technologies web et l'intelligence artificielle m'a conduit à explorer diverses technologies et frameworks modernes.",
            parcourText2: "J'ai acquis une expérience pratique grâce à des stages en entreprise et des projets personnels, me permettant de développer une approche complète du développement full-stack.",
            skillsTitle: "Compétences principales"
          }

          Object.entries(defaultValues).forEach(([key, value]) => {
            setValue(key as keyof AboutContentUpdateInput, value)
          })
        }
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutContent()
  }, [setValue])

  const onSubmit = async (data: AboutContentUpdateInput) => {
    setSaving(true)
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedContent = await response.json()
        _setAboutContent(updatedContent)
        showSuccess('Contenu mis à jour avec succès!')

        // Redirection vers l'admin après 1.5 secondes
        setTimeout(() => {
          router.push('/admin')
        }, 1500)
      } else {
        const error = await response.json()
        showError('Erreur: ' + (error.error || 'Erreur inconnue'))
      }
    } catch (error) {
      showError('Erreur lors de la sauvegarde')
      console.error('Error saving about content:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement du contenu About...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestion de la section À propos</h1>
          <p className="text-white/70">Modifier le contenu de la section à propos de moi</p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              showPreview
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
            }`}
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Masquer aperçu' : 'Aperçu'}
          </motion.button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-card p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Titre de section */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre principal de la section
              </label>
              <input
                {...register('sectionTitle')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="À propos de moi"
              />
              {errors.sectionTitle && (
                <p className="text-red-400 text-sm mt-1">{errors.sectionTitle.message}</p>
              )}
            </div>

            {/* Sous-titre de section */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Sous-titre de la section
              </label>
              <textarea
                {...register('sectionSubtitle')}
                rows={2}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                placeholder="Découvrez mon parcours, mes compétences et ma passion pour l'informatique"
              />
              {errors.sectionSubtitle && (
                <p className="text-red-400 text-sm mt-1">{errors.sectionSubtitle.message}</p>
              )}
            </div>

            {/* Titre du parcours */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre du parcours
              </label>
              <input
                {...register('parcourTitle')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Mon parcours"
              />
              {errors.parcourTitle && (
                <p className="text-red-400 text-sm mt-1">{errors.parcourTitle.message}</p>
              )}
            </div>

            {/* Premier paragraphe du parcours */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Premier paragraphe du parcours
              </label>
              <textarea
                {...register('parcourText1')}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                placeholder="Décrivez votre formation et votre spécialisation..."
              />
              {errors.parcourText1 && (
                <p className="text-red-400 text-sm mt-1">{errors.parcourText1.message}</p>
              )}
            </div>

            {/* Deuxième paragraphe du parcours */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Deuxième paragraphe du parcours
              </label>
              <textarea
                {...register('parcourText2')}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                placeholder="Parlez de votre expérience pratique et de votre approche..."
              />
              {errors.parcourText2 && (
                <p className="text-red-400 text-sm mt-1">{errors.parcourText2.message}</p>
              )}
            </div>

            {/* Titre des compétences */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre de la section compétences
              </label>
              <input
                {...register('skillsTitle')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Compétences principales"
              />
              {errors.skillsTitle && (
                <p className="text-red-400 text-sm mt-1">{errors.skillsTitle.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: !saving ? 1.02 : 1 }}
              whileTap={{ scale: !saving ? 0.98 : 1 }}
              type="submit"
              disabled={saving}
              className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                !saving
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Sauvegarder les modifications
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Aperçu */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Aperçu en temps réel</h2>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-white/10 space-y-6">
              {/* En-tête de section */}
              <div className="text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {formData.sectionTitle?.includes('moi') ? (
                    <>
                      {formData.sectionTitle?.split(' moi')[0]} <span className="gradient-text">moi</span>
                    </>
                  ) : (
                    formData.sectionTitle || "À propos de moi"
                  )}
                </h2>
                <p className="text-white/70 text-sm">
                  {formData.sectionSubtitle || "Découvrez mon parcours, mes compétences et ma passion pour l'informatique"}
                </p>
              </div>

              {/* Contenu principal */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">
                    {formData.parcourTitle || "Mon parcours"}
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white/80 text-sm leading-relaxed">
                      {formData.parcourText1 || "Étudiant en Bachelor informatique au CESI Orléans je me spécialise dans le développement d'applications. Ma passion pour les technologies web et l'intelligence artificielle m'a conduit à explorer diverses technologies et frameworks modernes."}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {formData.parcourText2 || "J'ai acquis une expérience pratique grâce à des stages en entreprise et des projets personnels, me permettant de développer une approche complète du développement full-stack."}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 text-center">
                    {formData.skillsTitle || "Compétences principales"}
                  </h3>
                  <div className="text-center">
                    <div className="inline-flex flex-wrap gap-2 justify-center">
                      {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                    <p className="text-white/50 text-xs mt-3">
                      [Les compétences sont gérées séparément dans le nuage de compétences]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default AboutPage