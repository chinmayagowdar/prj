import { create } from 'zustand'
import { LEVELS, XP_PER_LEVEL, ACHIEVEMENTS } from '@/lib/constants'

export interface UserProfile {
  id: string
  username: string
  avatar: number
  level: number
  xp: number
  totalXp: number
  streak: number
  achievements: string[]
  skills: {
    name: string
    proficiency: number
    xp: number
  }[]
}

export interface LeaderboardEntry {
  id: string
  username: string
  avatar: number
  level: number
  xp: number
  rank: number
}

export interface GameState {
  user: UserProfile | null
  leaderboard: LeaderboardEntry[]
  
  // Actions
  initializeUser: (user: UserProfile) => void
  addXp: (amount: number, source: string) => void
  completeAssessment: (skill: string, score: number) => void
  unlockAchievement: (achievementId: string) => void
  updateStreak: (days: number) => void
  addSkill: (name: string, proficiency: number) => void
  setLeaderboard: (entries: LeaderboardEntry[]) => void
}

export const useGameStore = create<GameState>((set) => ({
  user: null,
  leaderboard: [],

  initializeUser: (user) => set({ user }),

  addXp: (amount, source) => set((state) => {
    if (!state.user) return state
    const newTotalXp = state.user.totalXp + amount
    const newLevel = Math.floor(newTotalXp / 1000) + 1
    const newXp = newTotalXp % 1000

    return {
      user: {
        ...state.user,
        xp: newXp,
        totalXp: newTotalXp,
        level: Math.min(newLevel, 5),
      },
    }
  }),

  completeAssessment: (skill, score) => set((state) => {
    if (!state.user) return state
    const existingSkill = state.user.skills.find((s) => s.name === skill)
    const newSkills = existingSkill
      ? state.user.skills.map((s) =>
          s.name === skill
            ? { ...s, proficiency: Math.max(s.proficiency, score), xp: s.xp + 250 }
            : s
        )
      : [...state.user.skills, { name: skill, proficiency: score, xp: 250 }]

    return {
      user: {
        ...state.user,
        skills: newSkills,
      },
    }
  }),

  unlockAchievement: (achievementId) => set((state) => {
    if (!state.user || state.user.achievements.includes(achievementId)) return state
    return {
      user: {
        ...state.user,
        achievements: [...state.user.achievements, achievementId],
      },
    }
  }),

  updateStreak: (days) => set((state) => {
    if (!state.user) return state
    return {
      user: {
        ...state.user,
        streak: days,
      },
    }
  }),

  addSkill: (name, proficiency) => set((state) => {
    if (!state.user) return state
    const existing = state.user.skills.find((s) => s.name === name)
    if (existing) return state
    return {
      user: {
        ...state.user,
        skills: [...state.user.skills, { name, proficiency, xp: 0 }],
      },
    }
  }),

  setLeaderboard: (entries) => set({ leaderboard: entries }),
}))
