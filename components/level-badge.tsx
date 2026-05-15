'use client'

import { motion } from 'framer-motion'
import { LEVELS } from '@/lib/constants'

interface LevelBadgeProps {
  level: number
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
}

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-pink-500',
    'from-red-500 to-rose-500',
  ]

  const color = colors[Math.min(level - 1, colors.length - 1)]

  return (
    <motion.div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${color} flex items-center justify-center font-bold text-white shadow-lg`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      whileHover={{ scale: 1.1 }}
    >
      {level}
    </motion.div>
  )
}
