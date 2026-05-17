'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Trophy, Star, Lock, Clock, Users, TrendingUp } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first assessment',
    icon: '🚀',
    unlocked: true,
    unlockedDate: '2024-01-15',
    rarity: 'common',
  },
  {
    id: 2,
    name: '5-Day Warrior',
    description: 'Maintain a 5-day streak',
    icon: '🔥',
    unlocked: true,
    unlockedDate: '2024-01-20',
    rarity: 'uncommon',
  },
  {
    id: 3,
    name: 'Skill Master',
    description: 'Master 5 different skills',
    icon: '🎓',
    unlocked: false,
    progress: 3,
    target: 5,
    rarity: 'rare',
  },
  {
    id: 4,
    name: 'Century Club',
    description: 'Earn 100 assessments completed',
    icon: '💯',
    unlocked: false,
    progress: 47,
    target: 100,
    rarity: 'epic',
  },
  {
    id: 5,
    name: 'XP Collector',
    description: 'Accumulate 10,000 total XP',
    icon: '⭐',
    unlocked: false,
    progress: 6800,
    target: 10000,
    rarity: 'epic',
  },
  {
    id: 6,
    name: 'Legendary',
    description: 'Reach level 50',
    icon: '👑',
    unlocked: false,
    progress: 28,
    target: 50,
    rarity: 'legendary',
  },
]

const rarityColors = {
  common: 'from-gray-600 to-gray-700',
  uncommon: 'from-green-600 to-green-700',
  rare: 'from-blue-600 to-blue-700',
  epic: 'from-purple-600 to-purple-700',
  legendary: 'from-yellow-600 to-yellow-700',
}

const rarityBorders = {
  common: 'border-gray-500',
  uncommon: 'border-green-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500',
}

export default function AchievementsPage() {
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Stats */}
          <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
              <p className="text-slate-400 text-sm">Achievements</p>
              <p className="text-3xl font-bold text-white mt-1">
                {unlockedCount}/{ACHIEVEMENTS.length}
              </p>
            </Card>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <Star className="w-6 h-6 text-cyan-400 mb-2" />
              <p className="text-slate-400 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold text-white mt-1">
                {Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%
              </p>
            </Card>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
              <p className="text-slate-400 text-sm">Next Milestone</p>
              <p className="text-lg font-bold text-white mt-1">Skill Master</p>
            </Card>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">All Achievements</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ACHIEVEMENTS.map((achievement, idx) => (
                <motion.div
                  key={achievement.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card
                    className={`border-2 bg-slate-800/30 p-6 h-full transition-all ${
                      achievement.unlocked
                        ? `${rarityBorders[achievement.rarity as keyof typeof rarityBorders]}`
                        : 'border-slate-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{achievement.icon}</span>
                      {achievement.unlocked && (
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      )}
                      {!achievement.unlocked && (
                        <Lock className="w-5 h-5 text-slate-500" />
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3">
                      {achievement.description}
                    </p>

                    {achievement.unlocked ? (
                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <span>✓ Unlocked</span>
                        <span>{achievement.unlockedDate}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-cyan-300">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Rarity Legend */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Rarity Levels</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {Object.entries(rarityColors).map(([rarity, gradient]) => (
                  <div key={rarity} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded bg-gradient-to-r ${gradient}`} />
                    <span className="text-sm text-slate-400 capitalize">{rarity}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
