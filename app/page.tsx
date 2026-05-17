'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Trophy, Zap, Code, Users, Award } from 'lucide-react'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Learn Ledger
            </div>
            <div className="flex gap-3">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Start Learning</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl sm:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Level Up Your <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Earn XP, unlock achievements, and climb the leaderboard with AI-powered skill assessments and verified credentials
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-col sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Verify a Credential
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Game Features</h2>
          <p className="text-slate-400">Unlock a new way to learn and verify your skills</p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Zap className="w-12 h-12 text-cyan-400 mb-4 group-hover:animate-pulse" />
              <h3 className="text-lg font-semibold text-white mb-2">Earn XP</h3>
              <p className="text-slate-400 text-sm">
                Complete assessments and challenges to earn XP and level up
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Trophy className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">Leaderboard</h3>
              <p className="text-slate-400 text-sm">
                Compete with others and claim your spot at the top
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Award className="w-12 h-12 text-amber-400 mb-4 group-hover:rotate-12 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
              <p className="text-slate-400 text-sm">
                Unlock badges and achievements for your accomplishments
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Brain className="w-12 h-12 text-green-400 mb-4 group-hover:animate-bounce" />
              <h3 className="text-lg font-semibold text-white mb-2">AI Assessments</h3>
              <p className="text-slate-400 text-sm">
                Real-world scenarios powered by artificial intelligence
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Code className="w-12 h-12 text-pink-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">Verify Skills</h3>
              <p className="text-slate-400 text-sm">
                Get verified credentials with blockchain-backed proofs
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6 hover:bg-slate-800/50 transition cursor-pointer group">
              <Users className="w-12 h-12 text-blue-400 mb-4 group-hover:animate-pulse" />
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-slate-400 text-sm">
                Join thousands of learners on their skill verification journey
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Level Up?
          </motion.h2>
          <motion.p
            className="text-slate-300 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the gamified learning revolution and get verified today
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/auth/sign-up">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2024 Learn Ledger. Built for gamified skill verification.</p>
        </div>
      </footer>
    </main>
  )
}
