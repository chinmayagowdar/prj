'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Settings, Bell, Lock, Eye, Volume2, Palette, HelpCircle, LogOut } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'
import { useToast } from '@/lib/hooks/use-toast'
import { ToastContainer } from '@/components/toast'

export default function SettingsPage() {
  const { toasts, success, info, removeToast } = useToast()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const handleSave = () => {
    success('Settings saved successfully!')
  }

  const handleLogout = () => {
    info('Logging out...')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white">Enable Notifications</label>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-slate-400">
                  Receive updates about achievements, leaderboard changes, and new assessments
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Audio Settings */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Volume2 className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Audio</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white">Enable Sound Effects</label>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-slate-400">
                  Play sounds for achievements, level ups, and other events
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Display Settings */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Display</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white">Dark Mode</label>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-slate-400">
                  Use dark theme for comfortable viewing
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Privacy & Security</h2>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="w-4 h-4 mr-2" />
                  Two-Factor Authentication
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Help & Support */}
          <motion.div variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-6">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Help & Support</h2>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Documentation
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 pt-6">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex-1">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </main>
  )
}
