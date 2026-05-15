'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Award, BarChart3, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Skill {
  name: string
  category: string
  trust_score: number
  verified: boolean
  sources: {
    resume: number
    assessment: number
    certificate: boolean
  }
}

interface CompetencyReportProps {
  overall_proficiency: number
  verified_skills_count: number
  total_skills: number
  assessment_completion_rate: number
  skills: Skill[]
  public_share_url?: string
}

export function CompetencyReport({
  overall_proficiency,
  verified_skills_count,
  total_skills,
  assessment_completion_rate,
  skills,
  public_share_url
}: CompetencyReportProps) {
  const getTrustColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getTrustBg = (score: number) => {
    if (score >= 80) return 'bg-green-900/20'
    if (score >= 60) return 'bg-yellow-900/20'
    if (score >= 40) return 'bg-orange-900/20'
    return 'bg-red-900/20'
  }

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Overall Proficiency</p>
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>
          <p className={`text-4xl font-bold ${getTrustColor(overall_proficiency)}`}>
            {overall_proficiency}%
          </p>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Verified Skills</p>
            <Award className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white">
            {verified_skills_count}/{total_skills}
          </p>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Assessment Rate</p>
            <BarChart3 className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-white">
            {Math.round(assessment_completion_rate * 100)}%
          </p>
        </Card>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800/50 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Total Skills</p>
            <Award className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="text-4xl font-bold text-white">{total_skills}</p>
        </Card>
      </div>

      {/* Skills Breakdown */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Skills Breakdown</h3>
        <div className="space-y-3">
          {skills.length > 0 ? (
            skills.map((skill, idx) => (
              <Card key={idx} className="border-slate-700 bg-slate-800/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div>
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                      <p className="text-slate-400 text-xs">{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {skill.verified && (
                      <Badge className="bg-green-900/30 text-green-300">Verified</Badge>
                    )}
                    <span className={`text-lg font-bold ${getTrustColor(skill.trust_score)}`}>
                      {skill.trust_score}%
                    </span>
                  </div>
                </div>

                {/* Trust Score Bar */}
                <div className="mb-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getTrustBg(skill.trust_score)}`}
                      style={{ width: `${skill.trust_score}%` }}
                    />
                  </div>
                </div>

                {/* Source Breakdown */}
                <div className="flex gap-4 text-xs text-slate-400">
                  {skill.sources.resume > 0 && (
                    <span>Resume: {skill.sources.resume}%</span>
                  )}
                  {skill.sources.assessment > 0 && (
                    <span>Assessment: {skill.sources.assessment}%</span>
                  )}
                  {skill.sources.certificate && (
                    <span>Certificate: Verified</span>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="border-slate-700 bg-slate-800/50 p-6 text-center">
              <p className="text-slate-400">No skills data available yet</p>
            </Card>
          )}
        </div>
      </div>

      {/* Public Share */}
      {public_share_url && (
        <Card className="border-slate-700 bg-slate-800/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white mb-1">Public Share</h4>
              <p className="text-slate-400 text-sm">Share your competency report with employers</p>
            </div>
            <Button className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Report
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
