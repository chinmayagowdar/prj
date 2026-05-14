import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Learn Ledger - Skill Verification Platform',
  description:
    'Verify your skills through AI-powered assessments, upload your resume, and earn recognized credentials with blockchain integrity.',
  keywords: 'skill assessment, resume verification, credentials, professional development',
  openGraph: {
    title: 'Learn Ledger',
    description: 'The future of professional skill verification',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
