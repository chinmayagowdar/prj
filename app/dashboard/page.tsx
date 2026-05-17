'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Award, FileText, Trophy, TrendingUp, LogOut, Flame, Zap } from 'lucide-react'
import { XpBar } from '@/components/xp-bar'
import { LevelBadge } from '@/components/level-badge'
import { SkillRadar } from '@/components/skill-radar'
import { Leaderboard } from '@/components/leaderboard'
import { AchievementBadge } from '@/components/achievement-badge'
import { Navbar } from '@/components/navbar'
import { StatCard, ProgressWidget, QuickActionWidget } from '@/components/dashboard-widgets'
import { XpTimelineChart, ActivityHeatmap } from '@/components/advanced-charts'
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
      <Navbar user={user} onLogout={() => {}} />

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

          {/* Stats Row */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={Zap}
                label="Total XP"
                value={user.totalXp.toLocaleString()}
                change={{ value: 15, isPositive: true }}
                gradient="from-cyan-900/40 to-cyan-800/40"
              />
              <StatCard
                icon={Trophy}
                label="Current Rank"
                value={`#${Math.floor(Math.random() * 100) + 1}`}
                change={{ value: 5, isPositive: true }}
                gradient="from-purple-900/40 to-purple-800/40"
              />
              <StatCard
                icon={Flame}
                label="Days Streak"
                value={user.streak}
                change={{ value: 2, isPositive: true }}
                gradient="from-orange-900/40 to-orange-800/40"
              />
              <StatCard
                icon={Award}
                label="Achievements"
                value={user.achievements.length}
                change={{ value: 1, isPositive: true }}
                gradient="from-amber-900/40 to-amber-800/40"
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/assess">
                <QuickActionWidget
                  title="Take Assessment"
                  description="Challenge yourself"
                  icon={Brain}
                  color="from-cyan-900/40 to-cyan-800/40"
                />
              </Link>

              <Link href="/resume">
                <QuickActionWidget
                  title="Upload Resume"
                  description="Show your experience"
                  icon={FileText}
                  color="from-purple-900/40 to-purple-800/40"
                />
              </Link>

              <Link href="/credentials">
                <QuickActionWidget
                  title="Verify Credential"
                  description="Get certified"
                  icon={Award}
                  color="from-amber-900/40 to-amber-800/40"
                />
              </Link>

              <Link href="/leaderboard">
                <QuickActionWidget
                  title="View Leaderboard"
                  description="Check rankings"
                  icon={Trophy}
                  color="from-yellow-900/40 to-yellow-800/40"
                />
              </Link>
            </div>
          </motion.div>

          {/* Progress Section */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 md:grid-cols-2">
              <ProgressWidget title="XP to Next Level" current={user.xp} target={1000} unit="XP" color="from-cyan-400 to-cyan-600" />
              <ProgressWidget title="Skills Unlocked" current={user.skills.length} target={12} unit="Skills" color="from-purple-400 to-purple-600" />
            </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-8 lg:grid-cols-2">
              <XpTimelineChart />
              <ActivityHeatmap />
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
                  <h3 className="text-lg font-semibold text-white mb-6">Achievements Unlocked ({user.achievements.length})</h3>
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
                    <h3 className="text-lg font-semibold text-white">Top 5 Players</h3>
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <Leaderboard entries={leaderboard.slice(0, 5)} currentUserId={user.id} />
                  <Link href="/leaderboard">
                    <Button variant="outline" className="w-full mt-4">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </Card>

                {/* Recent Activity */}
                <Card className="border-slate-700 bg-slate-800/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white">Completed Python Assessment</p>
                        <p className="text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white">Unlocked &quot;5-Day Warrior&quot;</p>
                        <p className="text-xs text-slate-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white">Ranked up to Scholar level</p>
                        <p className="text-xs text-slate-400">3 days ago</p>
                      </div>
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
