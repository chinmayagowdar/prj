'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  const skeletons = Array.from({ length: count })

  return (
    <>
      {skeletons.map((_, i) => (
        <motion.div
          key={i}
          className={`bg-slate-700/50 rounded-lg ${className}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="border border-slate-700 bg-slate-800/30 rounded-lg p-6 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-20" />
        </div>
      ))}
    </div>
  )
}
