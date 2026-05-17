'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Trophy, Download, Share2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { mockCurrentUser } from '@/lib/mock-api'

export default function ResultsPage() {
  const params = useParams()
  const skillId = params.skillId as string
  const router = useRouter()
  const [user] = useState(mockCurrentUser)

  // Mock final score (in real app, this comes from database)
  const finalScore = 85
  const passing = finalScore >= 70

  const skillNames: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    react: 'React',
    sql: 'SQL',
    typescript: 'TypeScript',
    'system-design': 'System Design',
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar user={user} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/assessment">
              <motion.button
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Skills
              </motion.button>
            </Link>
          </div>

          {/* Main Result Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`border-slate-700 p-12 text-center ${
              passing ? 'bg-gradient-to-br from-slate-800/30 to-green-900/20' : 'bg-gradient-to-br from-slate-800/30 to-red-900/20'
            }`}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1 }}
                className="mb-6"
              >
                {passing ? (
                  <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
                ) : (
                  <AlertCircle className="w-20 h-20 text-red-400 mx-auto" />
                )}
              </motion.div>

              <h1 className="text-4xl font-bold text-white mb-2">
                {passing ? 'Assessment Passed!' : 'Assessment Incomplete'}
              </h1>
              <p className={`text-lg mb-8 ${passing ? 'text-green-300' : 'text-red-300'}`}>
                {passing
                  ? 'Congratulations! You have earned a verified credential.'
                  : 'You did not meet the passing score. Please try again.'}
              </p>

              {/* Score Display */}
              <motion.div
                className="mb-8 p-8 bg-slate-800/50 border border-slate-700 rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-slate-400 mb-3">FINAL SCORE</p>
                <motion.p
                  className={`text-6xl font-bold ${passing ? 'text-green-400' : 'text-red-400'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {finalScore}%
                </motion.p>
                <p className="text-slate-400 mt-3">Passing score: 70% or higher</p>
              </motion.div>

              {/* Round Scores */}
              {passing && (
                <motion.div
                  className="mb-8 grid gap-4 md:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-300 mb-2">Round 1 (MCQ)</p>
                    <p className="text-2xl font-bold text-blue-400">80%</p>
                  </div>
                  <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <p className="text-sm text-purple-300 mb-2">Round 2 (Coding)</p>
                    <p className="text-2xl font-bold text-purple-400">85%</p>
                  </div>
                  <div className="p-4 bg-pink-900/20 border border-pink-500/30 rounded-lg">
                    <p className="text-sm text-pink-300 mb-2">Round 3 (Interview)</p>
                    <p className="text-2xl font-bold text-pink-400">90%</p>
                  </div>
                </motion.div>
              )}

              {/* Credential Info */}
              {passing && (
                <motion.div
                  className="mb-8 p-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="font-semibold text-white">Credential Issued</p>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">
                    Your {skillNames[skillId] || skillId} credential has been issued and can be shared with employers.
                  </p>
                  <div className="p-3 bg-slate-800 rounded border border-slate-700 mb-3">
                    <p className="text-xs text-slate-400 break-all">
                      Hash: abc123def456xyz789...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                className="flex gap-4 flex-col md:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {passing && (
                  <>
                    <Link href={`/verify/credential123`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        View Credential
                      </Button>
                    </Link>
                    <Button className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Credential
                    </Button>
                  </>
                )}
                {!passing && (
                  <Link href={`/assessment/${skillId}`} className="w-full">
                    <Button className="w-full">
                      Retry Assessment
                    </Button>
                  </Link>
                )}
              </motion.div>
            </Card>
          </motion.div>

          {/* Back to Dashboard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Link href="/assessment">
              <Button variant="outline">Browse Other Skills</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
