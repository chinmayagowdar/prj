'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Award, BookOpen, Code } from 'lucide-react'

interface Skill {
  name: string
  confidence: number
  category: string
}

interface ResumeAnalysisProps {
  score: number
  skills: Skill[]
  experience_years: number
  education_level: string
}

export function ResumeAnalysis({
  score,
  skills,
  experience_years,
  education_level
}: ResumeAnalysisProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    if (score >= 55) return 'text-orange-400'
    return 'text-red-400'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-900/30 text-green-300'
    if (confidence >= 60) return 'bg-blue-900/30 text-blue-300'
    return 'bg-slate-700 text-slate-300'
  }

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-2">Overall Resume Score</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-slate-400">/100</span>
            </div>
          </div>
          <TrendingUp className={`h-16 w-16 ${getScoreColor(score)}`} />
        </div>
      </Card>

      {/* Career Info */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-start gap-3">
            <Award className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <p className="text-slate-400 text-sm">Experience</p>
              <p className="text-2xl font-bold text-white">{experience_years}+ years</p>
            </div>
          </div>
        </Card>

        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-purple-400 mt-1" />
            <div>
              <p className="text-slate-400 text-sm">Education</p>
              <p className="text-lg font-bold text-white">{education_level}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Detected Skills</h3>
        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="space-y-3">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Code className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-white">{skill.name}</span>
                      <Badge className="text-xs" variant="outline">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${skill.confidence}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-semibold text-slate-300 min-w-fit">
                    {skill.confidence}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">No skills detected</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
