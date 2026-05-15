import { createClient } from '@/lib/supabase/server'
import { parseResume, calculateResumeScore } from '@/lib/resume-parser'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { resumeText, fileName } = body
    
    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
    }
    
    // Parse the resume
    const parsed = parseResume(resumeText)
    const score = calculateResumeScore(parsed)
    
    // Store in database
    const { data: resume, error: insertError } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        file_name: fileName || 'resume.txt',
        file_url: '',
        file_hash: Buffer.from(resumeText).toString('base64').slice(0, 64),
        parsed_content: parsed,
        skills: parsed.skills,
        experience_years: parsed.experience_years,
        education_level: parsed.education_level,
        score,
        feedback: {
          total_skills: parsed.skills.length,
          top_skills: parsed.skills.slice(0, 5),
          strengths: ['Strong technical foundation', 'Diverse skill set'],
          recommendations: ['Add more certifications', 'Consider specialization']
        }
      })
      .select()
      .single()
    
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      resumeId: resume.id,
      score,
      skills: parsed.skills.slice(0, 10),
      experience_years: parsed.experience_years,
      education_level: parsed.education_level
    })
    
  } catch (error) {
    console.error('[v0] Resume parse error:', error)
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 })
  }
}
