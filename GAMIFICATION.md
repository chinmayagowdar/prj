# Learn Ledger - Gamified Student-Focused Platform

A modern, gamified platform for skill verification and credential management with an engaging user experience designed for students and learners.

## 🎮 Gamification Features

### XP & Leveling System
- **5 Levels**: Novice, Apprentice, Scholar, Master, Legend
- **1000 XP per Level**: Complete assessments, upload resumes, and verify credentials to earn XP
- **Real-time Progress**: XP bar shows progress to next level with smooth animations
- **Level Badges**: Gradient-colored badges with spring animations

### Achievements
- **8 Unlockable Achievements**: First Assessment, Perfect Score, 7-Day Warrior, Unstoppable, Polymath, Master of All, Champion
- **Visual Unlocking**: Locked/unlocked states with star icons
- **Achievement Display**: Grid view on profile and dashboard

### Leaderboard System
- **Global Rankings**: See where you stand against all learners
- **Podium Display**: Top 3 players with animated podium and star effect for champion
- **Your Rank**: Highlighted entry showing your current position
- **Staggered Animations**: Smooth entry animations for ranking entries

### Daily Streaks
- **Streak Tracking**: Track consecutive days of learning
- **Fire Emoji**: Visual indicator of active streaks
- **Reward Multiplier**: Extra XP potential with higher streaks

### Skill Proficiency Tracking
- **Radar Chart**: Visualize your skill profile across 8 technical domains
- **Proficiency Scores**: Track progress in JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker
- **XP per Skill**: Individual XP accumulation for each skill

## 🎨 Design System

### Color Palette (Cyberpunk Neon)
- **Primary Background**: `#0f0a1f` (Deep Purple)
- **Alt Background**: `#1a1530` (Darker Purple)
- **Cyan Accent**: `#00f5ff` (Neon Cyan)
- **Purple Accent**: `#a855f7` (Vibrant Purple)
- **Secondary**: `#ff00ff` (Magenta), `#00ff88` (Success Green)

### Components
- **XP Bar**: Animated gradient bar with glow effect
- **Level Badge**: 24px-72px badges with gradient backgrounds
- **Achievement Badge**: 64px squares with locked/unlocked states
- **Skill Radar**: Recharts radar visualization
- **Leaderboard Entry**: Staggered card animations
- **Podium**: 3-tier display with animated star and scaling

### Animations (Framer Motion)
- **Fade In**: Smooth opacity transitions
- **Slide In**: Directional entrance animations
- **Scale**: Pop-in and bounce effects
- **Stagger**: List items animated with delays
- **Pulse**: Continuous highlight effects
- **Glow**: Box-shadow pulsing for important elements

## 📄 Pages & Routes

### Public Pages
- **`/`** - Landing page with gamification messaging and feature showcase
- **`/auth/login`** - Gamified login form with "Welcome Back" messaging
- **`/auth/sign-up`** - Gamified signup with "Join the Adventure" messaging

### Authenticated Pages
- **`/onboarding`** - 5-step wizard: Welcome → Username → Avatar → Skills → Complete
- **`/dashboard`** - Main hub with XP bar, level, achievements, top leaderboard, quick actions
- **`/leaderboard`** - Full rankings view with podium display and global leaderboard
- **`/profile`** - Comprehensive profile showing stats, skills, achievements, export options
- **`/assess`** - Skill assessment page with gamified interface and XP rewards
- **`/resume`** - Resume upload with gamification
- **`/credentials`** - Credential verification interface
- **`/report`** - AI-generated competency report

## 🔧 Technical Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion for smooth transitions
- **State Management**: Zustand for game state
- **Charts**: Recharts for radar visualization
- **Icons**: Lucide React for consistent iconography

### Libraries
- `zustand` - Global state management for XP, levels, achievements
- `framer-motion` - Advanced animations and transitions
- `recharts` - Data visualization (skill radar)

