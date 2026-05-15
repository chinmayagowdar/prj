'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Shield, TrendingUp } from 'lucide-react'

interface CertificateAnalysisResult {
  analysis: {
    design_integrity_score: number
    authenticity_score: number
    overall_trust_score: number
    verification_status: 'verified' | 'suspicious' | 'invalid'
    flags: string[]
    blockchain_hash: string
  }
}

export function CertificateAnalysisDisplay({ analysis }: CertificateAnalysisResult) {
  const getTrustColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-900/30 text-green-300'
      case 'suspicious':
        return 'bg-yellow-900/30 text-yellow-300'
      case 'invalid':
        return 'bg-red-900/30 text-red-300'
      default:
        return 'bg-slate-700 text-slate-300'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <Card className={`border-slate-700 p-6 ${getTrustColor(analysis.verification_status)}`}>
        <div className="flex items-center gap-4">
          {analysis.verification_status === 'verified' && (
            <CheckCircle className="h-10 w-10 flex-shrink-0" />
          )}
          {analysis.verification_status === 'suspicious' && (
            <AlertTriangle className="h-10 w-10 flex-shrink-0" />
          )}
          {analysis.verification_status === 'invalid' && (
            <AlertTriangle className="h-10 w-10 flex-shrink-0" />
          )}
          <div>
            <p className="text-sm font-medium opacity-75">Verification Status</p>
            <p className="text-2xl font-bold capitalize">{analysis.verification_status}</p>
          </div>
        </div>
      </Card>

      {/* Scores */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Design Integrity</p>
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
          <p className={`text-3xl font-bold ${getScoreColor(analysis.design_integrity_score)}`}>
            {analysis.design_integrity_score}
          </p>
          <p className="text-slate-400 text-xs mt-2">/100</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Authenticity</p>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </div>
          <p className={`text-3xl font-bold ${getScoreColor(analysis.authenticity_score)}`}>
            {analysis.authenticity_score}
          </p>
          <p className="text-slate-400 text-xs mt-2">/100</p>
        </Card>

        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Overall Trust</p>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </div>
          <p className={`text-3xl font-bold ${getScoreColor(analysis.overall_trust_score)}`}>
            {analysis.overall_trust_score}
          </p>
          <p className="text-slate-400 text-xs mt-2">/100</p>
        </Card>
      </div>

      {/* Issues */}
      {analysis.flags.length > 0 && (
        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Issues Found</h3>
          <ul className="space-y-2">
            {analysis.flags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{flag}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Blockchain Hash */}
      <Card className="border-slate-700 bg-slate-800/50 p-6">
        <p className="text-slate-400 text-sm mb-2">Blockchain Hash</p>
        <p className="font-mono text-xs text-slate-300 break-all bg-slate-900/50 p-3 rounded">
          {analysis.blockchain_hash}
        </p>
      </Card>
    </div>
  )
}
