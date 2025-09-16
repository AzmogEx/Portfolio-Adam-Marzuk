'use client'

import { motion } from 'framer-motion'
import { Save, Upload, RefreshCw, User, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HeroContentUpdateSchema, type HeroContentUpdateInput } from '@/lib/validators'
import { useToast } from '@/hooks/useToast'
import Toast from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

const HeroPage = () => {
  const [_heroContent, _setHeroContent] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const { toasts, showSuccess, showError, hideToast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty }
  } = useForm<HeroContentUpdateInput>({
    resolver: zodResolver(HeroContentUpdateSchema)
  })

  const formData = watch()

  // Charger le contenu existant
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('/api/hero')
        if (response.ok) {
          const data = await response.json()
          _setHeroContent(data)

          // Préremplir le formulaire
          Object.keys(data).forEach((key) => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              setValue(key as keyof HeroContentUpdateInput, data[key])
            }
          })
        } else if (response.status === 404) {
          // Pas de contenu existant, utiliser les valeurs par défaut
          const defaultValues = {
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

          Object.entries(defaultValues).forEach(([key, value]) => {
            setValue(key as keyof HeroContentUpdateInput, value)
          })
        }
      } catch (error) {
        console.error('Error fetching hero content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroContent()
  }, [setValue])

  const onSubmit = async (data: HeroContentUpdateInput) => {
    setSaving(true)
    try {
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedContent = await response.json()
        _setHeroContent(updatedContent)
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
      console.error('Error saving hero content:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setValue('profileImage', data.url, { shouldDirty: true })
        showSuccess('Image téléchargée avec succès!')
      } else {
        showError('Erreur lors du téléchargement de l\'image')
      }
    } catch (error) {
      showError('Erreur lors du téléchargement de l\'image')
      console.error('Error uploading image:', error)
    } finally {
      setImageUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement du contenu Hero...</div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Gestion du Hero</h1>
          <p className="text-white/70">Modifier le contenu de la section d&apos;accueil</p>
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
            {/* Image de profil */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Image de profil
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden bg-white/5 flex items-center justify-center">
                  {formData.profileImage ? (
                    <Image
                      src={formData.profileImage}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-white/50" size={32} />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image"
                    disabled={imageUploading}
                  />
                  <label
                    htmlFor="profile-image"
                    className={`flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-500/30 ${
                      imageUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {imageUploading ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    {imageUploading ? 'Upload...' : 'Changer'}
                  </label>
                </div>
              </div>
            </div>

            {/* Informations principales */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Salutation
                </label>
                <input
                  {...register('greeting')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Bonjour, je suis"
                />
                {errors.greeting && (
                  <p className="text-red-400 text-sm mt-1">{errors.greeting.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Nom complet
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
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre professionnel
              </label>
              <input
                {...register('title')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Développeur Full-Stack"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                placeholder="Description de votre profil..."
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Contact */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Localisation
                </label>
                <input
                  {...register('location')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="France"
                />
                {errors.location && (
                  <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
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
                  placeholder="contact@exemple.fr"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Boutons CTA */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Bouton principal
                </label>
                <input
                  {...register('ctaButton1')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Découvrir mon profil"
                />
                {errors.ctaButton1 && (
                  <p className="text-red-400 text-sm mt-1">{errors.ctaButton1.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Bouton secondaire
                </label>
                <input
                  {...register('ctaButton2')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Me contacter"
                />
                {errors.ctaButton2 && (
                  <p className="text-red-400 text-sm mt-1">{errors.ctaButton2.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Texte de scroll
              </label>
              <input
                {...register('scrollText')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="Scroll"
              />
              {errors.scrollText && (
                <p className="text-red-400 text-sm mt-1">{errors.scrollText.message}</p>
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

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-white/10">
              <div className="space-y-4">
                <p className="text-white/80 text-sm">{formData.greeting || "Bonjour, je suis"}</p>
                <h1 className="text-2xl lg:text-3xl font-bold gradient-text">
                  {formData.name || "Adam Marzuk"}
                </h1>
                <h2 className="text-lg lg:text-xl font-semibold text-white/90">
                  {formData.title || "Développeur Full-Stack"}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  {formData.description || "Description de votre profil..."}
                </p>

                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center text-white/60">
                    <span className="mr-2">📍</span>
                    <span>{formData.location || "France"}</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <span className="mr-2">✉️</span>
                    <span>{formData.email || "contact@exemple.fr"}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-white text-sm text-center border border-blue-400/30">
                    {formData.ctaButton1 || "Découvrir mon profil"}
                  </div>
                  <div className="px-4 py-2 border border-white/20 rounded-full text-white text-sm text-center">
                    {formData.ctaButton2 || "Me contacter"}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <span className="text-white/60 text-xs">
                    {formData.scrollText || "Scroll"}
                  </span>
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

export default HeroPage