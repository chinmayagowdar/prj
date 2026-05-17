import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateCredentialHash } from '@/lib/credentials/hashing'

export async function POST(request: NextRequest) {
  try {
    const { user_id, skill_id, final_score } = await request.json()

    if (!user_id || !skill_id || final_score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (final_score < 70) {
      return NextResponse.json(
        { error: 'Score does not meet passing threshold (70%)' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const now = new Date()
    const credentialHash = generateCredentialHash(user_id, skill_id, final_score, now)

    // Insert credential into database
    const { data, error } = await supabase
      .from('credentials')
      .insert({
        user_id,
        skill_id,
        final_score,
        blockchain_hash: credentialHash,
        is_verified: true,
        issued_at: now.toISOString(),
      })
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to issue credential' },
        { status: 500 }
      )
    }

    const credential = data[0]
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify/${credentialHash}`

    return NextResponse.json({
      credential_id: credential.id,
      hash: credentialHash,
      verification_url: verificationUrl,
      issued_at: credential.issued_at,
    })
  } catch (error) {
    console.error('Credential API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
