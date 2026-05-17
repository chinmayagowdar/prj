'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { CameraApproval } from '@/components/camera-approval'
import { MCQRound } from '@/components/mcq-round'
import { RoundStepper } from '@/components/round-stepper'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { mockCurrentUser } from '@/lib/mock-api'

// Sample MCQ questions for demo
const MCQ_QUESTIONS = [
  {
    id: '1',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correct_index: 1,
    explanation: 'Binary search divides the search space in half each iteration, resulting in O(log n) time complexity.',
  },
  {
    id: '2',
    question: 'Which data structure uses LIFO principle?',
    options: ['Queue', 'Stack', 'Array', 'Linked List'],
    correct_index: 1,
    explanation: 'Stack uses Last In First Out (LIFO) principle where the last element added is the first to be removed.',
  },
  {
    id: '3',
    question: 'What is the main use of hash tables?',
    options: ['Sorting data', 'Fast lookup with O(1) average time', 'Storing sequences', 'Maintaining order'],
    correct_index: 1,
    explanation: 'Hash tables provide fast lookup, insertion, and deletion operations with O(1) average time complexity.',
  },
  {
    id: '4',
    question: 'Which sorting algorithm has O(n log n) worst-case time?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    correct_index: 2,
    explanation: 'Merge Sort guarantees O(n log n) time complexity even in the worst case, unlike quicksort.',
  },
  {
    id: '5',
    question: 'What is a recursive function?',
    options: [
      'A function that calls other functions',
      'A function that calls itself',
      'A function with multiple parameters',
      'A function that never returns',
    ],
    correct_index: 1,
    explanation: 'A recursive function is one that calls itself directly or indirectly to solve subproblems.',
  },
]

export default function RoundPage() {
  const params = useParams()
  const skillId = params.skillId as string
  const roundNumber = parseInt(params.roundNumber as string)
  const router = useRouter()

  const [user] = useState(mockCurrentUser)
  const [showCamera, setShowCamera] = useState(roundNumber === 1)
  const [roundScores, setRoundScores] = useState<(number | null)[]>([null, null, null])
  const [roundComplete, setRoundComplete] = useState(false)

  const handleCameraApprove = () => {
    setShowCamera(false)
  }

  const handleCameraCancel = () => {
    router.back()
  }

  const handleRoundComplete = (score: number) => {
    const newScores = [...roundScores]
    newScores[roundNumber - 1] = score
    setRoundScores(newScores)
    setRoundComplete(true)
  }

  const handleNextRound = () => {
    if (roundNumber < 3) {
      router.push(`/assessment/${skillId}/round/${roundNumber + 1}`)
    } else {
      // All rounds complete - go to results
      router.push(`/assessment/${skillId}/results`)
    }
  }

  const handleViewResults = () => {
    router.push(`/assessment/${skillId}/results`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar user={user} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={{ container: { staggerChildren: 0.1 } }}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href={`/assessment/${skillId}`}>
              <motion.button
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Assessment</h1>
            <div className="w-20" />
          </div>

          {/* Round Stepper */}
          <RoundStepper currentRound={roundNumber} totalRounds={3} scores={roundScores} />

          {/* Camera Approval Modal */}
          <AnimatePresence>
            {showCamera && (
              <CameraApproval
                onApprove={handleCameraApprove}
                onCancel={handleCameraCancel}
              />
            )}
          </AnimatePresence>

          {/* Content */}
          {!showCamera && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {!roundComplete ? (
                <>
                  {roundNumber === 1 && (
                    <MCQRound
                      questions={MCQ_QUESTIONS}
                      onComplete={handleRoundComplete}
                      durationSeconds={60}
                    />
                  )}
                  {roundNumber === 2 && (
                    <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
                      <p className="text-slate-300 mb-4">Coding Round Coming Soon</p>
                      <Button onClick={() => handleRoundComplete(85)}>
                        Complete Round (Demo)
                      </Button>
                    </Card>
                  )}
                  {roundNumber === 3 && (
                    <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
                      <p className="text-slate-300 mb-4">Proctored Interview Round Coming Soon</p>
                      <Button onClick={() => handleRoundComplete(90)}>
                        Complete Round (Demo)
                      </Button>
                    </Card>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="border-slate-700 bg-slate-800/30 p-8 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6 }}
                      className="mb-6"
                    >
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Round {roundNumber} Complete!</h3>
                    <p className="text-slate-300 mb-8">Score: {Math.round(roundScores[roundNumber - 1] as number)}%</p>

                    {roundNumber < 3 ? (
                      <Button onClick={handleNextRound} className="w-full">
                        Continue to Round {roundNumber + 1}
                      </Button>
                    ) : (
                      <Button onClick={handleViewResults} className="w-full bg-green-600 hover:bg-green-700">
                        View Results
                      </Button>
                    )}
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
