'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Edit2, Copy, Download } from 'lucide-react'
import { XpBar } from '@/components/xp-bar'
import { LevelBadge } from '@/components/level-badge'
import { SkillRadar } from '@/components/skill-radar'
import { AchievementBadge } from '@/components/achievement-badge'
import { mockCurrentUser } from '@/lib/mock-api'
import { ACHIEVEMENTS } from '@/lib/constants'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

export default function ProfilePage() {
  const [user] = useState(mockCurrentUser)
  const [copied, setCopied] = useState(false)

  const handleCopyProfile = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
              <span className="text-slate-300">Back</span>
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Profile
            </div>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-5xl">
                    {user.username.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{user.username}</h1>
                    <p className="text-slate-300 text-lg">Level {user.level} - {['Novice', 'Apprentice', 'Scholar', 'Master', 'Legend'][user.level - 1]}</p>
                    <p className="text-slate-400 mt-2">🔥 {user.streak} day streak</p>
                  </div>
                </div>
                <LevelBadge level={user.level} size="lg" />
              </div>
              <div className="flex gap-3">
                <Button>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={handleCopyProfile}>
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Share'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* XP Progress */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <XpBar currentXp={user.xp} maxXp={1000} level={user.level} />
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-8 lg:grid-cols-2">
              <SkillRadar skills={user.skills} />

              {/* Skill List */}
              <Card className="border-slate-700 bg-slate-800/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
                <div className="space-y-3">
                  {user.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{skill.name}</p>
                        <p className="text-xs text-slate-400">{skill.xp} XP earned</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-cyan-300">{skill.proficiency}%</p>
                        <div className="w-24 h-2 bg-slate-700 rounded-full mt-1">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Achievements ({user.achievements.length})</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievementId={achievement.id}
                    unlocked={user.achievements.includes(achievement.id)}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Statistics */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-4 sm:grid-cols-4">
              <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                <p className="text-slate-400 text-sm">Total XP</p>
                <p className="text-3xl font-bold text-cyan-300 mt-2">{user.totalXp.toLocaleString()}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                <p className="text-slate-400 text-sm">Level</p>
                <p className="text-3xl font-bold text-purple-300 mt-2">{user.level}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                <p className="text-slate-400 text-sm">Skills</p>
                <p className="text-3xl font-bold text-amber-300 mt-2">{user.skills.length}</p>
              </Card>
              <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                <p className="text-slate-400 text-sm">Achievements</p>
                <p className="text-3xl font-bold text-green-300 mt-2">{user.achievements.length}</p>
              </Card>
            </div>
          </motion.div>

          {/* Export Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Export Profile</h3>
              <p className="text-slate-400 text-sm mb-4">Download your verified credential report</p>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
