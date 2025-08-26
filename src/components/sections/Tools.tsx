'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Tool, SoftSkill } from '@/types'
import { ApiService } from '@/lib/api'
import { 
  Wrench, Heart, Code2, Users, 
  Monitor, Globe, Database, Terminal,
  Palette, FileCode, Package, Zap,
  GitBranch, Cloud, Shield, Smartphone,
  Layers, Settings, Cpu, HardDrive,
  Camera, Headphones, MessageSquare, Users2,
  Target, Lightbulb, CheckCircle, Clock,
  TrendingUp, Award, Star, Puzzle
} from 'lucide-react'

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([])
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([])
  const [loading, setLoading] = useState(true)

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

  // Fonction pour obtenir l'icône des soft skills
  const getSoftSkillIcon = (skillName: string, fallbackIcon: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Communication': <MessageSquare size={24} className="text-blue-400" />,
      'Travail d\'équipe': <Users2 size={24} className="text-green-400" />,
      'Leadership': <Award size={24} className="text-purple-400" />,
      'Adaptabilité': <TrendingUp size={24} className="text-orange-400" />,
      'Gestion du temps': <Clock size={24} className="text-red-400" />,
      'Résolution de problèmes': <Puzzle size={24} className="text-yellow-400" />,
      'Créativité': <Lightbulb size={24} className="text-pink-400" />,
      'Organisation': <CheckCircle size={24} className="text-teal-400" />,
      'Motivation': <Target size={24} className="text-indigo-400" />,
      'Excellence': <Star size={24} className="text-yellow-500" />,
    }
    
    const normalizedName = skillName.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
        return icon
      }
    }
    
    return <span className="text-2xl">{fallbackIcon}</span>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toolsResult, skillsResult] = await Promise.all([
          ApiService.getTools(),
          ApiService.getSoftSkills()
        ])
        
        if (toolsResult.success && toolsResult.data) {
          setTools(toolsResult.data.tools.sort((a, b) => a.order - b.order))
        }
        
        if (skillsResult.success && skillsResult.data) {
          setSoftSkills(skillsResult.data.softSkills.sort((a, b) => a.order - b.order))
        }
      } catch (error) {
        console.error('Erreur lors du chargement des outils et compétences:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Fonction pour obtenir la couleur selon le niveau de maîtrise
  const getLevelColor = (level: Tool['level'] | SoftSkill['level']) => {
    switch (level) {
      case 'expert':
        return 'from-green-500 to-green-600'
      case 'advanced':
        return 'from-blue-500 to-blue-600'
      case 'intermediate':
        return 'from-yellow-500 to-yellow-600'
      case 'beginner':
        return 'from-gray-500 to-gray-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  // Fonction pour obtenir l'intensité de la bordure selon le niveau
  const getLevelBorder = (level: Tool['level'] | SoftSkill['level']) => {
    switch (level) {
      case 'expert':
        return 'border-green-400/60'
      case 'advanced':
        return 'border-blue-400/60'
      case 'intermediate':
        return 'border-yellow-400/60'
      case 'beginner':
        return 'border-gray-400/60'
      default:
        return 'border-gray-400/60'
    }
  }

  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Outils & <span className="gradient-text">Méthodes</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez mes outils de travail quotidiens et mes compétences relationnelles
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-white text-xl">Chargement des outils et compétences...</div>
          </div>
        ) : (
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Outils de travail */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Wrench className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Outils de travail</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`glass-card p-4 text-center hover:shadow-lg transition-all duration-300 border ${getLevelBorder(tool.level)} group cursor-pointer`}
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {getToolIcon(tool.name, tool.icon)}
                  </div>
                  <h4 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                    {tool.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Soft Skills</h3>
            </div>
            
            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`glass-card p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 border ${getLevelBorder(skill.level)} group cursor-pointer`}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {getSoftSkillIcon(skill.name, skill.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        )}

        {/* Section informative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="glass-card p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Code2 className="text-white" size={28} />
              </div>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Workflow optimisé</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              J'utilise des outils modernes pour optimiser ma productivité et collaborer efficacement 
              avec les équipes de développement.
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Users className="text-white" size={28} />
              </div>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Esprit d'équipe</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Ma capacité d'adaptation et ma communication bienveillante me permettent de m'intégrer 
              facilement dans n'importe quelle équipe.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Tools