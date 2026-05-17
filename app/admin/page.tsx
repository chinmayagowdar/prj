'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Users, Award, TrendingUp, Settings } from 'lucide-react'
import { useState } from 'react'
import { mockCurrentUser } from '@/lib/mock-api'
import { containerVariants, itemVariants } from '@/lib/animations'

const MOCK_USERS = [
  {
    id: '1',
    email: 'alice@example.com',
    skills_completed: 2,
    total_xp: 550,
    credentials: [
      { skill: 'Python', score: 85 },
      { skill: 'JavaScript', score: 78 },
    ],
  },
  {
    id: '2',
    email: 'bob@example.com',
    skills_completed: 1,
    total_xp: 250,
    credentials: [
      { skill: 'React', score: 92 },
    ],
  },
  {
    id: '3',
    email: 'charlie@example.com',
    skills_completed: 3,
    total_xp: 1050,
    credentials: [
      { skill: 'Python', score: 95 },
      { skill: 'SQL', score: 88 },
      { skill: 'JavaScript', score: 82 },
    ],
  },
]

export default function AdminPage() {
  const [user] = useState(mockCurrentUser)
  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  const totalUsers = MOCK_USERS.length
  const totalCredentials = MOCK_USERS.reduce((sum, u) => sum + u.credentials.length, 0)
  const avgScore = (
    MOCK_USERS.reduce((sum, u) => sum + u.credentials.reduce((s, c) => s + c.score, 0), 0) /
    totalCredentials
  ).toFixed(1)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar user={user} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Manage users, assessments, and credentials</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid gap-6 md:grid-cols-4"
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-cyan-900/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total Users</p>
                  <p className="text-4xl font-bold text-cyan-400">{totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-cyan-400 opacity-50" />
              </div>
            </Card>

            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-green-900/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Credentials Issued</p>
                  <p className="text-4xl font-bold text-green-400">{totalCredentials}</p>
                </div>
                <Award className="w-8 h-8 text-green-400 opacity-50" />
              </div>
            </Card>

            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-purple-900/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Average Score</p>
                  <p className="text-4xl font-bold text-purple-400">{avgScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400 opacity-50" />
              </div>
            </Card>

            <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-pink-900/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total XP Earned</p>
                  <p className="text-4xl font-bold text-pink-400">
                    {MOCK_USERS.reduce((sum, u) => sum + u.total_xp, 0)}
                  </p>
                </div>
                <Settings className="w-8 h-8 text-pink-400 opacity-50" />
              </div>
            </Card>
          </motion.div>

          {/* Users Table */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Users & Progress</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Skills Completed</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Total XP</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((u) => (
                      <motion.tr
                        key={u.id}
                        className="border-b border-slate-700 hover:bg-slate-700/20 transition"
                        whileHover={{ backgroundColor: 'rgba(100, 116, 139, 0.1)' }}
                      >
                        <td className="px-6 py-4 text-white font-medium">{u.email}</td>
                        <td className="px-6 py-4 text-slate-300">{u.skills_completed}</td>
                        <td className="px-6 py-4 text-slate-300">{u.total_xp}</td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
                          >
                            {expandedUser === u.id ? 'Hide' : 'View'}
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expanded Row */}
              {expandedUser && (
                <motion.div
                  className="bg-slate-900/30 border-t border-slate-700 p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Credentials</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {MOCK_USERS.find(u => u.id === expandedUser)?.credentials.map((cred, idx) => (
                      <Card key={idx} className="border-slate-600 bg-slate-700/50 p-4">
                        <p className="text-sm text-slate-400 mb-1">Skill</p>
                        <p className="text-white font-bold mb-3">{cred.skill}</p>
                        <p className="text-sm text-slate-400 mb-1">Score</p>
                        <p className={`text-2xl font-bold ${
                          cred.score >= 90 ? 'text-green-400' :
                          cred.score >= 80 ? 'text-cyan-400' :
                          'text-yellow-400'
                        }`}>
                          {cred.score}%
                        </p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
