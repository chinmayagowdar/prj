'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Certificate {
  id: string;
  certificateId: string;
  recipientName: string;
  issuerName: string;
  issuedDate: string;
  credentialUrl: string;
  integrityHash: string;
  createdAt: string;
}

export default function AdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    certificateId: '',
    recipientName: '',
    issuerName: '',
    issuedDate: new Date().toISOString().split('T')[0],
    credentialUrl: '',
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/certificate');
      const data = await response.json();
      if (response.ok) {
        setCertificates(data.certificates);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch certificates');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.certificateId ||
      !formData.recipientName ||
      !formData.issuerName
    ) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to register certificate');
      } else {
        setCertificates((prev) => [data.certificate, ...prev]);
        setFormData({
          certificateId: '',
          recipientName: '',
          issuerName: '',
          issuedDate: new Date().toISOString().split('T')[0],
          credentialUrl: '',
        });
        setShowForm(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
            <Link href="/resume" className="text-slate-300 hover:text-white transition">
              Resume
            </Link>
            <Link href="/admin" className="text-white font-semibold">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Certificate Management</h1>
              <p className="text-slate-300">
                Register and manage digital certificates with blockchain verification
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition"
            >
              {showForm ? 'Cancel' : 'Register Certificate'}
            </button>
          </div>

          {/* Registration Form */}
          {showForm && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Register New Certificate</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Certificate ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="certificateId"
                      value={formData.certificateId}
                      onChange={handleInputChange}
                      placeholder="CERT-2024-001"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Recipient Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Issuer Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="issuerName"
                      value={formData.issuerName}
                      onChange={handleInputChange}
                      placeholder="Tech University"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Issued Date
                    </label>
                    <input
                      type="date"
                      name="issuedDate"
                      value={formData.issuedDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Credential URL
                  </label>
                  <input
                    type="url"
                    name="credentialUrl"
                    value={formData.credentialUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/cert"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Register Certificate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Certificates List */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-700">
              <h2 className="text-xl font-bold">Registered Certificates ({certificates.length})</h2>
            </div>

            {error && !showForm && (
              <div className="px-8 py-4 bg-red-500/10 border-b border-red-500/20">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {loading && !certificates.length ? (
              <div className="px-8 py-12 text-center">
                <p className="text-slate-400">Loading certificates...</p>
              </div>
            ) : certificates.length === 0 ? (
              <div className="px-8 py-12 text-center">
                <p className="text-slate-400 mb-4">No certificates registered yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                >
                  Register First Certificate
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Certificate ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Recipient</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Issuer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Issued Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr
                        key={cert.id}
                        className="border-t border-slate-700 hover:bg-slate-800/30 transition"
                      >
                        <td className="px-6 py-4 text-sm font-mono text-blue-300">
                          {cert.certificateId}
                        </td>
                        <td className="px-6 py-4 text-sm">{cert.recipientName}</td>
                        <td className="px-6 py-4 text-sm">{cert.issuerName}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(cert.issuedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-500 truncate max-w-xs">
                          {cert.integrityHash}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
