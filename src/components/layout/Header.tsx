'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#about' },
    { name: 'Outils', href: '#tools' },
    { name: 'Projets', href: '#projects' },
    { name: 'Parcours', href: '#experiences' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection('#hero')}
              className="text-2xl font-bold gradient-text"
            >
              Adam Marzuk
            </button>
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden xl:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Actions Desktop */}
          <div className="hidden xl:flex items-center space-x-4">
            {/* Liens sociaux */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/AzmogEx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <Github size={20} />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/adam-marzuk-93804828a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
            </motion.a>

            {/* Bouton CV */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/assets/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <FileText size={16} />
              <span>Mon CV</span>
            </motion.a>

          </div>

          {/* Menu Mobile */}
          <div className="xl:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="xl:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-black/100 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.name}
                </motion.button>
              ))}

              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex items-center justify-center space-x-4 py-2">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/AzmogEx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/adam-marzuk-93804828a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/assets/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <FileText size={16} />
                    <span>CV</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header