import { createClient } from '@/lib/supabase/server'
import { aggregateCompetency, generateCompetencyReportJSON } from '@/lib/competency-aggregator'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Fetch user's resume data
    const { data: latestResume } = await supabase
      .from('resumes')
      .select('parsed_content, skills')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    // Fetch user's completed assessments
    const { data: assessments } = await supabase
      .from('assessments')
      .select('skill_category, final_score')
      .eq('user_id', user.id)
      .eq('status', 'completed')
    
    // Fetch user's verified credentials
    const { data: credentials } = await supabase
      .from('credentials')
      .select('skill_name, is_verified')
      .eq('user_id', user.id)
    
    // Prepare data for aggregation
    const resumeSkills = latestResume?.parsed_content?.skills || []
    const assessmentResults = (assessments || []).map(a => ({
      skill: a.skill_category,
      score: a.final_score || 0
    }))
    const certificates = (credentials || []).map(c => ({
      skill: c.skill_name,
      verified: c.is_verified
    }))
    
    // Aggregate competency
    const report = aggregateCompetency(resumeSkills, assessmentResults, certificates)
    report.user_id = user.id
    
    // Generate JSON for storage
    const reportJSON = generateCompetencyReportJSON(report)
    
    // Generate public share token
    const publicToken = crypto.randomBytes(16).toString('hex')
    
    // Store report
    const { data: savedReport, error: insertError } = await supabase
      .from('competency_reports')
      .insert({
        user_id: user.id,
        report_data: reportJSON,
        public_share_token: publicToken,
        generated_at: new Date()
      })
      .select()
      .single()
    
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      report_id: savedReport.id,
      overall_proficiency: report.overall_proficiency,
      verified_skills_count: report.verified_skills_count,
      total_skills: report.skills.length,
      assessment_completion_rate: Math.round(report.assessment_completion_rate * 100),
      public_share_url: `/report/${publicToken}`,
      skills: report.skills.slice(0, 10)
    })
    
  } catch (error) {
    console.error('[v0] Competency report error:', error)
    return NextResponse.json({ error: 'Failed to generate competency report' }, { status: 500 })
  }
}
