'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AvatarSelector } from '@/components/avatar-selector'
import { SKILL_CATEGORIES } from '@/lib/constants'
import { slideInFromRightVariants, slideInFromLeftVariants } from '@/lib/animations'

type Step = 'welcome' | 'username' | 'avatar' | 'skills' | 'complete'

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [username, setUsername] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const canProceed = () => {
    if (step === 'username') return username.trim().length > 0
    if (step === 'skills') return selectedSkills.length > 0
    return true
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            className="max-w-2xl w-full"
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-slate-700 bg-slate-800/50 p-12 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to Learn Ledger</h1>
              <p className="text-slate-300 text-lg mb-8">
                Let&apos;s set up your profile and start your gamified learning journey
              </p>
              <Button
                onClick={() => setStep('username')}
                size="lg"
                className="w-full"
              >
                Get Started
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 'username' && (
          <motion.div
            key="username"
            className="max-w-2xl w-full"
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-slate-700 bg-slate-800/50 p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Choose Your Username</h2>
              <input
                type="text"
                placeholder="Enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && setStep('avatar')}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 mb-6"
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('welcome')}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('avatar')}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'avatar' && (
          <motion.div
            key="avatar"
            className="max-w-2xl w-full"
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-slate-700 bg-slate-800/50 p-12">
              <h2 className="text-3xl font-bold text-white mb-8">Choose Your Avatar</h2>
              <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
              <div className="flex gap-3 mt-8">
                <Button
                  onClick={() => setStep('username')}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('skills')}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'skills' && (
          <motion.div
            key="skills"
            className="max-w-2xl w-full"
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-slate-700 bg-slate-800/50 p-12">
              <h2 className="text-3xl font-bold text-white mb-2">Select Your Skills</h2>
              <p className="text-slate-300 mb-6">Choose at least one skill to get started</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {SKILL_CATEGORIES.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-cyan-500 text-white border-cyan-400'
                        : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                    } border`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('avatar')}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep('complete')}
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Complete
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'complete' && (
          <motion.div
            key="complete"
            className="max-w-2xl w-full text-center"
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border-slate-700 bg-slate-800/50 p-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome, {username}!</h2>
              <p className="text-slate-300 text-lg mb-8">
                Your profile is ready. Start earning XP and climbing the leaderboard!
              </p>
              <Link href="/dashboard" className="w-full">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
