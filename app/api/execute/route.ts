import { NextRequest, NextResponse } from 'next/server'
import { executeCode } from '@/lib/grading/code-grading'

export async function POST(request: NextRequest) {
  try {
    const { code, language, testInput } = await request.json()

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: code, language' },
        { status: 400 }
      )
    }

    const result = await executeCode(code, language, testInput)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Execute API error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Code execution failed',
      },
      { status: 500 }
    )
  }
}
