'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Trophy } from 'lucide-react'
import { Podium } from '@/components/podium'
import { Leaderboard } from '@/components/leaderboard'
import { mockLeaderboard, mockCurrentUser } from '@/lib/mock-api'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard)
  const [userRank, setUserRank] = useState(0)

  useEffect(() => {
    const rank = leaderboard.findIndex((entry) => entry.id === mockCurrentUser.id)
    setUserRank(rank + 1)
  }, [leaderboard])

  const topThree = leaderboard.slice(0, 3)

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
              Learn Ledger
            </div>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">Global Leaderboard</h1>
              <Trophy className="w-10 h-10 text-yellow-400" />
            </div>
            <p className="text-slate-300 text-lg">Compete with learners worldwide</p>
          </motion.div>

          {/* Your Rank */}
          {userRank > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Your Current Rank</p>
                    <p className="text-3xl font-bold text-cyan-300 mt-2">#{userRank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Total XP</p>
                    <p className="text-3xl font-bold text-purple-300 mt-2">{mockCurrentUser.totalXp.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Podium */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-12">
              <Podium
                first={{
                  username: topThree[0].username,
                  avatar: topThree[0].avatar,
                  level: topThree[0].level,
                  xp: topThree[0].xp,
                }}
                second={{
                  username: topThree[1].username,
                  avatar: topThree[1].avatar,
                  level: topThree[1].level,
                  xp: topThree[1].xp,
                }}
                third={{
                  username: topThree[2].username,
                  avatar: topThree[2].avatar,
                  level: topThree[2].level,
                  xp: topThree[2].xp,
                }}
              />
            </Card>
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Rankings</h2>
              <Leaderboard entries={leaderboard} currentUserId={mockCurrentUser.id} />
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <Link href="/dashboard">
              <Button size="lg">Back to Dashboard</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
