'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, X, Plus, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Interface pour l'expérience
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
  order: number
}

// Interface pour le formulaire
interface ExperienceForm {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  technologies: string[]
  type: 'work' | 'education'
  order: number
}

const EditExperience = () => {
  const params = useParams()
  const experienceId = params.id as string
  
  const [experience, setExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState<ExperienceForm>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: [''],
    technologies: [],
    type: 'work',
    order: 0
  })
  
  const [techInput, setTechInput] = useState('')
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`/api/experiences/${experienceId}`)
        const data = await response.json()
        
        if (response.ok) {
          const exp = data.experience
          setExperience(exp)
          setFormData({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            startDate: exp.startDate?.split('T')[0] || '',
            endDate: exp.endDate?.split('T')[0] || '',
            description: exp.description || [],
            technologies: exp.technologies || [],
            type: exp.type,
            order: exp.order
          })
        } else {
          alert(`Error: ${data.error || 'Failed to load experience'}`)
        }
      } catch (error) {
        console.error('Error fetching experience:', error)
        alert('Network error')
      } finally {
        setInitialLoading(false)
      }
    }
    fetchExperience()
  }, [experienceId])

  // Ajouter une nouvelle description
  const addDescription = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }))
  }

  // Supprimer une description
  const removeDescription = (index: number) => {
    if (formData.description.length > 1) {
      setFormData(prev => ({
        ...prev,
        description: prev.description.filter((_, i) => i !== index)
      }))
    }
  }

  // Mettre à jour une description
  const updateDescription = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.map((desc, i) => i === index ? value : desc)
    }))
  }

  // Ajouter une technologie
  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  // Supprimer une technologie
  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation basique
    if (formData.description.some(desc => !desc.trim())) {
      setError('Toutes les descriptions doivent être remplies')
      setLoading(false)
      return
    }

    try {
      const submitData = {
        ...formData,
        description: formData.description.filter(desc => desc.trim()),
        endDate: formData.endDate || null
      }

      const response = await fetch(`/api/experiences/${experienceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/experiences')
      } else {
        setError(data.error || 'Failed to update experience')
      }
    } catch (_err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Supprimer l'expérience
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this experience? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/experiences/${experienceId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/experiences')
      } else {
        alert('Failed to delete experience')
      }
    } catch (_err) {
      alert('Network error')
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading experience...</div>
      </div>
    )
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Experience not found</div>
          <Link 
            href="/admin/experiences"
            className="text-blue-400 hover:text-blue-300"
          >
            Return to experiences
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/admin/experiences" 
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Retour aux expériences</span>
            </Link>
            
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500 rounded-lg text-red-400 hover:text-white transition-all duration-300"
            >
              <Trash2 size={16} />
              <span>Supprimer</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Modifier l&apos;Expérience
          </h1>
          <p className="text-white/70">
            {experience.title} - {experience.company}
          </p>
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
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-3">
                Type d&apos;expérience
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="work"
                    checked={formData.type === 'work'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'work' | 'education' }))}
                    className="text-blue-500"
                  />
                  <span className="text-white/90">Expérience professionnelle</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="education"
                    checked={formData.type === 'education'}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'work' | 'education' }))}
                    className="text-purple-500"
                  />
                  <span className="text-white/90">Formation</span>
                </label>
              </div>
            </div>

            {/* Titre */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
                {formData.type === 'work' ? 'Poste' : 'Diplôme'} *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Entreprise/École */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                {formData.type === 'work' ? 'Entreprise' : 'École'} *
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Lieu */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-2">
                Lieu *
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-white/80 mb-2">
                  Date de début *
                </label>
                <input
                  type="month"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-white/80 mb-2">
                  Date de fin
                </label>
                <input
                  type="month"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-white/60 text-sm mt-1">
                  Laisser vide si en cours
                </p>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Descriptions *
              </label>
              <div className="space-y-3">
                {formData.description.map((desc, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={desc}
                      onChange={(e) => updateDescription(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder={`Description ${index + 1}`}
                      rows={2}
                      required
                    />
                    {formData.description.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDescription(index)}
                        className="p-2 bg-red-500/20 hover:bg-red-500 rounded-lg transition-colors duration-300 text-white/70 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addDescription}
                className="mt-2 flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 text-white/70 hover:text-white text-sm"
              >
                <Plus size={14} />
                <span>Ajouter une description</span>
              </button>
            </div>

            {/* Technologies */}
            {formData.type === 'work' && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Technologies utilisées
                </label>
                
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="text-blue-300 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajouter une technologie..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors duration-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}


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
                href="/admin/experiences"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
              >
                <X size={16} />
                <span>Annuler</span>
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default EditExperience