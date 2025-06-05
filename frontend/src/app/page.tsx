'use client';

import React from 'react';
import { TrackedButton } from '@/components/analytics';
import { useScrollTracking } from '@/lib/analytics';

export default function Home() {
  // Track scroll depth
  useScrollTracking();

  return (
    <main className="landing-page">
      <section className="hero">
        <h1>Get Crystal-Clear Financial Visibility Without a Full-Time CFO</h1>
        <p>AI-driven virtual CFO providing financial insight and oversight on demand</p>
        
        <TrackedButton
          ctaName="Get Free Financial Clarity Session"
          location="hero"
          className="cta-primary"
        >
          Get Your Free Financial Clarity Session
        </TrackedButton>
      </section>

      <section>
        <h2>Transform Your Financial Management</h2>
        <p>Stop spending hours in Excel with no clarity. Get real-time insights and predictable cash flow.</p>
      </section>
    </main>
  );
}