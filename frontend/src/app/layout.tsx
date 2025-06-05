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
        width: 1200,
        height: 630,
        alt: 'vCFO of One',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}