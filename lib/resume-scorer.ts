// Mock LLM-based resume scoring
// In production, this would call an actual LLM API (OpenAI, Claude, etc.)

export interface ResumeScore {
  overallScore: number;
  skills: number;
  experience: number;
  education: number;
  feedback: string[];
}

export async function scoreResume(resumeText: string): Promise<ResumeScore> {
  // Simple heuristic-based scoring for demo purposes
  const lines = resumeText.split('\n').filter(line => line.trim().length > 0);
  const wordCount = resumeText.split(/\s+/).length;

  // Calculate scores based on content analysis
  const skillsScore = resumeText.toLowerCase().includes('skills') ? 85 : 60;
  const experienceScore = resumeText.toLowerCase().includes('experience') ? 80 : 50;
  const educationScore = resumeText.toLowerCase().includes('education') ? 75 : 40;

  const overallScore = Math.round((skillsScore + experienceScore + educationScore) / 3);

  const feedback: string[] = [];

  if (wordCount < 100) {
    feedback.push('Resume is quite short. Consider adding more details about your experience and skills.');
  }
  if (wordCount > 1000) {
    feedback.push('Resume is quite long. Try to be more concise and focus on key accomplishments.');
  }
  if (!resumeText.toLowerCase().includes('skills')) {
    feedback.push('Consider adding a dedicated "Skills" section to highlight your technical abilities.');
  }
  if (!resumeText.toLowerCase().includes('experience')) {
    feedback.push('Add an "Experience" section with your work history and key achievements.');
  }
  if (!resumeText.toLowerCase().includes('education')) {
    feedback.push('Include your educational background and relevant certifications.');
  }
  if (feedback.length === 0) {
    feedback.push('Great resume structure! Make sure to keep it updated with recent achievements.');
  }

  return {
    overallScore,
    skills: skillsScore,
    experience: experienceScore,
    education: educationScore,
    feedback,
  };
}

export function extractText(fileBuffer: Buffer): string {
  // For demo purposes, we'll just decode as UTF-8
  // In production, you'd use a library like pdfparse for PDFs or similar for other formats
  return fileBuffer.toString('utf-8');
}
