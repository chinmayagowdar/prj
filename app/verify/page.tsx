'use client';

import { useState } from 'react';
import Link from 'next/link';

interface VerificationResult {
  verified: boolean;
  certificate: {
    id: string;
    certificateId: string;
    recipientName: string;
    issuerName: string;
    issuedDate: string;
    credentialUrl: string;
  } | null;
  message: string;
}

export default function VerifyPage() {
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!qrData.trim()) {
      setError('Please enter QR data');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrData }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Verification failed');
        setResult({ verified: false, certificate: null, message: data.error });
      } else {
        setResult(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setResult({ verified: false, certificate: null, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoQR = () => {
    setQrData('cert:CERT-2024-001:John Doe:Tech University');
    setResult(null);
    setError('');
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
            <Link href="/verify" className="text-white font-semibold">
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

      {/* Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Verify Certificate</h1>
          <p className="text-slate-300 mb-12">
            Enter certificate QR data or scan using your device&apos;s camera to verify authenticity.
          </p>

          {/* Verification Form */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
            <div className="mb-6">
              <label htmlFor="qrInput" className="block text-sm font-semibold mb-2">
                QR Code Data
              </label>
              <input
                id="qrInput"
                type="text"
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
                placeholder="cert:ID:Recipient:Issuer"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              />
              <p className="text-xs text-slate-400 mt-2">
                Format: cert:CERTIFICATE_ID:RECIPIENT_NAME:ISSUER_NAME
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleVerify}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Certificate'}
              </button>
              <button
                onClick={handleDemoQR}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition disabled:opacity-50"
              >
                Load Demo
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div
                className={`rounded-lg p-6 border ${
                  result.verified
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      result.verified ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {result.verified ? (
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      ) : (
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-2 ${
                        result.verified ? 'text-green-300' : 'text-red-300'
                      }`}
                    >
                      {result.message}
                    </h3>
                    {result.certificate && (
                      <div className="space-y-2 text-sm text-slate-300">
                        <p>
                          <span className="font-semibold">Recipient:</span>{' '}
                          {result.certificate.recipientName}
                        </p>
                        <p>
                          <span className="font-semibold">Issuer:</span> {result.certificate.issuerName}
                        </p>
                        <p>
                          <span className="font-semibold">Issued:</span>{' '}
                          {new Date(result.certificate.issuedDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-blue-300">How to Verify</h3>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
              <li>Scan the QR code on a certificate using your device&apos;s camera</li>
              <li>Enter the QR code data in the field above</li>
              <li>Click &quot;Verify Certificate&quot; to check authenticity</li>
              <li>View the verification result with certificate details</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
