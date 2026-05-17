'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Bell, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { LevelBadge } from './level-badge'

interface NavbarProps {
  user?: {
    username: string
    level: number
    totalXp: number
    avatar?: string
  }
  onLogout?: () => void
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LL</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Learn Ledger
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Leaderboard
            </Link>
            <Link href="/assess" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Assessments
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user.username}</p>
                  <p className="text-xs text-slate-400">{user.totalXp.toLocaleString()} XP</p>
                </div>
                <LevelBadge level={user.level} size="sm" />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-300 hover:text-white transition relative"
            >
              <Bell className="w-5 h-5" />
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            <button className="text-slate-300 hover:text-white transition">
              <Settings className="w-5 h-5" />
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="text-slate-300 hover:text-red-400 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2 border-t border-slate-700/50"
          >
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Leaderboard
            </Link>
            <Link
              href="/assess"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Assessments
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
