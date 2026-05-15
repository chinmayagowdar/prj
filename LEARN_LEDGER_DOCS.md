# Learn Ledger - Comprehensive Skill Verification Platform

A production-ready platform for AI-powered credential verification, skill assessment, and competency reporting with proctored testing capabilities.

## Features

### Module 1: Resume Parsing & Analysis
- **Intelligent skill extraction** from text-based resumes
- **Confidence scoring** (0-100%) for detected skills across 7+ categories
- **Experience level detection** with year calculation
- **Education level classification** (PhD, Master's, Bachelor's, etc.)
- **Skill categorization** by type (languages, frontend, backend, databases, tools, methodologies)
- **Resume quality scoring** based on skill expertise, experience, education, and certifications

**Technology**: Natural language processing with keyword matching and weighted scoring algorithms

### Module 2: Certificate Verification
- **Design integrity analysis** (0-100% scoring)
- **Authenticity verification** with blockchain hashing
- **Trust score calculation** combining design and authenticity metrics
- **Red flag detection** for missing issuer names, dates, signatures
- **Blockchain-compatible hashing** for tamper-proof verification records
- **Public QR code generation** for verifiable credentials

**Technology**: Pattern recognition, design metrics analysis, SHA-256 compatible hashing

### Module 3: Proctored Assessment System
- **Real-world scenario questions** (code fixes, case studies, bug analysis, design reviews)
- **Live camera monitoring** with face detection
- **Attention tracking** with warning system for disengagement
- **Time tracking** per scenario (10 minutes default)
- **AI-powered grading** with detailed feedback and improvement suggestions
- **Integrity scoring** based on proctoring compliance (0-100%)
- **Audit logging** of all proctoring events

**Technology**: WebRTC for camera access, ML-based face detection, multi-criteria grading

### Module 4: Competency Reporting
- **Multi-source aggregation** combining resume, assessment, and certificate data
- **Weighted trust scoring** (Resume: 0.6x, Assessment: 0.9x, Certificate: 1.0x)
- **Overall proficiency calculation** across all verified skills
- **Public share tokens** for credential sharing with employers
- **Detailed breakdowns** showing data source contribution to each skill
- **Verification status** for each skill (Verified, Suspicious, Invalid)

**Technology**: Data aggregation algorithms with weighted averaging, cryptographic tokens

## Database Schema

### Core Tables
```sql
-- Resumes table
CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID (FK),
  parsed_content JSONB,
  skills JSON[],
  score INTEGER,
  created_at TIMESTAMP
)

-- Credentials table
CREATE TABLE credentials (
  id UUID PRIMARY KEY,
  user_id UUID (FK),
  credential_id TEXT UNIQUE,
  skill_name TEXT,
  level TEXT,
  is_verified BOOLEAN,
  blockchain_hash TEXT,
  created_at TIMESTAMP
)

-- Assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  user_id UUID (FK),
  skill_category TEXT,
  status TEXT,
  final_score INTEGER,
  integrity_score INTEGER,
  completed_at TIMESTAMP
)

-- Assessment Scenarios table
CREATE TABLE assessment_scenarios (
  id UUID PRIMARY KEY,
  assessment_id UUID (FK),
  scenario_order INTEGER,
  scenario_type TEXT,
  user_submission TEXT,
  score INTEGER,
  created_at TIMESTAMP
)

-- Proctoring Logs table
CREATE TABLE proctoring_logs (
  id UUID PRIMARY KEY,
  assessment_id UUID (FK),
  event_type TEXT,
  event_details JSONB,
  created_at TIMESTAMP
)

-- Competency Reports table
CREATE TABLE competency_reports (
  id UUID PRIMARY KEY,
  user_id UUID (FK),
  report_data JSONB,
  public_share_token TEXT UNIQUE,
  generated_at TIMESTAMP
)
```

### RLS Policies
All tables have Row Level Security (RLS) enabled:
- Users can only access their own data
- Public share tokens allow anonymized credential viewing

## API Endpoints

### Resume Parsing
```
POST /api/resume/parse
{
  "resumeText": "string",
  "fileName": "string"
}
Response: {
  "success": true,
  "score": 75,
  "skills": [...],
  "experience_years": 5,
  "education_level": "Bachelor's"
}
```

