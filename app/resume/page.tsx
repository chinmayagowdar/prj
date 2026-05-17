'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { ResumeUploadArea } from '@/components/resume-upload-area'
import { ResumeAnalysis } from '@/components/resume-analysis'

export default function ResumePage() {
  const [uploadedResume, setUploadedResume] = useState<any>(null)

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
            <h1 className="text-xl font-bold text-white">Resume Upload & Analysis</h1>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Upload Your Resume</h2>
          <p className="mt-2 text-slate-300">
            Upload a text resume to get instant AI-powered analysis and skill detection
          </p>
        </div>

        {!uploadedResume ? (
          <ResumeUploadArea onSuccess={setUploadedResume} />
        ) : (
          <div className="space-y-8">
            <ResumeAnalysis
              score={uploadedResume.score}
              skills={uploadedResume.skills}
              experience_years={uploadedResume.experience_years}
              education_level={uploadedResume.education_level}
            />
            <Button onClick={() => setUploadedResume(null)} variant="outline" className="w-full">
              Upload Another Resume
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}
