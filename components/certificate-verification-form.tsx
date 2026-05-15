'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AlertCircle, CheckCircle, Loader, Shield } from 'lucide-react'

interface CertificateAnalysisProps {
  onSuccess?: (data: any) => void
}

export function CertificateVerificationForm({ onSuccess }: CertificateAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    credentialId: '',
    issuerName: '',
    skillName: '',
    level: '',
    certificateText: ''
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const { credentialId, issuerName, skillName, level, certificateText } = formData
    
    if (!credentialId || !issuerName || !skillName || !level) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/certificate/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentialId,
          issuerName,
          skillName,
          level,
          certificateText
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to analyze certificate')
      }

      const result = await response.json()
      setSuccess(true)
      if (onSuccess) onSuccess(result)
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ credentialId: '', issuerName: '', skillName: '', level: '', certificateText: '' })
        setSuccess(false)
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify certificate')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-8">
      {success ? (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Certificate Verified!</h3>
          <p className="text-slate-300">Your credential has been analyzed and stored.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex gap-3 bg-red-900/20 border border-red-900/50 rounded-lg p-4">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Credential ID *
              </label>
              <Input
                type="text"
                placeholder="e.g., CRED-2024-001"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Issuer Name *
              </label>
              <Input
                type="text"
                placeholder="e.g., Coursera, AWS"
                value={formData.issuerName}
                onChange={(e) => setFormData({ ...formData, issuerName: e.target.value })}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Skill Name *
              </label>
              <Input
                type="text"
                placeholder="e.g., React.js, AWS Solutions Architect"
                value={formData.skillName}
                onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
                disabled={isLoading}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Proficiency Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                disabled={isLoading}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Certificate Text (Optional)
            </label>
            <textarea
              placeholder="Paste the certificate text or description..."
              value={formData.certificateText}
              onChange={(e) => setFormData({ ...formData, certificateText: e.target.value })}
              disabled={isLoading}
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 placeholder-slate-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Verifying Certificate...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Verify & Store Certificate
              </>
            )}
          </Button>
        </form>
      )}
    </Card>
  )
}
