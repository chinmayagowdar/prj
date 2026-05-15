'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Plus } from 'lucide-react'
import { CertificateVerificationForm } from '@/components/certificate-verification-form'
import { CertificateAnalysisDisplay } from '@/components/certificate-analysis-display'

export default function CredentialsPage() {
  const [showForm, setShowForm] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

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
            <h1 className="text-xl font-bold text-white">Credential Verification</h1>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Verify Credentials</h2>
          <p className="mt-2 text-slate-300">
            Add certificates and verify their authenticity and integrity
          </p>
        </div>

        {!showForm && !analysisResult ? (
          <Card className="border-slate-700 bg-slate-800/50 p-12 text-center">
            <Plus className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Add a Certificate</h3>
            <p className="text-slate-300 mb-6">
              Submit a certificate for analysis and verification
            </p>
            <Button onClick={() => setShowForm(true)} className="w-full">
              Add Certificate
            </Button>
          </Card>
        ) : null}

        {showForm && !analysisResult ? (
          <div className="space-y-6">
            <CertificateVerificationForm onSuccess={(data) => {
              setAnalysisResult(data)
              setShowForm(false)
            }} />
            <Button 
              onClick={() => setShowForm(false)} 
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        ) : null}

        {analysisResult && (
          <div className="space-y-6">
            <CertificateAnalysisDisplay analysis={analysisResult.analysis} />
            <div className="flex gap-3">
              <Button 
                onClick={() => setAnalysisResult(null)} 
                className="flex-1"
              >
                Verify Another Certificate
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
