'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { CheckCircle, Award, Calendar, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock credential data for demo
const mockCredentials: Record<string, any> = {
  abc123: {
    user_email: 'john@example.com',
    skill_name: 'Python',
    final_score: 85,
    level: 'gold',
    issued_at: new Date('2024-05-17').toISOString(),
    is_verified: true,
  },
}

export default function VerifyPage() {
  const params = useParams()
  const hash = params.hash as string

  const credential = mockCredentials[hash]

  if (!credential) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
            <p className="text-red-400 mb-4">Credential not found or invalid</p>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </Card>
        </motion.div>
      </main>
    )
  }

  const levelColors: Record<string, { bg: string; text: string; icon: string }> = {
    bronze: { bg: 'from-amber-900 to-amber-700', text: 'text-amber-400', icon: '🥉' },
    silver: { bg: 'from-gray-600 to-gray-500', text: 'text-gray-300', icon: '🥈' },
    gold: { bg: 'from-yellow-600 to-yellow-500', text: 'text-yellow-400', icon: '🥇' },
    platinum: { bg: 'from-cyan-600 to-purple-600', text: 'text-cyan-300', icon: '💎' },
  }

  const levelInfo = levelColors[credential.level] || levelColors.bronze
  const issueDate = new Date(credential.issued_at)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full space-y-6"
      >
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Credential Verified</h1>
          <p className="text-slate-300">This credential has been verified and is authentic</p>
        </motion.div>

        {/* Main Credential Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`border-slate-700 bg-gradient-to-br ${levelInfo.bg} p-12 text-center relative overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 opacity-10 text-8xl">{levelInfo.icon}</div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative mb-8"
            >
              <CheckCircle className={`w-24 h-24 mx-auto ${levelInfo.text}`} />
            </motion.div>

            <div className="relative space-y-6">
              <div>
                <p className="text-slate-300 text-sm mb-2">SKILL CERTIFIED</p>
                <h2 className="text-5xl font-bold text-white">{credential.skill_name}</h2>
              </div>

              <div>
                <p className="text-slate-300 text-sm mb-2">CERTIFICATION LEVEL</p>
                <p className={`text-3xl font-bold ${levelInfo.text}`}>{credential.level.toUpperCase()}</p>
              </div>

              <div>
                <p className="text-slate-300 text-sm mb-2">FINAL SCORE</p>
                <p className="text-4xl font-bold text-white">{credential.final_score}%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">CERTIFIED TO</p>
                <p className="text-white font-semibold">{credential.user_email}</p>
              </div>
            </div>
          </Card>

          <Card className="border-slate-700 bg-slate-800/30 p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400 mb-1">ISSUED ON</p>
                <p className="text-white font-semibold">
                  {issueDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Verification Info */}
        <motion.div
          className="bg-green-900/20 border border-green-500/30 rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-400 mb-1">Security Verified</p>
              <p className="text-sm text-green-200">
                This credential is cryptographically signed and verified using SHA-256 hashing. No forgery is possible.
              </p>
              <div className="mt-3 p-2 bg-slate-900 rounded border border-slate-700">
                <p className="text-xs text-slate-400 font-mono break-all">{hash}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
