import { createClient } from '@/lib/supabase/server'
import { analyzeCertificate, generateBlockchainHash } from '@/lib/certificate-analyzer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { credentialId, issuerName, skillName, level, certificateText } = body
    
    if (!credentialId || !issuerName || !skillName || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Generate blockchain hash
    const blockchainHash = generateBlockchainHash(`${credentialId}:${issuerName}:${skillName}`)
    
    // Analyze certificate
    const analysis = analyzeCertificate(
      credentialId,
      issuerName,
      skillName,
      level,
      certificateText || '',
      blockchainHash
    )
    
    // Store analysis result
    const { data: credential, error: insertError } = await supabase
      .from('credentials')
      .insert({
        user_id: user.id,
        credential_id: credentialId,
        issuer_id: user.id,
        user_email: user.email,
        skill_name: skillName,
        level,
        qr_code_url: '', // Would generate QR in production
        is_verified: analysis.verification_status === 'verified',
        blockchain_hash: blockchainHash,
        issued_at: new Date(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      })
      .select()
      .single()
    
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      credentialId: credential.id,
      analysis: {
        design_integrity_score: analysis.design_integrity_score,
        authenticity_score: analysis.authenticity_score,
        overall_trust_score: analysis.overall_trust_score,
        verification_status: analysis.verification_status,
        flags: analysis.flags,
        blockchain_hash: blockchainHash
      }
    })
    
  } catch (error) {
    console.error('[v0] Certificate analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze certificate' }, { status: 500 })
  }
}
