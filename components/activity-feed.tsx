'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Zap, Trophy, Award, TrendingUp } from 'lucide-react'

interface ActivityEntry {
  id: string
  type: 'xp' | 'achievement' | 'assessment' | 'leaderboard'
  user: string
  action: string
  xpAmount?: number
  timestamp: string
}

interface ActivityFeedProps {
  activities: ActivityEntry[]
}

const activityIcons = {
  xp: Zap,
  achievement: Trophy,
  assessment: Award,
  leaderboard: TrendingUp,
}

const activityColors = {
  xp: 'from-yellow-500 to-amber-500',
  achievement: 'from-purple-500 to-pink-500',
  assessment: 'from-blue-500 to-cyan-500',
  leaderboard: 'from-green-500 to-emerald-500',
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {activities.map((activity) => {
        const Icon = activityIcons[activity.type]
        const color = activityColors[activity.type]

        return (
          <motion.div key={activity.id} variants={itemVariants}>
            <Card className="border-slate-700 bg-slate-800/30 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{activity.user}</p>
                  <p className="text-sm text-slate-400">{activity.action}</p>
                </div>
                <div className="text-right">
                  {activity.xpAmount && (
                    <p className="text-sm font-bold text-cyan-300">+{activity.xpAmount} XP</p>
                  )}
                  <p className="text-xs text-slate-500">{activity.timestamp}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
