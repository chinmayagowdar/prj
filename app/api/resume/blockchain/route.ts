import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBlockchainHash } from '@/lib/crypto-utils';

export async function POST(request: NextRequest) {
  try {
    const { resumeId } = await request.json();

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID required' }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Generate blockchain hash
    const timestamp = Date.now();
    const blockchainHash = generateBlockchainHash(resumeId, timestamp);

    // Update the resume with blockchain hash
    const updated = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        blockchainHash,
        blockchainRegisteredAt: new Date(timestamp),
      },
    });

    return NextResponse.json({
      success: true,
      blockchainHash,
      registeredAt: updated.blockchainRegisteredAt,
      message: 'Resume registered on blockchain successfully',
    });
  } catch (error) {
    console.error('Blockchain registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
