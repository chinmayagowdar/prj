'use client'

import { motion } from 'framer-motion'
import { LevelBadge } from '@/components/level-badge'

interface PodiumEntry {
  username: string
  avatar: number
  level: number
  xp: number
}

interface PodiumProps {
  first: PodiumEntry
  second: PodiumEntry
  third: PodiumEntry
}

export function Podium({ first, second, third }: PodiumProps) {
  return (
    <div className="flex items-flex-end justify-center gap-4 h-80">
      {/* Silver - Second Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-2xl mb-2 shadow-lg">
          {second.username.charAt(0)}
        </div>
        <LevelBadge level={second.level} size="md" />
        <p className="text-slate-300 font-semibold mt-2">{second.username}</p>
        <p className="text-slate-500 text-sm">{second.xp.toLocaleString()} XP</p>
        <div className="w-32 h-32 bg-gradient-to-t from-slate-700/50 to-transparent rounded-t-lg border-2 border-slate-600 mt-4 flex items-center justify-center">
          <p className="text-4xl font-bold text-slate-400">2</p>
        </div>
      </motion.div>

      {/* Gold - First Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -top-4">
          <motion.div
            animate={{ y: [-5, 0, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            ⭐
          </motion.div>
        </div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center text-white font-bold text-3xl mb-2 shadow-xl">
          {first.username.charAt(0)}
        </div>
        <LevelBadge level={first.level} size="lg" />
        <p className="text-white font-bold text-lg mt-2">{first.username}</p>
        <p className="text-amber-300 text-sm font-semibold">{first.xp.toLocaleString()} XP</p>
        <div className="w-40 h-40 bg-gradient-to-t from-yellow-700/30 to-transparent rounded-t-lg border-2 border-yellow-600 mt-4 flex items-center justify-center">
          <p className="text-6xl font-bold text-yellow-500">1</p>
        </div>
      </motion.div>

      {/* Bronze - Third Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-2 shadow-lg">
          {third.username.charAt(0)}
        </div>
        <LevelBadge level={third.level} size="md" />
        <p className="text-slate-300 font-semibold mt-2">{third.username}</p>
        <p className="text-slate-500 text-sm">{third.xp.toLocaleString()} XP</p>
        <div className="w-32 h-24 bg-gradient-to-t from-orange-700/50 to-transparent rounded-t-lg border-2 border-orange-600 mt-4 flex items-center justify-center">
          <p className="text-4xl font-bold text-orange-500">3</p>
        </div>
      </motion.div>
    </div>
  )
}
