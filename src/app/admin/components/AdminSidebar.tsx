'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderOpen, 
  GraduationCap, 
  BarChart3, 
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string | number
}

interface AdminSidebarProps {
  onLogout: () => void
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const pathname = usePathname()

  const menuItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      name: 'Projets',
      href: '/admin/projects',
      icon: FolderOpen
    },
    {
      name: 'Expériences',
      href: '/admin/experiences',
      icon: GraduationCap
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      badge: 'Nouveau'
    },
    {
      name: 'Paramètres',
      href: '/admin/settings',
      icon: Settings
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="w-64 bg-slate-900/95 backdrop-blur-md border-r border-white/10 h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Admin Panel</h1>
            <p className="text-white/60 text-sm">Portfolio Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon 
                  size={18} 
                  className={active ? 'text-blue-400' : 'text-white/70 group-hover:text-white'} 
                />
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 group mb-2"
          >
            <ExternalLink size={18} className="text-white/70 group-hover:text-white" />
            <span className="font-medium">Voir le site</span>
          </motion.div>
        </Link>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group w-full"
        >
          <LogOut size={18} className="text-red-400 group-hover:text-red-300" />
          <span className="font-medium">Déconnexion</span>
        </motion.button>
      </div>

      {/* User info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium">Azmog</p>
            <p className="text-white/60 text-xs">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar