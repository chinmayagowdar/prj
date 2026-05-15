// Certificate analyzer - verifies certificate authenticity and trust
export interface CertificateAnalysis {
  credential_id: string;
  issuer: string;
  skill: string;
  level: string;
  design_integrity_score: number; // 0-100
  authenticity_score: number; // 0-100
  overall_trust_score: number; // 0-100
  verification_status: 'verified' | 'suspicious' | 'invalid';
  flags: string[];
  blockchain_hash: string;
}

export interface DesignMetrics {
  hasIssuer: boolean;
  hasDate: boolean;
  hasSignature: boolean;
  textQuality: number;
  layoutConsistency: number;
}

export function analyzeCertificate(
  credentialId: string,
  issuerName: string,
  skillName: string,
  level: string,
  certificateText: string,
  blockchainHash: string
): CertificateAnalysis {
  // Analyze design integrity
  const designMetrics = analyzeDesign(certificateText);
  const designScore = calculateDesignIntegrity(designMetrics);
  
  // Analyze authenticity signals
  const flags: string[] = [];
  let authenticityScore = 80;
  
  // Check for red flags
  if (!issuerName || issuerName.length < 3) {
    flags.push('Missing or incomplete issuer name');
    authenticityScore -= 20;
  }
  
  if (!certificateText.includes('date') && !certificateText.includes('issued')) {
    flags.push('No issue date detected');
    authenticityScore -= 10;
  }
  
  if (!skillName || skillName.length < 2) {
    flags.push('Skill name is incomplete');
    authenticityScore -= 15;
  }
  
  if (!blockchainHash) {
    flags.push('Missing blockchain verification');
    authenticityScore -= 15;
  }
  
  // Bonus for good signals
  if (issuerName.match(/^[A-Z]/)) authenticityScore += 5;
  if (level.match(/junior|intermediate|senior|expert/i)) authenticityScore += 5;
  
  authenticityScore = Math.max(0, Math.min(100, authenticityScore));
  
  // Calculate overall trust score
  const overallTrustScore = Math.round(designScore * 0.4 + authenticityScore * 0.6);
  
  // Determine verification status
  let verificationStatus: 'verified' | 'suspicious' | 'invalid';
  if (overallTrustScore >= 80) verificationStatus = 'verified';
  else if (overallTrustScore >= 60) verificationStatus = 'suspicious';
  else verificationStatus = 'invalid';
  
  return {
    credential_id: credentialId,
    issuer: issuerName,
    skill: skillName,
    level,
    design_integrity_score: designScore,
    authenticity_score: authenticityScore,
    overall_trust_score: overallTrustScore,
    verification_status: verificationStatus,
    flags,
    blockchain_hash: blockchainHash
  };
}

function analyzeDesign(certificateText: string): DesignMetrics {
  const textLower = certificateText.toLowerCase();
  
  return {
    hasIssuer: textLower.includes('issued by') || textLower.includes('issuer'),
    hasDate: textLower.includes('date') || textLower.includes('issued on'),
    hasSignature: textLower.includes('signature') || textLower.includes('signed'),
    textQuality: calculateTextQuality(certificateText),
    layoutConsistency: calculateLayoutConsistency(certificateText)
  };
}

function calculateTextQuality(text: string): number {
  let score = 50;
  
  // Check word count
  const words = text.split(/\s+/).length;
  if (words > 20 && words < 500) score += 20;
  
  // Check for professional language
  const proWords = text.match(/proficiency|verified|awarded|certified|achievement/gi) || [];
  score += Math.min(15, proWords.length * 3);
  
  // Check spelling quality (basic)
  if (text.length > text.replace(/\s+/g, ' ').length * 0.8) score += 10;
  
  return Math.min(100, score);
}

function calculateLayoutConsistency(text: string): number {
  let score = 50;
  
  // Check for structure indicators
  if (text.includes('\n')) score += 15; // Multi-line format
  if ((text.match(/[A-Z]/g) || []).length > 10) score += 15; // Proper capitalization
  if (text.includes('---') || text.includes('===')) score += 10; // Decorative elements
  
  return Math.min(100, score);
}

function calculateDesignIntegrity(metrics: DesignMetrics): number {
  let score = 40;
  
  if (metrics.hasIssuer) score += 15;
  if (metrics.hasDate) score += 15;
  if (metrics.hasSignature) score += 10;
  score += Math.round(metrics.textQuality / 3);
  score += Math.round(metrics.layoutConsistency / 3);
  
  return Math.min(100, score);
}

// Generate SHA-256 style hash for blockchain (mock implementation)
export function generateBlockchainHash(credentialData: string): string {
  // Mock implementation - in production use crypto-js
  let hash = 0;
  for (let i = 0; i < credentialData.length; i++) {
    const char = credentialData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return 'hash_' + Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
}
