'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Play, Zap } from 'lucide-react'
import { SKILL_CATEGORIES } from '@/lib/constants'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

const DIFFICULTY_COLORS = {
  Beginner: 'from-green-500 to-emerald-500',
  Intermediate: 'from-yellow-500 to-amber-500',
  Advanced: 'from-red-500 to-orange-500',
}

const DIFFICULTY_TEXT = {
  Beginner: 'bg-green-900/30 text-green-300',
  Intermediate: 'bg-yellow-900/30 text-yellow-300',
  Advanced: 'bg-red-900/30 text-red-300',
}

export default function AssessmentPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

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
              Skill Assessments
            </div>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <motion.div
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {!selectedSkill ? (
          <>
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-2">Proctored Assessments</h2>
              <p className="text-slate-300 text-lg">
                Earn XP and get verified credentials through AI-powered skill assessments
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-xl font-bold text-white mb-6">Choose a Skill to Assess</h3>
              <motion.div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {SKILL_CATEGORIES.map((skill, idx) => {
                  const difficulties = ['Beginner', 'Intermediate', 'Advanced']
                  const difficulty = difficulties[idx % 3] as keyof typeof DIFFICULTY_COLORS

                  return (
                    <motion.div key={skill} variants={itemVariants}>
                      <Card
                        onClick={() => setSelectedSkill(skill)}
                        className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group"
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${DIFFICULTY_COLORS[difficulty]} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-white mb-2">{skill}</h4>
                        <div className="flex items-center justify-between">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${DIFFICULTY_TEXT[difficulty]}`}>
                            {difficulty}
                          </span>
                          <span className="text-yellow-400 font-bold text-sm">+250 XP</span>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Info Cards */}
            <motion.div variants={itemVariants}>
              <Card className="border-slate-700 bg-slate-800/30 p-8">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-cyan-400">ℹ️</span>
                  How Assessments Work
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold text-xl">1</span>
                    <div>
                      <p className="font-medium text-white">Choose a Skill</p>
                      <p className="text-sm text-slate-400">Select from 8 available technical skills</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold text-xl">2</span>
                    <div>
                      <p className="font-medium text-white">Real-World Scenarios</p>
                      <p className="text-sm text-slate-400">3 questions, 10 mins each (30 mins total)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold text-xl">3</span>
                    <div>
                      <p className="font-medium text-white">AI Grading</p>
                      <p className="text-sm text-slate-400">Get instant feedback and detailed results</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold text-xl">4</span>
                    <div>
                      <p className="font-medium text-white">Earn Rewards</p>
                      <p className="text-sm text-slate-400">Get XP and verification certificates</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        ) : (
          <motion.div
            variants={slideInFromBottomVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedSkill} Assessment</h3>
                <p className="text-slate-300 mb-8">
                  Ready to test your skills and earn XP?
                </p>
                <div className="bg-slate-700/50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Duration</p>
                      <p className="text-xl font-bold text-cyan-300">30 mins</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Questions</p>
                      <p className="text-xl font-bold text-purple-300">3</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Reward</p>
                      <p className="text-xl font-bold text-yellow-400">+250 XP</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
                  You&apos;ll be presented with 3 real-world scenarios. Each question gives you 10 minutes
                  to analyze and solve the problem. Your work will be graded by AI.
                </p>
                <div className="flex gap-3 justify-center flex-col sm:flex-row">
                  <Link href={`/assess/${selectedSkill.toLowerCase()}/start`} className="flex-1">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <Play className="h-4 w-4" />
                      Start Assessment
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setSelectedSkill(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Choose Different Skill
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </main>
  )
}
