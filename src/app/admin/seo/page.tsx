'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Save, Plus, Trash2, Search, Globe, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSeoSettings } from '@/hooks/useSeoSettings'

const SeoSettingsPage = () => {
  const router = useRouter()
  const { seoSettings, loading, error, updateSeoSettings } = useSeoSettings()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: [] as string[],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    googleAnalyticsId: '',
    structuredData: '',
    robotsMeta: 'index,follow',
    canonicalUrl: ''
  })

  const [newKeyword, setNewKeyword] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (seoSettings) {
      setFormData({
        title: seoSettings.title || '',
        description: seoSettings.description || '',
        keywords: seoSettings.keywords || [],
        ogTitle: seoSettings.ogTitle || '',
        ogDescription: seoSettings.ogDescription || '',
        ogImage: seoSettings.ogImage || '',
        googleAnalyticsId: seoSettings.googleAnalyticsId || '',
        structuredData: seoSettings.structuredData || '',
        robotsMeta: seoSettings.robotsMeta || 'index,follow',
        canonicalUrl: seoSettings.canonicalUrl || ''
      })
    }
  }, [seoSettings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateSeoSettings(formData)

      // Toast notification et redirection
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = 'Paramètres SEO mis à jour avec succès !'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
        router.push('/admin')
      }, 2000)
    } catch (error) {
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      toast.textContent = 'Erreur lors de la mise à jour'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
      }, 3000)
    } finally {
      setSaving(false)
    }
  }

  const addKeyword = () => {
    if (newKeyword && !formData.keywords.includes(newKeyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement des paramètres SEO...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Search className="text-blue-400" size={32} />
              Paramètres SEO
            </h1>
            <p className="text-white/70">Configuration du référencement et des métadonnées</p>
          </div>
        </div>
      </motion.div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Métadonnées principales */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Métadonnées principales</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">
                Titre de la page (Title)
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Adam Marzuk - Portfolio"
                required
              />
              <p className="text-white/60 text-xs mt-1">
                Recommandé : 50-60 caractères
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/90 mb-2">
                Description (Meta Description)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                rows={3}
                placeholder="Développeur Full-Stack passionné par l'innovation..."
                required
              />
              <p className="text-white/60 text-xs mt-1">
                Recommandé : 150-160 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Mots-clés (Keywords)
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="Ajouter un mot-clé"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Ajouter
                  </button>
                </div>

                {formData.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center bg-white/10 px-3 py-2 rounded-lg">
                        <span className="text-white/90 text-sm">{keyword}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* OpenGraph */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">OpenGraph (Réseaux sociaux)</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="ogTitle" className="block text-sm font-medium text-white/90 mb-2">
                Titre OpenGraph
              </label>
              <input
                type="text"
                id="ogTitle"
                value={formData.ogTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Titre pour les réseaux sociaux"
              />
            </div>

            <div>
              <label htmlFor="ogDescription" className="block text-sm font-medium text-white/90 mb-2">
                Description OpenGraph
              </label>
              <textarea
                id="ogDescription"
                value={formData.ogDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, ogDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                rows={2}
                placeholder="Description pour les réseaux sociaux"
              />
            </div>

            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium text-white/90 mb-2">
                Image OpenGraph (URL)
              </label>
              <input
                type="url"
                id="ogImage"
                value={formData.ogImage}
                onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Technique */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Analytics & Technique</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-white/90 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                id="googleAnalyticsId"
                value={formData.googleAnalyticsId}
                onChange={(e) => setFormData(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <label htmlFor="robotsMeta" className="block text-sm font-medium text-white/90 mb-2">
                Robots Meta
              </label>
              <select
                id="robotsMeta"
                value={formData.robotsMeta}
                onChange={(e) => setFormData(prev => ({ ...prev, robotsMeta: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="index,follow">index,follow</option>
                <option value="index,nofollow">index,nofollow</option>
                <option value="noindex,follow">noindex,follow</option>
                <option value="noindex,nofollow">noindex,nofollow</option>
              </select>
            </div>

            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-medium text-white/90 mb-2">
                URL Canonique
              </label>
              <input
                type="url"
                id="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="https://adam-marzuk.fr"
              />
            </div>

            <div>
              <label htmlFor="structuredData" className="block text-sm font-medium text-white/90 mb-2">
                Données Structurées (JSON-LD)
              </label>
              <textarea
                id="structuredData"
                value={formData.structuredData}
                onChange={(e) => setFormData(prev => ({ ...prev, structuredData: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-mono text-sm"
                rows={6}
                placeholder='{"@context": "https://schema.org", "@type": "Person", ...}'
              />
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            <Save size={20} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SeoSettingsPage