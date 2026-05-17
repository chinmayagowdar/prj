'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, Mail } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-400" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-slate-300 mb-6">Your account has been created successfully.</p>

          <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white mb-1">Confirm Your Email</p>
                <p className="text-xs text-slate-400">
                  We&apos;ve sent a confirmation link to your email. Please click it to verify your account.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-8">
            You can sign in after confirming your email address.
          </p>

          <Link href="/auth/login">
            <Button className="w-full">Continue to Login</Button>
          </Link>
        </Card>
      </motion.div>
    </main>
  )
}