### Mock API
- **500ms Delays**: Simulates network latency
- **Mock Users**: 5 sample leaderboard entries
- **Mock Current User**: User with mock profile data
- **Endpoints**: Assessment, resume, certificate verification, onboarding

## 📂 Project Structure

```
/app
  ├── page.tsx              # Landing page (gamified)
  ├── dashboard/           # Main user hub
  ├── leaderboard/         # Rankings & podium
  ├── profile/             # User profile
  ├── onboarding/          # 5-step wizard
  ├── assess/              # Skill assessments
  ├── auth/
  │   ├── login/
  │   ├── sign-up/
  │   └── error/

/components
  ├── xp-bar.tsx           # XP progress bar
  ├── level-badge.tsx      # Level display
  ├── achievement-badge.tsx # Achievement cards
  ├── skill-radar.tsx      # Skill visualization
  ├── leaderboard.tsx      # Rankings list
  ├── podium.tsx           # Top 3 display
  ├── avatar-selector.tsx  # Avatar picker
  ├── activity-feed.tsx    # Recent activity

/lib
  ├── constants.ts         # Game constants
  ├── store/
  │   └── game-store.ts    # Zustand store
  ├── mock-api.ts          # Mock endpoints
  └── animations.ts        # Animation variants
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎯 Key Features Implemented

### Phase 1: Foundation (Complete)
✓ Game state store with XP/level tracking
✓ Mock API with realistic delays
✓ 10+ gamification components
✓ Animation utilities

### Phase 2: Pages (Complete)
✓ Redesigned landing page with gamified messaging
✓ Gamified auth pages (login/signup)
✓ 5-step onboarding wizard
✓ Complete dashboard with stats and leaderboard sidebar
✓ Full leaderboard with podium display
✓ Comprehensive user profile page
✓ Gamified assessment selection page

### Phase 3: Polish (In Progress)
- [ ] Resume upload gamification
- [ ] Credential verification badges
- [ ] Assessment proctoring interface
- [ ] Mobile optimization refinements
- [ ] Performance optimizations
- [ ] Backend integration

## 🎓 User Journey

1. **Landing** → Discover gamification features
2. **Sign Up** → Create account with gamified messaging
3. **Onboarding** → Choose username, avatar, starting skills
4. **Dashboard** → View progress, XP, achievements
5. **Assess** → Take proctored skill assessment (+250 XP)
6. **Leaderboard** → Compete globally
7. **Profile** → View full stats and achievements
8. **Repeat** → Earn more XP, level up, unlock achievements

## 📊 Data Models

### User Profile
```typescript
interface UserProfile {
  id: string
  username: string
  avatar: number
  level: number (1-5)
  xp: number (current level XP)
  totalXp: number (all-time XP)
  streak: number (days)
  achievements: string[]
  skills: Skill[]
}

interface Skill {
  name: string
  proficiency: number (0-100)
  xp: number
}
```

### Achievement
```typescript
interface Achievement {
  id: string
  name: string
  xp: number (reward)
}
```

## 🎨 Customization

### Change Color Theme
Edit `/lib/constants.ts` `THEME` object:
```typescript
export const THEME = {
  bg: '#0f0a1f',
  primary: '#00f5ff',
  secondary: '#a855f7',
  // ...
}
```

### Adjust XP Values
Modify `/lib/constants.ts` `XP_REWARDS`:
```typescript
export const XP_REWARDS = {
  ASSESSMENT_BEGINNER: 100,
  ASSESSMENT_INTERMEDIATE: 250,
  // ...
}
```

### Add New Achievement
Update `/lib/constants.ts` `ACHIEVEMENTS`:
```typescript
NEW_ACHIEVEMENT: { id: 'new_id', name: 'Achievement Name', xp: 100 }
```

## 📈 Future Enhancements

- Real backend integration (Supabase/Neon)
- Social features (follow, messaging)
- Teams and competitions
- Skill badges with verification
- AI-powered assessment feedback
- Mobile app version
- Multiplayer assessments
- Seasonal rewards and challenges

---

Built with passion for gamified learning. Earn your way to mastery!
