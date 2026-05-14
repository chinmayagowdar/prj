import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Learn Ledger - Verify Credentials & Authenticate Resumes',
  description:
    'Secure credential verification and resume authentication platform with blockchain integrity hashing.',
  keywords: 'credential verification, resume authentication, blockchain, QR verification',
  openGraph: {
    title: 'Learn Ledger',
    description: 'Secure credential verification and resume authentication platform',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e293b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-slate-950`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
