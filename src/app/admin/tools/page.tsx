'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, Edit, Trash2, Wrench, Search,
  Monitor, Globe, Database, Terminal,
  Palette, FileCode, Package, Zap,
  GitBranch, Cloud, Smartphone,
  Camera, Code2
} from 'lucide-react'
import Link from 'next/link'
import { Tool } from '@/types'
import { ApiService } from '@/lib/api'
import { ERROR_MESSAGES, LOADING_MESSAGES } from '@/lib/constants'

const ToolsPage = () => {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const fetchTools = async () => {
    try {
      const result = await ApiService.getTools()
      
      if (result.success && result.data) {
        setTools(result.data.tools)
      } else {
        setError(result.error || ERROR_MESSAGES.FETCH_TOOLS_FAILED)
      }
    } catch (_err) {
      setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTools()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'outil "${name}" ?`)) {
      return
    }

    try {
      const result = await ApiService.deleteTool(id)
      if (result.success) {
        setTools(tools.filter(tool => tool.id !== id))
      } else {
        alert(result.error || 'Erreur lors de la suppression')
      }
    } catch (_err) {
      alert('Erreur réseau')
    }
  }

  // Fonction pour obtenir l'icône basée sur le nom de l'outil
  const getToolIcon = (toolName: string, fallbackIcon: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      // Développement
      'React': <Code2 size={32} className="text-blue-400" />,
      'Next.js': <Globe size={32} className="text-white" />,
      'Vue.js': <Code2 size={32} className="text-green-400" />,
      'Angular': <Code2 size={32} className="text-red-400" />,
      'TypeScript': <FileCode size={32} className="text-blue-500" />,
      'JavaScript': <FileCode size={32} className="text-yellow-400" />,
      'Node.js': <Terminal size={32} className="text-green-500" />,
      'Python': <Terminal size={32} className="text-blue-400" />,
      'Java': <Terminal size={32} className="text-orange-500" />,
      
      // Bases de données
      'MongoDB': <Database size={32} className="text-green-600" />,
      'PostgreSQL': <Database size={32} className="text-blue-600" />,
      'MySQL': <Database size={32} className="text-orange-600" />,
      'Redis': <Database size={32} className="text-red-600" />,
      
      // Outils de développement
      'Git': <GitBranch size={32} className="text-orange-500" />,
      'GitHub': <GitBranch size={32} className="text-gray-400" />,
      'Docker': <Package size={32} className="text-blue-500" />,
      'VS Code': <Monitor size={32} className="text-blue-400" />,
      'Figma': <Palette size={32} className="text-purple-500" />,
      'Postman': <Zap size={32} className="text-orange-500" />,
      
      // Cloud et DevOps
      'AWS': <Cloud size={32} className="text-orange-400" />,
      'Azure': <Cloud size={32} className="text-blue-400" />,
      'Vercel': <Cloud size={32} className="text-white" />,
      'Netlify': <Cloud size={32} className="text-teal-400" />,
      
      // Mobile
      'React Native': <Smartphone size={32} className="text-blue-400" />,
      'Flutter': <Smartphone size={32} className="text-blue-600" />,
      
      // Autres
      'Photoshop': <Camera size={32} className="text-blue-600" />,
      'Illustrator': <Palette size={32} className="text-orange-600" />,
      'Premiere Pro': <Camera size={32} className="text-purple-600" />,
    }
    
    // Recherche par nom exact ou par mots-clés
    const normalizedName = toolName.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
        return icon
      }
    }
    
    // Fallback vers l'emoji original si aucune correspondance
    return <span className="text-3xl">{fallbackIcon}</span>
  }


  // Filtrage et recherche
  const categories = ['all', ...Array.from(new Set(tools.map(tool => tool.category)))]
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-white text-xl">{LOADING_MESSAGES.LOADING_TOOLS}</div>
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
            <Wrench className="text-blue-400" size={32} />
            Gestion des Outils
          </h1>
          <p className="text-white/70">Gérez vos outils de travail et technologies</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white transition-all duration-300"
        >
          <Plus size={16} />
          Nouvel outil
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
              placeholder="Rechercher un outil..."
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
          {filteredTools.length} outil{filteredTools.length !== 1 ? 's' : ''} trouvé{filteredTools.length !== 1 ? 's' : ''}
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

      {/* Liste des outils */}
      {filteredTools.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-12 text-center"
        >
          <Wrench className="mx-auto text-white/30 mb-4" size={48} />
          <h3 className="text-xl font-medium text-white/80 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'Aucun outil trouvé' : 'Aucun outil'}
          </h3>
          <p className="text-white/60 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre premier outil'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <Link
              href="/admin/tools/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
            >
              <Plus size={16} />
              Ajouter un outil
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
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex justify-center items-center">{getToolIcon(tool.name, tool.icon)}</div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/tools/${tool.id}`}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 transition-colors"
                  >
                    <Edit size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(tool.id, tool.name)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
              
              <div className="mb-3">
                <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded">
                  {tool.category}
                </span>
              </div>

              {tool.description && (
                <p className="text-white/70 text-sm">{tool.description}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default ToolsPage