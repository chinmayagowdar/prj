import Link from 'next/link';

export default function RootPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
              LL
            </div>
            <span className="text-xl font-bold">Learn Ledger</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/verify" className="text-slate-300 hover:text-white transition">
              Verify
            </Link>
            <Link href="/resume" className="text-slate-300 hover:text-white transition">
              Resume
            </Link>
            <Link href="/admin" className="text-slate-300 hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Verify Credentials with Confidence
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Learn Ledger combines QR code verification, resume authentication, and blockchain
            integrity hashing to create a secure, trustworthy credential system.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/verify"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition shadow-lg shadow-blue-500/20"
            >
              Verify Certificate
            </Link>
            <Link
              href="/resume"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold border border-slate-700 transition"
            >
              Upload Resume
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:bg-slate-800/80 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">QR Verification</h3>
              <p className="text-slate-400">
                Scan QR codes on certificates to instantly verify their authenticity and details.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:bg-slate-800/80 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Resume Scoring</h3>
              <p className="text-slate-400">
                Upload and score resumes with AI-powered analysis to evaluate skills and experience.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:bg-slate-800/80 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Blockchain Integrity</h3>
              <p className="text-slate-400">
                Secure credentials with SHA-256 hashing and blockchain registration for tamper-proof records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-500">
          <p>&copy; 2024 Learn Ledger. Secure credential verification platform.</p>
        </div>
      </footer>
    </main>
  );
}
