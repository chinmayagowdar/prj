'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Play } from 'lucide-react'

const AVAILABLE_SKILLS = [
  { name: 'JavaScript', difficulty: 'Intermediate' },
  { name: 'TypeScript', difficulty: 'Intermediate' },
  { name: 'React', difficulty: 'Intermediate' },
  { name: 'Node.js', difficulty: 'Intermediate' },
  { name: 'Python', difficulty: 'Beginner' },
  { name: 'SQL', difficulty: 'Beginner' },
  { name: 'AWS', difficulty: 'Advanced' },
  { name: 'Docker', difficulty: 'Intermediate' }
]

export default function AssessmentPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

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
            <h1 className="text-xl font-bold text-white">Skill Assessments</h1>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Proctored Assessments</h2>
          <p className="mt-2 text-slate-300">
            Take a real-world scenario-based assessment with proctored monitoring
          </p>
        </div>

        {!selectedSkill ? (
          <>
            {/* Skills Grid */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-4">Choose a Skill</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AVAILABLE_SKILLS.map((skill) => (
                  <Card
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill.name)}
                    className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                      <Play className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition" />
                    </div>
                    <p className="text-slate-300 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        skill.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-300' :
                        skill.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-red-900/30 text-red-300'
                      }`}>
                        {skill.difficulty}
                      </span>
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Info */}
            <Card className="border-slate-700 bg-slate-800/50 p-8">
              <h3 className="text-lg font-semibold text-white mb-4">How Proctored Assessments Work</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span>Camera monitoring for exam integrity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span>3 real-world scenario questions (10 min each)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span>AI-powered grading with detailed feedback</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 font-bold">4.</span>
                  <span>Verified certificate upon completion</span>
                </li>
              </ul>
            </Card>
          </>
        ) : (
          <div className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50 p-8">
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedSkill} Assessment</h3>
                <p className="text-slate-300 mb-6">
                  Ready to take the proctored assessment?
                </p>
                <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                  This assessment requires camera access for proctoring. You'll answer 3 scenario questions
                  with 10 minutes per question. Your integrity and performance will be scored.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href={`/assess/${selectedSkill.toLowerCase()}/start`}>
                    <Button className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Start Assessment
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setSelectedSkill(null)}
                    variant="outline"
                  >
                    Choose Different Skill
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>
    </main>
  )
}
