import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { scoreResume, extractText } from '@/lib/resume-scorer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const candidateName = formData.get('candidateName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!candidateName) {
      return NextResponse.json({ error: 'Candidate name required' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const resumeText = extractText(Buffer.from(buffer));

    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: 'Could not extract text from resume' },
        { status: 400 }
      );
    }

    // Score the resume
    const score = await scoreResume(resumeText);

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        candidateName,
        fileName: file.name,
        textContent: resumeText,
        overallScore: score.overallScore,
        skillsScore: score.skills,
        experienceScore: score.experience,
        educationScore: score.education,
        feedback: score.feedback.join('\n'),
        blockchainHash: '', // Will be set after verification
      },
    });

    return NextResponse.json({
      success: true,
      resumeId: resume.id,
      score,
      message: 'Resume uploaded and scored successfully',
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
