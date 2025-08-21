'use client'

import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            À propos de <span className="gradient-text">moi</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez mon parcours, mes compétences et ma passion pour le développement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Mon parcours</h3>
            <p className="text-white/80 leading-relaxed">
              Étudiant en 2ème année de BUT Informatique, je me spécialise dans le développement 
              d&apos;applications. Ma passion pour les technologies web et l&apos;intelligence artificielle m&apos;a conduit à 
              explorer diverses technologies et frameworks modernes.
            </p>
            <p className="text-white/80 leading-relaxed">
              J&apos;ai acquis une expérience pratique grâce à des stages en entreprise et des projets 
              personnels, me permettant de développer une approche complète du développement full-stack.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card"
          >
            <h3 className="text-xl font-bold text-white mb-4">Compétences principales</h3>
            <div className="space-y-3">
              {[
                { name: 'JavaScript/TypeScript', level: 90 },
                { name: 'React/Vue.js', level: 85 },
                { name: 'Node.js/Express', level: 80 },
                { name: 'Bases de données', level: 75 },
                { name: 'Git/DevOps', level: 85 }
              ].map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/90">{skill.name}</span>
                    <span className="text-white/70">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About