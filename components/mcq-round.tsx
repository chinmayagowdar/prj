'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'
import { Timer } from './timer'

interface MCQQuestion {
  id: string
  question: string
  options: string[]
  correct_index: number
  explanation: string
}

interface MCQRoundProps {
  questions: MCQQuestion[]
  onComplete: (score: number) => void
  durationSeconds?: number
}

export function MCQRound({ questions, onComplete, durationSeconds = 60 }: MCQRoundProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showFeedback, setShowFeedback] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showFeedback && !isAnswered) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = optionIndex
      setAnswers(newAnswers)
      setIsAnswered(true)
      setShowFeedback(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
      setIsAnswered(false)
    } else {
      const score = calculateScore()
      onComplete(score)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, idx) => {
      if (answer === questions[idx].correct_index) {
        correct++
      }
    })
    return (correct / questions.length) * 100
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers[currentQuestion]
  const isCorrect = selectedAnswer === question.correct_index

  return (
    <div className="space-y-6">
      {/* Timer */}
      <Card className="border-slate-700 bg-slate-800/30 p-4">
        <Timer durationSeconds={durationSeconds} onTimeUp={handleNext} variant="critical" />
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition ${
                idx < currentQuestion
                  ? 'bg-green-500'
                  : idx === currentQuestion
                    ? 'bg-cyan-400'
                    : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-slate-700 bg-slate-800/30 p-8">
        <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => {
            const selected = selectedAnswer === idx
            const correct = idx === question.correct_index
            const showAsCorrect = showFeedback && correct
            const showAsIncorrect = showFeedback && selected && !correct

            return (
              <motion.button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={showFeedback}
                whileHover={{ scale: !showFeedback ? 1.02 : 1 }}
                whileTap={{ scale: !showFeedback ? 0.98 : 1 }}
                className={`w-full p-4 rounded-lg text-left transition flex items-start gap-3 ${
                  showAsCorrect
                    ? 'bg-green-500/20 border border-green-500/50'
                    : showAsIncorrect
                      ? 'bg-red-500/20 border border-red-500/50'
                      : selected
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-slate-700/50 border border-slate-600 hover:bg-slate-700/70'
                }`}
              >
                <div className="mt-0.5">
                  {showAsCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : showAsIncorrect ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
                  )}
                </div>
                <span className="text-white">{option}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-8 ${
              isCorrect
                ? 'bg-green-500/10 border border-green-500/50'
                : 'bg-red-500/10 border border-red-500/50'
            }`}
          >
            <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </motion.div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              onClick={handleNext}
              className="w-full"
            >
              {currentQuestion === questions.length - 1 ? 'Complete Round' : 'Next Question'}
            </Button>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
