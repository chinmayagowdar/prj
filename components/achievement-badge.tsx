'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { ACHIEVEMENTS } from '@/lib/constants'

interface AchievementBadgeProps {
  achievementId: string
  unlocked: boolean
}

export function AchievementBadge({ achievementId, unlocked }: AchievementBadgeProps) {
  const achievement = Object.values(ACHIEVEMENTS).find((a) => a.id === achievementId)

  if (!achievement) return null

  return (
    <motion.div
      className="relative w-16 h-16"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className={`w-full h-full rounded-lg flex items-center justify-center cursor-pointer transition-all ${
          unlocked
            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg'
            : 'bg-slate-800 opacity-50 grayscale'
        }`}
      >
        <Star className={`w-8 h-8 ${unlocked ? 'text-white' : 'text-slate-600'}`} />
      </div>
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <p className="text-xs font-medium text-slate-300 truncate">{achievement.name}</p>
      </div>
    </motion.div>
  )
}
