'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface TimerProps {
  durationSeconds: number
  onTimeUp: () => void
  variant?: 'default' | 'warning' | 'critical'
}

export function Timer({ durationSeconds, onTimeUp, variant }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft, onTimeUp])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const progress = (secondsLeft / durationSeconds) * 100

  let bgColor = 'from-cyan-600 to-cyan-400'
  let textColor = 'text-cyan-400'

  if (secondsLeft <= 10 && variant !== 'default') {
    bgColor = 'from-red-600 to-red-400'
    textColor = 'text-red-400'
  } else if (secondsLeft <= durationSeconds * 0.25 && variant === 'warning') {
    bgColor = 'from-yellow-600 to-yellow-400'
    textColor = 'text-yellow-400'
  }

  return (
    <div className="flex items-center gap-3">
      <Clock className={`w-5 h-5 ${textColor}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className={`font-bold ${textColor}`}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${bgColor}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
