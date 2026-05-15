'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Loader, AlertCircle, RefreshCw } from 'lucide-react'
import { CompetencyReport } from '@/components/competency-report'

export default function ReportPage() {
  const [report, setReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadReport() {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/competency/generate', {
        method: 'POST'
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate report')
      }

      const result = await response.json()
      setReport(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Competency Report</h1>
            <button
              onClick={loadReport}
              disabled={isLoading}
              className="ml-auto p-2 hover:bg-slate-700/50 rounded-lg transition"
            >
              <RefreshCw className={`h-5 w-5 text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Your Competency Profile</h2>
          <p className="mt-2 text-slate-300">
            AI-powered multi-source skill verification aggregated from resumes, assessments, and certificates
          </p>
        </div>

        {isLoading ? (
          <Card className="border-slate-700 bg-slate-800/50 p-12 text-center">
            <Loader className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-white mb-2">Generating Report</h3>
            <p className="text-slate-300">Aggregating data from all your sources...</p>
          </Card>
        ) : error ? (
          <Card className="border-slate-700 bg-slate-800/50 p-8">
            <div className="flex gap-4">
              <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-400 mb-2">Error Loading Report</h3>
                <p className="text-slate-300 mb-4">{error}</p>
                <Button onClick={loadReport}>Try Again</Button>
              </div>
            </div>
          </Card>
        ) : report ? (
          <CompetencyReport
            overall_proficiency={report.overall_proficiency}
            verified_skills_count={report.verified_skills_count}
            total_skills={report.total_skills}
            assessment_completion_rate={report.assessment_completion_rate / 100}
            skills={report.skills}
            public_share_url={report.public_share_url}
          />
        ) : (
          <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
            <p className="text-slate-300 mb-4">No report data available</p>
            <p className="text-slate-400 text-sm">
              Complete your resume, assessments, and certificate verification to generate a report.
            </p>
          </Card>
        )}
      </section>
    </main>
  )
}
