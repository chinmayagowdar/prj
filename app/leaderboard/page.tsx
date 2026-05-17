'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Trophy, Search, Filter } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Podium } from '@/components/podium'
import { Leaderboard } from '@/components/leaderboard'
import { mockLeaderboard, mockCurrentUser } from '@/lib/mock-api'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

const FILTER_OPTIONS = ['All Time', 'This Month', 'This Week', 'Today']
const SORT_OPTIONS = ['XP Points', 'Level', 'Streak', 'Assessments']

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard)
  const [userRank, setUserRank] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All Time')
  const [selectedSort, setSelectedSort] = useState('XP Points')
  const [filteredLeaderboard, setFilteredLeaderboard] = useState(mockLeaderboard)

  useEffect(() => {
    const rank = leaderboard.findIndex((entry) => entry.id === mockCurrentUser.id)
    setUserRank(rank + 1)

    // Filter and search
    let filtered = leaderboard.filter((entry) =>
      entry.username.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'Level':
          return b.level - a.level
        case 'Streak':
          return (b.streak || 0) - (a.streak || 0)
        case 'Assessments':
          return (b.assessmentCount || 0) - (a.assessmentCount || 0)
        default:
          return b.xp - a.xp
      }
    })

    setFilteredLeaderboard(filtered)
  }, [leaderboard, searchQuery, selectedSort])

  const topThree = leaderboard.slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

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

          {/* Full Leaderboard with Filters */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>

                {/* Sort Dropdown */}
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      Sort by {option}
                    </option>
                  ))}
                </select>

                {/* Filter Dropdown */}
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition"
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Rankings</h2>
                <Leaderboard entries={filteredLeaderboard} currentUserId={mockCurrentUser.id} />
              </div>

              {filteredLeaderboard.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No players found matching your search.</p>
                </div>
              )}
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
