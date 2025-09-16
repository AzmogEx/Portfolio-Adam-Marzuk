const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Skills data from src/data/skills.ts
const skills = [
  // Main skills (technical)
  { name: 'JavaScript', category: 'language', level: 'advanced', icon: '🟨', type: 'main' },
  { name: 'TypeScript', category: 'language', level: 'advanced', icon: '🔷', type: 'main' },
  { name: 'C#', category: 'language', level: 'expert', icon: '⚡', type: 'main' },
  { name: 'Python', category: 'language', level: 'intermediate', icon: '🐍', type: 'main' },
  { name: 'Java', category: 'language', level: 'advanced', icon: '☕', type: 'main' },
  { name: 'PHP', category: 'language', level: 'intermediate', icon: '🐘', type: 'main' },
  { name: 'C++', category: 'language', level: 'beginner', icon: '⚡', type: 'main' },

  // Frameworks & Libraries
  { name: 'React', category: 'framework', level: 'advanced', icon: '⚛️', type: 'main' },
  { name: 'Vue.js', category: 'framework', level: 'intermediate', icon: '💚', type: 'main' },
  { name: 'Node.js', category: 'framework', level: 'intermediate', icon: '🟢', type: 'main' },
  { name: 'Express.js', category: 'framework', level: 'intermediate', icon: '🚂', type: 'main' },
  { name: 'Laravel', category: 'framework', level: 'intermediate', icon: '🔴', type: 'main' },
  { name: 'Spring Boot', category: 'framework', level: 'beginner', icon: '🍃', type: 'main' },

  // Tools & Technologies
  { name: 'Git', category: 'tool', level: 'advanced', icon: '🔀', type: 'main' },
  { name: 'Docker', category: 'tool', level: 'intermediate', icon: '🐳', type: 'main' },
  { name: 'MySQL', category: 'tool', level: 'intermediate', icon: '🗄️', type: 'main' },
  { name: 'PostgreSQL', category: 'tool', level: 'intermediate', icon: '🐘', type: 'main' },
  { name: 'MongoDB', category: 'tool', level: 'intermediate', icon: '🍃', type: 'main' },
  { name: 'Figma', category: 'tool', level: 'intermediate', icon: '🎨', type: 'main' },
  { name: 'Proxmox', category: 'tool', level: 'advanced', icon: '💻', type: 'main' },

  // Methodologies
  { name: 'Agile/Scrum', category: 'other', level: 'intermediate', icon: '🔄', type: 'main' },
  { name: 'Kanban', category: 'other', level: 'intermediate', icon: '📋', type: 'main' },

  // Workflow tools
  { name: 'VS Code', category: 'tool', level: 'expert', icon: '💻', type: 'workflow' },
  { name: 'IntelliJ IDEA', category: 'tool', level: 'advanced', icon: '🧠', type: 'workflow' },
  { name: 'PhpStorm', category: 'tool', level: 'intermediate', icon: '⚡', type: 'workflow' },
  { name: 'GitHub', category: 'tool', level: 'advanced', icon: '🐙', type: 'workflow' },
  { name: 'GitLab', category: 'tool', level: 'intermediate', icon: '🦊', type: 'workflow' },
  { name: 'Slack', category: 'tool', level: 'advanced', icon: '💬', type: 'workflow' },
  { name: 'Discord', category: 'tool', level: 'expert', icon: '🎮', type: 'workflow' },
  { name: 'Trello', category: 'tool', level: 'advanced', icon: '📋', type: 'workflow' },
  { name: 'Notion', category: 'tool', level: 'intermediate', icon: '📝', type: 'workflow' },
  { name: 'Postman', category: 'tool', level: 'advanced', icon: '📬', type: 'workflow' },
  { name: 'Jest', category: 'tool', level: 'intermediate', icon: '🧪', type: 'workflow' },
  { name: 'Cypress', category: 'tool', level: 'beginner', icon: '🌲', type: 'workflow' },
  { name: 'GitHub Actions', category: 'tool', level: 'intermediate', icon: '⚙️', type: 'workflow' },
  { name: 'Vercel', category: 'tool', level: 'advanced', icon: '🚀', type: 'workflow' },
  { name: 'Netlify', category: 'tool', level: 'intermediate', icon: '🌐', type: 'workflow' },

  // Soft skills
  { name: 'Travail en équipe', category: 'other', level: 'expert', icon: '👥', type: 'soft' },
  { name: 'Communication', category: 'other', level: 'advanced', icon: '💬', type: 'soft' },
  { name: 'Cohésion de groupe', category: 'other', level: 'advanced', icon: '🤝', type: 'soft' },
  { name: 'Leadership', category: 'other', level: 'intermediate', icon: '👨‍💼', type: 'soft' },
  { name: 'Gestion de projet', category: 'other', level: 'advanced', icon: '📊', type: 'soft' },
  { name: 'Planification', category: 'other', level: 'advanced', icon: '📅', type: 'soft' },
  { name: 'Résolution de problèmes', category: 'other', level: 'expert', icon: '🔍', type: 'soft' },
  { name: 'Esprit critique', category: 'other', level: 'advanced', icon: '🎯', type: 'soft' },
  { name: 'Adaptabilité', category: 'other', level: 'expert', icon: '🔄', type: 'soft' },
  { name: 'Apprentissage continu', category: 'other', level: 'expert', icon: '📚', type: 'soft' },
  { name: 'Veille technologique', category: 'other', level: 'advanced', icon: '🔭', type: 'soft' },
  { name: 'Créativité', category: 'other', level: 'advanced', icon: '💡', type: 'soft' }
]

async function migrateSkills() {
  try {
    console.log('🚀 Début de la migration des compétences...')

    // Check if skills already exist
    const existingSkills = await prisma.skill.count()
    if (existingSkills > 0) {
      console.log(`⚠️  ${existingSkills} compétences trouvées en base. Suppression...`)
      await prisma.skill.deleteMany()
    }

    console.log('📝 Insertion des nouvelles compétences...')

    // Insert skills with order
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i]
      await prisma.skill.create({
        data: {
          ...skill,
          order: i + 1
        }
      })
      console.log(`✅ ${skill.name} (${skill.type}) - ${skill.level}`)
    }

    const totalSkills = await prisma.skill.count()
    console.log(`\n🎉 Migration terminée ! ${totalSkills} compétences importées.`)

    // Statistiques
    const stats = await prisma.skill.groupBy({
      by: ['type'],
      _count: { type: true }
    })

    console.log('\n📊 Statistiques:')
    stats.forEach(stat => {
      console.log(`  - ${stat.type}: ${stat._count.type} compétences`)
    })

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateSkills()