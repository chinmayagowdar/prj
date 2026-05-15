// Game progression constants
export const LEVELS = ['Novice', 'Apprentice', 'Scholar', 'Master', 'Legend'] as const
export const XP_PER_LEVEL = 1000
export const MAX_LEVEL = 5

// Achievement thresholds
export const ACHIEVEMENTS = {
  FIRST_ASSESSMENT: { id: 'first_assessment', name: 'First Steps', xp: 50 },
  PERFECT_SCORE: { id: 'perfect_score', name: 'Flawless', xp: 200 },
  STREAK_7: { id: 'streak_7', name: '7-Day Warrior', xp: 300 },
  STREAK_30: { id: 'streak_30', name: 'Unstoppable', xp: 500 },
  SKILLS_FIVE: { id: 'skills_five', name: 'Polymath', xp: 250 },
  SKILLS_TEN: { id: 'skills_ten', name: 'Master of All', xp: 500 },
  TOP_LEADERBOARD: { id: 'top_leaderboard', name: 'Champion', xp: 1000 },
} as const

// Skill categories
export const SKILL_CATEGORIES = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'AWS',
  'Docker',
] as const

// Difficulty levels
export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const

// XP rewards
export const XP_REWARDS = {
  ASSESSMENT_BEGINNER: 100,
  ASSESSMENT_INTERMEDIATE: 250,
  ASSESSMENT_ADVANCED: 500,
  RESUME_UPLOAD: 50,
  CERTIFICATE_VERIFY: 100,
  DAILY_LOGIN: 25,
} as const

// Color theme (neon cyberpunk)
export const THEME = {
  bg: '#0f0a1f',
  bgAlt: '#1a1530',
  primary: '#00f5ff', // Cyan
  secondary: '#a855f7', // Purple
  accent: '#ff00ff', // Magenta
  success: '#00ff88',
  warning: '#ffaa00',
  error: '#ff0055',
} as const
