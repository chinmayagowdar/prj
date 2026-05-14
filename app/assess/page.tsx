import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Lock } from 'lucide-react'

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
  // Assessment page - requires authentication
  // For now, show login prompt

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Link href="/">
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
          <h2 className="text-3xl font-bold text-white">Choose a Skill to Assess</h2>
          <p className="mt-2 text-slate-300">
            Test your knowledge and earn XP
          </p>
        </div>

        {/* Auth Required Notice */}
        <Card className="border-yellow-900/50 bg-yellow-900/10 p-8 mb-8">
          <div className="flex items-start gap-4">
            <Lock className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-500">Sign In Required</h3>
              <p className="mt-1 text-yellow-400 text-sm">
                You need to be logged in to start an assessment.
              </p>
              <div className="mt-4 flex gap-3">
                <Link href="/auth/login">
                  <Button>Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button variant="outline">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Available Skills Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Available Skills</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AVAILABLE_SKILLS.map((skill) => (
              <Card key={skill} className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition opacity-50">
                <h4 className="font-semibold text-white">{skill}</h4>
                <p className="text-slate-300 text-sm mt-2">Sign in to take assessment</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
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
