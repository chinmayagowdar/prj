import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, FileText, Award, TrendingUp } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
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
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            Verify Your Skills,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build Your Future
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-300">
            Demonstrate your expertise through AI-powered skill assessments, upload your resume for instant analysis, and earn blockchain-verified credentials.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start Assessment
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Verify Credential
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Why Choose Learn Ledger?</h2>
          <p className="mt-4 text-slate-300">
            Comprehensive skill verification in one platform
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <Brain className="h-12 w-12 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-white">AI Assessments</h3>
            <p className="mt-2 text-slate-300">
              Multi-level skill assessments powered by intelligent scoring algorithms
            </p>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <FileText className="h-12 w-12 text-accent" />
            <h3 className="mt-4 text-lg font-semibold text-white">Resume Analysis</h3>
            <p className="mt-2 text-slate-300">
              Instant parsing and scoring of your professional documents
            </p>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <Award className="h-12 w-12 text-secondary" />
            <h3 className="mt-4 text-lg font-semibold text-white">Credentials</h3>
            <p className="mt-2 text-slate-300">
              Blockchain-verified certificates for your achievements
            </p>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-white">Gamification</h3>
            <p className="mt-2 text-slate-300">
              Track progress with XP, levels, and skill rankings
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700 p-12 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-slate-300">
            Join thousands of professionals verifying their skills
          </p>
          <Link href="/auth/sign-up" className="mt-8 inline-block">
            <Button size="lg">Create Account Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8 text-center text-slate-400">
        <p>&copy; 2024 Learn Ledger. All rights reserved.</p>
      </footer>
    </main>
  )
}
