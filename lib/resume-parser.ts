// Resume parser utility - extracts skills and metadata from resume text
interface ParsedResume {
  skills: Array<{ name: string; confidence: number; category: string }>;
  experience_years: number;
  education_level: string;
  certifications: string[];
  raw_text: string;
}

// Common skill keywords for detection
const SKILL_KEYWORDS: Record<string, string[]> = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'C#'],
  frontend: ['React', 'Vue', 'Angular', 'Svelte', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Material-UI'],
  backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring', 'Flask', 'Laravel', 'ASP.NET'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Dynamodb', 'Elasticsearch'],
  tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'Jenkins', 'GitHub Actions'],
  methodologies: ['Agile', 'Scrum', 'Kanban', 'TDD', 'CI/CD', 'DevOps', 'Microservices', 'REST API'],
}

export function parseResume(resumeText: string): ParsedResume {
  const text = resumeText.toLowerCase();
  const skills: Array<{ name: string; confidence: number; category: string }> = [];
  
  // Extract skills with confidence scoring
  for (const [category, keywords] of Object.entries(SKILL_KEYWORDS)) {
    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      const occurrences = (text.match(new RegExp(keywordLower, 'g')) || []).length;
      
      if (occurrences > 0) {
        // Confidence based on frequency: more occurrences = higher confidence
        const confidence = Math.min(100, 40 + occurrences * 15);
        skills.push({
          name: keyword,
          confidence,
          category
        });
      }
    }
  }
  
  // Extract experience years
  const yearsMatch = text.match(/(\d+)\+?\s*years?/);
  const experience_years = yearsMatch ? parseInt(yearsMatch[1]) : 0;
  
  // Detect education level
  let education_level = 'Unknown';
  if (text.includes('phd') || text.includes('doctorate')) education_level = 'PhD';
  else if (text.includes('master')) education_level = 'Master\'s';
  else if (text.includes('bachelor')) education_level = 'Bachelor\'s';
  else if (text.includes('associate')) education_level = 'Associate';
  else if (text.includes('diploma')) education_level = 'Diploma';
  
  // Extract certifications
  const certKeywords = ['aws', 'gcp', 'azure', 'kubernetes', 'certified', 'certification', 'scrum master', 'pmp'];
  const certifications = certKeywords.filter(cert => text.includes(cert));
  
  return {
    skills: skills.sort((a, b) => b.confidence - a.confidence),
    experience_years,
    education_level,
    certifications,
    raw_text: resumeText
  };
}

export function calculateResumeScore(parsed: ParsedResume): number {
  let score = 0;
  
  // Skills scoring (max 40 points)
  const avgSkillConfidence = parsed.skills.length > 0 
    ? parsed.skills.reduce((sum, s) => sum + s.confidence, 0) / parsed.skills.length 
    : 0;
  score += (avgSkillConfidence / 100) * 40;
  
  // Experience scoring (max 30 points)
  score += Math.min(30, parsed.experience_years * 3);
  
  // Education scoring (max 20 points)
  const educationPoints: Record<string, number> = {
    'PhD': 20,
    'Master\'s': 15,
    'Bachelor\'s': 12,
    'Associate': 8,
    'Diploma': 5,
    'Unknown': 0
  };
  score += educationPoints[parsed.education_level] || 0;
  
  // Certifications scoring (max 10 points)
  score += Math.min(10, parsed.certifications.length * 2);
  
  return Math.round(score);
}
