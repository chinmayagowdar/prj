import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseQRCode, validateQRCode } from '@/lib/crypto-utils';

export async function POST(request: NextRequest) {
  try {
    const { qrData } = await request.json();

    if (!qrData || typeof qrData !== 'string') {
      return NextResponse.json({ error: 'Invalid QR data' }, { status: 400 });
    }

    if (!validateQRCode(qrData)) {
      return NextResponse.json({ error: 'Invalid QR code format' }, { status: 400 });
    }

    const parsed = parseQRCode(qrData);
    if (!parsed) {
      return NextResponse.json({ error: 'Could not parse QR code' }, { status: 400 });
    }

    // Find the certificate in the database
    const certificate = await prisma.certificate.findFirst({
      where: {
        certificateId: parsed.certificateId,
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found', verified: false },
        { status: 404 }
      );
    }

    // Verify the certificate details match
    const verified =
      certificate.recipientName === parsed.recipient &&
      certificate.issuerName === parsed.issuer;

    return NextResponse.json({
      verified,
      certificate: verified ? certificate : null,
      message: verified ? 'Certificate verified successfully' : 'Certificate details do not match',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
