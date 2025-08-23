'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, ExternalLink, Github, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image: string | null
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      
      if (response.ok) {
        setProjects(data.projects)
      } else {
        setError('Failed to fetch projects')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id))
      } else {
        alert('Failed to delete project')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  const handleLogout = async () => {
    if (!confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) return
    
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      alert('Erreur lors de la déconnexion')
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">Gérez votre portfolio et vos expériences</p>
            <p className="text-white/50 text-sm mt-1">👤 Connecté en tant que <span className="text-blue-400">Azmog</span></p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/admin/projects/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300"
              >
                <Plus size={16} />
                <span>New Project</span>
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-all duration-300"
              >
                <ExternalLink size={16} />
                <span>View Site</span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Section Projets */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Projets</h2>
                  <p className="text-white/70 text-sm">Gérez vos réalisations</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-blue-400">💼</span>
                  <span className="text-white/70 text-sm">{projects.length} projet{projects.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <Link
                href="/admin/projects/new"
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-300"
              >
                <Plus size={16} />
                <span>Nouveau projet</span>
              </Link>
            </div>

            {/* Section Expériences */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Expériences</h2>
                  <p className="text-white/70 text-sm">Gérez votre parcours</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-purple-400">🎓</span>
                </div>
              </div>
              <Link
                href="/admin/experiences"
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 hover:text-purple-300 transition-all duration-300"
              >
                <Settings size={16} />
                <span>Gérer les expériences</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card group hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 overflow-hidden">
                {project.image ? (
                  <div className="w-full h-full relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/10 text-white/90 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 text-white/90 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <Link href={`/admin/projects/${project.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm rounded transition-colors"
                  >
                    <Edit2 size={12} />
                    Edit
                  </motion.button>
                </Link>
                
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 text-sm rounded transition-colors"
                  >
                    <Github size={12} />
                    Code
                  </motion.a>
                )}
                
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm rounded transition-colors"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </motion.a>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteProject(project.id, project.title)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors ml-auto"
                >
                  <Trash2 size={12} />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-white/50 text-lg mb-4">No projects found</div>
            <Link href="/admin/projects/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-300"
              >
                <Plus size={16} />
                Create Your First Project
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard