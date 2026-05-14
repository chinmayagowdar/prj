import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

const AVAILABLE_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'AWS',
  'Docker'
]

export default async function AssessmentPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user's existing skills
  const { data: userSkills } = await supabase
    .from('skills_assessments')
    .select('skill_name')
    .eq('user_id', user.id)

  const userSkillNames = userSkills?.map(s => s.skill_name) || []

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
            <h1 className="text-xl font-bold text-white">Skill Assessment</h1>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Choose a Skill to Assess</h2>
          <p className="mt-2 text-slate-300">
            Select a skill you want to be assessed on. Answer questions across multiple difficulty levels.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {AVAILABLE_SKILLS.map((skill) => {
            const isAssessed = userSkillNames.includes(skill)
            return (
              <Link key={skill} href={`/assess/${skill.toLowerCase().replace('.', '')}`}>
                <Card className={`border-slate-700 p-6 cursor-pointer transition ${
                  isAssessed
                    ? 'bg-primary/10 border-primary/50'
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                }`}>
                  <h3 className="text-lg font-semibold text-white">{skill}</h3>
                  {isAssessed && (
                    <p className="mt-2 text-sm text-primary">✓ Already assessed</p>
                  )}
                  <p className="mt-2 text-sm text-slate-300">
                    Complete the assessment for {skill}
                  </p>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border border-slate-700 bg-slate-800/50 p-8">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <ul className="space-y-2 text-slate-300">
            <li>• You'll answer 5-10 questions per difficulty level</li>
            <li>• Start with Beginner and progress to Expert</li>
            <li>• Each correct answer earns you XP</li>
            <li>• Your level is automatically updated based on performance</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
