'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bell, Settings, LogOut, Award, Home } from 'lucide-react'
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
  const [userMenuOpen, setUserMenuOpen] = useState(false)

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
            <Link href="/achievements" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Achievements
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

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-300 hover:text-white transition relative hidden sm:block"
            >
              <Link href="/notifications">
                <Bell className="w-5 h-5" />
                <motion.div
                  className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </motion.button>

            {/* Settings */}
            <button className="text-slate-300 hover:text-white transition hidden sm:block">
              <Link href="/settings">
                <Settings className="w-5 h-5" />
              </Link>
            </button>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold hover:shadow-lg transition"
                >
                  {user.username.charAt(0)}
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition text-slate-300 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Home className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/achievements"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition text-slate-300 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Award className="w-4 h-4" />
                        Achievements
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition text-slate-300 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          onLogout?.()
                          setUserMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 transition text-red-400 border-t border-slate-700"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
              href="/achievements"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Achievements
            </Link>
            <Link
              href="/assess"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Assessments
            </Link>
            <Link
              href="/notifications"
              className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded transition"
            >
              Notifications
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
