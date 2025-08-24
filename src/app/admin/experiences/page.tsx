'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Calendar, MapPin, Building, GraduationCap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Interface pour les expériences
interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string | null
  description: string[]
  technologies: string[]
  type: 'work' | 'education'
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'work' | 'education'>('all')
  const _router = useRouter()

  // Fonction pour récupérer les expériences
  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/experiences')
      const data = await response.json()
      
      if (response.ok) {
        setExperiences(data.experiences)
        setError('')
      } else {
        setError('Failed to fetch experiences')
      }
    } catch (_err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  // Supprimer une expérience
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ? Cette action est irréversible.`)) {
      return
    }

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchExperiences() // Recharger la liste
      } else {
        alert('Failed to delete experience')
      }
    } catch (_err) {
      alert('Network error')
    }
  }

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    const monthNames = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
      'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  // Filtrer les expériences selon le type sélectionné
  const filteredExperiences = experiences.filter(exp => {
    if (filterType === 'all') return true
    return exp.type === filterType
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading experiences...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin" 
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Retour au dashboard</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Gestion des Expériences
              </h1>
              <p className="text-white/70">
                Gérez vos expériences professionnelles et votre formation
              </p>
            </div>

            <Link
              href="/admin/experiences/new"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300"
            >
              <Plus size={16} />
              <span>Nouvelle expérience</span>
            </Link>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-4">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                filterType === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Toutes ({experiences.length})
            </button>
            <button
              onClick={() => setFilterType('work')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                filterType === 'work'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Building size={16} />
              Expériences ({experiences.filter(exp => exp.type === 'work').length})
            </button>
            <button
              onClick={() => setFilterType('education')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                filterType === 'education'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <GraduationCap size={16} />
              Formation ({experiences.filter(exp => exp.type === 'education').length})
            </button>
          </div>
        </motion.div>

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Liste des expériences */}
        <div className="grid gap-6">
          {filteredExperiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white/70 text-lg mb-4">
                {filterType === 'all' 
                  ? 'Aucune expérience disponible'
                  : `Aucune ${filterType === 'work' ? 'expérience professionnelle' : 'formation'} disponible`
                }
              </div>
              <Link
                href="/admin/experiences/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300"
              >
                <Plus size={16} />
                <span>Créer la première expérience</span>
              </Link>
            </motion.div>
          ) : (
            filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20">
                      {exp.type === 'work' ? (
                        <Building className="text-blue-400" size={20} />
                      ) : (
                        <GraduationCap className="text-purple-400" size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                      <p className={`font-medium mb-2 ${exp.type === 'work' ? 'text-blue-400' : 'text-purple-400'}`}>
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {exp.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        Mis en avant
                      </span>
                    )}
                    
                    <Link
                      href={`/admin/experiences/${exp.id}`}
                      className="p-2 bg-white/10 hover:bg-blue-500 rounded-lg transition-colors duration-300 text-white/70 hover:text-white"
                      title="Modifier"
                    >
                      <Edit2 size={16} />
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(exp.id, exp.title)}
                      className="p-2 bg-white/10 hover:bg-red-500 rounded-lg transition-colors duration-300 text-white/70 hover:text-white"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="mb-4">
                  <ul className="space-y-1">
                    {exp.description.slice(0, 2).map((desc, i) => (
                      <li key={i} className="text-white/80 text-sm">
                        • {desc}
                      </li>
                    ))}
                    {exp.description.length > 2 && (
                      <li className="text-white/60 text-sm">
                        ... et {exp.description.length - 2} autre{exp.description.length > 3 ? 's' : ''}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Technologies */}
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 5 && (
                      <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-md">
                        +{exp.technologies.length - 5} autres
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminExperiences