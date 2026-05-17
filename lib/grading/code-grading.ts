export interface PistonExecutionRequest {
  language: string
  version?: string
  files: Array<{
    name: string
    content: string
  }>
  stdin?: string
  args?: string[]
}

export interface PistonExecutionResult {
  language: string
  version: string
  run: {
    stdout: string
    stderr: string
    code: number | null
    signal: string | null
  }
}

/**
 * Execute code using Piston API (free code execution service)
 * Supports Python, JavaScript, Java, C++, and more
 */
export async function executeCode(
  code: string,
  language: string,
  testInput?: string
): Promise<PistonExecutionResult> {
  const languageMap: Record<string, string> = {
    python: 'python',
    python3: 'python',
    javascript: 'javascript',
    js: 'javascript',
    typescript: 'typescript',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    sql: 'sql',
  }

  const pistonLanguage = languageMap[language.toLowerCase()] || language

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: pistonLanguage,
        version: '*',
        files: [
          {
            name: `main.${getFileExtension(pistonLanguage)}`,
            content: code,
          },
        ],
        stdin: testInput || '',
      } as PistonExecutionRequest),
    })

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`)
    }

    return (await response.json()) as PistonExecutionResult
  } catch (error) {
    console.error('Code execution error:', error)
    throw error
  }
}

/**
 * Grade code against test cases
 */
export async function gradeCode(
  code: string,
  language: string,
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
): Promise<{ score: number; passed: number; total: number; feedback: string }> {
  let passed = 0
  const feedback: string[] = []

  for (let i = 0; i < testCases.length; i++) {
    try {
      const result = await executeCode(code, language, testCases[i].input)
      const actualOutput = result.run.stdout.trim()
      const expectedOutput = testCases[i].expectedOutput.trim()

      if (actualOutput === expectedOutput) {
        passed++
        feedback.push(`✓ Test case ${i + 1}: Passed`)
      } else {
        feedback.push(`✗ Test case ${i + 1}: Expected "${expectedOutput}", got "${actualOutput}"`)
      }
    } catch (error) {
      feedback.push(`✗ Test case ${i + 1}: Error - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const score = (passed / testCases.length) * 100

  return {
    score,
    passed,
    total: testCases.length,
    feedback: feedback.join('\n'),
  }
}

function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    sql: 'sql',
  }
  return extensions[language] || language
}
