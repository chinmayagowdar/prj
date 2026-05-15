'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react'

interface ResumeUploadProps {
  onSuccess?: (data: any) => void
}

export function ResumeUploadArea({ onSuccess }: ResumeUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  async function handleFile(file: File) {
    if (!file) return

    // Read file as text
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        setIsLoading(true)
        setError(null)

        const resumeText = e.target?.result as string

        // Call API to parse resume
        const response = await fetch('/api/resume/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText,
            fileName: file.name
          })
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to parse resume')
        }

        const result = await response.json()
        if (onSuccess) onSuccess(result)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse resume')
      } finally {
        setIsLoading(false)
      }
    }

    reader.readAsText(file)
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && (file.type.includes('text') || file.name.endsWith('.txt'))) {
      handleFile(file)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-4">
      <Card className={`border-slate-700 bg-slate-800/50 p-12 border-2 transition-all ${
        dragActive ? 'border-blue-500 bg-blue-900/10' : 'border-dashed'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}>
        <div className="text-center">
          {isLoading ? (
            <>
              <Loader className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold text-white mb-2">Analyzing Resume</h3>
              <p className="text-slate-300">Please wait while we parse your resume...</p>
            </>
          ) : error ? (
            <>
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Upload Failed</h3>
              <p className="text-red-300 mb-4">{error}</p>
              <Button onClick={() => setError(null)}>Try Again</Button>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Drop your resume here</h3>
              <p className="text-slate-300 mb-6">or click to select a text file</p>
              <label>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleInputChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <Button asChild disabled={isLoading} className="cursor-pointer">
                  <span>Choose File</span>
                </Button>
              </label>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
