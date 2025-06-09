import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AnalyticsProvider } from '@/lib/analytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'vCFO of One - Virtual CFO for Solo Businesses',
  description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO. AI-driven virtual CFO providing financial insight and oversight on demand.',
  keywords: 'virtual cfo, financial management, small business, financial clarity, cash flow management',
  openGraph: {
    title: 'vCFO of One - Virtual CFO for Solo Businesses',
    description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO',
    type: 'website',
    url: 'https://vcofone.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'vCFO of One',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vCFO of One - Virtual CFO for Solo Businesses',
    description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}