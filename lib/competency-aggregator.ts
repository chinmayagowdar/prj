// Competency aggregator - combines multiple data sources into trust scores
export interface SkillCompetency {
  skill: string;
  category: string;
  resume_confidence: number; // 0-100, from resume parsing
  assessment_score: number; // 0-100, from completed assessments
  certificate_verified: boolean; // from credential verification
  overall_trust_score: number; // 0-100, weighted average
  verified: boolean;
  last_verified: Date;
}

export interface CompetencyReport {
  user_id: string;
  generated_at: Date;
  skills: SkillCompetency[];
  overall_proficiency: number; // Average trust score
  verified_skills_count: number;
  assessment_completion_rate: number;
}

export function aggregateCompetency(
  resumeSkills: Array<{ name: string; confidence: number; category: string }>,
  assessmentResults: Array<{ skill: string; score: number }>,
  certificates: Array<{ skill: string; verified: boolean }>
): CompetencyReport {
  const skillMap = new Map<string, SkillCompetency>();
  
  // Process resume skills
  for (const skill of resumeSkills) {
    skillMap.set(skill.name, {
      skill: skill.name,
      category: skill.category,
      resume_confidence: skill.confidence,
      assessment_score: 0,
      certificate_verified: false,
      overall_trust_score: 0,
      verified: false,
      last_verified: new Date()
    });
  }
  
  // Enhance with assessment results
  for (const assessment of assessmentResults) {
    const existing = skillMap.get(assessment.skill);
    if (existing) {
      existing.assessment_score = assessment.score;
    } else {
      skillMap.set(assessment.skill, {
        skill: assessment.skill,
        category: 'assessed',
        resume_confidence: 0,
        assessment_score: assessment.score,
        certificate_verified: false,
        overall_trust_score: 0,
        verified: false,
        last_verified: new Date()
      });
    }
  }
  
  // Enhance with certificate verification
  for (const cert of certificates) {
    const existing = skillMap.get(cert.skill);
    if (existing) {
      existing.certificate_verified = cert.verified;
      existing.verified = cert.verified;
    }
  }
  
  // Calculate overall trust scores using weighted formula
  // Resume: 0.6x, Assessment: 0.9x, Certificate: 1.0x (highest trust)
  const skills = Array.from(skillMap.values()).map(skill => {
    let trustScore = 0;
    let weightSum = 0;
    
    if (skill.resume_confidence > 0) {
      trustScore += skill.resume_confidence * 0.6;
      weightSum += 0.6;
    }
    
    if (skill.assessment_score > 0) {
      trustScore += skill.assessment_score * 0.9;
      weightSum += 0.9;
    }
    
    if (skill.certificate_verified) {
      trustScore += 100 * 1.0;
      weightSum += 1.0;
    }
    
    skill.overall_trust_score = weightSum > 0 ? Math.round(trustScore / weightSum) : 0;
    return skill;
  });
  
  // Sort by trust score
  skills.sort((a, b) => b.overall_trust_score - a.overall_trust_score);
  
  const verifiedCount = skills.filter(s => s.verified).length;
  const overallProficiency = skills.length > 0
    ? Math.round(skills.reduce((sum, s) => sum + s.overall_trust_score, 0) / skills.length)
    : 0;
  
  return {
    user_id: '',
    generated_at: new Date(),
    skills,
    overall_proficiency: overallProficiency,
    verified_skills_count: verifiedCount,
    assessment_completion_rate: assessmentResults.length / skills.length
  };
}

export function generateCompetencyReportJSON(report: CompetencyReport): Record<string, any> {
  return {
    generated_at: report.generated_at.toISOString(),
    overall_proficiency: report.overall_proficiency,
    verified_skills_count: report.verified_skills_count,
    total_skills: report.skills.length,
    assessment_completion_rate: Math.round(report.assessment_completion_rate * 100),
    skills_breakdown: report.skills.map(skill => ({
      name: skill.skill,
      category: skill.category,
      trust_score: skill.overall_trust_score,
      verified: skill.verified,
      sources: {
        resume: skill.resume_confidence,
        assessment: skill.assessment_score,
        certificate: skill.certificate_verified
      }
    }))
  };
}
