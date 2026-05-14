import crypto from 'crypto';

export function generateHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function validateQRCode(qrData: string): boolean {
  // Simple validation: QR data should be non-empty and contain basic certificate info
  return qrData.length > 0 && qrData.includes(':');
}

export function parseQRCode(qrData: string): { certificateId: string; recipient: string; issuer: string } | null {
  try {
    // Expected format: "cert:id:recipient:issuer"
    const [type, id, recipient, issuer] = qrData.split(':');
    if (type !== 'cert' || !id || !recipient || !issuer) {
      return null;
    }
    return { certificateId: id, recipient, issuer };
  } catch {
    return null;
  }
}

export function generateBlockchainHash(certificateId: string, timestamp: number): string {
  const data = `${certificateId}:${timestamp}`;
  return generateHash(data);
}
