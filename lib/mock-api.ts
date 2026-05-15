import { UserProfile, LeaderboardEntry } from '@/lib/store/game-store'
import { SKILL_CATEGORIES } from '@/lib/constants'

const DELAY = 500 // Simulate network delay

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
export const mockUsers = [
  { id: '1', username: 'AlexCode', avatar: 0, level: 5, xp: 450, totalXp: 4500 },
  { id: '2', username: 'CodeNinja', avatar: 1, level: 4, xp: 800, totalXp: 3800 },
  { id: '3', username: 'SkillMaster', avatar: 2, level: 4, xp: 200, totalXp: 3200 },
  { id: '4', username: 'WebWizard', avatar: 3, level: 3, xp: 600, totalXp: 2600 },
  { id: '5', username: 'DevHero', avatar: 4, level: 3, xp: 100, totalXp: 2100 },
]

// Mock leaderboard
export const mockLeaderboard: LeaderboardEntry[] = mockUsers
  .map((user, index) => ({
    ...user,
    rank: index + 1,
  }))
  .sort((a, b) => b.totalXp - a.totalXp)

// Mock current user
export const mockCurrentUser: UserProfile = {
  id: 'current',
  username: 'YourUsername',
  avatar: 0,
  level: 2,
  xp: 450,
  totalXp: 1450,
  streak: 5,
  achievements: ['first_assessment', 'streak_7'],
  skills: [
    { name: 'JavaScript', proficiency: 85, xp: 500 },
    { name: 'React', proficiency: 75, xp: 400 },
    { name: 'TypeScript', proficiency: 65, xp: 300 },
  ],
}

// API functions
export const mockApi = {
  // User endpoints
  async getCurrentUser(): Promise<UserProfile> {
    await sleep(DELAY)
    return mockCurrentUser
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    await sleep(DELAY)
    const user = mockUsers.find((u) => u.id === userId)
    if (!user) throw new Error('User not found')
    return {
      ...user,
      streak: Math.floor(Math.random() * 30),
      achievements: [],
      skills: SKILL_CATEGORIES.slice(0, Math.floor(Math.random() * 5) + 2).map((skill) => ({
        name: skill,
        proficiency: Math.floor(Math.random() * 100),
        xp: Math.floor(Math.random() * 1000),
      })),
    }
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await sleep(DELAY)
    return { ...mockCurrentUser, ...updates }
  },

  // Leaderboard endpoints
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    await sleep(DELAY)
    return mockLeaderboard.slice(0, limit)
  },

  async getLeaderboardPosition(userId: string): Promise<number> {
    await sleep(DELAY)
    const position = mockLeaderboard.findIndex((u) => u.id === userId)
    return position + 1
  },

  // Assessment endpoints
  async startAssessment(skill: string): Promise<{ assessmentId: string; scenarios: any[] }> {
    await sleep(DELAY)
    return {
      assessmentId: `assessment-${Date.now()}`,
      scenarios: [
        {
          id: '1',
          type: 'code_fix',
          text: 'Fix the following code to handle edge cases...',
          timeLimit: 10,
        },
        {
          id: '2',
          type: 'case_study',
          text: 'Analyze this system design problem...',
          timeLimit: 15,
        },
        {
          id: '3',
          type: 'bug_analysis',
          text: 'Find and explain the bug in this code...',
          timeLimit: 10,
        },
      ],
    }
  },

  async submitAssessment(assessmentId: string, responses: any[]): Promise<{
    score: number
    xpEarned: number
    achievements: string[]
    feedback: string
  }> {
    await sleep(DELAY)
    const score = Math.floor(Math.random() * 40) + 60 // 60-100
    return {
      score,
      xpEarned: 250,
      achievements: score > 85 ? ['perfect_score'] : [],
      feedback: 'Great performance! Keep practicing to master this skill.',
    }
  },

  // Resume endpoints
  async uploadResume(file: File): Promise<{ resumeId: string; skills: any[] }> {
    await sleep(DELAY)
    return {
      resumeId: `resume-${Date.now()}`,
      skills: SKILL_CATEGORIES.slice(0, Math.floor(Math.random() * 4) + 2).map((skill) => ({
        name: skill,
        confidence: Math.floor(Math.random() * 40) + 60,
      })),
    }
  },

  // Certificate endpoints
  async verifyCertificate(file: File): Promise<{
    certificateId: string
    trustScore: number
    details: any
  }> {
    await sleep(DELAY)
    return {
      certificateId: `cert-${Date.now()}`,
      trustScore: Math.floor(Math.random() * 30) + 70,
      details: {
        issuer: 'Professional Certification Board',
        issuedDate: '2024-01-15',
        expiryDate: '2026-01-15',
      },
    }
  },

  // Avatar endpoints
  async getAvatarOptions(): Promise<string[]> {
    await sleep(DELAY)
    return ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5']
  },

  async updateAvatar(avatarId: number): Promise<UserProfile> {
    await sleep(DELAY)
    return { ...mockCurrentUser, avatar: avatarId }
  },

  // Onboarding
  async completeOnboarding(data: {
    username: string
    avatar: number
    skills: string[]
  }): Promise<UserProfile> {
    await sleep(DELAY)
    return {
      ...mockCurrentUser,
      username: data.username,
      avatar: data.avatar,
      skills: data.skills.map((skill) => ({
        name: skill,
        proficiency: 0,
        xp: 0,
      })),
    }
  },
}
