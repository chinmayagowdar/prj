import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, FileText, Award, LogOut, TrendingUp } from 'lucide-react'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user skills
  const { data: skills } = await supabase
    .from('skills_assessments')
    .select('*')
    .eq('user_id', user.id)

  // Calculate total XP
  const totalXp = skills?.reduce((sum, skill) => sum + skill.total_xp, 0) || 0

  async function handleSignOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">Learn Ledger</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-300">{profile?.full_name || user.email}</span>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
          <p className="mt-2 text-slate-300">Manage your skills, resumes, and credentials</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Total XP</p>
                <p className="mt-2 text-3xl font-bold text-white">{totalXp}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Skills Assessed</p>
                <p className="mt-2 text-3xl font-bold text-white">{skills?.length || 0}</p>
              </div>
              <Brain className="h-12 w-12 text-accent" />
            </div>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Level</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {Math.floor(totalXp / 1000) + 1}
                </p>
              </div>
              <Award className="h-12 w-12 text-secondary" />
            </div>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/assess">
            <Card className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition cursor-pointer">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white">Start Assessment</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Take a skill assessment and earn XP
              </p>
            </Card>
          </Link>

          <Link href="/resume">
            <Card className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition cursor-pointer">
              <FileText className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-white">Upload Resume</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Analyze and score your resume
              </p>
            </Card>
          </Link>

          <Link href="/credentials">
            <Card className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition cursor-pointer">
              <Award className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-lg font-semibold text-white">View Credentials</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Check your earned certificates
              </p>
            </Card>
          </Link>

          <Link href="/report">
            <Card className="border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-700/50 transition cursor-pointer">
              <TrendingUp className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white">Competency Report</h3>
              <p className="mt-2 text-slate-300 text-sm">
                View your AI-verified skills report
              </p>
            </Card>
          </Link>
        </div>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Skills</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <Card key={skill.id} className="border-slate-700 bg-slate-800/50 p-4">
                  <h3 className="font-semibold text-white">{skill.skill_name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      skill.level === 'Expert' ? 'bg-primary/20 text-primary' :
                      skill.level === 'Advanced' ? 'bg-accent/20 text-accent' :
                      skill.level === 'Intermediate' ? 'bg-secondary/20 text-secondary' :
                      'bg-slate-700/20 text-slate-300'
                    }`}>
                      {skill.level}
                    </span>
                    <span className="text-slate-300 text-sm">{skill.total_xp} XP</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
