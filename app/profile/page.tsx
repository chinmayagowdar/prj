'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Edit2, Copy, Download, Share2 } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'achievements'>('overview')

  const handleCopyProfile = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar user={user} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Header */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl shadow-lg"
                  >
                    {user.username.charAt(0)}
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{user.username}</h1>
                    <p className="text-slate-300 text-sm">
                      Level {user.level} • {['Novice', 'Apprentice', 'Scholar', 'Master', 'Legend'][Math.min(user.level - 1, 4)]}
                    </p>
                    <p className="text-slate-400 text-sm mt-2">🔥 {user.streak} day streak</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-initial" onClick={handleCopyProfile}>
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? 'Copied!' : 'Share'}
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-initial">
                    <Share2 className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="flex gap-2">
            {(['overview', 'skills', 'achievements'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* XP Progress */}
              <Card className="border-slate-700 bg-slate-800/30 p-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">XP Progress to Next Level</h3>
                <XpBar currentXp={user.xp} maxXp={1000} level={user.level} />
              </Card>

              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-4">
                <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                  <p className="text-slate-400 text-sm">Total XP</p>
                  <p className="text-3xl font-bold text-cyan-300 mt-2">{user.totalXp.toLocaleString()}</p>
                </Card>
                <Card className="border-slate-700 bg-slate-800/30 p-6 text-center">
                  <p className="text-slate-400 text-sm">Assessments</p>
                  <p className="text-3xl font-bold text-purple-300 mt-2">{user.skills.length * 5}</p>
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
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <SkillRadar skills={user.skills} />

                {/* Skill List */}
                <Card className="border-slate-700 bg-slate-800/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Skills</h3>
                  <div className="space-y-4">
                    {user.skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">{skill.name}</p>
                          <p className="text-xs text-slate-400">{skill.xp} XP earned</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-cyan-300">{skill.proficiency}%</p>
                          <div className="w-20 h-2 bg-slate-700 rounded-full mt-1">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Card className="border-slate-700 bg-slate-800/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Achievements ({user.achievements.length}/{Object.keys(ACHIEVEMENTS).length})
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
                  {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (achievement.id - 1) * 0.05 }}
                    >
                      <AchievementBadge
                        achievementId={achievement.id}
                        unlocked={user.achievements.includes(achievement.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Export Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Download Your Credential</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get a verified PDF report of your profile, skills, and achievements
              </p>
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
