<<<<<<< HEAD
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const lexend = Lexend({ 
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: {
    default: 'vCFO of One - Virtual CFO for Small Businesses',
    template: '%s | vCFO of One'
  },
  description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO. AI-driven virtual CFO providing financial insight and oversight on demand.',
  keywords: ['virtual CFO', 'small business', 'financial planning', 'cash flow', 'KPIs', 'tax strategy'],
  authors: [{ name: 'vCFO Team' }],
  creator: 'Utlyze',
  publisher: 'Utlyze',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vcofone.com',
    siteName: 'vCFO of One',
    title: 'vCFO of One - Virtual CFO for Small Businesses',
    description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO',
    images: [
      {
        url: 'https://vcofone.com/og-image.jpg',
=======
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
>>>>>>> origin/main
        width: 1200,
        height: 630,
        alt: 'vCFO of One',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
<<<<<<< HEAD
    title: 'vCFO of One - Virtual CFO for Small Businesses',
    description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO',
    creator: '@vcofone',
    images: ['https://vcofone.com/twitter-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'google-site-verification-code',
=======
    title: 'vCFO of One - Virtual CFO for Solo Businesses',
    description: 'Get Crystal-Clear Financial Visibility Without a Full-Time CFO',
    images: ['/twitter-image.png'],
>>>>>>> origin/main
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
=======
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
>>>>>>> origin/main
      </body>
    </html>
  );
}