// Assessment grader utility - scores scenario responses
export interface ScenarioResponse {
  type: 'code_fix' | 'case_study' | 'bug_analysis' | 'design_review';
  submission: string;
  expectedKeywords?: string[];
  timeSpent: number; // in seconds
}

export interface GradingResult {
  score: number;
  maxPoints: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export function gradeScenario(response: ScenarioResponse): GradingResult {
  const baseScore = gradeContent(response.submission, response.type, response.expectedKeywords || []);
  const timeBonus = calculateTimeBonus(response.timeSpent);
  
  const maxPoints = 100;
  const finalScore = Math.min(maxPoints, baseScore + timeBonus);
  
  return {
    score: finalScore,
    maxPoints,
    feedback: generateFeedback(finalScore, response.type),
    strengths: identifyStrengths(response.submission, response.type),
    improvements: suggestImprovements(response.submission, response.type)
  };
}

function gradeContent(submission: string, type: string, expectedKeywords: string[]): number {
  let score = 0;
  const submissionLower = submission.toLowerCase();
  
  // Check for expected keywords
  let keywordMatches = 0;
  for (const keyword of expectedKeywords) {
    if (submissionLower.includes(keyword.toLowerCase())) {
      keywordMatches++;
    }
  }
  const keywordScore = expectedKeywords.length > 0 
    ? (keywordMatches / expectedKeywords.length) * 60 
    : 30;
  score += keywordScore;
  
  // Type-specific scoring
  switch (type) {
    case 'code_fix':
      score += scoreCodeFix(submission);
      break;
    case 'case_study':
      score += scoreCaseStudy(submission);
      break;
    case 'bug_analysis':
      score += scoreBugAnalysis(submission);
      break;
    case 'design_review':
      score += scoreDesignReview(submission);
      break;
  }
  
  return Math.min(100, score);
}

function scoreCodeFix(code: string): number {
  let score = 20;
  
  // Check for proper syntax indicators
  if (code.includes('{') && code.includes('}')) score += 5;
  if (code.includes('function') || code.includes('=>')) score += 5;
  if (code.includes('return')) score += 5;
  if (code.includes('//') || code.includes('/*')) score += 3; // Comments
  
  return Math.min(40, score);
}

function scoreCaseStudy(response: string): number {
  let score = 20;
  
  // Check for structure
  if (response.split('\n').length > 3) score += 5; // Multiple paragraphs
  if (response.includes('problem') || response.includes('solution')) score += 5;
  if (response.includes('implementation') || response.includes('approach')) score += 5;
  if (response.includes('trade-off') || response.includes('consideration')) score += 5;
  
  return Math.min(40, score);
}

function scoreBugAnalysis(response: string): number {
  let score = 20;
  
  // Check for analytical structure
  if (response.includes('root cause') || response.includes('cause')) score += 8;
  if (response.includes('fix') || response.includes('solution')) score += 8;
  if (response.includes('prevent') || response.includes('prevent')) score += 8;
  if (response.includes('test')) score += 8;
  
  return Math.min(40, score);
}

function scoreDesignReview(response: string): number {
  let score = 20;
  
  // Check for design thinking
  if (response.includes('architecture') || response.includes('structure')) score += 8;
  if (response.includes('scalability') || response.includes('performance')) score += 8;
  if (response.includes('security') || response.includes('maintainability')) score += 8;
  if (response.includes('improvement') || response.includes('enhancement')) score += 8;
  
  return Math.min(40, score);
}

function calculateTimeBonus(timeSpent: number): number {
  // Bonus for completing within reasonable time (15 min = 600 sec)
  if (timeSpent < 600) return 5;
  if (timeSpent < 900) return 3;
  return 0;
}

function generateFeedback(score: number, type: string): string {
  if (score >= 85) return `Excellent ${type}! Your solution demonstrates strong understanding and best practices.`;
  if (score >= 70) return `Good work on your ${type}. Consider reviewing edge cases and optimization opportunities.`;
  if (score >= 55) return `Your ${type} shows potential. Focus on completeness and following best practices.`;
  return `Your ${type} needs improvement. Review key concepts and try addressing all requirements.`;
}

function identifyStrengths(submission: string, type: string): string[] {
  const strengths: string[] = [];
  
  if (submission.length > 100) strengths.push('Thorough response with detailed explanation');
  if (submission.includes('//') || submission.includes('/*')) strengths.push('Well-commented code');
  if ((submission.match(/[A-Z]/g) || []).length > 5) strengths.push('Proper syntax and structure');
  
  return strengths;
}

function suggestImprovements(submission: string, type: string): string[] {
  const improvements: string[] = [];
  
  if (submission.length < 50) improvements.push('Provide more detailed explanation');
  if (!submission.includes('//') && type === 'code_fix') improvements.push('Add comments to explain your approach');
  if (submission.includes('TODO') || submission.includes('FIXME')) improvements.push('Complete all tasks before submission');
  
  return improvements;
}
