'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface DashboardCardProps {
  title: string
  description: string
  icon: string | React.ReactNode
  stats?: string
  action?: {
    label: string
    href: string
    icon?: LucideIcon
  }
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  delay?: number
}

const DashboardCard = ({
  title,
  description,
  icon,
  stats,
  action,
  variant = 'primary',
  delay = 0
}: DashboardCardProps) => {
  const variants = {
    primary: {
      bg: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30',
      text: 'text-blue-400 hover:text-blue-300',
      iconBg: 'bg-blue-500/20',
      iconText: 'text-blue-400'
    },
    secondary: {
      bg: 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30',
      text: 'text-purple-400 hover:text-purple-300',
      iconBg: 'bg-purple-500/20',
      iconText: 'text-purple-400'
    },
    success: {
      bg: 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30',
      text: 'text-green-400 hover:text-green-300',
      iconBg: 'bg-green-500/20',
      iconText: 'text-green-400'
    },
    warning: {
      bg: 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30',
      text: 'text-yellow-400 hover:text-yellow-300',
      iconBg: 'bg-yellow-500/20',
      iconText: 'text-yellow-400'
    }
  }

  const currentVariant = variants[variant]
  const ActionIcon = action?.icon || ArrowRight

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card p-6 hover:scale-105 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`p-3 rounded-lg ${currentVariant.iconBg}`}>
            {typeof icon === 'string' ? (
              <span className="text-2xl">{icon}</span>
            ) : (
              <div className={currentVariant.iconText}>{icon}</div>
            )}
          </div>
          {/* Stats */}
          {stats && (
            <div className="text-right">
              <div className="text-lg font-bold text-white">{stats}</div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {action && (
        <Link
          href={action.href}
          className={`flex items-center justify-center gap-2 w-full py-3 px-4 border rounded-lg transition-all duration-300 ${currentVariant.bg} ${currentVariant.text}`}
        >
          <ActionIcon size={16} />
          <span className="font-medium">{action.label}</span>
        </Link>
      )}
    </motion.div>
  )
}

export default DashboardCard