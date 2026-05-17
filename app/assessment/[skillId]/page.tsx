'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/mock-api'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function AssessmentPage() {
  const params = useParams()
  const skillId = params.skillId as string
  const router = useRouter()
  const [user] = useState(mockCurrentUser)

  const SKILLS = {
    python: {
      name: 'Python',
      description: 'Master Python fundamentals, data structures, and algorithms',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'Latest Python version (3.11+)',
        'Knowledge of lists, dicts, and functions',
        'Understanding of algorithms and complexity',
      ],
    },
    javascript: {
      name: 'JavaScript',
      description: 'Learn modern JavaScript (ES6+) and DOM manipulation',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'ES6+ syntax and features',
        'Async/await and Promises',
        'DOM manipulation and events',
      ],
    },
    react: {
      name: 'React',
      description: 'Build interactive UIs with React hooks and components',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'React fundamentals and hooks',
        'State management (useState, useReducer)',
        'Component lifecycle and effects',
      ],
    },
    sql: {
      name: 'SQL',
      description: 'Database design, queries, and optimization',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'SQL basics (SELECT, JOIN, WHERE)',
        'Database normalization',
        'Query optimization concepts',
      ],
    },
    typescript: {
      name: 'TypeScript',
      description: 'Advanced TypeScript types, generics, and patterns',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'TypeScript basics and types',
        'Generics and utility types',
        'Advanced patterns',
      ],
    },
    'system-design': {
      name: 'System Design',
      description: 'Scalability, architecture, and distributed systems',
      rounds: 3,
      duration: '25 minutes',
      requirements: [
        'Distributed system concepts',
        'Scalability and performance',
        'Trade-offs in architecture',
      ],
    },
  }

  const skill = SKILLS[skillId as keyof typeof SKILLS]

  if (!skill) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar user={user} />
        <div className="flex items-center justify-center h-96">
          <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-white">Skill not found</p>
          </Card>
        </div>
      </main>
    )
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
          {/* Back Button */}
          <Link href="/assessment">
            <motion.button
              variants={itemVariants}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Skills
            </motion.button>
          </Link>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3">{skill.name} Assessment</h1>
            <p className="text-slate-300 text-lg">{skill.description}</p>
          </motion.div>

          {/* Details Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left: Duration and Rounds */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">ESTIMATED DURATION</p>
                    <p className="text-3xl font-bold text-cyan-300">{skill.duration}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-2">ASSESSMENT ROUNDS</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        <span>Round 1: Multiple Choice (60 sec)</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                        <span>Round 2: Coding Challenge (10 min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-pink-400" />
                        <span>Round 3: Proctored Interview (10 min)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Requirements */}
                <div>
                  <p className="text-sm text-slate-400 mb-4">WHAT YOU&apos;LL BE TESTED ON</p>
                  <ul className="space-y-3">
                    {skill.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Passing Score */}
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-sm text-slate-400 mb-2">PASSING SCORE</p>
                <p className="text-xl font-bold text-yellow-400">70% or higher required to earn credential</p>
              </div>

              {/* Start Button */}
              <Link href={`/assessment/${skillId}/round/1`} className="mt-8 block">
                <Button className="w-full" size="lg">
                  Start Assessment
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div variants={itemVariants} className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <p className="text-sm text-blue-200">
              This is a proctored assessment. Your webcam will be required for authentication. Make sure you have a stable internet connection and a quiet environment.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
