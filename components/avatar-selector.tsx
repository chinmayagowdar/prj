'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'

const AVATARS = [
  { id: 0, initials: 'AC', color: 'from-blue-500 to-cyan-500' },
  { id: 1, initials: 'DG', color: 'from-green-500 to-emerald-500' },
  { id: 2, initials: 'PK', color: 'from-purple-500 to-pink-500' },
  { id: 3, initials: 'RJ', color: 'from-red-500 to-orange-500' },
  { id: 4, initials: 'YS', color: 'from-yellow-500 to-amber-500' },
]

interface AvatarSelectorProps {
  selected?: number
  onSelect: (id: number) => void
}

export function AvatarSelector({ selected = 0, onSelect }: AvatarSelectorProps) {
  return (
    <motion.div
      className="grid grid-cols-5 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {AVATARS.map((avatar) => (
        <motion.button
          key={avatar.id}
          variants={itemVariants}
          onClick={() => onSelect(avatar.id)}
          className="relative"
        >
          <motion.div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center font-bold text-white text-lg cursor-pointer transition-all border-2 ${
              selected === avatar.id ? 'border-cyan-400 scale-110' : 'border-slate-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {avatar.initials}
          </motion.div>
        </motion.button>
      ))}
    </motion.div>
  )
}
