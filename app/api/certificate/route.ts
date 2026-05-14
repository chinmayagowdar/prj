import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateHash } from '@/lib/crypto-utils';

export async function POST(request: NextRequest) {
  try {
    const { certificateId, recipientName, issuerName, issuedDate, credentialUrl } =
      await request.json();

    if (!certificateId || !recipientName || !issuerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    const existing = await prisma.certificate.findFirst({
      where: { certificateId },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Certificate already exists' },
        { status: 409 }
      );
    }

    // Generate integrity hash
    const integrityHash = generateHash(
      `${certificateId}:${recipientName}:${issuerName}:${issuedDate}`
    );

    const certificate = await prisma.certificate.create({
      data: {
        certificateId,
        recipientName,
        issuerName,
        issuedDate: issuedDate ? new Date(issuedDate) : new Date(),
        credentialUrl: credentialUrl || '',
        integrityHash,
      },
    });

    return NextResponse.json({
      success: true,
      certificate,
      message: 'Certificate registered successfully',
    });
  } catch (error) {
    console.error('Certificate registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      certificates,
      total: certificates.length,
    });
  } catch (error) {
    console.error('Certificate fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
