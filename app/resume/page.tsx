'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

interface ResumeScore {
  overallScore: number;
  skills: number;
  experience: number;
  education: number;
  feedback: string[];
}

interface UploadResponse {
  success: boolean;
  resumeId: string;
  score: ResumeScore;
  message: string;
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!candidateName.trim()) {
      setError('Please enter candidate name');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('candidateName', candidateName);

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Upload failed');
      } else {
        setResult(data);
        setFile(null);
        setCandidateName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockchainRegister = async () => {
    if (!result?.resumeId) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/resume/blockchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: result.resumeId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setResult((prev) =>
          prev
            ? {
                ...prev,
                message: `Resume registered on blockchain: ${data.blockchainHash}`,
              }
            : null
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold">
              LL
            </div>
            <span className="text-xl font-bold">Learn Ledger</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/verify" className="text-slate-300 hover:text-white transition">
              Verify
            </Link>
            <Link href="/resume" className="text-white font-semibold">
              Resume
            </Link>
            <Link href="/admin" className="text-slate-300 hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Score Your Resume</h1>
          <p className="text-slate-300 mb-12">
            Upload your resume for AI-powered scoring and detailed feedback on your qualifications.
          </p>

          {/* Upload Form */}
          {!result ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Candidate Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="resume" className="block text-sm font-semibold mb-2">
                  Resume File
                </label>
                <div
                  className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    id="resume"
                    type="file"
                    onChange={handleFileChange}
                    accept=".txt,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  {file ? (
                    <div>
                      <p className="text-blue-400 font-semibold">{file.name}</p>
                      <p className="text-slate-400 text-sm">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <svg
                        className="w-12 h-12 mx-auto text-slate-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 16v-4m0 0V8m0 4h4m-4 0H8"
                        />
                      </svg>
                      <p className="font-semibold">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-400">TXT, PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading || !file || !candidateName}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Upload & Score Resume'}
              </button>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Resume Analysis Results</h2>

                {/* Scores Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Overall Score</p>
                    <p className={`text-3xl font-bold ${getScoreColor(result.score.overallScore)}`}>
                      {result.score.overallScore}%
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Skills</p>
                    <p className={`text-3xl font-bold ${getScoreColor(result.score.skills)}`}>
                      {result.score.skills}%
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Experience</p>
                    <p
                      className={`text-3xl font-bold ${getScoreColor(result.score.experience)}`}
                    >
                      {result.score.experience}%
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Education</p>
                    <p className={`text-3xl font-bold ${getScoreColor(result.score.education)}`}>
                      {result.score.education}%
                    </p>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="font-semibold mb-3">Feedback</h3>
                  <ul className="space-y-2">
                    {result.score.feedback.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-slate-300 text-sm">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBlockchainRegister}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Register on Blockchain'}
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setCandidateName('');
                    setFile(null);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
                >
                  Upload Another
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6 mt-8">
            <h3 className="font-semibold mb-3 text-blue-300">How It Works</h3>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
              <li>Upload your resume in TXT, PDF, DOC, or DOCX format</li>
              <li>Our AI analyzes your skills, experience, and education</li>
              <li>Receive detailed feedback and improvement suggestions</li>
              <li>Register your resume on blockchain for integrity verification</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
