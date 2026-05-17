'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

interface RoundStepperProps {
  currentRound: number
  totalRounds: number
  scores: (number | null)[]
}

export function RoundStepper({ currentRound, totalRounds, scores }: RoundStepperProps) {
  const rounds = [
    { number: 1, name: 'Multiple Choice', duration: '60 sec' },
    { number: 2, name: 'Coding Challenge', duration: '10 min' },
    { number: 3, name: 'Proctored Interview', duration: '10 min' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {rounds.slice(0, totalRounds).map((round, idx) => {
          const isCompleted = scores[round.number - 1] !== null
          const isCurrent = currentRound === round.number
          const isPending = currentRound < round.number

          return (
            <motion.div
              key={round.number}
              className="flex flex-col items-center flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className={`mb-3 p-3 rounded-full ${
                  isCompleted
                    ? 'bg-green-500/20'
                    : isCurrent
                      ? 'bg-cyan-500/20'
                      : 'bg-slate-700/30'
                }`}
                whileHover={isCurrent ? { scale: 1.1 } : {}}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Circle
                    className={`w-6 h-6 ${isCurrent ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-500'}`}
                  />
                )}
              </motion.div>

              {/* Text */}
              <p className={`text-sm font-semibold text-center ${
                isCurrent ? 'text-cyan-300' : isCompleted ? 'text-green-400' : 'text-slate-400'
              }`}>
                Round {round.number}
              </p>
              <p className="text-xs text-slate-500 text-center">{round.name}</p>

              {/* Score */}
              {isCompleted && scores[round.number - 1] !== null && (
                <p className="text-xs text-green-400 font-bold mt-1">
                  {Math.round(scores[round.number - 1] as number)}%
                </p>
              )}

              {/* Line Connector */}
              {idx < totalRounds - 1 && (
                <div className={`absolute right-0 top-6 w-full h-0.5 ${
                  isCompleted ? 'bg-green-500' : 'bg-slate-700'
                }`} style={{
                  left: 'calc(50% + 1.5rem)',
                  right: 'calc(-50%)',
                }} />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
