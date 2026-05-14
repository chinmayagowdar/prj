import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, XCircle, Award } from 'lucide-react'

interface VerifyPageProps {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const params = await searchParams
  const credentialId = params.credential_id

  let credential = null
  let error = null

  if (credentialId) {
    const supabase = await createClient()
    const { data, error: queryError } = await supabase
      .from('credentials')
      .select('*')
      .eq('credential_id', credentialId)
      .single()

    if (queryError) {
      error = 'Credential not found'
    } else {
      credential = data
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-white">Learn Ledger</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Verify Credential</h1>
          <p className="mt-2 text-slate-300">
            Enter a credential ID to verify its authenticity
          </p>
        </div>

        {/* Search Form */}
        <Card className="border-slate-700 bg-slate-800/50 p-8 mb-8">
          <form method="GET" className="space-y-4">
            <div>
              <label htmlFor="credential_id" className="block text-sm font-medium text-white mb-2">
                Credential ID
              </label>
              <input
                type="text"
                id="credential_id"
                name="credential_id"
                placeholder="Enter credential ID to verify"
                defaultValue={credentialId || ''}
                className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-900 text-white placeholder-slate-400 focus:border-primary focus:outline-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Verify Credential
            </Button>
          </form>
        </Card>

        {/* Results */}
        {error && (
          <Card className="border-red-900/50 bg-red-900/10 p-6">
            <div className="flex items-start gap-4">
              <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-500">Verification Failed</h3>
                <p className="mt-1 text-red-400">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {credential && (
          <Card className="border-green-900/50 bg-green-900/10 p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-green-500">Credential Verified</h3>
                  <p className="mt-1 text-green-400">
                    This credential has been successfully verified and is authentic.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-6 border-t border-slate-700">
                <div>
                  <p className="text-sm text-slate-400">Credential ID</p>
                  <p className="mt-1 font-mono text-white break-all">{credential.credential_id}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Skill</p>
                  <p className="mt-1 text-white font-semibold">{credential.skill_name}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Level</p>
                  <p className="mt-1 text-white">{credential.level}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">User Email</p>
                  <p className="mt-1 text-white">{credential.user_email}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Issued</p>
                  <p className="mt-1 text-white">
                    {new Date(credential.issued_at).toLocaleDateString()}
                  </p>
                </div>

                {credential.expires_at && (
                  <div>
                    <p className="text-sm text-slate-400">Expires</p>
                    <p className="mt-1 text-white">
                      {new Date(credential.expires_at).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <p className="text-sm text-slate-400">Blockchain Hash</p>
                  <p className="mt-1 font-mono text-white text-xs break-all">
                    {credential.blockchain_hash}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {!error && !credential && (
          <div className="text-center text-slate-400">
            <p>Enter a credential ID above to verify</p>
          </div>
        )}
      </section>
    </main>
  )
}
