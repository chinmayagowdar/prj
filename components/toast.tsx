'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  id: string
  message: string
  type: ToastType
  duration?: number
  onClose: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-900/20 border-green-700 text-green-300',
  error: 'bg-red-900/20 border-red-700 text-red-300',
  info: 'bg-cyan-900/20 border-cyan-700 text-cyan-300',
}

export function Toast({ id, message, type, duration = 4000, onClose }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, x: 400, y: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className={`flex items-center gap-3 p-4 rounded-lg border ${colors[type]} backdrop-blur`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-current hover:opacity-70 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
