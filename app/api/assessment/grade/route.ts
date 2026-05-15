import { createClient } from '@/lib/supabase/server'
import { gradeScenario } from '@/lib/assessment-grader'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { assessmentId, scenarioId, type, submission, expectedKeywords, timeSpent } = body
    
    if (!assessmentId || !type || !submission) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Grade the submission
    const gradingResult = gradeScenario({
      type: type as any,
      submission,
      expectedKeywords,
      timeSpent: timeSpent || 600
    })
    
    // Update scenario with score
    const { data: scenario, error: updateError } = await supabase
      .from('assessment_scenarios')
      .update({
        score: gradingResult.score,
        grader_notes: gradingResult.feedback
      })
      .eq('id', scenarioId)
      .select()
      .single()
    
    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }
    
    // Check if assessment is complete and calculate final score
    const { data: scenarios } = await supabase
      .from('assessment_scenarios')
      .select('score')
      .eq('assessment_id', assessmentId)
    
    if (scenarios && scenarios.every(s => s.score !== null)) {
      const finalScore = Math.round(
        scenarios.reduce((sum: number, s: any) => sum + (s.score || 0), 0) / scenarios.length
      )
      
      await supabase
        .from('assessments')
        .update({
          status: 'completed',
          final_score: finalScore,
          completed_at: new Date(),
          integrity_score: Math.min(100, finalScore + 10) // Simplified integrity scoring
        })
        .eq('id', assessmentId)
    }
    
    return NextResponse.json({
      success: true,
      score: gradingResult.score,
      maxPoints: gradingResult.maxPoints,
      feedback: gradingResult.feedback,
      strengths: gradingResult.strengths,
      improvements: gradingResult.improvements
    })
    
  } catch (error) {
    console.error('[v0] Assessment grading error:', error)
    return NextResponse.json({ error: 'Failed to grade assessment' }, { status: 500 })
  }
}