### Certificate Verification
```
POST /api/certificate/analyze
{
  "credentialId": "string",
  "issuerName": "string",
  "skillName": "string",
  "level": "string",
  "certificateText": "string"
}
Response: {
  "success": true,
  "analysis": {
    "design_integrity_score": 85,
    "authenticity_score": 90,
    "overall_trust_score": 88,
    "verification_status": "verified",
    "blockchain_hash": "hash_..."
  }
}
```

### Assessment Grading
```
POST /api/assessment/grade
{
  "assessmentId": "string",
  "scenarioId": "string",
  "type": "code_fix|case_study|bug_analysis|design_review",
  "submission": "string",
  "timeSpent": 600
}
Response: {
  "success": true,
  "score": 85,
  "feedback": "string",
  "strengths": [...],
  "improvements": [...]
}
```

### Competency Report Generation
```
POST /api/competency/generate
Response: {
  "success": true,
  "overall_proficiency": 82,
  "verified_skills_count": 5,
  "total_skills": 12,
  "skills": [...],
  "public_share_url": "/report/token123"
}
```

## Pages

### Public Pages
- `/` - Landing page with features overview
- `/auth/login` - User authentication
- `/auth/sign-up` - New account creation
- `/verify` - Public credential verification

### Protected Pages (Authenticated Users)
- `/dashboard` - Main dashboard with quick stats and actions
- `/resume` - Resume upload and AI analysis
- `/credentials` - Certificate management and verification
- `/assess` - Skill assessment selection and proctored testing
- `/report` - Multi-source competency report view

## Components

### Resume Module
- `ResumeUploadArea` - File upload interface with drag-drop support
- `ResumeAnalysis` - Skill breakdown with confidence visualization

### Certificate Module
- `CertificateVerificationForm` - Credential input form
- `CertificateAnalysisDisplay` - Trust scores and verification status

### Assessment Module
- `ProctoringMonitor` - Camera monitoring with face detection
- `AssessmentScenario` - Scenario display with submission handler

### Reporting Module
- `CompetencyReport` - Multi-source skill aggregation display

## Utilities

### Resume Parser (`lib/resume-parser.ts`)
- `parseResume(text)` - Extract skills and metadata
- `calculateResumeScore(parsed)` - Calculate 0-100 score

### Certificate Analyzer (`lib/certificate-analyzer.ts`)
- `analyzeCertificate()` - Verify certificate authenticity
- `generateBlockchainHash()` - Create tamper-proof hash

### Assessment Grader (`lib/assessment-grader.ts`)
- `gradeScenario(response)` - Score user submissions with feedback
- Type-specific grading for code, case studies, bug analysis, design reviews

### Competency Aggregator (`lib/competency-aggregator.ts`)
- `aggregateCompetency()` - Combine multi-source skill data
- `generateCompetencyReportJSON()` - Export report structure

## Security Features

- **Row Level Security (RLS)** - All database access is user-scoped
- **Authentication** - Supabase Auth with JWT tokens
- **Hashed Credentials** - Blockchain-compatible hashing for certificates
- **Input Validation** - Server-side validation on all API routes
- **Secure Middleware** - Simplified middleware to avoid Edge Runtime issues
- **Public Sharing** - Cryptographic tokens for controlled credential sharing

## Performance Optimizations

- **Server Components** - RSC for reduced client bundle size
- **Client-Only State** - React hooks for interactive features
- **Efficient Parsing** - Single-pass resume analysis
- **Caching** - Supabase-level query optimization
- **Lazy Loading** - Components load on demand

## Deployment

### Vercel
```bash
vercel deploy
```

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database
Uses Supabase PostgreSQL with all tables and RLS policies pre-configured.

## Testing

All routes tested and returning 200 status codes:
- `/` - Landing page
- `/auth/login` - Authentication
- `/auth/sign-up` - Registration
- `/resume` - Resume management
- `/credentials` - Certificate management
- `/assess` - Assessments
- `/report` - Competency reports
- `/dashboard` - Main dashboard

## Future Enhancements

1. **Advanced ML Grading** - Integration with GPT-4 for scenario grading
2. **Video Analysis** - Advanced proctoring with behavior analysis
3. **Skill Graph** - Prerequisite and dependency mapping
4. **Marketplace** - Employer access to verified candidates
5. **Mobile App** - Native iOS/Android assessment experience
6. **Real-time Collaboration** - Peer code review assessments

## License

MIT License - See LICENSE file for details
