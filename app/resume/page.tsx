'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/animations'
import { ResumeUploadArea } from '@/components/resume-upload-area'
import { ResumeAnalysis } from '@/components/resume-analysis'

export default function ResumePage() {
  const [uploadedResume, setUploadedResume] = useState<any>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h1 className="text-4xl font-bold text-white">Resume Analysis</h1>
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Upload your resume to extract skills, get AI-powered feedback, and earn 50 XP
            </p>
          </motion.div>

          {/* Info Cards */}
          {!uploadedResume && (
            <motion.div
              variants={itemVariants}
              className="grid gap-4 md:grid-cols-3"
            >
              <Card className="border-slate-700 bg-slate-800/30 p-5">
                <CheckCircle className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Auto Extraction</h3>
                <p className="text-sm text-slate-400">Skills auto-extracted from your resume</p>
              </Card>
              <Card className="border-slate-700 bg-slate-800/30 p-5">
                <Sparkles className="w-6 h-6 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">AI Analysis</h3>
                <p className="text-sm text-slate-400">Get personalized improvement suggestions</p>
              </Card>
              <Card className="border-slate-700 bg-slate-800/30 p-5">
                <FileText className="w-6 h-6 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Supported Formats</h3>
                <p className="text-sm text-slate-400">PDF, DOC, DOCX files accepted</p>
              </Card>
            </motion.div>
          )}

          {!uploadedResume ? (
            <motion.div variants={itemVariants}>
              <ResumeUploadArea onSuccess={setUploadedResume} />
            </motion.div>
          ) : (
            <div className="space-y-8">
              <ResumeAnalysis
                score={uploadedResume.score}
                skills={uploadedResume.skills}
                experience_years={uploadedResume.experience_years}
                education_level={uploadedResume.education_level}
              />

              {/* XP Reward Badge */}
              <motion.div variants={itemVariants}>
                <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 p-6 text-center">
                  <p className="text-slate-400 mb-2">XP Earned</p>
                  <p className="text-4xl font-bold text-cyan-300">+50 XP</p>
                  <p className="text-sm text-slate-400 mt-2">Resume uploaded and analyzed</p>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-3">
                <Button className="flex-1">Save & Verify Skills</Button>
                <Button onClick={() => setUploadedResume(null)} variant="outline" className="flex-1">
                  Upload Different Resume
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
