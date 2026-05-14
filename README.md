# Learn Ledger - Production Build

A comprehensive skill verification and credential management platform built with Next.js 15, Supabase, and TypeScript.

## Features Implemented

### Core Platform
- **Supabase PostgreSQL Database**: 8 optimized tables with Row Level Security for multi-tenant isolation
- **Authentication**: Email/password signup with Supabase Auth, automatic profile creation via trigger
- **Server-Side Rendering**: Next.js 15 App Router with full TypeScript support
- **Middleware-Based Protection**: Automatic route guarding for authenticated pages

### User Features
- **Landing Page**: Feature showcase with clear CTAs for signup and credential verification
- **Dashboard**: Real-time stats display (XP, skills count, user level calculation)
- **Skill Assessments**: Multi-level question interface with 8+ skills available
- **Resume Management**: Upload interface with scoring visualization
- **Credential Verification**: Public verification page for checking issued credentials
- **User Profile**: Account management and logout functionality

### Database Schema
- **profiles**: User profiles with email and full name (auto-created on signup)
- **skills_assessments**: Tracks user skill levels and XP with unique constraints
- **questions**: Assessment questions with multiple difficulty levels
- **user_answers**: Tracks all assessment responses for analytics
- **resumes**: Resume uploads with scoring and feedback
- **credentials**: Issued credentials with blockchain hashing for integrity
- **user_activity**: Activity log for gamification and engagement tracking

### Security & Best Practices
- Row Level Security (RLS) policies on all tables
- User data automatically scoped to logged-in user
- Public credential verification endpoint for transparency
- Secure session management with Supabase SSR
- Automatic token refresh via middleware

## Project Structure

```
app/
├── auth/
│   ├── login/
│   ├── sign-up/
│   ├── callback/
│   └── error/
├── dashboard/page.tsx           # Protected user dashboard
├── assess/page.tsx              # Skill assessment selector
├── resume/page.tsx              # Resume upload interface
├── credentials/page.tsx         # User's issued credentials
├── verify/page.tsx              # Public credential verification
└── page.tsx                      # Landing page

components/ui/                   # Reusable button & card components
lib/supabase/                    # Client, server, and proxy setup
middleware.ts                    # Authentication middleware
```

## Getting Started

### Installation

```bash
npm install
npm run dev
```

Opens on http://localhost:3000

### Environment Setup

All Supabase credentials are configured via `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The database schema was created via Supabase migration with 8 tables, RLS policies, and auto-profile trigger.

## Deployment

```bash
npm run build
npm start
```

Fully Vercel-ready with automatic environment variable sourcing and auth callback configuration.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase PostgreSQL with RLS
- **Auth**: Supabase Auth with email/password
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI**: Custom shadcn-inspired components
