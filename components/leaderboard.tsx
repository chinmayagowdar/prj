'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { LevelBadge } from '@/components/level-badge'
import { containerVariants, itemVariants } from '@/lib/animations'

interface LeaderboardEntry {
  id: string
  rank: number
  username: string
  avatar: number
  level: number
  xp: number
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {entries.map((entry) => (
        <motion.div key={entry.id} variants={itemVariants}>
          <Card
            className={`border-slate-700 p-4 transition-all ${
              currentUserId === entry.id
                ? 'bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/50'
                : 'bg-slate-800/30'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-lg font-bold text-cyan-400 w-8 text-center">#{entry.rank}</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {entry.username.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{entry.username}</p>
                  <p className="text-xs text-slate-400">{entry.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <LevelBadge level={entry.level} size="sm" />
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
