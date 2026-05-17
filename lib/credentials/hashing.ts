import crypto from 'crypto'

/**
 * Hash function for credential fraud-proofing
 * Combines userId, skillId, finalScore, and timestamp
 */
export function generateCredentialHash(
  userId: string,
  skillId: string,
  finalScore: number,
  timestamp: Date
): string {
  const data = `${userId}:${skillId}:${finalScore}:${timestamp.getTime()}`
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Verify credential hash
 */
export function verifyCredentialHash(
  hash: string,
  userId: string,
  skillId: string,
  finalScore: number,
  timestamp: Date
): boolean {
  const expectedHash = generateCredentialHash(userId, skillId, finalScore, timestamp)
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(expectedHash)
  )
}
