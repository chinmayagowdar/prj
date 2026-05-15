'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Award, FileText, Trophy, TrendingUp, LogOut } from 'lucide-react'
import { XpBar } from '@/components/xp-bar'
import { LevelBadge } from '@/components/level-badge'
import { SkillRadar } from '@/components/skill-radar'
import { Leaderboard } from '@/components/leaderboard'
import { AchievementBadge } from '@/components/achievement-badge'
import { mockApi, mockLeaderboard, mockCurrentUser } from '@/lib/mock-api'
import { ACHIEVEMENTS } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function DashboardPage() {
  const [user, setUser] = useState(mockCurrentUser)
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Learn Ledger
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <LevelBadge level={user.level} size="sm" />
                <div>
                  <p className="text-sm text-cyan-300 font-bold">{user.username}</p>
                  <p className="text-xs text-slate-400">{user.totalXp.toLocaleString()} XP</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{user.username}</h2>
                    <p className="text-slate-300">Streak: {user.streak} days 🔥</p>
                  </div>
                </div>
                <LevelBadge level={user.level} size="lg" />
              </div>
              <div className="mt-8">
                <XpBar currentXp={user.xp} maxXp={1000} level={user.level} />
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/assess">
                <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
                  <Brain className="w-10 h-10 text-cyan-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-semibold text-white">Take Assessment</h3>
                  <p className="text-xs text-slate-400 mt-1">+250 XP</p>
                </Card>
              </Link>

              <Link href="/resume">
                <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
                  <FileText className="w-10 h-10 text-purple-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-semibold text-white">Upload Resume</h3>
                  <p className="text-xs text-slate-400 mt-1">+50 XP</p>
                </Card>
              </Link>

              <Link href="/credentials">
                <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
                  <Award className="w-10 h-10 text-amber-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-semibold text-white">Verify Credential</h3>
                  <p className="text-xs text-slate-400 mt-1">+100 XP</p>
                </Card>
              </Link>

              <Link href="/leaderboard">
                <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
                  <Trophy className="w-10 h-10 text-yellow-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-semibold text-white">Leaderboard</h3>
                  <p className="text-xs text-slate-400 mt-1">Rank #{Math.floor(Math.random() * 100) + 1}</p>
                </Card>
              </Link>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Skills and Achievements */}
              <div className="lg:col-span-2 space-y-8">
                {/* Skills Radar */}
                <SkillRadar skills={user.skills} />

                {/* Achievements */}
                <Card className="border-slate-700 bg-slate-800/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Achievements</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {Object.entries(ACHIEVEMENTS)
                      .slice(0, 8)
                      .map(([key, achievement]) => (
                        <AchievementBadge
                          key={achievement.id}
                          achievementId={achievement.id}
                          unlocked={user.achievements.includes(achievement.id)}
                        />
                      ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Top Leaderboard */}
                <Card className="border-slate-700 bg-slate-800/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Top Players</h3>
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <Leaderboard entries={leaderboard.slice(0, 5)} currentUserId={user.id} />
                </Card>

                {/* Stats */}
                <Card className="border-slate-700 bg-slate-800/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total XP:</span>
                      <span className="text-cyan-300 font-bold">{user.totalXp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Skills:</span>
                      <span className="text-cyan-300 font-bold">{user.skills.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Achievements:</span>
                      <span className="text-cyan-300 font-bold">{user.achievements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Streak:</span>
                      <span className="text-cyan-300 font-bold">{user.streak} days</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
