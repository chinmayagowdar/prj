'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Trophy, Zap, Code, Users, Award, Star, CheckCircle } from 'lucide-react'
import { slideInFromBottomVariants, containerVariants, itemVariants } from '@/lib/animations'

const TESTIMONIALS = [
  {
    name: 'Alex Chen',
    role: 'Computer Science Student',
    avatar: 'A',
    text: 'Learn Ledger completely changed how I approach skill learning. The gamification keeps me motivated!',
  },
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    avatar: 'S',
    text: 'Finally, a platform that validates my skills with actual assessments. Game-changer for my career.',
  },
  {
    name: 'Michael Ross',
    role: 'Career Transitioner',
    avatar: 'M',
    text: 'The leaderboards and achievements made learning fun again. Highly recommend to anyone upskilling!',
  },
]

const STATS = [
  { label: 'Active Learners', value: '50K+', icon: Users },
  { label: 'Skills Verified', value: '100K+', icon: CheckCircle },
  { label: 'Avg. Score Boost', value: '+45%', icon: TrendingUp },
  { label: 'Countries', value: '120+', icon: Globe },
]

import { TrendingUp, Globe } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LL</span>
              </div>
              <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Learn Ledger
              </span>
            </Link>
            <div className="flex gap-3">
              <Link href="/auth/login">
                <Button variant="outline" className="hidden sm:inline-flex">Sign In</Button>
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

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} variants={itemVariants} className="text-center">
                  <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-slate-400">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our simple four-step process gets you verified and earning XP in minutes
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { step: '1', title: 'Sign Up', desc: 'Create your account in 30 seconds' },
            { step: '2', title: 'Complete Assessments', desc: 'Take proctored skill evaluations' },
            { step: '3', title: 'Earn Credentials', desc: 'Get verified certificates' },
            { step: '4', title: 'Climb Rankings', desc: 'Compete on the leaderboard' },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              <Card className="border-slate-700 bg-slate-800/30 p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </Card>
              {idx < 3 && (
                <div className="hidden md:block absolute top-12 -right-4 text-cyan-400/30">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Loved by Learners</h2>
          <p className="text-slate-400">See what students and professionals say about their experience</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="border-slate-700 bg-slate-800/30 p-6 flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 flex-1 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-slate-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
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
