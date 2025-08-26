'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, X, ArrowLeft, Trash2, Heart } from 'lucide-react'
import Link from 'next/link'
import { ApiService } from '@/lib/api'
import { SoftSkill } from '@/types'

interface SoftSkillForm {
  name: string
  category: string
  level: SoftSkill['level']
  icon: string
  description: string
  order: number
}

const EditSoftSkill = () => {
  const params = useParams()
  const router = useRouter()
  const skillId = params.id as string
  
  const [softSkill, setSoftSkill] = useState<SoftSkill | null>(null)
  const [formData, setFormData] = useState<SoftSkillForm>({
    name: '',
    category: '',
    level: 'intermediate',
    icon: '',
    description: '',
    order: 0
  })
  
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Catégories prédéfinies pour les soft skills
  const categories = [
    'communication', 'leadership', 'teamwork', 'problem-solving', 'creativity', 
    'adaptability', 'time-management', 'emotional-intelligence', 'critical-thinking', 'other'
  ]

  // Icônes populaires pour les soft skills
  const popularIcons = [
    '💬', '🧠', '👥', '💡', '🎯', '⚡', '🤝', '💪', 
    '🎨', '🔍', '⏰', '🏆', '📚', '🌟', '❤️', '🔥',
    '🎪', '🌈', '🚀', '🎭', '✨', '🌸', '🦋'
  ]

  useEffect(() => {
    const fetchSoftSkill = async () => {
      try {
        const result = await ApiService.getSoftSkill(skillId)
        
        if (result.success && result.data) {
          const skillData = result.data.softSkill
          setSoftSkill(skillData)
          setFormData({
            name: skillData.name,
            category: skillData.category,
            level: skillData.level,
            icon: skillData.icon,
            description: skillData.description || '',
            order: skillData.order
          })
        } else {
          setError(result.error || 'Compétence introuvable')
        }
      } catch (_err) {
        setError('Erreur réseau')
      } finally {
        setInitialLoading(false)
      }
    }
    
    fetchSoftSkill()
  }, [skillId])

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
      const result = await ApiService.updateSoftSkill(skillId, {
        ...formData,
        description: formData.description || null
      })

      if (result.success) {
        router.push('/admin/soft-skills')
      } else {
        setError(result.error || 'Erreur lors de la mise à jour de la compétence')
      }
    } catch (_err) {
      setError('Erreur réseau. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la compétence "${softSkill?.name}" ? Cette action est irréversible.`)) {
      return
    }

    try {
      const result = await ApiService.deleteSoftSkill(skillId)
      if (result.success) {
        router.push('/admin/soft-skills')
      } else {
        alert(result.error || 'Erreur lors de la suppression')
      }
    } catch (_err) {
      alert('Erreur réseau')
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">Chargement de la compétence...</div>
      </div>
    )
  }

  if (!softSkill) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Compétence introuvable</div>
          <Link 
            href="/admin/soft-skills"
            className="text-blue-400 hover:text-blue-300"
          >
            Retour aux compétences
          </Link>
        </div>
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
      >
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/admin/soft-skills" 
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour aux compétences</span>
          </Link>
          
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500 rounded-lg text-red-400 hover:text-white transition-all duration-300"
          >
            <Trash2 size={16} />
            <span>Supprimer</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Heart className="text-blue-400" size={32} />
          Modifier la Compétence
        </h1>
        <p className="text-white/70">{softSkill.name}</p>
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
          {/* Nom de la compétence */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Nom de la compétence *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>

            <Link
              href="/admin/soft-skills"
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

export default EditSoftSkill