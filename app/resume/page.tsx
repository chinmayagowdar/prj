import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Upload } from 'lucide-react'

export default async function ResumePage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user's resumes
  const { data: resumes } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

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
            Upload a PDF resume to get instant AI-powered analysis and scoring
          </p>
        </div>

        {/* Upload Area */}
        <Card className="border-slate-700 bg-slate-800/50 p-12 mb-12 border-2 border-dashed">
          <div className="text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Drop your resume here</h3>
            <p className="text-slate-300 mb-6">or click to select a PDF file</p>
            <input
              type="file"
              accept=".pdf"
              disabled
              className="hidden"
            />
            <Button disabled>Upload Resume (Coming Soon)</Button>
          </div>
        </Card>

        {/* Previous Uploads */}
        {resumes && resumes.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Your Resumes</h3>
            <div className="space-y-4">
              {resumes.map((resume) => (
                <Card key={resume.id} className="border-slate-700 bg-slate-800/50 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{resume.file_name}</h4>
                      <p className="text-slate-300 text-sm mt-1">
                        Score: <span className="font-bold">{resume.score || 0}/100</span>
                      </p>
                      <p className="text-slate-400 text-xs mt-1">
                        Uploaded {new Date(resume.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        (resume.score || 0) >= 80 ? 'bg-green-900/30 text-green-300' :
                        (resume.score || 0) >= 60 ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-red-900/30 text-red-300'
                      }`}>
                        {resume.score || 0 === 0 ? 'Pending' : 'Analyzed'}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(!resumes || resumes.length === 0) && (
          <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
            <p className="text-slate-300">No resumes uploaded yet</p>
          </Card>
        )}
      </section>
    </main>
  )
}
