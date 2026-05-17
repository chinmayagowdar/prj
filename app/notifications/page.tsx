'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Bell, Trash2, Archive, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'

interface Notification {
  id: string
  type: 'achievement' | 'leaderboard' | 'assessment' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: React.ComponentType<{ className: string }>
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You unlocked the "5-Day Warrior" achievement by maintaining a 5-day streak',
    timestamp: '2 hours ago',
    read: false,
    icon: CheckCircle,
  },
  {
    id: '2',
    type: 'leaderboard',
    title: 'Rank Update',
    message: 'You moved up 5 positions on the leaderboard. Keep it up!',
    timestamp: '4 hours ago',
    read: false,
    icon: Zap,
  },
  {
    id: '3',
    type: 'assessment',
    title: 'New Assessment Available',
    message: 'React Advanced Patterns assessment is now available for you to take',
    timestamp: '1 day ago',
    read: true,
    icon: AlertCircle,
  },
  {
    id: '4',
    type: 'system',
    title: 'Daily Reminder',
    message: 'Take an assessment today to maintain your streak!',
    timestamp: '2 days ago',
    read: true,
    icon: Info,
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Level Up!',
    message: 'You reached Level 12! Your XP bar is now reset for the next level',
    timestamp: '3 days ago',
    read: true,
    icon: Zap,
  },
]

const typeColors = {
  achievement: 'from-green-900/40 to-green-800/40 border-green-700/50',
  leaderboard: 'from-yellow-900/40 to-yellow-800/40 border-yellow-700/50',
  assessment: 'from-blue-900/40 to-blue-800/40 border-blue-700/50',
  system: 'from-purple-900/40 to-purple-800/40 border-purple-700/50',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifs =>
      notifs.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDelete = (id: string) => {
    setNotifications(notifs => notifs.filter(n => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-cyan-300">{unreadCount} unread</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                Mark All as Read
              </Button>
            )}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'unread'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </motion.div>

          {/* Notifications List */}
          <motion.div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
                <Bell className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No {filter === 'unread' ? 'unread ' : ''}notifications</p>
              </Card>
            ) : (
              filteredNotifications.map((notification, idx) => {
                const Icon = notification.icon
                return (
                  <motion.div
                    key={notification.id}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      className={`border bg-gradient-to-r p-5 flex items-start gap-4 transition hover:border-cyan-500/50 ${
                        typeColors[notification.type as keyof typeof typeColors]
                      } ${!notification.read ? 'border-l-4 border-l-cyan-400' : ''}`}
                    >
                      <Icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-white">{notification.title}</h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{notification.message}</p>
                        <p className="text-xs text-slate-500">{notification.timestamp}</p>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 hover:bg-slate-700/50 rounded transition"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-2 hover:bg-red-900/30 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
