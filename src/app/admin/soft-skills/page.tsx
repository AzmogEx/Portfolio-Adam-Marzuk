'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Heart, Search } from 'lucide-react'
import Link from 'next/link'
import { SoftSkill } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, LOADING_MESSAGES } from '@/lib/constants'

const SoftSkillsPage = () => {
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const fetchSoftSkills = async () => {
    try {
      const result = await ApiService.getSoftSkills()
      
      if (result.success && result.data) {
        setSoftSkills(result.data.softSkills)
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_SOFT_SKILLS_FAILED)
      }
    } catch (_err) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSoftSkills()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la compétence "${name}" ?`)) {
      return
    }

    try {
      const result = await ApiService.deleteSoftSkill(id)
      if (result.success) {
        setSoftSkills(softSkills.filter(skill => skill.id !== id))
      } else {
        alert(result.error || 'Erreur lors de la suppression')
      }
    } catch (_err) {
      alert('Erreur réseau')
    }
  }


  // Filtrage et recherche
  const categories = ['all', ...Array.from(new Set(softSkills.map(skill => skill.category)))]
  const filteredSoftSkills = softSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">{LOADING_MESSAGES.LOADING_SOFT_SKILLS}</div>
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
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Heart className="text-blue-400" size={32} />
            Gestion des Soft Skills
          </h1>
          <p className="text-white/70">Gérez vos compétences interpersonnelles et qualités personnelles</p>
        </div>
        <Link
          href="/admin/soft-skills/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300"
        >
          <Plus size={16} />
          Nouvelle compétence
        </Link>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <input
              type="text"
              placeholder="Rechercher une compétence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtre par catégorie */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-slate-800">
                {category === 'all' ? 'Toutes les catégories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-white/70">
          {filteredSoftSkills.length} compétence{filteredSoftSkills.length !== 1 ? 's' : ''} trouvée{filteredSoftSkills.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border border-red-500/30 bg-red-500/10"
        >
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Liste des soft skills */}
      {filteredSoftSkills.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-12 text-center"
        >
          <Heart className="mx-auto text-white/30 mb-4" size={48} />
          <h3 className="text-xl font-medium text-white/80 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'Aucune compétence trouvée' : 'Aucune compétence'}
          </h3>
          <p className="text-white/60 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre première compétence'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <Link
              href="/admin/soft-skills/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
            >
              <Plus size={16} />
              Ajouter une compétence
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSoftSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{skill.icon}</div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/soft-skills/${skill.id}`}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors"
                  >
                    <Edit size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id, skill.name)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-white mb-2">{skill.name}</h3>
              
              <div className="mb-3">
                <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded">
                  {skill.category}
                </span>
              </div>

              {skill.description && (
                <p className="text-white/70 text-sm">{skill.description}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default SoftSkillsPage