'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, X, ArrowLeft, Wrench } from 'lucide-react'
import Link from 'next/link'
import { ApiService } from '@/lib/api'
import { Tool } from '@/types'

interface ToolForm {
  name: string
  category: string
  level: Tool['level']
  icon: string
  description: string
  order: number
}

const NewTool = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<ToolForm>({
    name: '',
    category: '',
    level: 'intermediate',
    icon: '',
    description: '',
    order: 0
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Catégories prédéfinies
  const categories = [
    'editor', 'collaboration', 'testing', 'devops', 'database', 
    'design', 'deployment', 'monitoring', 'communication', 'other'
  ]

  // Icônes populaires pour les outils
  const popularIcons = [
    '💻', '🔧', '⚙️', '🛠️', '📬', '🧪', '🐙', '🎨', 
    '🚀', '🌐', '💬', '🔍', '📊', '🐳', '📝', '🎮',
    '🧠', '⚡', '🦊', '📋', '🌲', '🔄', '📅'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation basique
    if (!formData.name.trim() || !formData.category || !formData.icon) {
      setError('Veuillez remplir tous les champs obligatoires')
      setLoading(false)
      return
    }

    try {
      const result = await ApiService.createTool({
        ...formData,
        description: formData.description || null
      })

      if (result.success) {
        router.push('/admin/tools')
      } else {
        setError(result.error || 'Erreur lors de la création de l\'outil')
      }
    } catch (_err) {
      setError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/admin/tools" 
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour aux outils</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Wrench className="text-blue-400" size={32} />
          Nouvel Outil
        </h1>
        <p className="text-white/70">Ajoutez un nouvel outil à votre boîte à outils</p>
      </motion.div>

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8"
      >
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de l'outil */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Nom de l&apos;outil *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ex: VS Code, GitHub, Docker..."
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
              Catégorie *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" className="bg-slate-800">Sélectionnez une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>


          {/* Icône */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Icône *
            </label>
            <div className="grid grid-cols-8 gap-3 mb-4">
              {popularIcons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-3 rounded-lg border transition-all duration-200 text-2xl ${
                    formData.icon === icon
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ou tapez votre propre emoji/icône..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
              Description (optionnelle)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Description de l&apos;outil et de son utilisation..."
              rows={3}
            />
          </div>

          {/* Ordre */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-white/80 mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
            <p className="text-white/60 text-sm mt-1">
              0 = Ordre automatique selon la date de création
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{loading ? 'Création...' : 'Créer l\'outil'}</span>
            </button>

            <Link
              href="/admin/tools"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
            >
              <X size={16} />
              <span>Annuler</span>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default NewTool