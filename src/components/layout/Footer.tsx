'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useFooter } from '@/hooks/useFooter'

const Footer = () => {
  const { footerContent, loading, error } = useFooter()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // État d'erreur avec fallback
  if (error) {
    console.error('Footer content error:', error)
    // Continuer avec les valeurs par défaut en cas d'erreur
  }

  // Utiliser les données dynamiques ou fallback sur les valeurs par défaut
  const content = footerContent || {
    name: 'Adam Marzuk',
    description: 'Développeur Full-Stack passionné par l\'innovation et les technologies web modernes.',
    email: 'contact@adam-marzuk.fr',
    githubUrl: 'https://github.com/AzmogEx',
    linkedinUrl: 'https://www.linkedin.com/in/adam-marzuk-93804828a/',
    copyrightText: `© ${new Date().getFullYear()} Adam Marzuk. Tous droits réservés.`,
    quickLinks: [
      { name: 'Accueil', href: '#hero' },
      { name: 'À propos', href: '#about' },
      { name: 'Projets', href: '#projects' },
      { name: 'Parcours', href: '#experiences' },
      { name: 'Contact', href: '#contact' }
    ]
  }

  return (
    <footer className="bg-black/20 border-t border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">{content.name}</h3>
            <p className="text-white/70 max-w-sm">
              {content.description}
            </p>
          </motion.div>

          {/* Navigation rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <nav className="space-y-2">
              {content.quickLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-white/60 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${content.email}`}
                className="flex items-center text-white/60 hover:text-white transition-colors duration-300"
              >
                <Mail size={18} className="mr-3" />
                {content.email}
              </a>
              
              <div className="flex space-x-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Github size={20} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="text-center">
            <p className="text-white/50 text-sm">
              {content.copyrightText}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer