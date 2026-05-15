'use client'

import { motion } from 'framer-motion'
import { LEVELS } from '@/lib/constants'

interface XpBarProps {
  currentXp: number
  maxXp?: number
  level: number
  showPercentage?: boolean
}

export function XpBar({ currentXp, maxXp = 1000, level, showPercentage = true }: XpBarProps) {
  const percentage = (currentXp / maxXp) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cyan-300">
          Level {level} - {LEVELS[level - 1]}
        </span>
        {showPercentage && (
          <span className="text-xs text-slate-400">
            {currentXp} / {maxXp} XP
          </span>
        )}
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-900/50 border border-slate-700">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
          }}
        />
      </div>
    </div>
  )
}
