'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Code, Brain, Database, Cpu, Trophy, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { mockCurrentUser } from '@/lib/mock-api'
import { containerVariants, itemVariants } from '@/lib/animations'

const SKILLS = [
  {
    id: 'python',
    name: 'Python',
    description: 'Master Python fundamentals, data structures, and algorithms',
    icon: Code,
    difficulty: 'beginner',
    color: 'from-blue-600 to-blue-400',
    rounds: 3,
    xp_reward: 250,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Learn modern JavaScript (ES6+) and DOM manipulation',
    icon: Code,
    difficulty: 'intermediate',
    color: 'from-yellow-600 to-yellow-400',
    rounds: 3,
    xp_reward: 300,
  },
  {
    id: 'react',
    name: 'React',
    description: 'Build interactive UIs with React hooks and components',
    icon: Brain,
    difficulty: 'intermediate',
    color: 'from-cyan-600 to-cyan-400',
    rounds: 3,
    xp_reward: 350,
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Database design, queries, and optimization',
    icon: Database,
    difficulty: 'intermediate',
    color: 'from-orange-600 to-orange-400',
    rounds: 3,
    xp_reward: 300,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Advanced TypeScript types, generics, and patterns',
    icon: Cpu,
    difficulty: 'advanced',
    color: 'from-purple-600 to-purple-400',
    rounds: 3,
    xp_reward: 400,
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Scalability, architecture, and distributed systems',
    icon: Cpu,
    difficulty: 'advanced',
    color: 'from-pink-600 to-pink-400',
    rounds: 3,
    xp_reward: 450,
  },
]

export default function DashboardPage() {
  const [user] = useState(mockCurrentUser)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar user={user} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3">Choose a Skill Assessment</h1>
            <p className="text-slate-300 text-lg">Complete rigorous multi-round assessments to earn verified credentials</p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((skill, idx) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 transition cursor-pointer overflow-hidden group">
                      <div className={`h-2 bg-gradient-to-r ${skill.color}`} />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-2 py-1 bg-slate-700 rounded text-xs font-semibold text-cyan-300">
                            {skill.difficulty.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
                        <p className="text-sm text-slate-400 mb-6">{skill.description}</p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span>{skill.xp_reward} XP Reward</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span>{skill.rounds} Rounds (MCQ + Code + Proctored)</span>
                          </div>
                        </div>

                        <Link href={`/assessment/${skill.id}`}>
                          <Button className="w-full">Start Assessment</Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div variants={itemVariants}>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-cyan-900/20 p-6">
                <div className="text-cyan-400 text-sm font-bold mb-2">ROUND 1</div>
                <h3 className="text-white font-bold mb-3">Multiple Choice</h3>
                <p className="text-sm text-slate-400">5 questions in 60 seconds. Auto-graded for immediate feedback.</p>
              </Card>
              <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-purple-900/20 p-6">
                <div className="text-purple-400 text-sm font-bold mb-2">ROUND 2</div>
                <h3 className="text-white font-bold mb-3">Coding Challenge</h3>
                <p className="text-sm text-slate-400">Write and submit code. Auto-graded against hidden test cases.</p>
              </Card>
              <Card className="border-slate-700 bg-gradient-to-br from-slate-800/30 to-pink-900/20 p-6">
                <div className="text-pink-400 text-sm font-bold mb-2">ROUND 3</div>
                <h3 className="text-white font-bold mb-3">Proctored Interview</h3>
                <p className="text-sm text-slate-400">Open-ended questions with webcam proctoring for integrity.</p>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
