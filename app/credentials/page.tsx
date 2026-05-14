import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

export default async function CredentialsPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Get user's credentials (issued by them)
  const { data: credentials } = await supabase
    .from('credentials')
    .select('*')
    .eq('issuer_id', user.id)
    .order('issued_at', { ascending: false })

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
            <h1 className="text-xl font-bold text-white">Your Credentials</h1>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white">Credentials</h2>
          <p className="mt-2 text-slate-300">
            View and manage credentials you've issued or received
          </p>
        </div>

        {credentials && credentials.length > 0 ? (
          <div className="space-y-4">
            {credentials.map((credential) => (
              <Card key={credential.id} className="border-slate-700 bg-slate-800/50 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{credential.skill_name}</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Level: <span className="font-medium">{credential.level}</span>
                    </p>
                    <p className="text-slate-300 text-sm mt-1">
                      Recipient: <span className="font-medium">{credential.user_email}</span>
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                      ID: <span className="font-mono">{credential.credential_id}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Link
                      href={`/verify?credential_id=${credential.credential_id}`}
                      target="_blank"
                    >
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-slate-700 bg-slate-800/50 p-8 text-center">
            <p className="text-slate-300">No credentials yet</p>
          </Card>
        )}
      </section>
    </main>
  )
}
