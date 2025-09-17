'use client'

import { motion } from 'framer-motion'
import { Save, Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FooterContentUpdateSchema, type FooterContentUpdateInput } from '@/lib/validators'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'

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

const FooterPage = () => {
  const [_footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toasts, showSuccess, showError, hideToast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FooterContentUpdateInput>({
    resolver: zodResolver(FooterContentUpdateSchema),
    defaultValues: {
      quickLinks: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quickLinks'
  })

  // Charger le contenu existant
  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetch('/api/footer')
        if (response.ok) {
          const data = await response.json()
          setFooterContent(data)

          // Préremplir le formulaire
          setValue('name', data.name)
          setValue('description', data.description)
          setValue('email', data.email)
          setValue('githubUrl', data.githubUrl)
          setValue('linkedinUrl', data.linkedinUrl)
          setValue('copyrightText', data.copyrightText)
          setValue('quickLinks', data.quickLinks || [])
        } else if (response.status === 404) {
          // Pas de contenu existant, utiliser les valeurs par défaut
          const defaultValues = {
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

          Object.entries(defaultValues).forEach(([key, value]) => {
            setValue(key as keyof FooterContentUpdateInput, value)
          })
        }
      } catch (error) {
        console.error('Error fetching footer content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterContent()
  }, [setValue])

  const onSubmit = async (data: FooterContentUpdateInput) => {
    setSaving(true)
    try {
      const response = await fetch('/api/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedContent = await response.json()
        setFooterContent(updatedContent)
        showSuccess('Contenu du footer mis à jour avec succès!')

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
      console.error('Error saving footer content:', error)
    } finally {
      setSaving(false)
    }
  }

  const addQuickLink = () => {
    append({ name: '', href: '' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement du contenu Footer...</div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Gestion du Footer</h1>
          <p className="text-white/70">Modifier le contenu du pied de page</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations générales */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nom
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Adam Marzuk"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="contact@adam-marzuk.fr"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
              placeholder="Description du développeur..."
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Liens sociaux */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                URL GitHub
              </label>
              <input
                {...register('githubUrl')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="https://github.com/username"
              />
              {errors.githubUrl && (
                <p className="text-red-400 text-sm mt-1">{errors.githubUrl.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                URL LinkedIn
              </label>
              <input
                {...register('linkedinUrl')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedinUrl && (
                <p className="text-red-400 text-sm mt-1">{errors.linkedinUrl.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Texte de copyright
            </label>
            <input
              {...register('copyrightText')}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="© 2024 Adam Marzuk. Tous droits réservés."
            />
            {errors.copyrightText && (
              <p className="text-red-400 text-sm mt-1">{errors.copyrightText.message}</p>
            )}
          </div>

          {/* Liens rapides */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-white/80">
                Liens rapides
              </label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={addQuickLink}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg transition-all duration-300 hover:bg-blue-500/30"
              >
                <Plus size={16} />
                Ajouter un lien
              </motion.button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      {...register(`quickLinks.${index}.name`)}
                      placeholder="Nom du lien"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      {...register(`quickLinks.${index}.href`)}
                      placeholder="#section ou URL"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 bg-red-500/20 text-red-300 rounded-lg transition-all duration-300 hover:bg-red-500/30"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              ))}
            </div>
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
                <Save size={16} className="animate-spin" />
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

export default FooterPage