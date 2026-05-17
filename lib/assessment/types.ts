export interface Assessment {
  id: string
  user_id: string
  skill_category: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  status: 'not_started' | 'in_progress' | 'completed' | 'passed' | 'failed'
  started_at: string | null
  completed_at: string | null
  final_score: number | null
  total_scenarios: number
  integrity_score: number | null
  created_at: string
  updated_at: string
}

export interface Scenario {
  id: string
  assessment_id: string
  scenario_order: number
  scenario_type: 'mcq' | 'code' | 'proctored'
  scenario_text: string
  time_limit_minutes: number
  max_points: number
  user_submission: string | null
  score: number | null
  grader_notes: string | null
  created_at: string
}

export interface MCQOption {
  id: string
  text: string
  is_correct: boolean
}

export interface MCQQuestion {
  id: string
  question_text: string
  options: MCQOption[]
  explanation: string
  level: 'easy' | 'medium' | 'hard'
}

export interface CodeChallenge {
  id: string
  title: string
  description: string
  language: string
  template_code: string
  test_cases: TestCase[]
  hints: string[]
}

export interface TestCase {
  id: string
  input: string
  expected_output: string
  hidden: boolean
}

export interface ProctoredQuestion {
  id: string
  question_text: string
  max_points: number
  hints: string[]
}

export interface Skill {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rounds: SkillRound[]
  passing_score: number
  created_at: string
}

export interface SkillRound {
  round_number: number
  type: 'mcq' | 'code' | 'proctored'
  duration_minutes: number
  questions_count?: number
  passing_score: number
}

export interface Credential {
  id: string
  user_id: string
  skill_id: string
  skill_name: string
  user_email: string
  final_score: number
  level: 'bronze' | 'silver' | 'gold' | 'platinum'
  is_verified: boolean
  issued_at: string
  expires_at: string | null
  blockchain_hash: string | null
  certificate_url: string | null
  qr_code_url: string | null
  created_at: string
}

export interface UserAnswer {
  id: string
  user_id: string
  question_id: string
  answer_text: string
  is_correct: boolean
  created_at: string
}
