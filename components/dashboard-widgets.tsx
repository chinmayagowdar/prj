'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Trophy, Zap } from 'lucide-react'

interface StatCardProps {
  icon: React.ComponentType<{ className: string }>
  label: string
  value: string | number
  change?: {
    value: number
    isPositive: boolean
  }
  gradient: string
}

export function StatCard({ icon: Icon, label, value, change, gradient }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -4 }}
      className={`bg-gradient-to-br ${gradient} rounded-lg p-6 text-white border border-slate-700/50`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-300 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-50" />
      </div>
      {change && (
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-4 h-4 ${change.isPositive ? 'text-green-400' : 'text-red-400'}`} />
          <span className={`text-sm font-medium ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {change.isPositive ? '+' : '-'}{Math.abs(change.value)}% this week
          </span>
        </div>
      )}
    </motion.div>
  )
}

interface ProgressWidget {
  title: string
  current: number
  target: number
  unit: string
  color: string
}

export function ProgressWidget({ title, current, target, unit, color }: ProgressWidget) {
  const percentage = (current / target) * 100

  return (
    <motion.div
      whileHover={{ translateY: -2 }}
      className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-5"
    >
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs font-bold text-slate-400">
          {current}/{target} {unit}
        </p>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  )
}

interface QuickActionProps {
  title: string
  description: string
  icon: React.ComponentType<{ className: string }>
  onClick?: () => void
  color: string
}

export function QuickActionWidget({ title, description, icon: Icon, onClick, color }: QuickActionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`w-full bg-gradient-to-br ${color} rounded-lg p-6 text-left border border-slate-700/50 hover:border-slate-600 transition`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-300 mt-1">{description}</p>
        </div>
        <Icon className="w-6 h-6 text-white/50" />
      </div>
    </motion.button>
  )
}
