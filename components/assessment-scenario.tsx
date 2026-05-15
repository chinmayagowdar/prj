'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Loader, Timer } from 'lucide-react'

interface AssessmentScenarioProps {
  scenarioId: string
  scenarioOrder: number
  totalScenarios: number
  type: 'code_fix' | 'case_study' | 'bug_analysis' | 'design_review'
  scenarioText: string
  timeLimitMinutes: number
  maxPoints: number
  onSubmit: (submission: string) => Promise<void>
  onNavigate?: (direction: 'next' | 'prev') => void
}

export function AssessmentScenario({
  scenarioId,
  scenarioOrder,
  totalScenarios,
  type,
  scenarioText,
  timeLimitMinutes,
  maxPoints,
  onSubmit,
  onNavigate
}: AssessmentScenarioProps) {
  const [submission, setSubmission] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60)
  const [isWarning, setIsWarning] = useState(false)

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Check for time warning
  useEffect(() => {
    setIsWarning(timeRemaining < 60)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTypeLabel = (t: string) => {
    switch (t) {
      case 'code_fix':
        return 'Code Fix Challenge'
      case 'case_study':
        return 'Case Study'
      case 'bug_analysis':
        return 'Bug Analysis'
      case 'design_review':
        return 'Design Review'
      default:
        return t
    }
  }

  const getPlaceholder = (t: string) => {
    switch (t) {
      case 'code_fix':
        return 'Paste your fixed code here...\n\nInclude comments explaining your solution.'
      case 'case_study':
        return 'Describe your approach to this case study...\n\nInclude problem analysis and solution.'
      case 'bug_analysis':
        return 'Analyze the bug and describe:\n1. Root cause\n2. How to fix it\n3. How to prevent it'
      case 'design_review':
        return 'Provide a design review covering:\n1. Architecture\n2. Scalability\n3. Security concerns'
      default:
        return 'Enter your response...'
    }
  }

  async function handleSubmit() {
    if (!submission.trim()) {
      setError('Please provide a response before submitting')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      await onSubmit(submission)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card className="border-slate-700 bg-slate-800/50 p-8">
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Response Submitted!</h3>
          <p className="text-slate-300 mb-6">Your response has been graded and recorded.</p>
          <div className="flex gap-3 justify-center">
            {scenarioOrder < totalScenarios && (
              <Button onClick={() => onNavigate?.('next')}>
                Next Scenario ({scenarioOrder + 1}/{totalScenarios})
              </Button>
            )}
            {scenarioOrder === totalScenarios && (
              <Button>
                View Results
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{getTypeLabel(type)}</h2>
          <p className="text-slate-400 text-sm mt-1">
            Scenario {scenarioOrder} of {totalScenarios}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isWarning
            ? 'bg-red-900/30 text-red-300'
            : 'bg-slate-700/50 text-slate-300'
        }`}>
          <Timer className="h-5 w-5" />
          <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Scenario */}
      <Card className="border-slate-700 bg-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Scenario</h3>
        <p className="text-slate-300 whitespace-pre-wrap">{scenarioText}</p>
        <div className="mt-4 flex justify-between text-xs text-slate-400">
          <span>Max Points: {maxPoints}</span>
          <span>Time Limit: {timeLimitMinutes} minutes</span>
        </div>
      </Card>

      {/* Response Area */}
      <Card className="border-slate-700 bg-slate-800/50 p-6">
        <label className="block text-sm font-medium text-slate-200 mb-3">
          Your Response
        </label>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder={getPlaceholder(type)}
          disabled={isSubmitting}
          rows={10}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-4 py-3 placeholder-slate-500 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{submission.length} characters</span>
          <span className={submission.length < 20 ? 'text-yellow-400' : ''}>
            {submission.length < 20 ? 'Too short - provide more detail' : 'Length OK'}
          </span>
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className="flex gap-3 bg-red-900/20 border border-red-900/50 rounded-lg p-4">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {scenarioOrder > 1 && (
          <Button
            onClick={() => onNavigate?.('prev')}
            variant="outline"
            disabled={isSubmitting}
          >
            Previous
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Response'
          )}
        </Button>
      </div>
    </div>
  )
}
